"use client";
import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import { Box, ShoppingBag, Users, Image as ImageIcon, ArrowRight, Activity, TrendingUp, DollarSign, ListOrdered } from "lucide-react";
import Link from "next/link";
import { getCategories, getProducts, getDesigners, getHeroBanners } from "../api";

export default function AdminHome() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    designers: 0,
    banners: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, catRes, desRes, banRes] = await Promise.all([
          getProducts().catch(() => ({ data: [] })),
          getCategories().catch(() => ({ data: [] })),
          getDesigners().catch(() => ({ data: [] })),
          getHeroBanners().catch(() => ({ data: [] }))
        ]);
        
        setStats({
          products: prodRes.data?.length || 0,
          categories: catRes.data?.length || 0,
          designers: desRes.data?.length || 0,
          banners: banRes.data?.length || 0,
        });
      } catch (error) {
        console.error("Failed to fetch stats", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Stat Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Products" 
          value={loading ? "..." : stats.products} 
          icon={ShoppingBag} 
          subtitle="Live data"
        />
        <StatCard 
          title="Active Categories" 
          value={loading ? "..." : stats.categories} 
          icon={Box} 
          subtitle="56% of total"
        />
        <StatCard 
          title="Total Revenue" 
          value="₹0" 
          icon={DollarSign} 
          subtitle="No payments yet"
        />
        <StatCard 
          title="Total Profit" 
          value="₹0" 
          icon={TrendingUp} 
          subtitle="No data"
        />
      </div>

      {/* Panels Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        
        {/* Left Panel (Quick Actions styled as dark card) */}
        <div 
          className="rounded-2xl p-6"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', minHeight: '380px' }}
        >
          <div className="flex items-center gap-2 mb-8">
            <Activity size={20} style={{ color: 'var(--primary-teal)' }} />
            <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '500' }}>Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: "Manage Products", icon: ShoppingBag, href: "/products" },
              { title: "Manage Categories", icon: Box, href: "/categories" },
              { title: "Update Banners", icon: ImageIcon, href: "/hero-banners" },
              { title: "Manage Designers", icon: Users, href: "/designers" }
            ].map((action, i) => (
              <Link 
                key={i} 
                href={action.href}
                className="group flex items-center justify-between p-4 rounded-xl transition-all"
                style={{ background: '#0f0f0f', border: '1px solid var(--border-color)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary-teal)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border-color)'}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg" style={{ background: 'rgba(0, 180, 216, 0.1)' }}>
                    <action.icon size={18} style={{ color: 'var(--primary-teal)' }} />
                  </div>
                  <span style={{ color: 'white', fontWeight: '500' }}>{action.title}</span>
                </div>
                <ArrowRight size={16} style={{ color: 'var(--text-muted)' }} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>

        {/* Right Panel (Recent Activity styled as dark card) */}
        <div 
          className="rounded-2xl p-6 flex flex-col items-center justify-center"
          style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', minHeight: '380px' }}
        >
          <div className="w-full flex items-center gap-2 mb-8 self-start">
            <ListOrdered size={20} style={{ color: 'var(--primary-teal)' }} />
            <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '500' }}>Recent Activity</h3>
          </div>
          
          <div className="flex-1 flex items-center justify-center w-full">
            <p style={{ color: 'var(--text-muted)' }}>No recent activity data available</p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
