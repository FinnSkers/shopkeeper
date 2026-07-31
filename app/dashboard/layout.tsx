'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  Plus, 
  Menu, 
  X,
  LogOut,
  User,
  Sparkles,
  Activity
} from 'lucide-react';

const navItems = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Store Builder', href: '/dashboard/builder', icon: Sparkles },
  { name: 'Products', href: '/dashboard/products', icon: Package },
  { name: 'Orders', href: '/dashboard/orders', icon: ShoppingCart },
  { name: 'Customers', href: '/dashboard/customers', icon: Users },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
  { name: 'System Status', href: '/dashboard/status', icon: Activity },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-[#0d0d24] border-r border-white/10
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        flex flex-col
      `}>
        <div className="p-6 flex items-center justify-between">
          <Link href="/dashboard" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            ShopKeeper
          </Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={24} className="text-gray-400 hover:text-white" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200
                  ${isActive 
                    ? 'bg-white/5 border-l-4 border-purple-500 text-white' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                  }
                `}
              >
                <Icon size={20} className={isActive ? 'text-purple-400' : ''} />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-white/10 relative">
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center font-bold">
              JD
            </div>
            <div className="text-left flex-1">
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">Admin</p>
            </div>
          </button>

          {profileOpen && (
            <div className="absolute bottom-full left-4 right-4 mb-2 bg-[#1a1a3a] border border-white/10 rounded-xl shadow-xl overflow-hidden backdrop-blur-md">
              <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/5 transition-colors text-sm">
                <User size={16} /> Profile
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-3 hover:bg-white/5 transition-colors text-sm text-red-400">
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a1a]/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} className="text-gray-400 hover:text-white" />
            </button>
            
            <div className="relative hidden md:block">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm focus:outline-none focus:border-purple-500 transition-colors w-64 text-white placeholder-gray-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
            </button>
            <Link 
              href="/dashboard/stores/new"
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 hover:scale-105 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            >
              <Plus size={16} />
              Create New Store
            </Link>
            <Link 
              href="/dashboard/products"
              className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
              <Plus size={16} />
              New Product
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
