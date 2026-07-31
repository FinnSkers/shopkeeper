'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Star, Minus, Plus, Heart, ShieldCheck, Truck, ArrowLeft, Sparkles, Box } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import ProductReviews from '@/components/storefront/ProductReviews';

// Dynamically import 3D Product Viewer for browser WebGL rendering
const ProductViewer = dynamic(() => import('@/components/three/ProductViewer'), { ssr: false });

const MOCK_PRODUCT = {
  id: '1',
  name: 'Cyber-Spatial Headphones Pro',
  price: 299.99,
  originalPrice: 349.99,
  category: 'Electronics',
  description: 'Next-gen spatial audio headset crafted with lightweight magnesium alloy, active noise cancelation, and real-time custom sound profiling.',
  colors: ['#7c3aed', '#06b6d4', '#ec4899', '#18181b'],
  colorNames: ['Cyber Purple', 'Electric Cyan', 'Neon Pink', 'Obsidian Black'],
  sizes: ['Standard', 'Pro Foam'],
  rating: 4.9,
  reviews: 218
};

export default function ProductDetail({ params }: { params: Promise<{ slug: string, id: string }> }) {
  const { slug, id } = use(params);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeTab, setActiveTab] = useState('3d');
  
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id: id,
      name: MOCK_PRODUCT.name,
      price: MOCK_PRODUCT.price,
      quantity,
      image: '',
      color: MOCK_PRODUCT.colorNames[selectedColor],
      size: MOCK_PRODUCT.sizes[selectedSize]
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href={`/store/${slug}`} className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Store
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Interactive 3D Canvas / Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex gap-3 mb-2">
            <button
              onClick={() => setActiveTab('3d')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-2 ${activeTab === '3d' ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.5)]' : 'glass-panel text-gray-400 hover:text-white'}`}
            >
              <Box className="w-4 h-4" /> Interactive 3D Canvas
            </button>
          </div>

          {/* 3D WebGL Model Viewer */}
          <ProductViewer color={MOCK_PRODUCT.colors[selectedColor]} />

          <div className="glass-panel p-4 rounded-2xl border-white/10 flex items-center justify-between text-xs text-gray-400">
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" /> WebGL 3D Realtime Shader Rendering
            </span>
            <span>Drag mouse to rotate 3D view</span>
          </div>
        </div>

        {/* Right Column: Product Details & Cart Controls */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              {MOCK_PRODUCT.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white mt-3 mb-3 leading-tight">{MOCK_PRODUCT.name}</h1>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="ml-2 text-sm font-semibold text-white">{MOCK_PRODUCT.rating}</span>
              </div>
              <span className="text-gray-500">•</span>
              <span className="text-sm text-gray-400">{MOCK_PRODUCT.reviews} Verified Reviews</span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-4 border-y border-white/10 py-6">
            <span className="text-4xl font-black text-white">${MOCK_PRODUCT.price}</span>
            {MOCK_PRODUCT.originalPrice && (
              <span className="text-lg text-gray-500 line-through">${MOCK_PRODUCT.originalPrice}</span>
            )}
            <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Save ${(MOCK_PRODUCT.originalPrice - MOCK_PRODUCT.price).toFixed(2)}
            </span>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed font-light">{MOCK_PRODUCT.description}</p>

          {/* Color Selection */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">
              Select Color Finish: <span className="text-white">{MOCK_PRODUCT.colorNames[selectedColor]}</span>
            </label>
            <div className="flex gap-4">
              {MOCK_PRODUCT.colors.map((color, i) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(i)}
                  className={`w-10 h-10 rounded-full transition-all border-2 flex items-center justify-center ${selectedColor === i ? 'scale-110 border-white shadow-[0_0_15px_rgba(255,255,255,0.4)]' : 'border-transparent hover:scale-105'}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-3">Variant</label>
            <div className="flex gap-3">
              {MOCK_PRODUCT.sizes.map((size, i) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(i)}
                  className={`px-5 py-2.5 text-sm font-semibold rounded-xl border transition-all ${selectedSize === i ? 'bg-purple-600 text-white border-purple-500 shadow-[0_0_15px_rgba(124,58,237,0.4)]' : 'glass-panel border-white/10 text-gray-300 hover:bg-white/10'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center rounded-xl bg-white/5 border border-white/10">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-white/10 text-gray-300 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-white">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-white/10 text-gray-300 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold text-sm shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.7)] hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
              >
                Add to Cart • ${(MOCK_PRODUCT.price * quantity).toFixed(2)}
              </button>

              <button className="p-4 rounded-xl glass-panel border-white/10 text-gray-300 hover:text-pink-400 hover:border-pink-500/40 transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Badges */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                <Truck className="w-5 h-5 text-cyan-400" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>2 Year Full Warranty</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Customer Reviews Section */}
      <ProductReviews productName={MOCK_PRODUCT.name} />
    </div>
  );
}
