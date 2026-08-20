import React, { Suspense } from 'react';
import { PlpLayout } from '../../../components/plp/plp-layout';
import { notFound } from 'next/navigation';

// Mock DB for products
const MOCK_PRODUCTS = Array.from({ length: 12 }).map((_, i) => ({
  id: `tag-${i}`,
  name: `Tagged Product ${i + 1}`,
  href: `/products/tag-product-${i + 1}`,
  price: 49.99 + (i * 5),
  images: [
    `https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop&sig=${i}`,
  ],
  inStock: true,
}));

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TagPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const resolvedSearchParams = await searchParams;
  
  if (!slug) {
    notFound();
  }

  const title = `Products tagged with "${slug.replace(/-/g, ' ')}"`;
  const description = `Explore our curated selection of products tagged with ${slug.replace(/-/g, ' ')}.`;

  const page = Number(resolvedSearchParams.page) || 1;
  const totalPages = 3; // Mock

  return (
    <Suspense fallback={<div className="h-[500px] flex items-center justify-center">Loading tag...</div>}>
      <PlpLayout 
        title={title} 
        description={description}
        totalResults={MOCK_PRODUCTS.length * totalPages}
        products={MOCK_PRODUCTS}
        currentPage={page}
        totalPages={totalPages}
      />
    </Suspense>
  );
}
