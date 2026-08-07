import React from 'react';

export function StructuredData({ data }: { data: Record<string, any> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

// Pre-built schemas for easy injection

export function OrganizationSchema({
  name = 'CommerceX Store',
  url = 'https://commercex.com',
  logo = 'https://commercex.com/logo.png',
}: {
  name?: string;
  url?: string;
  logo?: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
  };
  return <StructuredData data={schema} />;
}

export function LocalBusinessSchema({
  name = 'CommerceX Store',
  image = 'https://commercex.com/storefront.png',
  telephone = '+1-800-555-1234',
  address = {
    '@type': 'PostalAddress',
    streetAddress: '123 Commerce St',
    addressLocality: 'San Francisco',
    addressRegion: 'CA',
    postalCode: '94105',
    addressCountry: 'US',
  },
}: {
  name?: string;
  image?: string;
  telephone?: string;
  address?: Record<string, string>;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    image,
    telephone,
    address,
  };
  return <StructuredData data={schema} />;
}

export function ProductSchema({
  name,
  image,
  description,
  sku,
  price,
  currency = 'USD',
  availability = 'https://schema.org/InStock',
}: {
  name: string;
  image: string;
  description: string;
  sku: string;
  price: number;
  currency?: string;
  availability?: string;
}) {
  const schema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name,
    image: [image],
    description,
    sku,
    offers: {
      '@type': 'Offer',
      url: `https://commercex.com/products/${sku}`,
      priceCurrency: currency,
      price: price,
      availability,
      itemCondition: 'https://schema.org/NewCondition',
    },
  };
  return <StructuredData data={schema} />;
}

export function BreadcrumbSchema({
  items,
}: {
  items: { name: string; item: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
  return <StructuredData data={schema} />;
}
