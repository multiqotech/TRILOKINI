"use client";
import { useState, useEffect } from "react";
import { getHeroBanners, createHeroBanner, updateHeroBanner, deleteHeroBanner } from "../../api";
import { resolveImage } from "../../utils";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import { Plus } from "lucide-react";

export default function HeroBannersPage() {
  const [banners, setBanners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getHeroBanners();
      // Sort by order on frontend just to be sure
      const sorted = (res.data || []).sort((a, b) => a.order - b.order);
      setBanners(sorted);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (banner = null) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this banner?")) {
      try {
        await deleteHeroBanner(id);
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingBanner) {
        await updateHeroBanner(editingBanner._id, data);
      } else {
        await createHeroBanner(data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReorder = async (dragIndex, dropIndex, paginatedData) => {
    // Reorder the local array first for immediate feedback
    const reorderedData = Array.from(banners);
    
    // Find absolute indices in the master array based on the paginatedData
    const draggedItem = paginatedData[dragIndex];
    const droppedItem = paginatedData[dropIndex];
    
    const absoluteDragIndex = banners.findIndex(b => b._id === draggedItem._id);
    const absoluteDropIndex = banners.findIndex(b => b._id === droppedItem._id);
    
    // Swap or insert? Usually we splice and insert.
    reorderedData.splice(absoluteDragIndex, 1);
    reorderedData.splice(absoluteDropIndex, 0, draggedItem);
    
    // Reassign order values linearly (1, 2, 3...)
    const updatedOrderList = reorderedData.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setBanners(updatedOrderList);
    
    try {
      const payload = updatedOrderList.map(item => ({
        id: item._id,
        order: item.order
      }));
      await import("../../api").then(api => api.reorderHeroBanners({ items: payload }));
    } catch (error) {
      console.error(error);
      fetchData(); // revert on fail
    }
  };

  const columns = [
    {
      key: "imageUrl",
      label: "Desktop Image",
      render: (val) => val ? <img src={resolveImage(val)} alt="Desktop Banner" className="w-20 h-10 rounded object-cover object-top" /> : '-'
    },
    { key: "linkUrl", label: "Link URL" }
  ];

  const formFields = [
    { name: "imageUrl", label: "Image URL", type: "image", required: true },
    { name: "linkUrl", label: "Link URL", type: "text" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Hero Banners</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#4361ee] hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add Banner</span>
        </button>
      </div>
      
      <DataTable 
        columns={columns} 
        data={banners} 
        onEdit={handleOpenModal} 
        onDelete={handleDelete} 
        onReorder={handleReorder}
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingBanner ? "Edit Banner" : "Add Banner"}
        fields={formFields}
        initialData={editingBanner}
        onSubmit={(data) => handleSubmit({ ...data, section: 'main', isActive: true })}
      />
    </div>
  );
}
