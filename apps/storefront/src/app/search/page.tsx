import React, { Suspense } from 'react';
import { PlpLayout } from '../../components/plp/plp-layout';
import { ProductCard } from '../../components/product/product-card';
import { cn } from '@commercex/utils';
import { redirect } from 'next/navigation';

// Mock DB for products
const MOCK_SEARCH_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `search-${i}`,
  name: `Search Result Item ${i + 1}`,
  href: `/products/search-result-${i + 1}`,
  price: 59.99 + (i * 5),
  images: [
    `https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop&sig=${i}`,
    `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop&sig=${i+1}`
  ],
  brand: i % 2 === 0 ? 'Sony' : 'Bose',
}));

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q as string;

  if (!query) {
    redirect('/');
  }

  const title = `Search results for "${query}"`;
  
  // Dummy filter simulation
  const sort = resolvedSearchParams.sort as string;
  let filteredProducts = [...MOCK_SEARCH_PRODUCTS];

  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <Suspense fallback={<div className="h-[500px] flex items-center justify-center">Loading search results...</div>}>
      <PlpLayout 
        title={title} 
        totalResults={filteredProducts.length}
        products={filteredProducts}
      />
    </Suspense>
  );
}
