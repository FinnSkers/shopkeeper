'use client';
import { Search, Filter, MoreHorizontal, Mail, MapPin, ExternalLink } from 'lucide-react';

const mockCustomers = Array.from({ length: 10 }, (_, i) => ({
  id: `CUST-${1000 + i}`,
  name: ['Emma Watson', 'John Smith', 'Sarah Connor', 'Michael Scott', 'Jim Halpert', 'Pam Beesly', 'Dwight Schrute', 'Angela Martin', 'Stanley Hudson', 'Kevin Malone'][i],
  email: `user${i}@example.com`,
  initials: ['EW', 'JS', 'SC', 'MS', 'JH', 'PB', 'DS', 'AM', 'SH', 'KM'][i],
  color: ['from-red-500 to-orange-500', 'from-blue-500 to-cyan-500', 'from-purple-500 to-pink-500', 'from-green-500 to-emerald-500', 'from-yellow-400 to-orange-500'][i % 5],
  orders: Math.floor(Math.random() * 20) + 1,
  spent: (Math.random() * 2000 + 50).toFixed(2),
  joined: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  location: ['New York, US', 'London, UK', 'Toronto, CA', 'Sydney, AU', 'Berlin, DE'][i % 5],
}));

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-gray-400 text-sm">Manage your customer base</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Customers', value: '2,340', trend: '+12% this month' },
          { label: 'New This Month', value: '145', trend: '+5% vs last month' },
          { label: 'Returning', value: '68%', trend: '+2% vs last month' },
          { label: 'Avg. Order Value', value: '$85.00', trend: '+$5.00 vs last month' }
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors shadow-lg">
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
            <p className="text-xs text-green-400 font-medium">{stat.trend}</p>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search customers..." 
            className="w-full pl-10 pr-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-cyan-500 transition-colors text-white"
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm font-medium transition-colors text-white whitespace-nowrap">
          <Filter size={16} />
          More Filters
        </button>
      </div>

      {/* Customers Table */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-black/20 text-gray-400 text-sm border-b border-white/10">
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Location</th>
                <th className="px-6 py-4 font-medium">Total Orders</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Joined Date</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-white/5">
              {mockCustomers.map((customer, idx) => (
                <tr key={customer.id} className={`hover:bg-white/[0.08] transition-colors group ${idx % 2 === 0 ? 'bg-transparent' : 'bg-white/[0.02]'}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${customer.color} flex items-center justify-center text-white font-bold shadow-lg`}>
                        {customer.initials}
                      </div>
                      <div>
                        <p className="font-medium text-white group-hover:text-cyan-400 transition-colors cursor-pointer">{customer.name}</p>
                        <p className="text-gray-500 text-xs flex items-center gap-1 mt-0.5">
                          <Mail size={12} /> {customer.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">
                    <span className="flex items-center gap-1.5"><MapPin size={14} /> {customer.location}</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-white">{customer.orders}</td>
                  <td className="px-6 py-4 font-medium text-white">${customer.spent}</td>
                  <td className="px-6 py-4 text-gray-400">{customer.joined}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button className="text-gray-400 hover:text-cyan-400 transition-colors p-1.5 rounded-lg hover:bg-cyan-500/10">
                      <ExternalLink size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10">
                      <MoreHorizontal size={16} />
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
