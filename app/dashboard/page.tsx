'use client';
import { 
  DollarSign, 
  ShoppingBag, 
  Users, 
  Activity,
  TrendingUp,
  TrendingDown,
  MoreVertical,
  Package
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 4500 },
  { name: 'Fri', revenue: 6000 },
  { name: 'Sat', revenue: 8000 },
  { name: 'Sun', revenue: 7500 },
];

const recentOrders = [
  { id: '#ORD-092', customer: 'Alice Smith', product: 'Wireless Earbuds', amount: '$129.00', status: 'Delivered', date: 'Just now' },
  { id: '#ORD-091', customer: 'Bob Johnson', product: 'Mechanical Keyboard', amount: '$159.00', status: 'Processing', date: '2 hrs ago' },
  { id: '#ORD-090', customer: 'Charlie Brown', product: 'Gaming Mouse', amount: '$89.00', status: 'Shipped', date: '5 hrs ago' },
  { id: '#ORD-089', customer: 'Diana Prince', product: '4K Monitor', amount: '$399.00', status: 'Pending', date: '1 day ago' },
  { id: '#ORD-088', customer: 'Evan Wright', product: 'USB-C Hub', amount: '$45.00', status: 'Delivered', date: '1 day ago' },
  { id: '#ORD-087', customer: 'Fiona Gallagher', product: 'Laptop Stand', amount: '$35.00', status: 'Shipped', date: '2 days ago' },
  { id: '#ORD-086', customer: 'George Miller', product: 'Webcam 1080p', amount: '$79.00', status: 'Delivered', date: '2 days ago' },
  { id: '#ORD-085', customer: 'Hannah Abbott', product: 'Desk Mat', amount: '$25.00', status: 'Delivered', date: '3 days ago' },
];

const topProducts = [
  { id: 1, name: 'Mechanical Keyboard X1', sales: 124, revenue: '$19,716' },
  { id: 2, name: 'Wireless Noise-Cancelling Pro', sales: 98, revenue: '$24,402' },
  { id: 3, name: 'Ergonomic Mouse V2', sales: 85, revenue: '$7,565' },
  { id: 4, name: 'Ultra-Wide Monitor 34"', sales: 42, revenue: '$25,158' },
  { id: 5, name: 'Premium Desk Mat', sales: 210, revenue: '$6,300' },
];

const getStatusColor = (status: string) => {
  switch(status) {
    case 'Delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'Shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export default function OverviewPage() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 text-sm">{today}</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors shadow-lg shadow-black/20 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <DollarSign size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-400 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
              <TrendingUp size={14} /> +12.5%
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Total Revenue</h3>
          <p className="text-3xl font-bold text-white">$12,345</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors shadow-lg shadow-black/20 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <ShoppingBag size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-400 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
              <TrendingUp size={14} /> +8.2%
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Total Orders</h3>
          <p className="text-3xl font-bold text-white">156</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors shadow-lg shadow-black/20 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
              <Users size={24} />
            </div>
            <div className="flex items-center gap-1 text-green-400 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
              <TrendingUp size={14} /> +15.3%
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Active Customers</h3>
          <p className="text-3xl font-bold text-white">2,340</p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors shadow-lg shadow-black/20 group">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
              <Activity size={24} />
            </div>
            <div className="flex items-center gap-1 text-red-400 text-sm font-medium bg-red-500/10 px-2 py-1 rounded-full border border-red-500/20">
              <TrendingDown size={14} /> -0.5%
            </div>
          </div>
          <h3 className="text-gray-400 text-sm font-medium mb-1">Conversion Rate</h3>
          <p className="text-3xl font-bold text-white">3.2%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Revenue Overview</h2>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-gray-300 focus:outline-none focus:border-purple-500">
              <option className="bg-[#1a1a3a]">Last 7 days</option>
              <option className="bg-[#1a1a3a]">Last 30 days</option>
              <option className="bg-[#1a1a3a]">This Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `$${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(17, 24, 39, 0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
                  itemStyle={{ color: '#a855f7' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Top Products</h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All</button>
          </div>
          <div className="space-y-4 flex-1">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-white/5 group-hover:border-purple-500/30 transition-colors">
                  <Package size={20} className="text-gray-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-white truncate">{product.name}</h4>
                  <p className="text-xs text-gray-400">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">{product.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Recent Orders</h2>
          <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">View All Orders</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 text-gray-400 text-sm">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {recentOrders.map((order, idx) => (
                <tr key={order.id} className={`hover:bg-white/5 transition-colors ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}>
                  <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                  <td className="px-6 py-4 text-gray-300">{order.customer}</td>
                  <td className="px-6 py-4 text-gray-300">{order.product}</td>
                  <td className="px-6 py-4 text-gray-400">{order.date}</td>
                  <td className="px-6 py-4 font-medium text-white">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-white/10">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
