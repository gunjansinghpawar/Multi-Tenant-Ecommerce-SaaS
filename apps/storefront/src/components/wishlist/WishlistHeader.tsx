'use client';

import React, { useState } from 'react';
import { useWishlistStore } from '../../store/use-wishlist-store';
import { Button } from '@commercex/ui';
import { Share2, Trash2, ShoppingCart, CheckCircle2 } from 'lucide-react';

export function WishlistHeader() {
  const { items, clearWishlist, bulkMoveToCart } = useWishlistStore();
  const [copied, setCopied] = useState(false);

  const itemCount = items.length;

  const handleShare = () => {
    // Mock sharing by copying a dummy URL
    const dummyUrl = typeof window !== 'undefined' ? `${window.location.origin}/wishlist/shared/12345` : '';
    navigator.clipboard.writeText(dummyUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (itemCount === 0) return null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
        <p className="text-muted-foreground mt-1">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" size="sm" onClick={handleShare} className="gap-2">
          {copied ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
          {copied ? 'Copied Link' : 'Share'}
        </Button>
        <Button variant="outline" size="sm" onClick={clearWishlist} className="gap-2 text-destructive hover:text-destructive">
          <Trash2 className="h-4 w-4" />
          Empty
        </Button>
        <Button size="sm" onClick={bulkMoveToCart} className="gap-2">
          <ShoppingCart className="h-4 w-4" />
          Add All to Cart
        </Button>
      </div>
    </div>
  );
}
