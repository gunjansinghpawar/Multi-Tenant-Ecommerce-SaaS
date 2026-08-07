'use client';

import { Sparkles } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
}

interface SmartRecommendationsGridProps {
  title: string;
  subtitle?: string;
  products: Product[];
  contextLabel?: string; // e.g., "Based on your search for 'boots'"
}

export function SmartRecommendationsGrid({ title, subtitle, products, contextLabel }: SmartRecommendationsGridProps) {
  return (
    <section className="py-12 relative">
      
      {/* AI Context Banner */}
      {contextLabel && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black dark:bg-white text-white dark:text-black text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center whitespace-nowrap z-10">
          <Sparkles className="w-3 h-3 mr-1.5 text-yellow-400 dark:text-yellow-600" />
          {contextLabel}
        </div>
      )}

      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-2 text-gray-500 dark:text-gray-400">{subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {products.map((product) => (
          <Link key={product.id} href={product.href} className="group flex flex-col">
            <div className="relative aspect-[4/5] bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden mb-4">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1 group-hover:underline">{product.name}</h3>
            <p className="text-gray-500 mt-1">${product.price.toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
