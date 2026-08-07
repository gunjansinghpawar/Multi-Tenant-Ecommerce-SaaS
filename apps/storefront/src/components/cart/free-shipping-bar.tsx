'use client';

import React from 'react';
import { Truck } from 'lucide-react';
import { cn } from '@commercex/utils';
import { useCartStore } from '../../store/use-cart-store';

interface FreeShippingBarProps {
  threshold?: number;
  className?: string;
}

export function FreeShippingBar({ threshold = 100, className }: FreeShippingBarProps) {
  const { cartTotal } = useCartStore();
  
  const remaining = Math.max(0, threshold - cartTotal);
  const progress = Math.min(100, (cartTotal / threshold) * 100);
  const isFreeShipping = remaining === 0;

  return (
    <div className={cn("w-full bg-muted/30 p-3 rounded-lg border border-border/50", className)}>
      <div className="flex items-center gap-2 mb-2 text-sm font-medium">
        <Truck className="h-4 w-4 text-primary" />
        {isFreeShipping ? (
          <span className="text-green-600 dark:text-green-400">
            You've unlocked free shipping!
          </span>
        ) : (
          <span>
            Add <span className="font-bold text-primary">${remaining.toFixed(2)}</span> more to get free shipping
          </span>
        )}
      </div>
      
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div 
          className={cn(
            "h-full rounded-full transition-all duration-500 ease-in-out",
            isFreeShipping ? "bg-green-500" : "bg-primary"
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
