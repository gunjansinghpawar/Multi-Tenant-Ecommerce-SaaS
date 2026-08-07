'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useWishlistStore } from '../../store/use-wishlist-store';
import { Button } from '@commercex/ui';
import { ShoppingCart, Trash2, Heart } from 'lucide-react';

export function WishlistGrid() {
  const { items, moveToCart, removeItem } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
          <Heart className="h-10 w-10 text-muted-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Your wishlist is empty</h2>
          <p className="text-muted-foreground mt-2 max-w-md">
            Save items you love to your wishlist. Review them anytime and easily move them to your cart when you're ready to buy.
          </p>
        </div>
        <Link href="/">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
      {items.map((item) => (
        <div key={item.productId} className="group flex flex-col border rounded-xl overflow-hidden bg-card transition-all hover:shadow-md animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="relative aspect-square bg-muted overflow-hidden">
            <Image 
              src={item.image} 
              alt={item.name} 
              fill 
              className="object-cover transition-transform group-hover:scale-105 duration-500"
            />
            {/* Stock badge could go here */}
          </div>
          
          <div className="p-4 flex flex-col flex-1">
            <Link href={`/product/${item.productId}`} className="hover:underline">
              <h3 className="font-semibold line-clamp-2">{item.name}</h3>
            </Link>
            <div className="mt-2 font-bold text-lg">
              ${item.price.toFixed(2)}
            </div>
            
            <div className="mt-auto pt-4 flex gap-2">
              <Button 
                onClick={() => moveToCart(item.productId)}
                className="flex-1 gap-2"
                size="sm"
              >
                <ShoppingCart className="h-4 w-4" /> Cart
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => removeItem(item.productId)}
                className="px-3 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Remove</span>
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
