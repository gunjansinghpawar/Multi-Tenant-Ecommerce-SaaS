'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@commercex/utils';
import { Maximize2, X } from 'lucide-react';
import { Button, Dialog, DialogContent } from '@commercex/ui';

interface PdpGalleryProps {
  images: string[];
  productName: string;
}

export function PdpGallery({ images, productName }: PdpGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  if (!images?.length) return null;

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 lg:gap-6 sticky top-24">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar shrink-0 w-full md:w-20 lg:w-24 pb-2 md:pb-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={cn(
              "relative aspect-[4/5] w-20 md:w-full rounded-md overflow-hidden border-2 transition-all shrink-0 bg-muted",
              activeIndex === idx ? "border-primary" : "border-transparent hover:border-border"
            )}
            aria-label={`View image ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`${productName} thumbnail ${idx + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80px, 96px"
            />
          </button>
        ))}
      </div>

      {/* Main Image with Inline Zoom */}
      <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden bg-muted flex-1 group">
        <div 
          className="absolute inset-0 z-10 cursor-crosshair"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => { setIsZoomed(false); setZoomStyle({ ...zoomStyle, display: 'none' }); }}
          onMouseMove={handleMouseMove}
          onClick={() => setIsLightboxOpen(true)}
        />
        
        {/* Base Image */}
        <Image
          ref={imageRef}
          src={images[activeIndex]}
          alt={productName}
          fill
          priority
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {/* Zoomed Overlay */}
        {isZoomed && (
          <div 
            className="absolute inset-0 z-20 pointer-events-none rounded-lg"
            style={{
              backgroundImage: `url(${images[activeIndex]})`,
              backgroundSize: '250%',
              backgroundRepeat: 'no-repeat',
              ...zoomStyle
            }}
          />
        )}

        {/* Expand Button */}
        <Button 
          variant="secondary" 
          size="icon" 
          className="absolute top-4 right-4 z-30 h-10 w-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Maximize2 className="h-5 w-5" />
        </Button>
      </div>

      {/* Fullscreen Lightbox */}
      <Dialog open={isLightboxOpen} onOpenChange={setIsLightboxOpen}>
        <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 bg-black border-none flex flex-col justify-center items-center">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
            onClick={() => setIsLightboxOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
          <div className="relative w-full h-full max-h-[90vh]">
            <Image
              src={images[activeIndex]}
              alt={productName}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
