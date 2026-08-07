import React, { Suspense } from 'react';
import { PlpLayout } from '../../../components/plp/plp-layout';
import { SeoBlock } from '../../../components/plp/seo-block';
import { ProductCard } from '../../../components/product/product-card';
import { cn } from '@commercex/utils';
import { notFound } from 'next/navigation';

// Mock DB for products
const MOCK_PLP_PRODUCTS = Array.from({ length: 24 }).map((_, i) => ({
  id: `plp-${i}`,
  name: `Premium Product ${i + 1}`,
  href: `/products/premium-product-${i + 1}`,
  price: 99.99 + (i * 10),
  compareAtPrice: i % 3 === 0 ? 149.99 + (i * 10) : undefined,
  images: [
    `https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=800&auto=format&fit=crop&sig=${i}`,
    `https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=800&auto=format&fit=crop&sig=${i+1}`
  ],
  brand: i % 2 === 0 ? 'Nike' : 'Adidas',
  badges: i % 5 === 0 ? [{ label: 'Bestseller' }] : [],
}));

// We need to resolve the search parameters asynchronously in Server Components in Next 15
interface PageProps {
  params: Promise<{ slug: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CollectionPage({ params, searchParams }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const resolvedSearchParams = await searchParams;
  
  if (!slug || slug.length === 0) {
    notFound();
  }

  // Derive title from slug (e.g., ['mens', 'shoes'] -> "Mens Shoes")
  const title = slug.map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ');
  const description = `Discover our exclusive collection of ${title.toLowerCase()}. Designed for performance, comfort, and unmatched style.`;

  // Server-side filtering logic based on searchParams
  // In a real app, you would pass these params to your backend API
  const sort = resolvedSearchParams.sort as string;
  const colorFilters = resolvedSearchParams.color as string;
  const brandFilters = resolvedSearchParams.brand as string;
  const categoryFilters = resolvedSearchParams.category as string;
  const sizeFilters = resolvedSearchParams.size as string;

  let filteredProducts = [...MOCK_PLP_PRODUCTS];

  // Dummy filter simulation
  if (brandFilters) {
    const brands = brandFilters.split(',').map(b => b.toLowerCase());
    filteredProducts = filteredProducts.filter(p => p.brand && brands.includes(p.brand.toLowerCase()));
  }

  // Dummy sort simulation
  if (sort === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sort === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <Suspense fallback={<div className="h-[500px] flex items-center justify-center">Loading collection...</div>}>
        <PlpLayout 
          title={title} 
          description={description} 
          totalResults={filteredProducts.length}
          products={filteredProducts}
        />
      </Suspense>

      <SeoBlock 
        title={`More about ${title}`}
        content={
          <>
            <p>
              Welcome to our definitive guide and collection for {title}. Whether you are a professional athlete or a casual enthusiast, finding the right gear is essential. Our selection is curated to provide you with the best options available in the market today.
            </p>
            <p>
              <strong>Quality Materials:</strong> Every product in this collection is crafted from premium materials ensuring durability and comfort. We partner with top-tier manufacturers who adhere to strict quality control standards.
            </p>
            <p>
              <strong>Innovative Design:</strong> Innovation is at the heart of our {title} collection. Expect cutting-edge features, ergonomic designs, and aesthetic appeal that stands out from the crowd. Shop now and experience the difference.
            </p>
          </>
        }
      />
    </>
  );
}
