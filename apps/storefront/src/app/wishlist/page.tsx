import React from 'react';
import { WishlistHeader } from '../../components/wishlist/WishlistHeader';
import { WishlistGrid } from '../../components/wishlist/WishlistGrid';

export default function WishlistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <WishlistHeader />
      <WishlistGrid />
    </div>
  );
}
