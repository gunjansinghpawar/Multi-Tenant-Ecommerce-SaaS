'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Eye, ShoppingCart } from 'lucide-react';
import { Button, Badge } from '@commercex/ui';
import { cn } from '@commercex/utils';
import { PriceDisplay } from './price-display';
import { useCartStore } from '../../store/use-cart-store';
import { useUiStore } from '../../store/use-ui-store';
import { useWishlistStore } from '../../store/use-wishlist-store';

export interface ProductCardProps {
  id: string;
  name: string;
  href: string;
  price: number;
  compareAtPrice?: number | null;
  images: string[];
  brand?: string;
  badges?: { label: string; variant?: 'default' | 'secondary' | 'destructive' | 'outline' }[];
  inStock?: boolean;
  className?: string;
}

export function ProductCard({
  id,
  name,
  href,
  price,
  compareAtPrice,
  images,
  brand,
  badges = [],
  inStock = true,
  className,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const openQuickView = useUiStore((state) => state.openQuickView);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } = useWishlistStore();

  // Defer reading persisted wishlist state until after hydration to prevent mismatch
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const primaryImage = images[0] || '/placeholder.svg';
  const secondaryImage = images[1] || primaryImage;
  const inWishlist = hasMounted && isInWishlist(id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeWishlist(id);
    } else {
      addWishlist({
        productId: id,
        name,
        price,
        image: primaryImage,
        inStock
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!inStock) return;
    addItem({
      id: crypto.randomUUID(),
      productId: id,
      name,
      price,
      quantity: 1,
      image: primaryImage,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    openQuickView(id);
  };

  return (
    <div
      className={cn('group relative flex flex-col', className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges Container */}
      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
        {badges.map((badge, idx) => (
          <Badge key={idx} variant={badge.variant || 'default'} className="px-2 py-0.5 text-xs font-semibold">
            {badge.label}
          </Badge>
        ))}
        {!inStock && (
          <Badge variant="secondary" className="px-2 py-0.5 text-xs font-semibold">
            Out of Stock
          </Badge>
        )}
      </div>

      {/* Floating Actions (Visible on mobile, hover on desktop) */}
      <div className="absolute top-2 right-2 z-10 flex flex-col gap-2 md:translate-x-4 md:opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
        <Button 
          size="icon" 
          variant="secondary" 
          className={cn(
            "h-8 w-8 rounded-full shadow-sm transition-colors",
            inWishlist ? "bg-primary text-primary-foreground hover:bg-primary/90" : "hover:bg-primary hover:text-primary-foreground"
          )} 
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          onClick={handleWishlistToggle}
        >
          <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
        </Button>
        <Button 
          size="icon" 
          variant="secondary" 
          className="h-8 w-8 rounded-full shadow-sm hover:bg-primary hover:text-primary-foreground transition-colors" 
          aria-label="Quick view"
          onClick={handleQuickView}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>

      {/* Image Container */}
      <Link href={href} className="relative aspect-[4/5] overflow-hidden rounded-lg bg-muted mb-3 block" aria-label={`View details for ${name}`}>
        <Image
          src={isHovered ? secondaryImage : primaryImage}
          alt={`Image of ${name}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1">
        {brand && <span className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{brand}</span>}
        <Link href={href} className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2 mb-1">
          {name}
        </Link>
        <PriceDisplay price={price} compareAtPrice={compareAtPrice} className="mt-auto mb-3" />

        {/* Add to Cart Button (Mobile visible, Desktop hover) */}
        <Button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={cn(
            'w-full md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300',
          )}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>
    </div>
  );
}
