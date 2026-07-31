'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  BarChart3, 
  Layout, 
  Smartphone, 
  CreditCard, 
  Star, 
  Check, 
  Store, 
  ChevronRight, 
  Box, 
  Layers, 
  Globe, 
  Cpu, 
  Terminal,
  Activity,
  Menu,
  X
} from 'lucide-react';

// Dynamically import 3D Hero Scene with SSR disabled
const HeroScene = dynamic(() => import('@/components/three/HeroScene'), { ssr: false });
const ProductViewer = dynamic(() => import('@/components/three/ProductViewer'), { ssr: false });

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activePreviewColor, setActivePreviewColor] = useState('#7c3aed');
  const [activeTab, setActiveTab] = useState('3d');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#030309] text-gray-100 selection:bg-purple-500/30 overflow-x-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse-glow" style={{ animationDelay: '2s' }} />

      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 backdrop-blur-2xl bg-[#030309]/80 border-b border-white/10 shadow-2xl' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-cyan-500 to-pink-500 p-[1px] shadow-[0_0_20px_rgba(124,58,237,0.5)]">
              <div className="w-full h-full bg-[#030309] rounded-[11px] flex items-center justify-center">
                <Box className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              SHOP<span className="gradient-text-cyber">KEEPER</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#preview" className="hover:text-cyan-400 transition-colors">3D Experience</a>
            <a href="#pricing" className="hover:text-pink-400 transition-colors">Pricing</a>
            <Link href="/store/demo-store" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
              Live Demo Store <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/login" className="px-5 py-2.5 text-sm font-semibold text-gray-300 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] hover:scale-105 transition-all"
            >
              Get Started Free
            </Link>
          </div>

          <button 
            className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-white/10 px-4 pt-4 pb-6 space-y-4">
            <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 font-medium">Features</a>
            <a href="#preview" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 font-medium">3D Experience</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="block text-gray-300 font-medium">Pricing</a>
            <Link href="/store/demo-store" className="block text-emerald-400 font-medium">Live Demo Store</Link>
            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <Link href="/login" className="w-full text-center py-2.5 text-gray-300 font-medium">Sign In</Link>
              <Link href="/signup" className="w-full text-center py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-semibold">
                Get Started Free
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-purple-500/30 text-xs font-semibold text-purple-300 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
              <span>NEXT-GEN SPATIAL E-COMMERCE PLATFORM</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05]">
              Build <span className="gradient-text-cyber">Spatial 3D</span> Shopping Web Apps
            </h1>

            <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light leading-relaxed mx-auto lg:mx-0">
              Transform standard online stores into immersive, animated 3D spatial web environments. Real-time Supabase backend, Stripe payments, and hyper-responsive admin control center.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link 
                href="/signup" 
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-bold text-base shadow-[0_0_30px_rgba(124,58,237,0.5)] hover:shadow-[0_0_45px_rgba(124,58,237,0.8)] hover:scale-105 transition-all flex items-center justify-center gap-3"
              >
                Launch Your Store Now <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/store/demo-store" 
                className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border-white/20 text-white font-semibold text-base hover:bg-white/10 hover:border-cyan-500/50 transition-all flex items-center justify-center gap-2"
              >
                <Store className="w-5 h-5 text-cyan-400" /> Explore Demo Store
              </Link>
            </div>

            {/* Live Holographic HUD Stats */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <p className="text-2xl lg:text-3xl font-extrabold text-white">99.9%</p>
                <p className="text-xs text-gray-400 font-medium mt-1">Uptime SLA</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-extrabold gradient-text-neon">60 FPS</p>
                <p className="text-xs text-gray-400 font-medium mt-1">3D WebGL Speed</p>
              </div>
              <div>
                <p className="text-2xl lg:text-3xl font-extrabold text-white">&lt; 100ms</p>
                <p className="text-xs text-gray-400 font-medium mt-1">Real-Time Sync</p>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas Scene */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            <div className="w-full max-w-[500px] aspect-square relative">
              {/* Glowing Background Ring */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/30 to-cyan-500/30 rounded-full blur-3xl" />
              
              {/* Three.js Canvas Container */}
              <div className="w-full h-full relative z-10 glass-panel rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(124,58,237,0.3)]">
                <HeroScene />
              </div>

              {/* Floating Floating HUD Cards */}
              <div className="absolute -bottom-6 -left-6 z-20 glass-panel p-4 rounded-2xl border-white/20 shadow-2xl flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">Realtime Orders</p>
                  <p className="text-sm font-bold text-white">$14,890.00 / hr</p>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 z-20 glass-panel p-4 rounded-2xl border-white/20 shadow-2xl flex items-center gap-3 animate-float-slow" style={{ animationDelay: '3s' }}>
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                  <Box className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">3D Asset Loader</p>
                  <p className="text-sm font-bold text-cyan-300">GLTF / WebGL Ready</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Interactive 3D Product Canvas Preview Section */}
      <section id="preview" className="py-24 relative border-t border-white/10 bg-[#050512]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-cyan-400 uppercase px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
              Interactive 3D Product Viewer
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Give Products <span className="gradient-text-cyber">Life & Depth</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Customers don't just look at photos — they inspect, spin, and interact with 3D product models in real-time right in their browser.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Interactive Color Controls & Specs */}
            <div className="lg:col-span-5 space-y-6">
              <div className="glass-panel p-6 rounded-2xl border-white/10 space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-400" /> Customizer Simulator
                </h3>
                <p className="text-sm text-gray-400">
                  Select a finish color to see the 3D WebGL material update dynamically in real time.
                </p>

                <div>
                  <label className="text-xs font-semibold text-gray-400 block mb-3 uppercase tracking-wider">Select Material Finish</label>
                  <div className="flex gap-4">
                    {[
                      { name: 'Cyber Purple', color: '#7c3aed' },
                      { name: 'Electric Cyan', color: '#06b6d4' },
                      { name: 'Neon Pink', color: '#ec4899' },
                      { name: 'Obsidian Black', color: '#18181b' },
                    ].map((item) => (
                      <button
                        key={item.color}
                        onClick={() => setActivePreviewColor(item.color)}
                        className={`w-10 h-10 rounded-full transition-all border-2 flex items-center justify-center ${activePreviewColor === item.color ? 'scale-110 border-white shadow-[0_0_15px_rgba(255,255,255,0.5)]' : 'border-transparent hover:scale-105'}`}
                        style={{ backgroundColor: item.color }}
                        title={item.name}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="glass-panel p-5 rounded-2xl border-white/10">
                  <Cpu className="w-6 h-6 text-purple-400 mb-2" />
                  <p className="text-sm font-bold text-white">Draco Mesh Compression</p>
                  <p className="text-xs text-gray-400 mt-1">90% smaller 3D file loads</p>
                </div>
                <div className="glass-panel p-5 rounded-2xl border-white/10">
                  <Globe className="w-6 h-6 text-cyan-400 mb-2" />
                  <p className="text-sm font-bold text-white">Edge WebGL CDN</p>
                  <p className="text-xs text-gray-400 mt-1">Sub-second 3D renders</p>
                </div>
              </div>
            </div>

            {/* 3D Product Canvas Container */}
            <div className="lg:col-span-7">
              <ProductViewer color={activePreviewColor} />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section id="features" className="py-24 relative border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold tracking-widest text-purple-400 uppercase px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              Futuristic Feature Suite
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Everything Needed for <span className="gradient-text-cyber">Next-Gen E-Commerce</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Box, title: '3D WebGL Product Canvas', desc: 'Embed high-fidelity 3D models with rotation, zoom, and dynamic material swaps.', color: 'text-purple-400' },
              { icon: Activity, title: 'Real-time Supabase Engine', desc: 'Instant live stock changes, new order alerts, and user presence via Postgres WebSockets.', color: 'text-cyan-400' },
              { icon: Layout, title: 'Visual Theme Customizer', desc: 'Modify store palettes, typography, and section layouts without code lock-in.', color: 'text-pink-400' },
              { icon: CreditCard, title: 'Stripe Connect Multi-Tenant', desc: 'Direct merchant payouts, custom checkout flows, and automated tax calculations.', color: 'text-emerald-400' },
              { icon: BarChart3, title: 'Cyber Command Analytics', desc: 'Recharts area visualizations tracking conversion rate, revenue, and customer traffic.', color: 'text-blue-400' },
              { icon: Smartphone, title: 'PWA Mobile Performance', desc: 'Offline support, fast edge caching, and smooth 60 FPS mobile touch gestures.', color: 'text-amber-400' },
            ].map((feat, i) => (
              <div key={i} className="glass-card p-8 rounded-3xl flex flex-col justify-between group">
                <div>
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${feat.color}`}>
                    <feat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
                <div className="pt-6 mt-6 border-t border-white/5 flex items-center text-xs font-semibold text-purple-400 group-hover:translate-x-2 transition-transform">
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 relative border-t border-white/10 bg-[#050512]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-white">
              Transparent <span className="gradient-text-cyber">Pricing Plans</span>
            </h2>
            <p className="text-gray-400 text-lg">Start free, upgrade as your 3D e-commerce business scales globally.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Starter', price: '$0', desc: 'Perfect for launching your first store', features: ['Up to 25 Products', 'Standard 2D & 3D Viewer', '1 Storefront Domain', 'Basic Analytics', 'Standard Support'], popular: false },
              { name: 'Pro Merchant', price: '$29', desc: 'For growing brands needing full 3D spatial capabilities', features: ['Unlimited Products', 'Advanced 3D WebGL Canvas', 'Custom Domain SSL', 'Realtime Supabase Feed', 'Stripe Connect Integration', 'Priority 24/7 Support'], popular: true },
              { name: 'Enterprise', price: '$99', desc: 'Custom scale for high volume brands', features: ['Dedicated Edge Infrastructure', 'Custom 3D Shader Support', 'Multi-Storefront Management', 'Custom AI Product Descriptions', '99.99% Dedicated Uptime SLA'], popular: false }
            ].map((plan, i) => (
              <div key={i} className={`glass-card p-8 rounded-3xl relative flex flex-col justify-between ${plan.popular ? 'border-purple-500/50 shadow-[0_0_40px_rgba(124,58,237,0.3)] bg-gradient-to-b from-purple-900/20 to-transparent' : ''}`}>
                {plan.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mb-6">{plan.desc}</p>
                  <div className="flex items-baseline gap-2 mb-8">
                    <span className="text-4xl md:text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-400 text-sm">/ month</span>
                  </div>
                  <ul className="space-y-4 text-sm text-gray-300">
                    {plan.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center">
                          <Check className="w-3 h-3 text-purple-300" />
                        </div>
                        {feat}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link
                  href="/signup"
                  className={`w-full text-center py-4 rounded-xl mt-8 font-bold transition-all ${plan.popular ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:scale-105' : 'glass-panel border-white/20 text-white hover:bg-white/10'}`}
                >
                  Choose {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-panel p-12 md:p-16 rounded-3xl border-purple-500/30 relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-cyan-500/30 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Ready to Build Your <span className="gradient-text-cyber">Spatial 3D Store</span>?
            </h2>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8 font-light">
              Join thousands of forward-thinking merchants transforming their storefronts into high-converting 3D experiences.
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white font-extrabold text-lg shadow-[0_0_35px_rgba(124,58,237,0.6)] hover:scale-105 transition-all"
            >
              Start Building Now <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 bg-[#020206] text-sm text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Box className="w-5 h-5 text-purple-400" />
            <span className="font-bold text-white">SHOPKEEPER 3D</span>
            <span className="text-xs text-gray-600">© {new Date().getFullYear()} All rights reserved.</span>
          </div>
          <div className="flex gap-8 text-gray-400">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
            <Link href="/dashboard" className="hover:text-white">Dashboard</Link>
            <Link href="/store/demo-store" className="hover:text-white">Demo Store</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
