'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, Heart, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { createClient } from '@/lib/supabase/client';

const DEFAULT_PRODUCTS = [
  { id: '1', name: 'Cyber-Spatial Headphones Pro', price: 299.99, originalPrice: 349.99, category: 'Electronics' },
  { id: '2', name: 'Minimal Ergonomic Desk Lamp', price: 89.00, originalPrice: 110.00, category: 'Home & Living' },
  { id: '3', name: 'Mechanical Wireless Keyboard', price: 149.00, originalPrice: 179.00, category: 'Electronics' },
  { id: '4', name: 'Smart Fitness Watch', price: 249.50, category: 'Electronics' },
];

const CATEGORIES = [
  { name: 'Electronics', color: 'from-blue-500/80 to-cyan-500/80' },
  { name: 'Fashion', color: 'from-purple-500/80 to-pink-500/80' },
  { name: 'Home & Living', color: 'from-orange-500/80 to-amber-500/80' },
  { name: 'Accessories', color: 'from-emerald-500/80 to-teal-500/80' },
];

export default function StoreHome({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const addItem = useCartStore((state) => state.addItem);
  const [products, setProducts] = useState<any[]>(DEFAULT_PRODUCTS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    async function loadLiveProducts() {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          setProducts(data);
          setIsLive(true);
        }
      } catch (err) {
        console.log('Using default products', err);
      }
    }
    loadLiveProducts();
  }, []);

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: Number(product.price),
      quantity: 1,
      image: '',
      color: 'Default',
      size: 'Default'
    });
  };

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent pointer-events-none" />
        
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {isLive && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-semibold text-emerald-300 mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Connected to Live Supabase Database
            </div>
          )}

          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
            Welcome to <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent capitalize">{slug.replace('-', ' ')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 font-light">
            Discover our curated collection of 3D spatial tech, ergonomic home gear, and premium accessories.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href={`/store/${slug}/products`}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2"
            >
              Shop Collection <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-2xl font-bold text-white mb-8">Browse Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, idx) => (
            <div 
              key={idx}
              className="group relative h-32 rounded-2xl overflow-hidden p-6 flex items-end border border-white/10 hover:border-purple-500/50 transition-all cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
              <span className="relative z-10 font-semibold text-white text-lg group-hover:translate-x-1 transition-transform">{cat.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Live Products</h2>
            <p className="text-xs text-gray-400">Synced directly from Supabase PostgreSQL</p>
          </div>
          <Link href={`/store/${slug}/products`} className="text-sm text-purple-400 hover:text-purple-300">
            View all
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              href={`/store/${slug}/product/${product.id}`} 
              key={product.id}
              className="group block relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:scale-105 hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300"
            >
              <div className="aspect-square bg-gradient-to-br from-purple-900/20 to-cyan-900/20 flex items-center justify-center relative overflow-hidden">
                {product.image_url || product.name.includes('Headphones') ? (
                  <img 
                    src={product.image_url || (product.name.includes('Headphones') ? '/images/cyber_headphones.jpg' : product.name.includes('Lamp') ? '/images/desk_lamp.jpg' : product.name.includes('Keyboard') ? '/images/mechanical_keyboard.jpg' : '/images/smart_watch.jpg')} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <ShoppingBag className="w-12 h-12 text-purple-400/60 group-hover:text-purple-300 transition-colors" />
                )}
                
                {/* Floating overlay actions */}
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
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg font-bold text-white">${Number(product.price).toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">${Number(product.originalPrice).toFixed(2)}</span>
                    )}
                  </div>
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
      </section>
    </div>
  );
}
