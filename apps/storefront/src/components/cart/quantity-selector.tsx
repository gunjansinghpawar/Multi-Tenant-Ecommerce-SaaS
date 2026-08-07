'use client';

import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { Button } from '@commercex/ui';
import { cn } from '@commercex/utils';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  allowRemove?: boolean;
}

export function QuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 99,
  className,
  size = 'md',
  allowRemove = false,
}: QuantitySelectorProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    } else if (allowRemove && quantity <= min) {
      onChange(0);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onChange(quantity + 1);
    }
  };

  return (
    <div
      className={cn(
        'flex items-center border border-border rounded-md',
        {
          'h-8': size === 'sm',
          'h-10': size === 'md',
          'h-12': size === 'lg',
        },
        className
      )}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('rounded-none rounded-l-md h-full', {
          'w-8': size === 'sm',
          'w-10': size === 'md',
          'w-12': size === 'lg',
        })}
        onClick={handleDecrement}
        disabled={!allowRemove && quantity <= min}
      >
        {allowRemove && quantity <= min ? (
          <Trash2 className={cn('h-4 w-4 text-destructive', size === 'sm' && 'h-3 w-3')} />
        ) : (
          <Minus className={cn('h-4 w-4', size === 'sm' && 'h-3 w-3')} />
        )}
        <span className="sr-only">{allowRemove && quantity <= min ? 'Remove item' : 'Decrease quantity'}</span>
      </Button>
      
      <div className="flex-1 flex items-center justify-center min-w-[3ch] text-sm font-medium">
        {quantity}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn('rounded-none rounded-r-md h-full', {
          'w-8': size === 'sm',
          'w-10': size === 'md',
          'w-12': size === 'lg',
        })}
        onClick={handleIncrement}
        disabled={quantity >= max}
      >
        <Plus className={cn('h-4 w-4', size === 'sm' && 'h-3 w-3')} />
        <span className="sr-only">Increase quantity</span>
      </Button>
    </div>
  );
}
