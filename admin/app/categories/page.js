"use client";
import { useState, useEffect } from "react";
import api from "../../api";

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [showInHomePage, setShowInHomePage] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories', { title, showInHomePage });
      setTitle("");
      setShowInHomePage(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Categories</h2>
      
      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-medium mb-4">Add New Category</h3>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border focus:border-black focus:ring-black" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" checked={showInHomePage} onChange={(e) => setShowInHomePage(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" />
            <label className="ml-2 block text-sm text-gray-900">Show in Home Page Sections (Sections 5 & 9)</label>
          </div>
          <button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">Save Category</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-xl border shadow-sm">
        <h3 className="text-lg font-medium mb-4">Existing Categories</h3>
        <ul className="divide-y">
          {categories.map((cat) => (
            <li key={cat._id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-medium">{cat.title}</p>
                <p className="text-sm text-gray-500">Show on Home: {cat.showInHomePage ? "Yes" : "No"}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
