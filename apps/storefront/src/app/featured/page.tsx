import React, { Suspense } from 'react';
import { PlpLayout } from '../../components/plp/plp-layout';

// Mock DB for products
const MOCK_FEATURED_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `featured-${i}`,
  name: `Featured Item ${i + 1}`,
  href: `/products/featured-item-${i + 1}`,
  price: 129.99 + (i * 15),
  images: [
    `https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop&sig=${i}`,
  ],
  badges: [{ label: 'Featured', variant: 'secondary' as const }],
  inStock: true,
}));

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function FeaturedPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  
  const title = "Featured Selection";
  const description = "Handpicked by our experts, these products represent the very best of our catalog.";

  const page = Number(resolvedSearchParams.page) || 1;
  const totalPages = 2; // Mock

  return (
    <Suspense fallback={<div className="h-[500px] flex items-center justify-center">Loading featured items...</div>}>
      <PlpLayout 
        title={title} 
        description={description}
        totalResults={MOCK_FEATURED_PRODUCTS.length * totalPages}
        products={MOCK_FEATURED_PRODUCTS}
        currentPage={page}
        totalPages={totalPages}
      />
    </Suspense>
  );
}
