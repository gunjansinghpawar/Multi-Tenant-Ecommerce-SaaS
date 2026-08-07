'use client';

import { WifiOff, ShoppingCart, ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function OfflineFallbackPage() {
  // In a real PWA, this would be loaded from IndexedDB
  const cachedCart = [
    { id: '1', name: 'Premium Cotton T-Shirt', price: 29.99, quantity: 2, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' },
    { id: '2', name: 'Minimalist Desk Lamp', price: 89.00, quantity: 1, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop' }
  ];

  const total = cachedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        
        {/* Offline Status */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <WifiOff className="w-10 h-10" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">No Internet Connection</h1>
          <p className="text-gray-500 text-lg">
            It looks like you're offline. Don't worry, your cart is safely saved on your device.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
          >
            <RefreshCw className="w-5 h-5 mr-2" /> Try Again
          </button>
        </div>

        {/* Cached Cart */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-gray-800 pb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <ShoppingCart className="w-6 h-6 mr-3 text-gray-400" />
              Offline Cart
            </h2>
            <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-1 px-3 rounded-full text-sm font-bold">
              Saved Locally
            </span>
          </div>

          <div className="space-y-6 mb-8">
            {cachedCart.map(item => (
              <div key={item.id} className="flex items-center">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 mr-4 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</h3>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="font-bold text-gray-900 dark:text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-100 dark:border-gray-800 pt-6">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-2xl font-black text-gray-900 dark:text-white">${total.toFixed(2)}</span>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-xl text-sm font-medium">
              We'll sync this cart and let you check out as soon as your connection is restored. Background sync is enabled!
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
           <Link href="/" className="inline-flex items-center text-gray-500 hover:text-black dark:hover:text-white font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to cached homepage
          </Link>
        </div>

      </div>
    </main>
  );
}
