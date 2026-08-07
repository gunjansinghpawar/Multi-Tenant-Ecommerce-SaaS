'use client';

import React from 'react';
import { Heart, Share2, Scale, ShoppingCart } from 'lucide-react';
import { Button } from '@commercex/ui';
import { QuantitySelector } from '../cart/quantity-selector';

interface PdpActionsProps {
  onAddToCart: (quantity: number) => void;
  inStock?: boolean;
}

export function PdpActions({ onAddToCart, inStock = true }: PdpActionsProps) {
  const [quantity, setQuantity] = React.useState(1);

  return (
    <div className="flex flex-col gap-4">
      {/* Primary Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <QuantitySelector 
          quantity={quantity} 
          onChange={setQuantity} 
          size="lg" 
          className="w-full sm:w-32 shrink-0" 
        />
        
        <Button 
          size="lg" 
          className="flex-1 text-base h-12"
          onClick={() => onAddToCart(quantity)}
          disabled={!inStock}
        >
          <ShoppingCart className="mr-2 h-5 w-5" />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>

      <Button 
        size="lg" 
        variant="secondary" 
        className="w-full h-12 text-base"
        disabled={!inStock}
      >
        Buy it Now
      </Button>

      {/* Secondary Actions */}
      <div className="flex items-center justify-center sm:justify-start gap-6 pt-4 text-sm font-medium text-muted-foreground">
        <button className="flex items-center gap-2 hover:text-foreground transition-colors">
          <Heart className="h-4 w-4" />
          <span>Add to Wishlist</span>
        </button>
        <button className="flex items-center gap-2 hover:text-foreground transition-colors">
          <Scale className="h-4 w-4" />
          <span>Compare</span>
        </button>
        <button className="flex items-center gap-2 hover:text-foreground transition-colors">
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </button>
      </div>
    </div>
  );
}
