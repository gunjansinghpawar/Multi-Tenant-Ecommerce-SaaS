import React from 'react';
import { cn } from '@commercex/utils'; // Assuming cn exists in utils

interface PriceDisplayProps {
  price: number;
  compareAtPrice?: number | null;
  currency?: string;
  className?: string;
}

export function PriceDisplay({
  price,
  compareAtPrice,
  currency = 'USD',
  className,
}: PriceDisplayProps) {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  const isOnSale = compareAtPrice && compareAtPrice > price;

  return (
    <div className={cn('flex items-baseline gap-2', className)}>
      <span
        className={cn(
          'font-semibold text-lg',
          isOnSale ? 'text-destructive' : 'text-foreground'
        )}
      >
        {formatPrice(price)}
      </span>
      {isOnSale && (
        <span className="text-sm text-muted-foreground line-through">
          {formatPrice(compareAtPrice)}
        </span>
      )}
    </div>
  );
}
