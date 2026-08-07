'use client';

import { useState, useEffect } from 'react';
import { X, Download } from 'lucide-react';

export function InstallPrompt() {
  const [isInstallable, setIsInstallable] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if we should show the prompt (not dismissed recently)
    const dismissed = localStorage.getItem('pwa_prompt_dismissed');
    if (dismissed && Date.now() - parseInt(dismissed) < 1000 * 60 * 60 * 24 * 7) {
      return; // Don't show if dismissed in the last 7 days
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e);
      setIsInstallable(true);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Simulated installable state for development/testing
    if (process.env.NODE_ENV === 'development') {
      setTimeout(() => {
        if (!deferredPrompt) {
          setIsInstallable(true);
          setShowPrompt(true);
        }
      }, 3000);
    }

    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, [deferredPrompt]);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      // Show the install prompt
      deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response to the install prompt: ${outcome}`);
      // We've used the prompt, and can't use it again, throw it away
      setDeferredPrompt(null);
    } else if (process.env.NODE_ENV === 'development') {
      alert('In a real environment, this would trigger the browser install prompt.');
    }
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_prompt_dismissed', Date.now().toString());
  };

  if (!isInstallable || !showPrompt) return null;

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-4 sm:left-6 z-50 animate-in slide-in-from-bottom-8">
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-4 pr-12 relative flex items-center max-w-sm w-full">
        <button 
          onClick={handleDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="w-12 h-12 bg-black dark:bg-white rounded-xl flex items-center justify-center flex-shrink-0 mr-4">
          <Download className="w-6 h-6 text-white dark:text-black" />
        </div>
        
        <div className="flex-1">
          <h4 className="font-bold text-gray-900 dark:text-white text-sm">Install CommerceX</h4>
          <p className="text-xs text-gray-500 mb-2">Get a faster, native app experience.</p>
          <button 
            onClick={handleInstallClick}
            className="text-xs font-bold bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
          >
            Add to Home Screen
          </button>
        </div>
      </div>
    </div>
  );
}
