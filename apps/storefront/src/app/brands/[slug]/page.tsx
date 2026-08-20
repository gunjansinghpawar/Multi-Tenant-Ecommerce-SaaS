import React, { Suspense } from 'react';
import { PlpLayout } from '../../../components/plp/plp-layout';
import { notFound } from 'next/navigation';

// Mock DB for products
const MOCK_BRAND_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `brand-${i}`,
  name: `Brand Exclusive Item ${i + 1}`,
  href: `/products/brand-item-${i + 1}`,
  price: 149.99 + (i * 20),
  images: [
    `https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop&sig=${i+10}`,
  ],
  inStock: true,
}));

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function BrandPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const resolvedSearchParams = await searchParams;
  
  if (!slug) {
    notFound();
  }

  const brandName = slug.split('-').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  const title = `${brandName} Collection`;
  const description = `Shop the latest and greatest from ${brandName}. Exclusive products and deals.`;

  // We assign all products to this brand for demo purposes
  const products = MOCK_BRAND_PRODUCTS.map(p => ({ ...p, brand: brandName }));

  const page = Number(resolvedSearchParams.page) || 1;
  const totalPages = 4; // Mock

  return (
    <Suspense fallback={<div className="h-[500px] flex items-center justify-center">Loading brand...</div>}>
      <PlpLayout 
        title={title} 
        description={description}
        totalResults={products.length * totalPages}
        products={products}
        currentPage={page}
        totalPages={totalPages}
      />
    </Suspense>
  );
}
