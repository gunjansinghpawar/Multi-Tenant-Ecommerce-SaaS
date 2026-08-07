import React from 'react';
import { HeroSection } from '../components/home/hero-section';
import { CategoryGrid } from '../components/home/category-grid';
import { ProductCarousel } from '../components/home/product-carousel';
import { PromoBanner } from '../components/home/promo-banner';
import { TrustBadges } from '../components/home/trust-badges';

// Mock Data for Premium Look
const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    href: '/products/premium-wireless-headphones',
    price: 349.99,
    compareAtPrice: 399.99,
    images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000&auto=format&fit=crop'],
    brand: 'AudioX',
    badges: [{ label: 'Sale', variant: 'destructive' as const }],
  },
  {
    id: '2',
    name: 'Minimalist Smartwatch Series 7',
    href: '/products/smartwatch-series-7',
    price: 499.00,
    images: ['https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000&auto=format&fit=crop'],
    brand: 'TechWear',
    badges: [{ label: 'New Arrival' }],
  },
  {
    id: '3',
    name: 'Ergonomic Office Chair',
    href: '/products/ergonomic-office-chair',
    price: 299.99,
    images: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1000&auto=format&fit=crop'],
    brand: 'HomeOffice',
  },
  {
    id: '4',
    name: 'Ultra-Light Running Shoes',
    href: '/products/ultra-light-running-shoes',
    price: 129.99,
    compareAtPrice: 159.99,
    images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1000&auto=format&fit=crop'],
    brand: 'Velocity',
    badges: [{ label: 'Bestseller', variant: 'secondary' as const }],
  },
  {
    id: '5',
    name: 'Professional Camera Lens 50mm',
    href: '/products/pro-camera-lens',
    price: 899.00,
    images: ['https://images.unsplash.com/photo-1606986628253-49e3fed9f5d0?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop'],
    brand: 'Optics Pro',
  },
];

const MOCK_CATEGORIES = [
  { title: 'Electronics', href: '/collections/electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=800&auto=format&fit=crop' },
  { title: 'Fashion', href: '/collections/fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=800&auto=format&fit=crop' },
  { title: 'Home & Living', href: '/collections/home', image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=800&auto=format&fit=crop' },
  { title: 'Sports', href: '/collections/sports', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop' },
];

export default function StorefrontHomePage() {
  return (
    <>
      <HeroSection 
        title="The Future of Tech is Here."
        subtitle="Discover our latest collection of premium gadgets designed for the modern lifestyle."
        image="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop"
        align="left"
      />
      
      <TrustBadges />

      <CategoryGrid 
        title="Shop by Category"
        categories={MOCK_CATEGORIES}
      />

      <ProductCarousel 
        title="Trending Right Now"
        subtitle="Our most popular products based on sales."
        products={MOCK_PRODUCTS}
        viewAllLink="/collections/trending"
      />

      <PromoBanner 
        title="Summer Flash Sale"
        description="Up to 50% off on selected items. Offer ends this weekend."
        image="https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=2000&auto=format&fit=crop"
        ctaText="Shop the Sale"
      />

      <ProductCarousel 
        title="New Arrivals"
        subtitle="Be the first to experience our latest drops."
        products={[...MOCK_PRODUCTS].reverse()} // Mocking different products
        viewAllLink="/collections/new"
      />

      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <PromoBanner 
            title="The Sneaker Drop"
            image="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop"
            className="min-h-[300px]"
          />
          <PromoBanner 
            title="Smart Home Essentials"
            image="https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000&auto=format&fit=crop"
            className="min-h-[300px]"
          />
        </div>
      </div>

      <ProductCarousel 
        title="Recommended For You (AI)"
        subtitle="Personalized picks based on your browsing history."
        products={MOCK_PRODUCTS.slice(1, 4)}
      />
    </>
  );
}
