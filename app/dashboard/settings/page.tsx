'use client';
import { useState } from 'react';
import { Store, CreditCard, Bell, Users, Upload, Shield, Check } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('store');

  const tabs = [
    { id: 'store', label: 'Store Details', icon: Store },
    { id: 'payment', label: 'Payments', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'team', label: 'Team', icon: Users },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400 text-sm">Manage your store preferences and integrations</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-64 space-y-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium ${
                  isActive 
                    ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 text-white border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-cyan-400' : ''} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 lg:p-8 min-h-[500px]">
          
          {/* Store Tab */}
          {activeTab === 'store' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-4">General Information</h2>
              
              <div className="space-y-5">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 rounded-xl bg-black/40 border-2 border-dashed border-white/20 flex flex-col items-center justify-center hover:border-cyan-500/50 hover:bg-white/5 transition-colors cursor-pointer group">
                    <Upload size={20} className="text-gray-500 group-hover:text-cyan-400 mb-1" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">Logo</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-white mb-1">Store Logo</h3>
                    <p className="text-xs text-gray-400 mb-3">Recommended size: 512x512px. Max 2MB.</p>
                    <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors">Upload Image</button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Store Name</label>
                  <input type="text" defaultValue="Tech Haven" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Store URL (Slug)</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-white/10 bg-black/40 text-gray-500 text-sm">
                      shopkeeper.com/
                    </span>
                    <input type="text" defaultValue="tech-haven" className="flex-1 min-w-0 bg-black/20 border border-white/10 rounded-r-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                  <textarea rows={4} defaultValue="Premium electronics and workspace accessories." className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none"></textarea>
                </div>
              </div>
            </div>
          )}

          {/* Payment Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-4">Payment Providers</h2>
              
              <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="flex items-start justify-between relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">S</div>
                    <div>
                      <h3 className="text-white font-medium">Stripe</h3>
                      <p className="text-gray-400 text-sm">Accept credit cards and Apple Pay</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-400 text-sm font-medium bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                    <Check size={14} /> Connected
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-indigo-500/20 flex gap-3">
                  <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-indigo-600/25">Manage Account</button>
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg transition-colors border border-white/10">Test Mode Settings</button>
                </div>
              </div>

              <div className="bg-black/20 border border-white/10 rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#00457C] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">P</div>
                    <div>
                      <h3 className="text-white font-medium">PayPal</h3>
                      <p className="text-gray-400 text-sm">Accept PayPal and Venmo</p>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors border border-white/5">Connect</button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-semibold text-white border-b border-white/10 pb-4">Email Notifications</h2>
              
              <div className="space-y-4">
                {[
                  { title: 'New Orders', desc: 'Receive an email when a customer places a new order', active: true },
                  { title: 'Low Stock Alerts', desc: 'Get notified when a product inventory drops below 5', active: true },
                  { title: 'New Customer', desc: 'Alert when a new user registers an account', active: false },
                  { title: 'Daily Report', desc: 'Summary of daily sales and activity', active: false },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl">
                    <div>
                      <h4 className="text-white text-sm font-medium">{item.title}</h4>
                      <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                    </div>
                    <button className={`w-11 h-6 rounded-full relative transition-colors ${item.active ? 'bg-cyan-500' : 'bg-gray-600'}`}>
                      <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${item.active ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h2 className="text-lg font-semibold text-white">Team Members</h2>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-purple-500/25">Invite Member</button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold">JD</div>
                    <div>
                      <h4 className="text-white text-sm font-medium">John Doe (You)</h4>
                      <p className="text-gray-400 text-xs">john@example.com</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 border border-purple-500/30 rounded-full text-xs font-medium flex items-center gap-1">
                    <Shield size={12} /> Owner
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-black/20 border border-white/5 rounded-xl hover:border-white/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center text-white font-bold">AS</div>
                    <div>
                      <h4 className="text-white text-sm font-medium">Alice Smith</h4>
                      <p className="text-gray-400 text-xs">alice@example.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white/10 text-gray-300 border border-white/10 rounded-full text-xs font-medium">Manager</span>
                    <button className="text-gray-500 hover:text-white transition-colors">Edit</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-end">
            <button className="px-6 py-2.5 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors shadow-lg shadow-white/10">
              Save Changes
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
