import React, { Suspense } from 'react';
import { PlpLayout } from '../../components/plp/plp-layout';

// Mock DB for products
const MOCK_SALE_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `sale-${i}`,
  name: `Discounted Item ${i + 1}`,
  href: `/products/sale-item-${i + 1}`,
  price: 29.99 + (i * 5),
  compareAtPrice: 59.99 + (i * 10),
  images: [
    `https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=800&auto=format&fit=crop&sig=${i}`,
  ],
  badges: [{ label: 'Sale', variant: 'destructive' as const }],
  inStock: true,
}));

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SalePage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  
  const title = "Clearance Sale";
  const description = "Shop our biggest discounts of the year. Limited stock available.";

  const page = Number(resolvedSearchParams.page) || 1;
  const totalPages = 4; // Mock

  return (
    <Suspense fallback={<div className="h-[500px] flex items-center justify-center">Loading sale items...</div>}>
      <PlpLayout 
        title={title} 
        description={description}
        totalResults={MOCK_SALE_PRODUCTS.length * totalPages}
        products={MOCK_SALE_PRODUCTS}
        currentPage={page}
        totalPages={totalPages}
      />
    </Suspense>
  );
}
