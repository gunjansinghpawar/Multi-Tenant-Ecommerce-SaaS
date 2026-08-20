'use client';

import React from 'react';
import { Button } from '@commercex/ui';
import { cn } from '@commercex/utils';

interface ExpressCheckoutProps {
  className?: string;
}

export function ExpressCheckout({ className }: ExpressCheckoutProps) {
  return (
    <div className={cn("flex flex-col gap-3 w-full", className)}>
      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink-0 mx-4 text-sm text-muted-foreground font-medium uppercase tracking-wider">
          Express Checkout
        </span>
        <div className="flex-grow border-t border-border"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-2 w-full">
        {/* Apple Pay Button (Simulator) */}
        <Button 
          className="w-full h-12 bg-black hover:bg-gray-900 text-white rounded-md flex items-center justify-center gap-2 font-semibold text-lg"
        >
          <span className="sr-only">Apple Pay</span>
          <svg viewBox="0 0 448 512" className="w-5 h-5 fill-current"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/></svg>
          Pay
        </Button>
        
        {/* Google Pay Button (Simulator) */}
        <Button 
          variant="outline"
          className="w-full h-12 bg-white hover:bg-gray-50 border-gray-300 text-gray-800 rounded-md flex items-center justify-center gap-2 font-semibold text-lg shadow-sm"
        >
          <span className="sr-only">Google Pay</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="36" height="20" viewBox="0 0 36 20" className="opacity-80">
            <path fill="#4285F4" d="M35.6 10c0-.7-.1-1.3-.2-1.9H18v3.6h9.9c-.4 1.2-1.2 2.1-2.2 2.8v2.3h3.5c2.1-1.9 3.4-4.8 3.4-8.1v.1z"/>
            <path fill="#34A853" d="M18 20c4.9 0 9.1-1.6 12.1-4.4l-3.5-2.7c-1.6 1.1-3.6 1.7-5.5 1.7-4.2 0-7.8-2.8-9.1-6.6l-3.6 2.8C5 17.2 11.2 20 18 20z"/>
            <path fill="#FBBC05" d="M8.9 11.9c-.3-1-.5-2-.5-3.1s.2-2.1.5-3.1L5.3 2.9C4 5 3.3 7.4 3.3 10s.7 5 2 7.1l3.6-2.8z"/>
            <path fill="#EA4335" d="M18 3.6c2.7 0 5.1.9 7 2.7l5.2-5.2C27.1 1.7 22.9 0 18 0 11.2 0 5 2.8 1.8 7.1l3.6 2.8c1.3-3.8 4.9-6.6 9.1-6.6h3.5z"/>
          </svg>
        </Button>
      </div>

      <div className="relative flex items-center py-2 mt-2">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink-0 mx-4 text-sm text-muted-foreground">
          OR
        </span>
        <div className="flex-grow border-t border-border"></div>
      </div>
    </div>
  );
}
