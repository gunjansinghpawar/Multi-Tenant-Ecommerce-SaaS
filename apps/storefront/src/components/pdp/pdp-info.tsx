'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { Badge } from '@commercex/ui';
import { cn } from '@commercex/utils';
import { PriceDisplay } from '../product/price-display';
import { VolumeDiscounts } from './VolumeDiscounts';
import { useAnalytics } from '../../hooks/use-analytics';

interface Variant {
  name: string;
  options: { label: string; value: string; colorCode?: string; disabled?: boolean }[];
}

interface PdpInfoProps {
  title: string;
  brand?: string;
  price: number;
  compareAtPrice?: number | null;
  rating?: number;
  reviewCount?: number;
  description: string;
  variants?: Variant[];
}

export function PdpInfo({
  title,
  brand,
  price,
  compareAtPrice,
  rating = 4.8,
  reviewCount = 124,
  description,
  variants = []
}: PdpInfoProps) {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const { track } = useAnalytics();

  useEffect(() => {
    track('product_view', { title, brand, price });
  }, [title, brand, price, track]);

  const handleVariantSelect = (variantName: string, value: string) => {
    setSelectedVariants(prev => ({ ...prev, [variantName]: value }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header Info */}
      <div className="space-y-2">
        {brand && <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">{brand}</h2>}
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">{title}</h1>
        
        {/* Reviews Summary */}
        <div className="flex items-center gap-2 pt-1">
          <div className="flex items-center text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={cn("h-4 w-4 fill-current", i >= Math.floor(rating) && "text-muted opacity-30")} />
            ))}
          </div>
          <span className="text-sm font-medium">{rating}</span>
          <span className="text-sm text-muted-foreground underline underline-offset-4 cursor-pointer hover:text-foreground">
            {reviewCount} reviews
          </span>
        </div>
      </div>

      {/* Price */}
      <PriceDisplay price={price} compareAtPrice={compareAtPrice} className="text-2xl" />

      {/* Description Excerpt */}
      <p className="text-base text-muted-foreground leading-relaxed">
        {description}
      </p>

      <hr className="border-border/50" />

      {/* Variant Selection */}
      {variants.map((variant) => (
        <div key={variant.name} className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="font-medium text-sm">
              {variant.name}: <span className="text-muted-foreground">{selectedVariants[variant.name] || 'Select'}</span>
            </h3>
            {variant.name.toLowerCase() === 'size' && (
              <button className="text-sm text-primary underline underline-offset-4">Size Guide</button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-3">
            {variant.options.map((opt) => {
              const isSelected = selectedVariants[variant.name] === opt.value;
              const isColor = !!opt.colorCode;

              return (
                <button
                  key={opt.value}
                  disabled={opt.disabled}
                  onClick={() => handleVariantSelect(variant.name, opt.value)}
                  className={cn(
                    "relative flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                    isColor 
                      ? "h-10 w-10 rounded-full border-2" 
                      : "h-12 min-w-[3rem] px-4 rounded-md border text-sm font-medium",
                    isSelected
                      ? "border-primary ring-2 ring-primary ring-offset-2"
                      : "border-border hover:border-foreground/50",
                    opt.disabled && !isColor && "bg-muted text-muted-foreground line-through"
                  )}
                  style={isColor ? { backgroundColor: opt.colorCode } : undefined}
                  title={opt.disabled ? 'Out of stock' : opt.label}
                >
                  {!isColor && opt.label}
                  {opt.disabled && isColor && (
                     <div className="absolute inset-0 bg-white/50 rounded-full flex items-center justify-center">
                       <div className="w-full h-[2px] bg-red-500 rotate-45" />
                     </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      {/* Volume Discounts */}
      <VolumeDiscounts basePrice={price} />
    </div>
  );
}
