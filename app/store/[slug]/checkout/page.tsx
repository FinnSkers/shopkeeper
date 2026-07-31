'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Check, ChevronRight, Package, CreditCard, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';

export default function CheckoutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [step, setStep] = useState(1);
  const { items, clearCart } = useCartStore();
  
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const shipping = step === 1 ? 0 : 9.99; // Mock logic
  const total = subtotal + tax + shipping;

  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      setIsSuccess(true);
      clearCart();
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center min-h-[60vh] flex flex-col items-center justify-center">
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 border border-green-500/30">
          <Check className="w-10 h-10 text-green-400" />
        </div>
        <h1 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h1>
        <p className="text-gray-400 mb-8">Thank you for your purchase. We've sent a confirmation email with your order details.</p>
        <Link 
          href={`/store/${slug}`}
          className="px-8 py-3 rounded-xl bg-white/10 text-white font-medium hover:bg-white/20 transition-colors"
        >
          Return to Store
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between max-w-2xl mx-auto relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 rounded-full -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-purple-500 rounded-full -z-10 transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          />
          
          {[
            { num: 1, label: 'Shipping', icon: Package },
            { num: 2, label: 'Payment', icon: CreditCard },
            { num: 3, label: 'Review', icon: ShieldCheck }
          ].map((s) => (
            <div key={s.num} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step >= s.num ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-500 border border-white/10'}`}>
                {step > s.num ? <Check className="w-5 h-5" /> : s.num}
              </div>
              <span className={`text-xs font-medium ${step >= s.num ? 'text-white' : 'text-gray-500'}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 backdrop-blur-xl">
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-xl font-semibold text-white mb-6">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">First Name</label>
                    <input required type="text" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">Last Name</label>
                    <input required type="text" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-gray-400">Address</label>
                  <input required type="text" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">City</label>
                    <input required type="text" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">ZIP / Postal</label>
                    <input required type="text" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500" />
                  </div>
                </div>
                
                <div className="pt-4 mt-6 border-t border-white/10">
                  <h3 className="text-lg font-medium text-white mb-4">Shipping Method</h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 border border-purple-500 bg-purple-500/10 rounded-xl cursor-pointer">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" defaultChecked className="text-purple-500" />
                        <div>
                          <p className="font-medium text-white">Standard Delivery</p>
                          <p className="text-xs text-gray-400">3-5 business days</p>
                        </div>
                      </div>
                      <span className="font-medium text-white">Free</span>
                    </label>
                    <label className="flex items-center justify-between p-4 border border-white/10 hover:border-white/30 rounded-xl cursor-pointer transition-colors">
                      <div className="flex items-center gap-3">
                        <input type="radio" name="shipping" className="text-purple-500" />
                        <div>
                          <p className="font-medium text-white">Express Delivery</p>
                          <p className="text-xs text-gray-400">1-2 business days</p>
                        </div>
                      </div>
                      <span className="font-medium text-white">$9.99</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-xl font-semibold text-white mb-6">Payment Details</h2>
                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl mb-6 flex gap-3 items-start">
                  <ShieldCheck className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-purple-200">This is a secure 128-bit SSL encrypted payment. Your details are safe.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">Card Number</label>
                    <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 tracking-widest font-mono" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-sm text-gray-400">Expiry Date</label>
                      <input required type="text" placeholder="MM/YY" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 font-mono" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-sm text-gray-400">CVC</label>
                      <input required type="text" placeholder="123" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 font-mono" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm text-gray-400">Name on Card</label>
                    <input required type="text" className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <h2 className="text-xl font-semibold text-white mb-6">Review Your Order</h2>
                <div className="space-y-4">
                  {items.map((item, i) => (
                    <div key={`${item.id}-${i}`} className="flex justify-between items-center py-3 border-b border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-800 rounded-lg border border-white/10" />
                        <div>
                          <p className="font-medium text-sm text-white">{item.name}</p>
                          <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium text-white">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="bg-black/30 rounded-xl p-4 mt-6 border border-white/5">
                  <h3 className="font-medium text-white mb-2">Shipping To:</h3>
                  <p className="text-sm text-gray-400">John Doe<br/>123 Main St, Apt 4B<br/>New York, NY 10001</p>
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-between">
              {step > 1 ? (
                <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-xl border border-white/10 text-white font-medium hover:bg-white/5 transition-colors">
                  Back
                </button>
              ) : <div></div>}
              
              <button type="submit" className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-medium hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all flex items-center gap-2">
                {step === 3 ? 'Place Order' : 'Continue'} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:col-span-1 hidden lg:block">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl sticky top-24">
            <h2 className="text-lg font-semibold text-white mb-4">Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Items ({items.length})</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-300">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-300">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-4">
              <div className="flex justify-between items-end">
                <span className="text-white font-medium">Total</span>
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
