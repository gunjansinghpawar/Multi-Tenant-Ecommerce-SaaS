'use client';

import { usePopupStore } from '@/store/usePopupStore';
import { X, Mail, ShoppingBag } from 'lucide-react';
import { useState } from 'react';

export function EngagementModal() {
  const { popupData, closePopup } = usePopupStore();
  const [email, setEmail] = useState('');
  
  if (!popupData) return null;

  const isCart = popupData.engagementType === 'abandoned-cart';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(isCart ? 'Redirecting to checkout...' : 'Subscribed successfully!');
    closePopup();
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-4xl relative animate-in zoom-in-95 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row">
      
      <button 
        onClick={closePopup}
        className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-black dark:hover:text-white bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Image Half */}
      <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
        <img 
          src={isCart 
            ? "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?q=80&w=800&auto=format&fit=crop" 
            : "https://images.unsplash.com/photo-1558769132-cb1fac084092?q=80&w=800&auto=format&fit=crop"} 
          alt="Promotion" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
           {isCart ? (
             <div className="text-white">
               <span className="bg-red-500 text-white px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider mb-2 inline-block">Wait!</span>
               <h3 className="text-2xl font-bold">Don't leave your cart behind.</h3>
             </div>
           ) : (
             <div className="text-white">
               <span className="bg-purple-600 text-white px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider mb-2 inline-block">Special Offer</span>
               <h3 className="text-2xl font-bold">Unlock 15% off your first order.</h3>
             </div>
           )}
        </div>
      </div>

      {/* Content Half */}
      <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
        
        {isCart ? (
          <>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Complete your purchase now and get free shipping!</h2>
            <p className="text-gray-500 mb-8">You left some great items in your cart. We've saved them for you, but they are selling fast.</p>
            
            <button 
              onClick={handleSubmit}
              className="w-full py-4 font-bold rounded-xl text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5 mr-2" /> Return to Checkout
            </button>
            <button onClick={closePopup} className="mt-4 text-sm font-medium text-gray-400 hover:text-black dark:hover:text-white">
              No thanks, I'll pass on free shipping
            </button>
          </>
        ) : (
          <>
            <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4">Join the VIP list</h2>
            <p className="text-gray-500 mb-8">Sign up for our newsletter to receive exclusive drops, early access to sales, and 15% off your first order.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white outline-none"
                />
              </div>
              <button 
                type="submit"
                className="w-full py-4 font-bold rounded-xl text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors"
              >
                Claim My 15% Off
              </button>
            </form>
            <p className="mt-6 text-xs text-center text-gray-400">By signing up, you agree to our Terms and Privacy Policy.</p>
          </>
        )}

      </div>

    </div>
  );
}
