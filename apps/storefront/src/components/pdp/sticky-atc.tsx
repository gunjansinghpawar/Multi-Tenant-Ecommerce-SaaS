'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@commercex/ui';
import { cn } from '@commercex/utils';
import { ShoppingCart } from 'lucide-react';
import { PriceDisplay } from '../product/price-display';

interface StickyAtcProps {
  productName: string;
  price: number;
  compareAtPrice?: number | null;
  image: string;
  onAddToCart: () => void;
  inStock?: boolean;
}

export function StickyAtc({
  productName,
  price,
  compareAtPrice,
  image,
  onAddToCart,
  inStock = true,
}: StickyAtcProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past 600px (approximate height of primary ATC)
      setIsVisible(window.scrollY > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-in-out px-4 py-3 sm:px-6 lg:px-8",
        isVisible ? "translate-y-0" : "translate-y-[150%]"
      )}
    >
      <div className="container mx-auto flex items-center justify-between gap-4">
        {/* Product Info (Hidden on very small mobile screens) */}
        <div className="hidden sm:flex items-center gap-4 flex-1 min-w-0">
          <div className="relative h-12 w-12 rounded overflow-hidden shrink-0 bg-muted">
            <Image src={image} alt={productName} fill className="object-cover" />
          </div>
          <div className="flex flex-col min-w-0 truncate">
            <span className="font-medium text-sm truncate">{productName}</span>
            <PriceDisplay price={price} compareAtPrice={compareAtPrice} className="text-sm" />
          </div>
        </div>

        {/* Action Area */}
        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
          <div className="sm:hidden flex flex-col">
            <PriceDisplay price={price} compareAtPrice={compareAtPrice} className="text-sm" />
          </div>
          <Button onClick={onAddToCart} disabled={!inStock} size="lg" className="w-full sm:w-auto shrink-0 px-8 h-12">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
