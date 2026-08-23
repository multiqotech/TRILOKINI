export default function AdminHome() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500 font-medium">Total Products</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500 font-medium">Active Categories</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">18</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border">
          <p className="text-sm text-gray-500 font-medium">Designers</p>
          <p className="text-3xl font-bold text-gray-800 mt-2">42</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="bg-[#7b2c2c] text-white p-4 rounded-lg font-medium hover:bg-[#561a1a] transition-colors text-left">
            + Create New Category
          </button>
          <button className="bg-gray-800 text-white p-4 rounded-lg font-medium hover:bg-gray-900 transition-colors text-left">
            + Add New Product
          </button>
          <button className="bg-white border border-gray-300 text-gray-700 p-4 rounded-lg font-medium hover:bg-gray-50 transition-colors text-left">
            Update Hero Banners
          </button>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-800">Dynamic Section Configuration</h3>
          <p className="text-sm text-gray-500">Manage which sections appear on the home page.</p>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-6 py-3 font-medium">Section Name</th>
                <th className="px-6 py-3 font-medium">Type</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              <tr>
                <td className="px-6 py-4">Main Hero</td>
                <td className="px-6 py-4">Image Banner</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Visible</span></td>
                <td className="px-6 py-4"><button className="text-blue-600 hover:underline">Edit</button></td>
              </tr>
              <tr>
                <td className="px-6 py-4">New Arrivals</td>
                <td className="px-6 py-4">Product Category</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Visible</span></td>
                <td className="px-6 py-4"><button className="text-blue-600 hover:underline">Edit</button></td>
              </tr>
              <tr>
                <td className="px-6 py-4">Celebrity Closet</td>
                <td className="px-6 py-4">Carousel</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">Hidden</span></td>
                <td className="px-6 py-4"><button className="text-blue-600 hover:underline">Edit</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
