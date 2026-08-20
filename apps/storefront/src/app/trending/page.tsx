import React, { Suspense } from 'react';
import { PlpLayout } from '../../components/plp/plp-layout';

// Mock DB for products
const MOCK_TRENDING_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `trending-${i}`,
  name: `Trending Item ${i + 1}`,
  href: `/products/trending-item-${i + 1}`,
  price: 69.99 + (i * 10),
  images: [
    `https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop&sig=${i}`,
  ],
  badges: [{ label: 'Trending', variant: 'outline' as const }],
  inStock: true,
}));

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TrendingPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  
  const title = "Trending Now";
  const description = "See what everyone is talking about. Shop our most popular products right now.";

  const page = Number(resolvedSearchParams.page) || 1;
  const totalPages = 3; // Mock

  return (
    <Suspense fallback={<div className="h-[500px] flex items-center justify-center">Loading trending items...</div>}>
      <PlpLayout 
        title={title} 
        description={description}
        totalResults={MOCK_TRENDING_PRODUCTS.length * totalPages}
        products={MOCK_TRENDING_PRODUCTS}
        currentPage={page}
        totalPages={totalPages}
      />
    </Suspense>
  );
}
