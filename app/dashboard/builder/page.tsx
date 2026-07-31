'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { 
  Sparkles, 
  Save, 
  RotateCcw, 
  Monitor, 
  Smartphone, 
  Eye, 
  Palette, 
  Type, 
  Box, 
  Layout, 
  Check, 
  ArrowLeft,
  Sliders,
  Globe
} from 'lucide-react';

// Dynamically import 3D preview component
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });

export default function StoreBuilder() {
  const [viewport, setViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [isSaved, setIsSaved] = useState(false);

  // Theme Builder State
  const [storeName, setStoreName] = useState('Cyber Tech Store');
  const [headline, setHeadline] = useState('Experience Next-Gen Spatial Tech');
  const [subtitle, setSubtitle] = useState('Immersive 3D audio, spatial peripherals, and high-performance gaming gear.');
  const [primaryColor, setPrimaryColor] = useState('#7c3aed');
  const [accentColor, setAccentColor] = useState('#06b6d4');
  const [bgColor, setBgColor] = useState('#030309');
  const [shape3d, setShape3d] = useState('sphere');
  const [glassBlur, setGlassBlur] = useState('24px');

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleReset = () => {
    setStoreName('Cyber Tech Store');
    setHeadline('Experience Next-Gen Spatial Tech');
    setSubtitle('Immersive 3D audio, spatial peripherals, and high-performance gaming gear.');
    setPrimaryColor('#7c3aed');
    setAccentColor('#06b6d4');
    setBgColor('#030309');
    setShape3d('sphere');
  };

  return (
    <div className="h-[calc(100vh-65px)] flex flex-col bg-[#030309] text-gray-100 overflow-hidden">
      {/* Top Builder Bar */}
      <div className="h-16 border-b border-white/10 glass-panel px-6 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-400" /> Visual Storefront Builder
            </h1>
            <p className="text-xs text-gray-400">Live 3D spatial theme customizer</p>
          </div>
        </div>

        {/* Viewport Toggles */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${viewport === 'desktop' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            <Monitor className="w-4 h-4" /> Desktop
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${viewport === 'mobile' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
          >
            <Smartphone className="w-4 h-4" /> Mobile
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button 
            onClick={handleReset}
            className="px-4 py-2 text-xs font-semibold rounded-xl glass-panel border-white/10 hover:bg-white/10 text-gray-300 transition-all flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button 
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105 transition-all flex items-center gap-2"
          >
            {isSaved ? <Check className="w-4 h-4 text-emerald-300" /> : <Save className="w-4 h-4" />}
            {isSaved ? 'Saved to Supabase!' : 'Publish Theme'}
          </button>
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Customizer Control Panel */}
        <div className="w-80 border-r border-white/10 glass-panel p-6 space-y-6 overflow-y-auto shrink-0">
          
          {/* Section: Store Identity */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-2">
              <Globe className="w-4 h-4" /> Store Identity
            </h2>
            
            <div>
              <label className="text-xs text-gray-400 block mb-1.5 font-medium">Store Name</label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-1.5 font-medium">Hero Headline</label>
              <textarea
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 text-sm rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
          </div>

          {/* Section: 3D Scene Config */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-2">
              <Box className="w-4 h-4" /> 3D Hero Mesh Config
            </h2>

            <div>
              <label className="text-xs text-gray-400 block mb-2 font-medium">Primary Accent Color</label>
              <div className="flex gap-3">
                {['#7c3aed', '#06b6d4', '#ec4899', '#10b981', '#f59e0b'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setPrimaryColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${primaryColor === c ? 'scale-110 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs text-gray-400 block mb-2 font-medium">Secondary Glow Color</label>
              <div className="flex gap-3">
                {['#06b6d4', '#ec4899', '#38bdf8', '#a855f7'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setAccentColor(c)}
                    className={`w-8 h-8 rounded-full border-2 transition-transform ${accentColor === c ? 'scale-110 border-white shadow-[0_0_10px_rgba(255,255,255,0.5)]' : 'border-transparent'}`}
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Section: Glassmorphism */}
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h2 className="text-xs font-bold uppercase tracking-wider text-pink-400 flex items-center gap-2">
              <Sliders className="w-4 h-4" /> Glassmorphism Depth
            </h2>

            <div>
              <label className="text-xs text-gray-400 block mb-1.5 font-medium">Backdrop Blur Strength</label>
              <select
                value={glassBlur}
                onChange={(e) => setGlassBlur(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-500"
              >
                <option value="12px" className="bg-[#0a0a1a]">Light Blur (12px)</option>
                <option value="24px" className="bg-[#0a0a1a]">Medium Cyber Blur (24px)</option>
                <option value="40px" className="bg-[#0a0a1a]">Deep Spatial Blur (40px)</option>
              </select>
            </div>
          </div>

        </div>

        {/* Right Live Storefront Preview Canvas */}
        <div className="flex-1 bg-[#020206] p-8 flex items-center justify-center overflow-auto relative">
          
          <div className={`transition-all duration-500 rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_60px_rgba(0,0,0,0.8)] bg-[#030309] flex flex-col ${viewport === 'desktop' ? 'w-full max-w-5xl h-full' : 'w-[385px] h-[780px]'}`}>
            
            {/* Mock Storefront Header */}
            <div className="h-14 border-b border-white/10 px-6 flex items-center justify-between backdrop-blur-xl bg-white/5 shrink-0">
              <span className="font-bold text-lg text-white" style={{ color: primaryColor }}>{storeName}</span>
              <div className="flex gap-4 text-xs font-semibold text-gray-300">
                <span>Home</span>
                <span>Products</span>
                <span>Cart (0)</span>
              </div>
            </div>

            {/* Mock Storefront Hero Section */}
            <div className="flex-1 p-8 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full border text-cyan-400 border-cyan-500/30 bg-cyan-500/10">
                  Featured Collection
                </span>
                <h2 className="text-3xl font-black text-white leading-tight">{headline}</h2>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{subtitle}</p>
                <button 
                  className="px-6 py-3 rounded-full text-white font-bold text-xs shadow-lg transition-transform hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                >
                  Shop Collection
                </button>
              </div>

              {/* Live 3D Scene Canvas inside Preview */}
              <div className="h-64 rounded-2xl overflow-hidden glass-panel border-white/10 relative">
                <HeroScene />
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
