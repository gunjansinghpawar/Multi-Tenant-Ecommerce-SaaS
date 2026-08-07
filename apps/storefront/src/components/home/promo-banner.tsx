'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@commercex/ui';
import { cn } from '@commercex/utils';

interface PromoBannerProps {
  title: string;
  description?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  align?: 'left' | 'right';
  className?: string;
}

export function PromoBanner({
  title,
  description,
  image,
  ctaText = 'Discover Now',
  ctaLink = '/collections/sale',
  align = 'left',
  className
}: PromoBannerProps) {
  return (
    <section className="py-16 md:py-24 container mx-auto px-4 sm:px-6 lg:px-8">
      <div className={cn("relative rounded-3xl overflow-hidden bg-muted min-h-[400px] flex items-center", className)}>
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        
        <div className={cn(
          "relative z-10 p-8 md:p-16 max-w-2xl text-white",
          align === 'right' && "ml-auto text-right",
          align === 'left' && "mr-auto text-left"
        )}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">{title}</h2>
          {description && (
            <p className="text-lg md:text-xl text-white/90 mb-8">{description}</p>
          )}
          <Button size="lg" variant="default" className="rounded-full" asChild>
            <Link href={ctaLink}>
              {ctaText} <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
