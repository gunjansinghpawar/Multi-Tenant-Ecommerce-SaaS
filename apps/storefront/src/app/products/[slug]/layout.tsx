import React from 'react';
import type { Metadata } from 'next';
import { ProductSchema, BreadcrumbSchema } from '../../../components/seo/structured-data';

// Mock Product Data (Same as page.tsx)
const MOCK_PRODUCT = {
  id: 'prod_123',
  name: 'Minimalist Smartwatch Series 7',
  brand: 'TechWear',
  price: 499.00,
  compareAtPrice: 599.00,
  rating: 4.8,
  reviewCount: 124,
  description: 'The Series 7 features the largest, most advanced Always-on OLED display yet. It is the most durable smartwatch ever built, with crack-resistant front crystal. It brings a new dimension of connectivity and health tracking right to your wrist.',
  images: [
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1200&auto=format&fit=crop',
  ],
};

// In Next.js 13+, generateMetadata must be a server component feature.
// By placing it in layout.tsx, we can generate metadata for the PDP route.
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = MOCK_PRODUCT; // In real app, fetch based on slug

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0] }],
    },
    alternates: {
      canonical: `/products/${slug}`,
    }
  };
}

export default async function ProductLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = MOCK_PRODUCT;

  const breadcrumbs = [
    { name: 'Home', item: '/' },
    { name: 'Products', item: '/collections/all' },
    { name: product.name, item: `/products/${slug}` },
  ];

  return (
    <>
      <ProductSchema
        name={product.name}
        description={product.description}
        image={product.images[0]}
        sku={product.id}
        price={product.price}
      />
      <BreadcrumbSchema items={breadcrumbs} />
      {children}
    </>
  );
}
