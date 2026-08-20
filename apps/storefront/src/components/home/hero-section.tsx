'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@commercex/ui';
import { cn } from '@commercex/utils';

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  image: string;
  ctaText?: string;
  ctaLink?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function HeroSection({
  title,
  subtitle,
  image,
  ctaText = 'Shop Now',
  ctaLink = '/collections/all',
  align = 'center',
  className,
}: HeroSectionProps) {
  return (
    <section className={cn("relative h-[70vh] min-h-[500px] w-full overflow-hidden bg-muted", className)}>
      {/* Background Image */}
      <Image
        src={image}
        alt="Hero background"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="container relative h-full mx-auto">
        <div
          className={cn(
            "flex h-full flex-col justify-center max-w-2xl",
            align === 'center' && "items-center text-center mx-auto",
            align === 'right' && "items-end text-right ml-auto",
            align === 'left' && "items-start text-left"
          )}
        >
          <h1 className="mb-4 text-3xl font-extrabold tracking-tight text-white xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mb-8 max-w-xl text-lg text-white/90 sm:text-xl">
              {subtitle}
            </p>
          )}
          <Button size="lg" className="rounded-full px-8 text-base h-14" asChild>
            <Link href={ctaLink}>
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
