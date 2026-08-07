'use client';

import { usePopupStore } from '@/store/usePopupStore';
import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';

export function StatusModal() {
  const { popupData, closePopup } = usePopupStore();
  
  if (!popupData) return null;

  const getIconAndColor = () => {
    switch (popupData.type) {
      case 'success':
        return { Icon: CheckCircle2, bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600' };
      case 'error':
        return { Icon: XCircle, bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600' };
      case 'warning':
        return { Icon: AlertCircle, bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600' };
      default:
        return { Icon: Info, bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600' };
    }
  };

  const { Icon, bg, text } = getIconAndColor();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 w-full max-w-sm relative animate-in slide-in-from-bottom-8 shadow-2xl border border-gray-100 dark:border-gray-800">
      {!popupData.preventClose && (
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black dark:hover:text-white bg-gray-50 dark:bg-gray-800 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      <div className="flex flex-col items-center text-center mt-2">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${bg} ${text}`}>
          <Icon className="w-8 h-8" />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {popupData.title}
        </h3>
        
        <p className="text-gray-500 mb-8 text-sm">
          {popupData.message}
        </p>

        <button 
          onClick={() => {
            popupData.onConfirm?.();
            closePopup();
          }}
          className="w-full py-3 px-4 font-bold rounded-xl text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors"
        >
          {popupData.confirmText || 'Got it'}
        </button>
      </div>
    </div>
  );
}
