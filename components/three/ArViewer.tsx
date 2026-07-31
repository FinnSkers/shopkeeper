'use client';

import { useState } from 'react';
import { Smartphone, Eye, Sparkles, Check, X, Camera } from 'lucide-react';

export default function ArViewer({ productName, color }: { productName: string; color: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [arPlaced, setArPlaced] = useState(false);

  return (
    <div>
      {/* AR View Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-3 px-4 rounded-xl glass-panel border-purple-500/30 hover:border-cyan-400 text-xs font-bold text-gray-200 hover:text-white transition-all flex items-center justify-center gap-2 group"
      >
        <Smartphone className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
        <span>View in Your Room (AR / Vision Pro)</span>
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
      </button>

      {/* AR Modal Dialog Simulator */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#0d0d24] border border-purple-500/30 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl space-y-6">
            
            {/* Header */}
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-900/30 to-cyan-900/30">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Camera className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    AR Spatial Room Placement <Sparkles className="w-4 h-4 text-cyan-400" />
                  </h3>
                  <p className="text-xs text-gray-400">WebXR & iOS AR Quick Look (.USDZ / .GLTF)</p>
                </div>
              </div>
              <button
                onClick={() => { setIsOpen(false); setArPlaced(false); }}
                className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Camera Viewport Simulation */}
            <div className="px-6">
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-[#030309] flex flex-col items-center justify-center text-center p-6">
                
                {/* Simulated Room Grid Lines */}
                <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#7c3aed_1px,transparent_1px)] [background-size:16px_16px]" />

                {!arPlaced ? (
                  <div className="space-y-4 relative z-10">
                    <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-400/40 flex items-center justify-center mx-auto animate-bounce">
                      <Smartphone className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Point Camera at a Flat Surface</h4>
                      <p className="text-xs text-gray-400 max-w-xs mt-1">
                        Move device around slowly to scan your table or floor space.
                      </p>
                    </div>
                    <button
                      onClick={() => setArPlaced(true)}
                      className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-xs font-bold shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:scale-105 transition-all"
                    >
                      Place {productName} Here
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4 relative z-10">
                    {/* Simulated 3D Model Placed in AR Room */}
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-500 p-[2px] shadow-[0_0_30px_rgba(124,58,237,0.8)] mx-auto animate-pulse">
                      <div className="w-full h-full bg-[#0d0d24] rounded-[14px] flex items-center justify-center">
                        <span className="text-2xl font-black text-cyan-300">3D</span>
                      </div>
                    </div>
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                        <Check className="w-3.5 h-3.5" /> 1:1 Scale Placed in Real Room
                      </span>
                      <p className="text-xs text-gray-400 mt-2">
                        Pinch to scale • Drag to reposition • Walk around model
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer info */}
            <div className="p-6 border-t border-white/10 flex items-center justify-between text-xs text-gray-400 bg-white/5">
              <span>Compatible with iOS AR Quick Look & WebXR</span>
              <button
                onClick={() => { setIsOpen(false); setArPlaced(false); }}
                className="px-4 py-2 rounded-xl glass-panel text-white font-semibold hover:bg-white/10"
              >
                Close AR View
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
