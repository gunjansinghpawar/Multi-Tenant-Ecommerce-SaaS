'use client';

import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { Button, Input } from '@commercex/ui';
import { cn } from '@commercex/utils';

export function ShippingCalculator({ className }: { className?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [estimate, setEstimate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postalCode) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setEstimate(postalCode.startsWith('9') ? 'Free (2-3 Days)' : '$9.99 (Standard)');
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className={cn("border rounded-lg overflow-hidden", className)}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between bg-muted/30 hover:bg-muted/50 transition-colors"
      >
        <span className="font-medium flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4" /> Estimate Shipping & Taxes
        </span>
      </button>
      
      {isOpen && (
        <div className="p-4 border-t bg-background">
          <form onSubmit={handleCalculate} className="flex gap-2">
            <Input 
              placeholder="Enter Postal Code" 
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              className="flex-1"
              required
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '...' : 'Calculate'}
            </Button>
          </form>
          
          {estimate && (
            <div className="mt-3 p-3 bg-muted rounded-md text-sm">
              Estimated Shipping: <span className="font-semibold">{estimate}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
