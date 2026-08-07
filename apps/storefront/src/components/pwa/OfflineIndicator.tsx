'use client';

import { useState, useEffect } from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check initial state
    if (typeof window !== 'undefined') {
      setIsOffline(!window.navigator.onLine);
    }

    const handleOnline = () => {
      setIsOffline(false);
      // Optional: automatically refresh the current page or data when back online
    };
    
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Register Service Worker
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
          (registration) => console.log('ServiceWorker registration successful:', registration.scope),
          (err) => console.log('ServiceWorker registration failed:', err)
        );
      });
    }

    // Development simulation toggle (Ctrl+Shift+O)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'O') {
        setIsOffline(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="bg-yellow-500 text-black px-4 py-2 flex flex-col sm:flex-row items-center justify-center text-sm font-medium z-[100] relative w-full shadow-md animate-in slide-in-from-top-4">
      <div className="flex items-center">
        <WifiOff className="w-4 h-4 mr-2" />
        <span>You are currently browsing offline.</span>
      </div>
      <div className="flex items-center mt-2 sm:mt-0 sm:ml-4 space-x-3">
        <button 
          onClick={() => window.location.reload()} 
          className="flex items-center text-black/80 hover:text-black hover:underline"
        >
          <RefreshCw className="w-3 h-3 mr-1" /> Retry
        </button>
        <span className="text-black/30">|</span>
        <Link href="/offline" className="text-black/80 hover:text-black hover:underline font-bold">
          View Offline Cart
        </Link>
      </div>
    </div>
  );
}
