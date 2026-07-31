'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Store, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Palette, 
  Check, 
  Loader2,
  ArrowLeft,
  Box
} from 'lucide-react';

export default function CreateNewStorePage() {
  const router = useRouter();
  const [storeName, setStoreName] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#7c3aed');
  const [secondaryColor, setSecondaryColor] = useState('#06b6d4');
  const [isLoading, setIsLoading] = useState(false);

  const handleNameChange = (name: string) => {
    setStoreName(name);
    const autoSlug = name.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
    setSlug(autoSlug);
  };

  const handleCreateStore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !slug) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/stores/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: storeName,
          slug,
          description,
          primaryColor,
          secondaryColor
        })
      });

      const data = await res.json();
      if (data.url) {
        router.push(data.url);
      } else {
        router.push(`/store/${slug}`);
      }
    } catch (err) {
      console.error(err);
      router.push(`/store/${slug}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 py-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            Create New 3D Spatial Store <Sparkles className="w-5 h-5 text-purple-400" />
          </h1>
          <p className="text-gray-400 text-sm">Launch a custom 3D shopping website in less than 60 seconds</p>
        </div>
      </div>

      {/* Main Wizard Form */}
      <form onSubmit={handleCreateStore} className="glass-panel p-8 rounded-3xl border-purple-500/30 space-y-6 shadow-2xl">
        
        {/* Store Name Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Store Name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="e.g. Cyber Kicks or Spatial Sound"
            className="w-full bg-[#030309] border border-white/10 rounded-xl px-4 py-3 text-white text-base focus:outline-none focus:border-purple-500 transition-colors"
            required
          />
        </div>

        {/* Generated Store URL Slug */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Generated Store Website URL</label>
          <div className="flex items-center rounded-xl bg-[#030309] border border-white/10 overflow-hidden text-sm">
            <span className="px-4 text-gray-500 font-mono text-xs border-r border-white/10 py-3">
              shopkeeper.app/store/
            </span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
              placeholder="my-store-name"
              className="flex-1 bg-transparent px-3 py-3 text-cyan-300 font-mono focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-2">Store Description</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what your store sells (e.g. Custom 3D mechanical keyboards and spatial audio gear)..."
            className="w-full bg-[#030309] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500 resize-none"
          />
        </div>

        {/* Color Palette Selector */}
        <div>
          <label className="block text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4 text-purple-400" /> Select Store Theme Accent
          </label>
          <div className="flex gap-4">
            {[
              { name: 'Cyber Purple', color: '#7c3aed' },
              { name: 'Electric Cyan', color: '#06b6d4' },
              { name: 'Neon Pink', color: '#ec4899' },
              { name: 'Emerald Green', color: '#10b981' },
            ].map((item) => (
              <button
                type="button"
                key={item.color}
                onClick={() => setPrimaryColor(item.color)}
                className={`w-10 h-10 rounded-full transition-all border-2 flex items-center justify-center ${
                  primaryColor === item.color ? 'scale-110 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'border-transparent hover:scale-105'
                }`}
                style={{ backgroundColor: item.color }}
              />
            ))}
          </div>
        </div>

        {/* Submit Action */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between">
          <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={isLoading || !storeName}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-extrabold text-sm shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-105 transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Generating 3D Website...</span>
              </>
            ) : (
              <>
                <span>🚀 Launch Storefront Website</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
