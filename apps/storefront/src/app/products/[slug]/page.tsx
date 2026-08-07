'use client'; // Marking as client to handle useCartStore internally for now

import React from 'react';
import { notFound } from 'next/navigation';
import { PdpGallery } from '../../../components/pdp/pdp-gallery';
import { PdpInfo } from '../../../components/pdp/pdp-info';
import { PdpActions } from '../../../components/pdp/pdp-actions';
import { PdpDelivery } from '../../../components/pdp/pdp-delivery';
import { PdpTabs } from '../../../components/pdp/pdp-tabs';
import { StickyAtc } from '../../../components/pdp/sticky-atc';
import { ProductCarousel } from '../../../components/home/product-carousel';
import { useCartStore } from '../../../store/use-cart-store';

// Mock Product Data
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
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1551816230-ef5ce36200fc?q=80&w=1200&auto=format&fit=crop',
  ],
  variants: [
    {
      name: 'Color',
      options: [
        { label: 'Midnight Black', value: 'midnight', colorCode: '#1a1a1a' },
        { label: 'Starlight Silver', value: 'starlight', colorCode: '#e8e8e8' },
        { label: 'Product Red', value: 'red', colorCode: '#cc0000', disabled: true },
      ]
    },
    {
      name: 'Size',
      options: [
        { label: '41mm', value: '41mm' },
        { label: '45mm', value: '45mm' },
      ]
    }
  ],
  specifications: {
    'Display': 'Always-On Retina LTPO OLED',
    'Water Resistance': '50 meters (WR50)',
    'Processor': 'S7 SiP with 64-bit dual-core processor',
    'Connectivity': 'Wi-Fi 802.11b/g/n, Bluetooth 5.0',
    'Battery Life': 'Up to 18 hours',
  },
  faqs: [
    { q: 'Is it waterproof?', a: 'It is water-resistant up to 50 meters, meaning you can wear it while swimming.' },
    { q: 'Does it work with Android?', a: 'No, this smartwatch requires an iOS device to function properly.' },
    { q: 'How long does the battery last?', a: 'The battery lasts up to 18 hours on a single charge with standard usage.' },
  ]
};

const MOCK_RELATED = Array.from({ length: 6 }).map((_, i) => ({
  id: `rel-${i}`,
  name: `Tech Accessory ${i + 1}`,
  href: `/products/tech-accessory-${i + 1}`,
  price: 49.99 + (i * 10),
  images: [
    `https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=800&auto=format&fit=crop&sig=${i}`,
  ],
}));

import { use } from 'react';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { addItem } = useCartStore();
  const { slug } = use(params);

  // In a real app, you would use React.use(params) or await params, but since this is mocked client component for now:
  if (!slug) notFound();

  const handleAddToCart = (quantity: number) => {
    addItem({
      id: crypto.randomUUID(),
      productId: MOCK_PRODUCT.id,
      name: MOCK_PRODUCT.name,
      price: MOCK_PRODUCT.price,
      quantity,
      image: MOCK_PRODUCT.images[0],
    });
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb could go here */}
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mb-16">
          {/* Left Column: Gallery */}
          <div className="w-full lg:w-[60%]">
            <PdpGallery images={MOCK_PRODUCT.images} productName={MOCK_PRODUCT.name} />
          </div>

          {/* Right Column: Info & Actions */}
          <div className="w-full lg:w-[40%] flex flex-col gap-8">
            <PdpInfo 
              title={MOCK_PRODUCT.name}
              brand={MOCK_PRODUCT.brand}
              price={MOCK_PRODUCT.price}
              compareAtPrice={MOCK_PRODUCT.compareAtPrice}
              rating={MOCK_PRODUCT.rating}
              reviewCount={MOCK_PRODUCT.reviewCount}
              description={MOCK_PRODUCT.description}
              variants={MOCK_PRODUCT.variants}
            />

            <PdpActions onAddToCart={handleAddToCart} />
            
            <PdpDelivery />
          </div>
        </div>

        {/* Product Tabs (Description, Specs, Reviews) */}
        <div className="mb-24">
          <PdpTabs 
            description={MOCK_PRODUCT.description}
            specifications={MOCK_PRODUCT.specifications}
            faqs={MOCK_PRODUCT.faqs}
          />
        </div>
      </div>

      {/* Cross-Sell & Upsell Sections */}
      <ProductCarousel 
        title="Frequently Bought Together"
        products={MOCK_RELATED.slice(0, 4)}
      />
      
      <ProductCarousel 
        title="You May Also Like"
        products={MOCK_RELATED}
      />

      {/* Sticky Add to Cart Bar */}
      <StickyAtc 
        productName={MOCK_PRODUCT.name}
        price={MOCK_PRODUCT.price}
        compareAtPrice={MOCK_PRODUCT.compareAtPrice}
        image={MOCK_PRODUCT.images[0]}
        onAddToCart={() => handleAddToCart(1)}
      />
    </>
  );
}
