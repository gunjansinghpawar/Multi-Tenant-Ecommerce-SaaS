'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@commercex/utils';

interface ProductGalleryProps {
  images: string[];
  alt?: string;
  className?: string;
}

export function ProductGallery({ images, alt = 'Product Image', className }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className={cn("relative aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center", className)}>
        <span className="text-muted-foreground text-sm">No image available</span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col md:flex-row gap-4", className)}>
      {/* Thumbnails (Desktop: Left, Mobile: Bottom) */}
      <div className="flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-y-auto no-scrollbar md:w-20 lg:w-24 shrink-0 pb-2 md:pb-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "relative aspect-square w-16 md:w-full rounded-md overflow-hidden border-2 transition-all shrink-0 bg-muted",
              activeIndex === idx ? "border-primary" : "border-transparent hover:border-border"
            )}
            aria-label={`View image ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`${alt} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 64px, 96px"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="relative aspect-square w-full rounded-lg overflow-hidden order-1 md:order-2 bg-muted border border-border/50">
        <Image
          src={images[activeIndex]}
          alt={`${alt} main view`}
          fill
          priority
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
}
