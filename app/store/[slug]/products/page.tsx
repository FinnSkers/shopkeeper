'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, Heart, ShoppingBag, Search, Filter } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { createClient } from '@/lib/supabase/client';

const DEFAULT_PRODUCTS = [
  { id: '1', name: 'Cyber-Spatial Headphones Pro', price: 299.99, originalPrice: 349.99, category: 'Electronics', image_url: '/images/cyber_headphones.jpg' },
  { id: '2', name: 'Minimal Ergonomic Desk Lamp', price: 89.00, originalPrice: 110.00, category: 'Home & Living', image_url: '/images/desk_lamp.jpg' },
  { id: '3', name: 'Mechanical Wireless Keyboard', price: 149.00, originalPrice: 179.00, category: 'Electronics', image_url: '/images/mechanical_keyboard.jpg' },
  { id: '4', name: 'Smart Fitness Watch', price: 249.50, category: 'Electronics', image_url: '/images/smart_watch.jpg' },
  { id: '5', name: 'Leather Messenger Bag', price: 180.00, category: 'Accessories' },
  { id: '6', name: 'Ceramic Coffee Mug Set', price: 34.00, category: 'Home & Living' },
];

export default function StoreProductsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const addItem = useCartStore((state) => state.addItem);
  const [products, setProducts] = useState<any[]>(DEFAULT_PRODUCTS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase.from('products').select('*');
        if (!error && data && data.length > 0) {
          setProducts(data);
        }
      } catch (err) {
        console.log('Using default products');
      }
    }
    loadProducts();
  }, []);

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Accessories'];

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      image: product.image_url || '',
      color: 'Default',
      size: 'Default'
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-black text-white capitalize">{slug.replace('-', ' ')} Catalog</h1>
        <p className="text-gray-400 text-sm mt-1">Browse all available 3D spatial items and accessories</p>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-4 rounded-2xl border-white/10">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search catalog..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link 
            href={`/store/${slug}/product/${product.id}`} 
            key={product.id}
            className="group block relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:scale-105 hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300"
          >
            <div className="aspect-square bg-gradient-to-br from-purple-900/20 to-cyan-900/20 flex items-center justify-center relative overflow-hidden">
              {product.image_url || product.name.includes('Headphones') ? (
                <img 
                  src={product.image_url || '/images/cyber_headphones.jpg'} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              ) : (
                <ShoppingBag className="w-12 h-12 text-purple-400/60 group-hover:text-purple-300 transition-colors" />
              )}
              
              <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button className="p-2 bg-black/60 rounded-full backdrop-blur-md hover:bg-purple-600 transition-colors">
                  <Heart className="w-4 h-4 text-white" />
                </button>
                <button className="p-2 bg-black/60 rounded-full backdrop-blur-md hover:bg-purple-600 transition-colors">
                  <Eye className="w-4 h-4 text-white" />
                </button>
              </div>

              <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded text-[10px] font-semibold bg-black/60 text-white backdrop-blur-md border border-white/10 z-10">
                {product.category}
              </span>
            </div>

            <div className="p-5 space-y-3">
              <h3 className="font-semibold text-white truncate group-hover:text-purple-300 transition-colors">{product.name}</h3>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-white">${Number(product.price).toFixed(2)}</span>
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="p-2 rounded-xl bg-purple-600/20 text-purple-300 border border-purple-500/30 hover:bg-purple-600 hover:text-white transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
