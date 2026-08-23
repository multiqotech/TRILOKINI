"use client";
import { useState, useEffect } from "react";
import { getWeddingItems, createWeddingItem, updateWeddingItem, deleteWeddingItem } from "../../api";
import { resolveImage } from "../../utils";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import { Plus } from "lucide-react";

export default function WeddingPage() {
  const [items, setItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getWeddingItems();
      setItems(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (item = null) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this wedding item?")) {
      try {
        await deleteWeddingItem(id);
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingItem) {
        await updateWeddingItem(editingItem._id, data);
      } else {
        await createWeddingItem(data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    {
      key: "imageUrl",
      label: "Image",
      render: (val, row) => val ? <img src={resolveImage(val)} alt="Wedding Item" className={`h-16 rounded object-cover object-top ${row.isWide ? 'w-32' : 'w-16'}`} /> : <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No Img</div>
    },
    { key: "name", label: "Name" },
    { key: "subtitle", label: "Subtitle" },
    { 
      key: "isWide", 
      label: "Wide?", 
      render: (val) => val ? 'Yes' : 'No' 
    },
    { key: "order", label: "Order" },
    {
      key: "isActive",
      label: "Active",
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${val ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {val ? 'Yes' : 'No'}
        </span>
      )
    }
  ];

  const formFields = [
    { name: "name", label: "Name", type: "text", required: true },
    { name: "imageUrl", label: "Image URL", type: "image", required: true },
    { name: "subtitle", label: "Subtitle", type: "text" },
    { name: "href", label: "Link URL", type: "text" },
    { name: "order", label: "Order", type: "number" },
    { name: "isWide", label: "Is Wide Image", type: "toggle" },
    { name: "isActive", label: "Is Active", type: "toggle" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Wedding Studio</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#4361ee] hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add Wedding Item</span>
        </button>
      </div>
      
      <DataTable 
        columns={columns} 
        data={items} 
        onEdit={handleOpenModal} 
        onDelete={handleDelete} 
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Wedding Item" : "Add Wedding Item"}
        fields={formFields}
        initialData={editingItem}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
