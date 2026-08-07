'use client';

import { use } from 'react';
import { CampaignProductCard } from '@/components/campaigns/CampaignProductCard';

export default function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  
  // Simulated Brand Data
  const brand = {
    name: resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1).replace('-', ' '),
    description: "Crafting sustainable, high-performance gear for the modern explorer since 2010.",
    heroImage: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?q=80&w=2874&auto=format&fit=crop',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
    products: [
      { id: '1', name: 'Pro Camera Backpack', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop', originalPrice: 150, salePrice: 150 },
      { id: '2', name: 'All-Weather Jacket', image: 'https://images.unsplash.com/photo-1551028719-0125fd6b2088?q=80&w=800&auto=format&fit=crop', originalPrice: 200, salePrice: 180 },
      { id: '3', name: 'Titanium Water Bottle', image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop', originalPrice: 45, salePrice: 45 },
      { id: '4', name: 'Hiking Boots', image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=800&auto=format&fit=crop', originalPrice: 180, salePrice: 140 },
    ]
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pb-24">
      {/* Brand Hero */}
      <div className="relative w-full h-[50vh] min-h-[400px]">
        <img
          src={brand.heroImage}
          alt={brand.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Brand Info Overlay */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-24 z-10 mb-16">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 sm:p-12 shadow-2xl flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-900 shadow-lg mb-6 md:mb-0 md:mr-8 flex-shrink-0">
            <img src={brand.logo} alt="Logo" className="w-full h-full object-cover bg-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{brand.name}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">{brand.description}</p>
          </div>
          <div className="mt-8 md:mt-0 md:ml-auto">
             <button className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors">
               Follow Brand
             </button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Latest Collection</h2>
          <span className="text-gray-500">{brand.products.length} Products</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brand.products.map(product => (
            <CampaignProductCard key={product.id} product={product} theme="light" />
          ))}
        </div>
      </section>
    </main>
  );
}
