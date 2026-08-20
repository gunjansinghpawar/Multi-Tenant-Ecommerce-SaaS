'use client';

import React, { useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@commercex/ui';
import { ProductCard, ProductCardProps } from '../product/product-card';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
  products: ProductCardProps[];
  viewAllLink?: string;
}

export function ProductCarousel({ title, subtitle, products, viewAllLink }: ProductCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start', dragFree: true },
    [Autoplay({ delay: 4000, stopOnInteraction: true, rootNode: (emblaRoot) => emblaRoot.parentElement })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-16 md:py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
            {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
          </div>
          {viewAllLink && (
            <div className="hidden md:flex items-center gap-4">
              <div className="flex space-x-2 mr-4">
                <button 
                  onClick={scrollPrev}
                  aria-label="Previous products"
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button 
                  onClick={scrollNext}
                  aria-label="Next products"
                  className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
              <Button variant="link" className="p-0 h-auto" asChild>
                <Link href={viewAllLink}>
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Continuous Carousel Container */}
        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y" style={{ backfaceVisibility: 'hidden' }}>
              {products.map((product) => (
                <div key={product.id} className="min-w-0 flex-[0_0_280px] md:flex-[0_0_320px] mr-4 md:mr-6">
                  <ProductCard {...product} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {viewAllLink && (
          <div className="mt-8 flex justify-center md:hidden">
            <Button variant="outline" className="w-full" asChild>
              <Link href={viewAllLink}>
                View All
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
