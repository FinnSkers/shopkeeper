'use client';
import { useState } from 'react';
import { Search, Plus, Filter, MoreHorizontal, Image as ImageIcon, X, Sparkles, Loader2 } from 'lucide-react';

const mockProducts = [
  { id: 1, name: 'Minimalist Desk Lamp', price: '$89.00', stock: 45, status: 'Active', category: 'Lighting' },
  { id: 2, name: 'Ergonomic Office Chair', price: '$299.00', stock: 12, status: 'Active', category: 'Furniture' },
  { id: 3, name: 'Mechanical Keyboard Pro', price: '$159.00', stock: 0, status: 'Out of Stock', category: 'Electronics' },
  { id: 4, name: 'Wireless Noise-Canceling Headphones', price: '$249.00', stock: 87, status: 'Active', category: 'Electronics' },
  { id: 5, name: 'Smart Plant Monitor', price: '$35.00', stock: 120, status: 'Active', category: 'Smart Home' },
  { id: 6, name: 'Coffee Maker V2', price: '$120.00', stock: 8, status: 'Draft', category: 'Appliances' },
  { id: 7, name: 'Ceramic Mug Set', price: '$45.00', stock: 50, status: 'Active', category: 'Kitchen' },
  { id: 8, name: 'Leather Messenger Bag', price: '$180.00', stock: 24, status: 'Active', category: 'Accessories' },
  { id: 9, name: 'Fitness Smartwatch', price: '$199.00', stock: 0, status: 'Out of Stock', category: 'Electronics' },
  { id: 10, name: 'Yoga Mat Premium', price: '$65.00', stock: 15, status: 'Active', category: 'Fitness' },
  { id: 11, name: 'Portable SSD 1TB', price: '$130.00', stock: 60, status: 'Draft', category: 'Electronics' },
  { id: 12, name: 'Desk Organizer', price: '$25.00', stock: 200, status: 'Active', category: 'Office' },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State with AI
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: 'electronics'
  });
  const [isAiLoading, setIsAiLoading] = useState(false);

  const tabs = ['All', 'Active', 'Draft', 'Out of Stock'];

  const handleAiAutoFill = async () => {
    if (!formData.name) {
      alert('Please enter a Product Name first (e.g. "Wireless Gaming Mouse")');
      return;
    }

    setIsAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.name, category: formData.category })
      });
      const data = await res.json();
      if (res.ok) {
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price.toString(),
          stock: data.stock.toString(),
          category: data.category.toLowerCase()
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredProducts = mockProducts.filter(p => {
    if (activeTab === 'All') return true;
    return p.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-gray-400 text-sm">Manage your store's inventory & 3D models</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm focus:outline-none focus:border-purple-500 transition-colors w-full md:w-64 text-white"
            />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-purple-500/25 shrink-0"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-white/10">
        <div className="flex space-x-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 text-sm font-medium border-b-2 transition-colors relative ${
                activeTab === tab 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors pb-3">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-purple-500/50 transition-all group flex flex-col justify-between">
            <div>
              <div className="aspect-square bg-gradient-to-br from-purple-900/40 to-cyan-900/40 rounded-lg mb-4 flex items-center justify-center border border-white/5 group-hover:scale-105 transition-transform relative overflow-hidden">
                <ImageIcon className="text-gray-500 group-hover:text-purple-400 transition-colors" size={32} />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-white/10 text-white backdrop-blur-md">
                  {product.category}
                </span>
              </div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors">{product.name}</h3>
                <button className="text-gray-400 hover:text-white">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 block">Price</span>
                <span className="text-lg font-bold text-white">{product.price}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 block">Stock</span>
                <span className={`text-sm font-medium ${product.stock === 0 ? 'text-red-400' : 'text-gray-200'}`}>
                  {product.stock > 0 ? `${product.stock} units` : 'Out of Stock'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal with AI Auto-Fill */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#0d0d24] border border-white/10 rounded-2xl w-full max-w-xl max-h-[90vh] flex flex-col shadow-2xl">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-purple-400" /> Add New Product
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-gray-300">Product Name</label>
                    <button
                      type="button"
                      onClick={handleAiAutoFill}
                      disabled={isAiLoading}
                      className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold flex items-center gap-1.5 hover:scale-105 transition-all shadow-md disabled:opacity-50"
                    >
                      {isAiLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-cyan-300" />}
                      {isAiLoading ? 'Generating...' : '✨ AI Auto-Fill'}
                    </button>
                  </div>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors" 
                    placeholder="e.g. Cyber Spatial Headset" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Description (AI Generated)</label>
                  <textarea 
                    rows={4} 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none" 
                    placeholder="Click 'AI Auto-Fill' or write product description..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <input 
                        type="number" 
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg pl-8 pr-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors" 
                        placeholder="0.00" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">Stock</label>
                    <input 
                      type="number" 
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors" 
                      placeholder="0" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Category</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none"
                  >
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="home">Home & Garden</option>
                    <option value="accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Product Image / 3D Model (.GLTF)</label>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-purple-500/50 hover:bg-white/5 transition-colors cursor-pointer group">
                    <ImageIcon size={28} className="mx-auto text-gray-500 mb-2 group-hover:text-purple-400 transition-colors" />
                    <p className="text-xs text-gray-300 font-medium">Click to upload 2D Image or 3D Model</p>
                    <p className="text-[10px] text-gray-500 mt-1">PNG, JPG, GLTF, GLB (max 10MB)</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 flex items-center justify-end gap-3 bg-white/5">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-lg border border-white/10 bg-transparent hover:bg-white/5 text-white font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-5 py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-medium transition-all shadow-lg shadow-purple-500/25"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
