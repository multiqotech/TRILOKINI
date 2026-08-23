import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, Box, Users, Settings } from "lucide-react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-gray-50 flex">
          {/* Sidebar */}
          <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
            <div className="h-16 flex items-center justify-center border-b px-4">
              <h1 className="text-xl font-bold tracking-widest text-[#7b2c2c]">TRILOKINI ADMIN</h1>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <Link href="/" className="flex items-center gap-3 px-3 py-2 bg-gray-100 rounded-md text-gray-700 font-medium">
                <LayoutDashboard size={20} />
                Dashboard
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md text-gray-600">
                <ImageIcon size={20} />
                Manage Hero Images
              </Link>
              <Link href="/categories" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md text-gray-600">
                <Box size={20} />
                Manage Categories
              </Link>
              <Link href="/products" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md text-gray-600">
                <Box size={20} />
                Manage Products
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md text-gray-600">
                <Users size={20} />
                Manage Designers
              </Link>
            </nav>
            <div className="p-4 border-t">
              <Link href="#" className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded-md text-gray-600">
                <Settings size={20} />
                Settings
              </Link>
            </div>
          </aside>
          
          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            <header className="h-16 bg-white border-b flex items-center px-8 shadow-sm justify-between">
              <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-300"></div>
              </div>
            </header>
            <div className="p-8">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
