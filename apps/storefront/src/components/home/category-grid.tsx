'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface Category {
  title: string;
  image: string;
  href: string;
}

interface CategoryGridProps {
  title: string;
  categories: Category[];
}

export function CategoryGrid({ title, categories }: CategoryGridProps) {
  return (
    <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-8 md:mb-12">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
        {categories.map((category) => (
          <Link 
            key={category.title} 
            href={category.href}
            className="group relative flex flex-col items-center gap-4"
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-full bg-muted shadow-sm transition-transform duration-300 group-hover:shadow-md">
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <h3 className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
              {category.title}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
