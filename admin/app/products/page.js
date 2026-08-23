"use client";
import { useState, useEffect } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct, getCategories } from "../../api";
import { resolveImage } from "../../utils";
import DataTable from "../../components/DataTable";
import FormModal from "../../components/FormModal";
import { Plus } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, catRes] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(prodRes.data || []);
      setCategories(catRes.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenModal = (product = null) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        fetchData();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSubmit = async (data) => {
    try {
      if (editingProduct) {
        await updateProduct(editingProduct._id, data);
      } else {
        await createProduct(data);
      }
      setIsModalOpen(false);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredProducts = selectedCategoryFilter 
    ? products.filter(p => p.category?._id === selectedCategoryFilter || p.category === selectedCategoryFilter)
    : products;

  const columns = [
    {
      key: "imageUrl",
      label: "Image",
      render: (val) => val ? <img src={resolveImage(val)} alt="Product" className="w-12 h-12 rounded object-cover object-top" /> : <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">No Img</div>
    },
    { key: "title", label: "Title", render: (val, row) => <div><p className="font-medium">{val}</p><p className="text-xs text-gray-500">{row.category?.title}</p></div> },
    { key: "designerName", label: "Designer", render: (val) => val || '-' },
    { key: "currentPrice", label: "Price", render: (val) => `₹${val}` },
    { key: "discountPercentage", label: "Discount", render: (val) => val ? `${val}%` : '-' },
    {
      key: "showInHomePage",
      label: "Homepage",
      render: (val) => (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${val ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
          {val ? 'Yes' : 'No'}
        </span>
      )
    }
  ];

  const formFields = [
    { name: "category", label: "Category", type: "select", options: categories.map(c => ({ label: c.title, value: c._id })), required: true },
    { name: "title", label: "Title", type: "text", required: true },
    { name: "subtitle", label: "Subtitle", type: "text" },
    { name: "currentPrice", label: "Current Price (₹)", type: "number", required: true },
    { name: "previousPrice", label: "Previous Price (₹)", type: "number" },
    { name: "discountPercentage", label: "Discount Percentage", type: "number" },
    { name: "imageUrl", label: "Product Image", type: "image", aspectRatio: 2/3 },
    { name: "designerName", label: "Designer Name", type: "text" },
    { name: "showInHomePage", label: "Show in Homepage", type: "toggle" },
    { name: "homePageOrder", label: "Home Page Order", type: "number" }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Products</h2>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <select 
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
          </select>
          <button 
            onClick={() => handleOpenModal()}
            className="bg-[#4361ee] hover:bg-blue-700 text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-sm whitespace-nowrap"
          >
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>
      </div>
      
      <DataTable 
        columns={columns} 
        data={filteredProducts} 
        onEdit={handleOpenModal} 
        onDelete={handleDelete} 
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Edit Product" : "Add Product"}
        fields={formFields}
        initialData={editingProduct ? {
          ...editingProduct,
          category: editingProduct.category?._id || editingProduct.category
        } : null}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
