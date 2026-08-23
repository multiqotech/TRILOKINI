"use client";
import { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../api";
import { resolveImage } from "../../utils";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import { Plus } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (category = null) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id);
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingCategory) {
        await updateCategory(editingCategory._id, data);
      } else {
        await createCategory(data);
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
      render: (val) => val ? <img src={resolveImage(val)} alt="Category" className="w-12 h-12 rounded object-cover object-top" /> : <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No Img</div>
    },
    { key: "title", label: "Title" },
    {
      key: "showInHomePage",
      label: "Home Page",
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${val ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {val ? 'Yes' : 'No'}
        </span>
      )
    },
    { key: "homePageOrder", label: "Order" }
  ];

  const formFields = [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea" },
    { name: "imageUrl", label: "Category Image", type: "image", required: true, aspectRatio: 4/5 },
    { name: "showInHomePage", label: "Show in Homepage", type: "toggle" },
    { name: "homePageOrder", label: "Home Page Order", type: "number" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Categories</h2>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-[#4361ee] hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          <span>Add Category</span>
        </button>
      </div>
      
      <DataTable 
        columns={columns} 
        data={categories} 
        onEdit={handleOpenModal} 
        onDelete={handleDelete} 
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Edit Category" : "Add Category"}
        fields={formFields}
        initialData={editingCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
