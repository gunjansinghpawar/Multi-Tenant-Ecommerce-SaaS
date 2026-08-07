'use client';

import { usePopupStore } from '@/store/usePopupStore';
import { AlertTriangle, Trash2, X } from 'lucide-react';

export function ConfirmationModal() {
  const { popupData, closePopup } = usePopupStore();
  
  if (!popupData) return null;

  const isDestructive = popupData.type === 'error' || popupData.type === 'warning';

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 w-full max-w-sm relative animate-in zoom-in-95 duration-200 shadow-2xl border border-gray-100 dark:border-gray-800">
      <button 
        onClick={closePopup}
        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-black dark:hover:text-white bg-gray-50 dark:bg-gray-800 rounded-full transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      <div className="flex flex-col items-center text-center mt-4">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
          isDestructive ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white'
        }`}>
          {isDestructive ? <Trash2 className="w-8 h-8" /> : <AlertTriangle className="w-8 h-8" />}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {popupData.title || 'Are you sure?'}
        </h3>
        
        <p className="text-gray-500 mb-8 text-sm">
          {popupData.message || 'This action cannot be undone. Please confirm to proceed.'}
        </p>

        <div className="flex w-full space-x-3">
          <button 
            onClick={() => {
              popupData.onCancel?.();
              closePopup();
            }}
            className="flex-1 py-3 px-4 font-bold rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            {popupData.cancelText || 'Cancel'}
          </button>
          <button 
            onClick={() => {
              popupData.onConfirm?.();
              closePopup();
            }}
            className={`flex-1 py-3 px-4 font-bold rounded-xl text-white transition-colors ${
              isDestructive 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100'
            }`}
          >
            {popupData.confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
}
