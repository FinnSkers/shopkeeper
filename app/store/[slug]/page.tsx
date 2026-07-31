'use client';

import { use } from 'react';
import Link from 'next/link';
import { Eye, Heart, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

const MOCK_PRODUCTS = [
  { id: '1', name: 'Wireless Earbuds Pro', price: 149.99, originalPrice: 199.99, category: 'Electronics' },
  { id: '2', name: 'Minimal Desk Lamp', price: 89.00, category: 'Home & Living' },
  { id: '3', name: 'Leather Accent Chair', price: 399.00, originalPrice: 450.00, category: 'Home & Living' },
  { id: '4', name: 'Smart Fitness Watch', price: 249.50, category: 'Electronics' },
  { id: '5', name: 'Ceramic Coffee Mug Set', price: 34.00, category: 'Home & Living' },
  { id: '6', name: 'Premium Noise-Canceling Headphones', price: 299.99, originalPrice: 349.99, category: 'Electronics' },
  { id: '7', name: 'Organic Cotton T-Shirt', price: 28.00, category: 'Fashion' },
  { id: '8', name: 'Mechanical Keyboard', price: 129.00, category: 'Electronics' },
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

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
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
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              Elevate Your Lifestyle
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Discover premium products curated just for you. Minimalist design, maximalist quality.
          </p>
          <div className="flex justify-center gap-4">
            <Link 
              href={`/store/${slug}/products`}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:scale-105 transition-transform shadow-[0_0_20px_rgba(168,85,247,0.4)] flex items-center gap-2"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <h2 className="text-2xl font-bold mb-8 text-white">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <div key={cat.name} className="relative h-40 rounded-2xl overflow-hidden group cursor-pointer">
              <div className="absolute inset-0 bg-gray-800" />
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-80 group-hover:opacity-100 transition-opacity`} />
              <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
                <span className="text-xl font-bold text-white shadow-sm">{cat.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-2xl font-bold text-white">Featured Products</h2>
          <Link href={`/store/${slug}/products`} className="text-sm text-purple-400 hover:text-purple-300">
            View all
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {MOCK_PRODUCTS.map((product) => (
            <Link 
              href={`/store/${slug}/product/${product.id}`} 
              key={product.id}
              className="group block relative rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:scale-105 hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300"
            >
              {/* Product Image Area */}
              <div className="aspect-square relative bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center p-6">
                <ShoppingBag className="w-16 h-16 text-gray-700 group-hover:text-purple-500/50 transition-colors" />
                
                {product.originalPrice && (
                  <span className="absolute top-3 left-3 bg-red-500/80 text-white text-[10px] font-bold px-2 py-1 rounded">
                    SALE
                  </span>
                )}
                
                {/* Hover Actions */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                  <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-purple-500/50 text-white transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-white/10 backdrop-blur-md rounded-full hover:bg-cyan-500/50 text-white transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Product Details */}
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-1">{product.category}</p>
                <h3 className="text-sm font-medium text-gray-200 truncate mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-md font-bold text-white">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                </div>
                <button 
                  onClick={(e) => handleAddToCart(e, product)}
                  className="w-full mt-4 py-2 rounded-lg bg-white/10 hover:bg-purple-600/80 text-sm font-medium transition-colors backdrop-blur-sm"
                >
                  Add to Cart
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-10 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 text-white">Join our newsletter</h2>
            <p className="text-gray-400 mb-6">Get 10% off your first order and stay updated on new arrivals.</p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 rounded-lg bg-black/30 border border-white/10 focus:outline-none focus:border-purple-500 flex-1 text-white placeholder:text-gray-600"
              />
              <button 
                type="button"
                className="px-6 py-3 rounded-lg bg-white text-black font-semibold hover:bg-gray-200 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
