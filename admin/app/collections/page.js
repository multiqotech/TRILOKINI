"use client";
import { useState, useEffect } from "react";
import { getCollections, createCollection, updateCollection, deleteCollection } from "../../api";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import { Plus } from "lucide-react";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getCollections();
      setCollections(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (collection = null) => {
    setEditingCollection(collection);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this collection and its images?")) {
      try {
        await deleteCollection(id);
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingCollection) {
        await updateCollection(editingCollection._id, data);
      } else {
        await createCollection(data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { key: "title", label: "Title" },
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
    { name: "title", label: "Title", type: "text", required: true },
    { name: "order", label: "Order", type: "number" },
    { name: "isActive", label: "Is Active", type: "toggle" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Collections</h2>
          <p className="text-sm text-gray-500 mt-1">Create a collection first, then add images on the Collection Images page.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#4361ee] hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add Collection</span>
        </button>
      </div>
      
      <DataTable 
        columns={columns} 
        data={collections} 
        onEdit={handleOpenModal} 
        onDelete={handleDelete} 
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCollection ? "Edit Collection" : "Add Collection"}
        fields={formFields}
        initialData={editingCollection}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
