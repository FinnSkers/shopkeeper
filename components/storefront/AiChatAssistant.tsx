'use client';

import { useState } from 'react';
import { Bot, X, Send, Sparkles, User, ShoppingBag } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedProduct?: {
    name: string;
    price: string;
    link: string;
  };
}

export default function AiChatAssistant({ storeSlug }: { storeSlug: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: " 👋 Hi! I'm your AI Spatial Shopping Assistant. Looking for 3D headphones, desk setups, or mechanical keyboards today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
    };

    setMessages((prev) => [...prev, userMsg]);
    const query = input.toLowerCase();
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse: Message;

      if (query.includes('headphone') || query.includes('audio') || query.includes('sound')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "I highly recommend the Cyber-Spatial Headphones Pro! They feature 3D spatial audio, magnesium alloy casing, and active noise cancellation.",
          recommendedProduct: {
            name: 'Cyber-Spatial Headphones Pro',
            price: '$299.99',
            link: `/store/${storeSlug}/product/1`,
          },
        };
      } else if (query.includes('keyboard') || query.includes('typing')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "Check out our Mechanical Wireless Keyboard! Hot-swappable RGB switches and long battery life.",
          recommendedProduct: {
            name: 'Mechanical Wireless Keyboard',
            price: '$149.00',
            link: `/store/${storeSlug}/product/3`,
          },
        };
      } else if (query.includes('shipping') || query.includes('delivery')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "We offer Free Express Shipping on all orders over $50! Standard delivery takes 2-3 business days.",
        };
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "That sounds great! Feel free to explore our 3D interactive models in the product catalog or inspect material swatches on individual product pages.",
        };
      }

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-4 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 text-white shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-110 hover:shadow-[0_0_45px_rgba(124,58,237,0.9)] transition-all flex items-center gap-2 font-bold text-sm group"
        >
          <Sparkles className="w-5 h-5 text-cyan-300 animate-spin" />
          <span className="hidden sm:inline">AI Shopping Concierge</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[400px] h-[520px] rounded-3xl glass-panel border-purple-500/30 flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.8)] overflow-hidden bg-[#0a0a1a]/95">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-purple-900/40 to-cyan-900/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-400/40 flex items-center justify-center">
                <Bot className="w-5 h-5 text-purple-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                  Spatial AI Concierge <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" /> Online • 24/7 Live Support
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-purple-300" />
                  </div>
                )}

                <div className="max-w-[80%] space-y-2">
                  <div
                    className={`p-3 rounded-2xl ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-br-none'
                        : 'glass-panel border-white/10 text-gray-200 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Recommended Product Card */}
                  {msg.recommendedProduct && (
                    <a
                      href={msg.recommendedProduct.link}
                      className="block p-3 rounded-xl glass-panel border-purple-500/40 hover:border-cyan-400 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {msg.recommendedProduct.name}
                        </span>
                        <span className="font-extrabold text-cyan-400">{msg.recommendedProduct.price}</span>
                      </div>
                      <span className="text-[10px] text-purple-300 flex items-center gap-1 mt-1">
                        View Product <ShoppingBag className="w-3 h-3" />
                      </span>
                    </a>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-cyan-300" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-gray-400 text-xs pl-2">
                <Bot className="w-4 h-4 text-purple-400 animate-bounce" />
                <span>AI Concierge is typing...</span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} className="p-3 border-t border-white/10 bg-white/5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, shipping, 3D specs..."
              className="flex-1 bg-[#030309] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold hover:scale-105 transition-transform"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
