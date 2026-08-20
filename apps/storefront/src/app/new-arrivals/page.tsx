import React, { Suspense } from 'react';
import { PlpLayout } from '../../components/plp/plp-layout';

// Mock DB for products
const MOCK_NEW_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `new-${i}`,
  name: `New Arrival Item ${i + 1}`,
  href: `/products/new-item-${i + 1}`,
  price: 89.99 + (i * 5),
  images: [
    `https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop&sig=${i}`,
  ],
  badges: [{ label: 'New', variant: 'default' as const }],
  inStock: true,
}));

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function NewArrivalsPage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  
  const title = "New Arrivals";
  const description = "Discover the latest additions to our collection. Be the first to wear our newest styles.";

  const page = Number(resolvedSearchParams.page) || 1;
  const totalPages = 3; // Mock

  return (
    <Suspense fallback={<div className="h-[500px] flex items-center justify-center">Loading new arrivals...</div>}>
      <PlpLayout 
        title={title} 
        description={description}
        totalResults={MOCK_NEW_PRODUCTS.length * totalPages}
        products={MOCK_NEW_PRODUCTS}
        currentPage={page}
        totalPages={totalPages}
      />
    </Suspense>
  );
}
