'use client';
import React, { useState, Fragment } from 'react';
import { 
  Search, 
  Filter, 
  Download,
  ChevronDown,
  ChevronUp,
  Package,
  Calendar,
  MoreHorizontal
} from 'lucide-react';

const mockOrders = Array.from({ length: 15 }, (_, i) => ({
  id: `#ORD-${1000 + i}`,
  customer: {
    name: ['Emma Watson', 'John Smith', 'Sarah Connor', 'Michael Scott', 'Jim Halpert'][i % 5],
    email: `customer${i}@example.com`
  },
  items: [
    { name: 'Mechanical Keyboard Pro', price: 159.00, qty: 1 },
    { name: 'Wireless Mouse', price: 49.00, qty: 2 }
  ].slice(0, (i % 2) + 1),
  total: [159.00, 257.00, 89.99, 450.00, 12.50][i % 5],
  status: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'][i % 5],
  date: new Date(Date.now() - i * 3600000 * 5).toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
  }),
}));

const getStatusStyle = (status: string) => {
  switch(status) {
    case 'Delivered': return 'bg-green-500/20 text-green-400 border-green-500/30';
    case 'Processing': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    case 'Shipped': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    case 'Pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
    case 'Cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
  }
};

export default function OrdersPage() {
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Header & Live Indicator */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Live</span>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors text-white">
            <Calendar size={16} />
            <span className="hidden sm:inline">Last 30 Days</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors text-white">
            <Download size={16} />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Orders", value: '24', color: 'text-purple-400' },
          { label: 'Pending', value: '12', color: 'text-yellow-400' },
          { label: 'Processing', value: '8', color: 'text-blue-400' },
          { label: 'Completed', value: '145', color: 'text-green-400' }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-colors">
            <h3 className="text-gray-400 text-sm font-medium mb-2">{stat.label}</h3>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by order ID, email, or name..." 
            className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors text-white"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          {['All', 'Pending', 'Processing', 'Shipped', 'Delivered'].map(status => (
            <button key={status} className="px-4 py-1.5 rounded-full border border-white/10 bg-black/20 text-sm font-medium text-gray-300 hover:text-white hover:border-white/30 whitespace-nowrap transition-colors">
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-xl shadow-black/20">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-gray-400 text-sm">
                <th className="px-6 py-4 font-medium w-10"></th>
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Items</th>
                <th className="px-6 py-4 font-medium">Total</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {mockOrders.map((order, idx) => (
                <Fragment key={order.id}>
                  <tr className={`hover:bg-white/[0.08] transition-colors cursor-pointer ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`} onClick={() => toggleRow(order.id)}>
                    <td className="px-6 py-4">
                      {expandedRows[order.id] ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                    </td>
                    <td className="px-6 py-4 font-medium text-white">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-200 font-medium">{order.customer.name}</span>
                        <span className="text-gray-500 text-xs">{order.customer.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-400">{order.date}</td>
                    <td className="px-6 py-4 text-gray-300">{order.items.length} items</td>
                    <td className="px-6 py-4 font-medium text-white">${order.total.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10" onClick={(e) => e.stopPropagation()}>
                        <MoreHorizontal size={18} />
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Content */}
                  {expandedRows[order.id] && (
                    <tr className="bg-black/30 border-b border-white/5">
                      <td colSpan={8} className="p-0">
                        <div className="px-16 py-6 space-y-4 animate-in slide-in-from-top-2 fade-in duration-200">
                          <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                            <Package size={16} className="text-purple-400" /> Order Items
                          </h4>
                          <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                            <table className="w-full text-left text-sm">
                              <thead className="bg-white/5 text-gray-400 text-xs">
                                <tr>
                                  <th className="px-4 py-2 font-medium">Product</th>
                                  <th className="px-4 py-2 font-medium">Qty</th>
                                  <th className="px-4 py-2 font-medium">Price</th>
                                  <th className="px-4 py-2 font-medium">Total</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                {order.items.map((item, i) => (
                                  <tr key={i} className="hover:bg-white/5 transition-colors">
                                    <td className="px-4 py-3 text-gray-300">{item.name}</td>
                                    <td className="px-4 py-3 text-gray-400">{item.qty}</td>
                                    <td className="px-4 py-3 text-gray-400">${item.price.toFixed(2)}</td>
                                    <td className="px-4 py-3 text-white font-medium">${(item.qty * item.price).toFixed(2)}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="flex justify-end gap-3 mt-4">
                            <button className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 transition-colors">
                              Print Invoice
                            </button>
                            <button className="px-4 py-2 rounded-lg bg-purple-600/20 border border-purple-500/30 text-purple-400 text-sm font-medium hover:bg-purple-600/30 transition-colors">
                              Update Status
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">Showing <span className="text-white font-medium">15</span> of <span className="text-white font-medium">1,245</span> orders</p>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-sm disabled:opacity-50" disabled>Prev</button>
          <button className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-sm">Next</button>
        </div>
      </div>
    </div>
  );
}
