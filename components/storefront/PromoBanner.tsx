'use client';

import { useState, useEffect } from 'react';
import { Tag, Sparkles, Copy, Check, Clock } from 'lucide-react';

export default function PromoBanner() {
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 59 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        }
        return { minutes: 15, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('CYBER20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="bg-gradient-to-r from-purple-900/80 via-pink-900/80 to-cyan-900/80 border-b border-white/10 text-white text-xs font-semibold py-2.5 px-4 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        {/* Promo text & countdown */}
        <div className="flex items-center gap-3">
          <span className="px-2.5 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 font-extrabold uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-300" /> Limited Spatial Offer
          </span>
          <span>Get 20% OFF all 3D products & spatial accessories!</span>
        </div>

        {/* Timer & Promo Code Button */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-cyan-300 font-mono">
            <Clock className="w-3.5 h-3.5" />
            <span>
              {String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
            </span>
          </div>

          <button
            onClick={handleCopyCode}
            className="px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold flex items-center gap-1.5 transition-all"
          >
            <Tag className="w-3 h-3 text-purple-300" />
            <span>Code: CYBER20</span>
            {copied ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3 text-gray-300" />}
          </button>
        </div>

      </div>
    </div>
  );
}
