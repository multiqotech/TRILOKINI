"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Box, ShoppingBag, ImageIcon, Package, Scissors,
  Users, Star, Heart, Bookmark, Layers, Images, Menu, LogOut, Lock
} from "lucide-react";
import { AdminAuthProvider, useAdminAuth } from "../context/AdminAuthContext";
import api from "../api";

const navGroups = [
  {
    label: "MAIN",
    items: [
      { name: "Dashboard", href: "/", icon: LayoutDashboard },
      { name: "Categories", href: "/categories", icon: Box },
      { name: "Products", href: "/products", icon: ShoppingBag },
      { name: "Hero Banners", href: "/hero-banners", icon: ImageIcon },
    ]
  },
  {
    label: "ORDERS",
    items: [
      { name: "Orders", href: "/orders", icon: Package },
      { name: "Custom Orders", href: "/custom-orders", icon: Scissors },
    ]
  },
  {
    label: "CONTENT",
    items: [
      { name: "Designers", href: "/designers", icon: Users },
      { name: "Celebrities", href: "/celebrities", icon: Star },
      { name: "Wedding Studio", href: "/wedding", icon: Heart },
      { name: "Favourites", href: "/favourites", icon: Bookmark },
      { name: "Collections", href: "/collections", icon: Layers },
      { name: "Collection Images", href: "/collection-images", icon: Images },
    ]
  }
];

function SidebarContent({ onClose, admin, onLogout }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col h-full bg-[var(--sidebar-bg)] border-r border-[var(--border-color)] w-[240px]">
      <div className="px-5 py-5 border-b border-[var(--border-color)]">
        <h1 className="text-lg font-bold tracking-widest text-[var(--primary)]">TRILOKINI</h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">Admin Panel</p>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar py-4 px-3 space-y-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] uppercase tracking-widest text-[var(--text-muted)] px-4 mt-4 mb-1 font-semibold">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`sidebar-item ${isActive ? "sidebar-item-active" : ""}`}
                  >
                    <item.icon size={18} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {/* Admin info + logout */}
      <div className="border-t border-[var(--border-color)] px-4 py-4">
        <div className="flex items-center gap-3 mb-3">
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "linear-gradient(135deg, var(--primary), #a78bfa)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>
            👑
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="text-xs font-semibold text-white truncate">{admin?.email || "Admin"}</p>
            <p className="text-[10px] text-[var(--text-muted)]">Administrator</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.07)] transition"
        >
          <LogOut size={15} />
          Sign out
        </button>
      </div>
    </div>
  );
}

function AdminLayout({ children }) {
  const { token, admin, loading, logout, isLoggedIn } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Inject admin JWT into all API requests
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // Redirect to login if not authenticated (except on /login page)
  useEffect(() => {
    if (!loading && !isLoggedIn && pathname !== "/login") {
      router.replace("/login");
    }
    if (!loading && isLoggedIn && pathname === "/login") {
      router.replace("/");
    }
  }, [loading, isLoggedIn, pathname, router]);

  // Show loading spinner
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg)" }}>
        <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔐</div>
          <p style={{ fontSize: 14 }}>Verifying session…</p>
        </div>
      </div>
    );
  }

  // Show login page without shell
  if (!isLoggedIn || pathname === "/login") {
    return <>{children}</>;
  }

  const getPageTitle = () => {
    if (pathname === "/") return "Dashboard";
    const path = pathname.split("/")[1];
    return path ? path.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase()) : "Dashboard";
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--background)]">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <SidebarContent admin={admin} onLogout={logout} />
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:hidden ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <SidebarContent admin={admin} onClose={() => setMobileOpen(false)} onLogout={logout} />
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Header */}
        <header className="h-14 border-b border-[var(--border-color)] flex items-center justify-between px-4 md:px-8 bg-[var(--sidebar-bg)] md:bg-transparent">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-[var(--text-muted)] hover:text-white" onClick={() => setMobileOpen(true)}>
              <Menu size={20} />
            </button>
            <h2 className="text-sm font-semibold text-white hidden md:block">{getPageTitle()}</h2>
            <h2 className="text-sm font-semibold text-white md:hidden">TRILOKINI</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[var(--border-color)]">
              <Lock size={12} style={{ color: "var(--primary)" }} />
              <span className="text-xs font-medium text-[var(--text-muted)] hidden sm:block">{admin?.email}</span>
            </div>
            <button
              onClick={logout}
              title="Sign out"
              className="p-2 rounded-lg text-[var(--text-muted)] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8 md:py-6 bg-[var(--background)] custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function AdminShell({ children }) {
  return (
    <AdminAuthProvider>
      <AdminLayout>{children}</AdminLayout>
    </AdminAuthProvider>
  );
}
