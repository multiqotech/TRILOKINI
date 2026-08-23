"use client";
import { useState, useEffect } from "react";
import api from "../../api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    subtitle: "",
    currentPrice: "",
    previousPrice: "",
    imageUrl: "",
    designerName: ""
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/products');
      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', formData);
      setFormData({ category: "", title: "", subtitle: "", currentPrice: "", previousPrice: "", imageUrl: "", designerName: "" });
      fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Products</h2>
      
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-medium mb-4">Add New Product</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-black focus:ring-black">
              <option value="">Select Category</option>
              {categories.map(c => <option key={c._id} value={c._id}>{c.title}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Product Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-black focus:ring-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Subtitle</label>
            <input type="text" name="subtitle" value={formData.subtitle} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-black focus:ring-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Image URL</label>
            <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-black focus:ring-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Price (₹)</label>
            <input type="number" name="currentPrice" value={formData.currentPrice} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-black focus:ring-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Previous Price (₹) (Optional)</label>
            <input type="number" name="previousPrice" value={formData.previousPrice} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-black focus:ring-black" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Designer Name</label>
            <input type="text" name="designerName" value={formData.designerName} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-black focus:ring-black" />
          </div>
          <div className="col-span-1 md:col-span-2 pt-4">
            <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">Save Product</button>
          </div>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-medium mb-4">Existing Products</h3>
        <ul className="divide-y">
          {products.map((prod) => (
            <li key={prod._id} className="py-3 flex justify-between items-center">
              <div className="flex gap-4">
                {prod.imageUrl && <img src={prod.imageUrl} alt={prod.title} className="w-16 h-16 object-cover rounded" />}
                <div>
                  <p className="font-medium">{prod.title}</p>
                  <p className="text-sm text-gray-500">Price: ₹{prod.currentPrice} | Cat: {prod.category?.title}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
