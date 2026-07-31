'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

export default function StoreLayout({ children, params }: { children: React.ReactNode, params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useCartStore((state) => state.items);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-gray-100 font-sans selection:bg-purple-500/30 flex flex-col">
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#0a0a1a]/80 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href={`/store/${slug}`} className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Demo Store
              </Link>
            </div>
            
            <nav className="hidden md:block">
              <ul className="flex items-center space-x-8 text-sm font-medium">
                <li><Link href={`/store/${slug}`} className="hover:text-purple-400 transition-colors">Home</Link></li>
                <li><Link href={`/store/${slug}/products`} className="hover:text-purple-400 transition-colors">Products</Link></li>
                <li><Link href={`/store/${slug}/about`} className="hover:text-purple-400 transition-colors">About</Link></li>
              </ul>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href={`/store/${slug}/cart`} className="relative p-2 hover:bg-white/5 rounded-full transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-300" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-[10px] font-bold text-white bg-purple-600 rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>
              <button 
                className="md:hidden p-2 hover:bg-white/5 rounded-full transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 bg-[#0a0a1a]">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link href={`/store/${slug}`} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/5">Home</Link>
              <Link href={`/store/${slug}/products`} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/5">Products</Link>
              <Link href={`/store/${slug}/about`} className="block px-3 py-2 rounded-md text-base font-medium hover:bg-white/5">About</Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-white/10 mt-20 py-12 bg-[#05050f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Demo Store</span>
            <p className="mt-4 text-sm text-gray-400">Your premium shopping destination for the best products on the market.</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Shop</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-purple-400">All Products</Link></li>
              <li><Link href="#" className="hover:text-purple-400">New Arrivals</Link></li>
              <li><Link href="#" className="hover:text-purple-400">Sale</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Support</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-purple-400">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-purple-400">FAQs</Link></li>
              <li><Link href="#" className="hover:text-purple-400">Shipping Returns</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-purple-400">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-purple-400">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Demo Store. Powered by ShopKeeper.</p>
        </div>
      </footer>
    </div>
  );
}
