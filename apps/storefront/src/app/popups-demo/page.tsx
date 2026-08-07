'use client';

import { usePopupStore } from '@/store/usePopupStore';
import { Layers } from 'lucide-react';

export default function PopupsDemoPage() {
  const { openPopup } = usePopupStore();

  return (
    <div className="max-w-6xl mx-auto py-24 px-4 sm:px-6">
      
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="w-16 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full flex items-center justify-center mx-auto mb-6">
          <Layers className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight mb-4">
          Global Popup System
        </h1>
        <p className="text-lg text-gray-500">
          Click any button below to trigger the centralized popup manager. This system handles 36+ different popup states using just a few flexible templates.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* Category: Status */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Status & Alerts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => openPopup('STATUS', { type: 'success', title: 'Payment Successful', message: 'Your order has been processed.' })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Success
            </button>
            <button 
              onClick={() => openPopup('STATUS', { type: 'error', title: 'Payment Failed', message: 'Your card was declined. Please try another method.' })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Error
            </button>
            <button 
              onClick={() => openPopup('STATUS', { type: 'warning', title: 'Compare Limit', message: 'You can only compare 4 items at a time.' })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Warning (Compare Limit)
            </button>
            <button 
              onClick={() => openPopup('STATUS', { type: 'info', title: 'Session Expired', message: 'For your security, you have been logged out due to inactivity.', preventClose: true })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Session Expired
            </button>
          </div>
        </section>

        {/* Category: Confirmation */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Confirmations</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => openPopup('CONFIRMATION', { type: 'error', title: 'Delete Address?', message: 'This address will be removed from your account permanently.' })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-red-500"
            >
              Delete Address
            </button>
            <button 
              onClick={() => openPopup('CONFIRMATION', { type: 'error', title: 'Delete Review?', message: 'Are you sure you want to delete your review?' })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-red-500"
            >
              Delete Review
            </button>
            <button 
              onClick={() => openPopup('CONFIRMATION', { type: 'warning', title: 'Unsaved Changes', message: 'You have unsaved changes. Are you sure you want to leave?' })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Unsaved Changes
            </button>
          </div>
        </section>

        {/* Category: Engagement */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Engagement & Marketing</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button 
              onClick={() => openPopup('ENGAGEMENT', { engagementType: 'newsletter' })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Newsletter / Exit Intent
            </button>
            <button 
              onClick={() => openPopup('ENGAGEMENT', { engagementType: 'abandoned-cart' })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Abandoned Cart
            </button>
          </div>
        </section>

        {/* Category: Gatekeepers */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Gatekeepers (Forced Action)</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <button 
              onClick={() => openPopup('GATEKEEPER', { gatekeeperType: 'age' })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-black dark:hover:border-white"
            >
              Age Verification
            </button>
            <button 
              onClick={() => openPopup('GATEKEEPER', { gatekeeperType: 'cookie' })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border-2 border-transparent hover:border-black dark:hover:border-white"
            >
              Cookie Consent
            </button>
          </div>
        </section>

        {/* Category: Store Features */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">Store Features</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button 
              onClick={() => openPopup('PREFERENCES')}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Location / Currency / Language
            </button>
            <button 
              onClick={() => openPopup('QUICK_VIEW', { productId: 'test-123' })}
              className="p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl font-bold text-sm hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Product Quick View
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
