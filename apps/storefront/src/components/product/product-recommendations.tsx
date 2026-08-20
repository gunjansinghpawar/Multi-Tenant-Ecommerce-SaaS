import React from 'react';
import { ProductCard } from './product-card';

// Normally, this would fetch from an API based on productId or category
const MOCK_RECOMMENDATIONS = Array.from({ length: 4 }).map((_, i) => ({
  id: `rec-${i}`,
  name: `Recommended Item ${i + 1}`,
  href: `/products/rec-item-${i + 1}`,
  price: 79.99 + (i * 10),
  images: [
    `https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop&sig=${i+20}`,
  ],
  inStock: true,
}));

interface ProductRecommendationsProps {
  title?: string;
  productId?: string; // Used to fetch related items
  category?: string;  // Used to fetch category-based recommendations
}

export function ProductRecommendations({ title = "You May Also Like", productId, category }: ProductRecommendationsProps) {
  return (
    <section className="py-12 border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {MOCK_RECOMMENDATIONS.map((item) => (
            <ProductCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
