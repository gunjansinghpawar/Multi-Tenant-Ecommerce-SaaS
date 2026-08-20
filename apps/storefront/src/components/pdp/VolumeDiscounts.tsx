'use client';

import React, { useState } from 'react';
import { cn } from '@commercex/utils';
import { Percent } from 'lucide-react';

interface DiscountTier {
  quantity: number;
  discountPercentage: number;
  label?: string;
}

interface VolumeDiscountsProps {
  basePrice: number;
  tiers?: DiscountTier[];
  onSelectQuantity?: (quantity: number) => void;
  className?: string;
}

const defaultTiers: DiscountTier[] = [
  { quantity: 1, discountPercentage: 0 },
  { quantity: 2, discountPercentage: 10, label: 'Most Popular' },
  { quantity: 3, discountPercentage: 15 },
  { quantity: 5, discountPercentage: 25, label: 'Best Value' },
];

export function VolumeDiscounts({
  basePrice,
  tiers = defaultTiers,
  onSelectQuantity,
  className
}: VolumeDiscountsProps) {
  const [selectedQty, setSelectedQty] = useState(1);

  const handleSelect = (qty: number) => {
    setSelectedQty(qty);
    if (onSelectQuantity) {
      onSelectQuantity(qty);
    }
  };

  return (
    <div className={cn("flex flex-col gap-3 py-4", className)}>
      <div className="flex items-center gap-2 text-sm font-semibold mb-2">
        <Percent className="w-4 h-4 text-primary" />
        <span>Buy more, save more!</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {tiers.map((tier) => {
          const isSelected = selectedQty === tier.quantity;
          const discountedPrice = basePrice * (1 - tier.discountPercentage / 100);
          const totalDiscountedPrice = discountedPrice * tier.quantity;

          return (
            <button
              key={tier.quantity}
              onClick={() => handleSelect(tier.quantity)}
              className={cn(
                "relative flex flex-col items-center justify-center p-3 sm:p-4 rounded-xl border-2 transition-all text-left w-full overflow-hidden",
                isSelected 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50 hover:bg-muted/30"
              )}
            >
              {tier.label && (
                <div className={cn(
                  "absolute top-0 w-full text-center text-[10px] font-bold uppercase tracking-wider py-1",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                )}>
                  {tier.label}
                </div>
              )}
              
              <div className={cn("flex flex-col items-center w-full", tier.label && "mt-4")}>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-bold text-lg">Buy {tier.quantity}</span>
                  {tier.discountPercentage > 0 && (
                    <span className="text-sm font-bold text-green-600 dark:text-green-500">
                      (-{tier.discountPercentage}%)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-lg">${discountedPrice.toFixed(2)}</span>
                  <span className="text-xs text-muted-foreground">/ea</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
