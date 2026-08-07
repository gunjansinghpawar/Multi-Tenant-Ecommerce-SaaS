'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, X, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content: string;
  products?: any[];
};

export function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: 'Hi! I am your AI Shopping Assistant. Tell me what you are looking for. For example, "I need a minimalist desk setup" or "What should I wear to a summer wedding?"',
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isTyping, isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response with product recommendations
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: "I've curated a few options that perfectly match that vibe. Take a look:",
        products: [
          { id: 'p1', name: 'Linen Summer Blazer', price: 189, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop' },
          { id: 'p2', name: 'Cotton Chino Pants', price: 89, image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=800&auto=format&fit=crop' },
          { id: 'p3', name: 'Suede Loafers', price: 145, image: 'https://images.unsplash.com/photo-1614252339460-54f447d885e7?q=80&w=800&auto=format&fit=crop' }
        ]
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Widget Popover */}
      {isOpen && (
        <div className="absolute bottom-20 left-0 w-[380px] h-[600px] max-h-[80vh] bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-purple-100 dark:border-purple-900/50 overflow-hidden flex flex-col transition-all duration-300 animate-in slide-in-from-bottom-4 origin-bottom-left">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white flex items-center justify-between shadow-md z-10">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center mr-3 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-sm">AI Personal Shopper</h3>
                <p className="text-xs text-purple-200">Powered by Storefront AI</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50 dark:bg-black/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                
                {msg.role === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white mr-2 flex-shrink-0 mt-1 shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[85%] ${msg.role === 'user' ? 'order-1' : 'order-2'}`}>
                  {/* Chat Bubble */}
                  <div className={`p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-black dark:bg-white text-white dark:text-black rounded-br-sm shadow-sm' 
                      : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm border border-gray-100 dark:border-gray-700 shadow-sm'
                  }`}>
                    {msg.content}
                  </div>

                  {/* Products Grid */}
                  {msg.products && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {msg.products.map(product => (
                        <Link href={`/products/${product.id}`} key={product.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden group hover:shadow-md transition-all block">
                          <div className="aspect-square relative overflow-hidden bg-gray-100">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          </div>
                          <div className="p-2">
                            <h4 className="font-semibold text-xs line-clamp-1">{product.name}</h4>
                            <div className="flex items-center justify-between mt-1">
                              <span className="text-xs font-bold text-gray-900 dark:text-white">${product.price}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white mr-2 flex-shrink-0 mt-1 shadow-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-3 rounded-2xl rounded-bl-sm border border-gray-100 dark:border-gray-700 shadow-sm flex items-center space-x-1.5">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 z-10">
             <div className="flex space-x-2 overflow-x-auto custom-scrollbar mb-3 pb-2">
              {['Gifts under $50', 'Summer outfits', 'Skincare routine'].map(suggestion => (
                <button 
                  key={suggestion}
                  type="button"
                  onClick={() => setInput(suggestion)}
                  className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-medium rounded-full whitespace-nowrap hover:bg-purple-100 dark:hover:bg-purple-900/40 transition-colors border border-purple-100 dark:border-purple-800/50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI Shopper..."
                className="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-inner"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-1 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center disabled:opacity-50 transition-colors"
              >
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group w-14 h-14 bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform duration-200 focus:outline-none focus:ring-4 focus:ring-purple-500/50"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
        )}
      </button>
    </div>
  );
}
