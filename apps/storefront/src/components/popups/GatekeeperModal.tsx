'use client';

import { usePopupStore } from '@/store/usePopupStore';
import { ShieldAlert, Cookie } from 'lucide-react';
import { useState } from 'react';

export function GatekeeperModal() {
  const { popupData, closePopup } = usePopupStore();
  const [error, setError] = useState(false);
  
  if (!popupData) return null;

  const isAge = popupData.gatekeeperType === 'age';

  const handleDecline = () => {
    if (isAge) {
      setError(true);
    } else {
      alert('Functional cookies declined. Only essential cookies will be used.');
      closePopup();
    }
  };

  const handleAccept = () => {
    closePopup();
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 w-full max-w-md relative animate-in zoom-in-95 duration-200 shadow-2xl border border-gray-100 dark:border-gray-800 text-center">
      
      {/* Note: No close button is rendered because gatekeepers require a choice */}

      <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 ${
        isAge ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'
      }`}>
        {isAge ? <ShieldAlert className="w-10 h-10" /> : <Cookie className="w-10 h-10" />}
      </div>
      
      {isAge ? (
        <>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">Age Verification Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            The products on this site are intended for adults only. You must be 21 years or older to enter.
          </p>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 p-3 rounded-lg mb-6 text-sm font-bold animate-pulse">
              Access denied. You must be 21+ to enter this site.
            </div>
          )}

          <div className="flex flex-col space-y-3">
            <button 
              onClick={handleAccept}
              className="w-full py-4 px-4 font-black rounded-xl text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors uppercase tracking-widest text-sm"
            >
              I am 21 or older. Enter
            </button>
            <button 
              onClick={handleDecline}
              className="w-full py-4 px-4 font-bold rounded-xl text-gray-500 hover:text-black dark:hover:text-white bg-gray-50 dark:bg-gray-800 transition-colors"
            >
              I am under 21. Exit
            </button>
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Cookie Consent</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm leading-relaxed">
            We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
          </p>
          
          <div className="flex flex-col space-y-3">
            <button 
              onClick={handleAccept}
              className="w-full py-3 px-4 font-bold rounded-xl text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors"
            >
              Accept All Cookies
            </button>
            <button 
              onClick={handleDecline}
              className="w-full py-3 px-4 font-bold rounded-xl text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Reject Non-Essential
            </button>
          </div>
          <p className="mt-6 text-xs text-gray-400 cursor-pointer hover:underline">Manage Cookie Preferences</p>
        </>
      )}

    </div>
  );
}
