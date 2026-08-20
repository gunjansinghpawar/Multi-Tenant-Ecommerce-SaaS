'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { X, CheckCircle2 } from 'lucide-react';
import { cn } from '@commercex/utils';

interface PurchaseEvent {
  id: string;
  customerName: string;
  location: string;
  productName: string;
  productImage: string;
  productLink: string;
  timeAgo: string;
}

// Dummy data for social proof
const DUMMY_EVENTS: PurchaseEvent[] = [
  {
    id: '1',
    customerName: 'Sarah M.',
    location: 'New York, NY',
    productName: 'Wireless Earbuds Pro',
    productImage: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=200&auto=format&fit=crop',
    productLink: '/products/wireless-earbuds-pro',
    timeAgo: '2 minutes ago'
  },
  {
    id: '2',
    customerName: 'Michael T.',
    location: 'London, UK',
    productName: 'Mechanical Keyboard v2',
    productImage: 'https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=200&auto=format&fit=crop',
    productLink: '/products/mechanical-keyboard-v2',
    timeAgo: '15 minutes ago'
  },
  {
    id: '3',
    customerName: 'Jessica L.',
    location: 'Sydney, AU',
    productName: '4K Web Camera',
    productImage: 'https://images.unsplash.com/photo-1588508119047-9252c79219ea?q=80&w=200&auto=format&fit=crop',
    productLink: '/products/4k-web-camera',
    timeAgo: 'about an hour ago'
  }
];

export function SalesPop() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<PurchaseEvent | null>(null);

  useEffect(() => {
    // Initial delay before showing first popup
    const initialDelay = setTimeout(() => {
      showNextEvent();
    }, 5000);

    return () => clearTimeout(initialDelay);
  }, []);

  const showNextEvent = () => {
    // Pick a random event
    const event = DUMMY_EVENTS[Math.floor(Math.random() * DUMMY_EVENTS.length)];
    setCurrentEvent(event);
    setIsVisible(true);

    // Auto-hide after 5 seconds
    setTimeout(() => {
      setIsVisible(false);
      
      // Schedule next popup after 15-30 seconds
      const nextDelay = Math.floor(Math.random() * (30000 - 15000 + 1) + 15000);
      setTimeout(showNextEvent, nextDelay);
    }, 5000);
  };

  if (!currentEvent) return null;

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-50 w-80 max-w-[calc(100vw-2rem)] bg-background border rounded-lg shadow-lg overflow-hidden transition-all duration-500 ease-in-out transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      )}
    >
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 text-muted-foreground hover:text-foreground z-10"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>

      <Link href={currentEvent.productLink} className="flex p-3 gap-3 hover:bg-muted/50 transition-colors">
        <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0 border">
          <Image
            src={currentEvent.productImage}
            alt={currentEvent.productName}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center flex-1 min-w-0">
          <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
            <span className="font-medium text-foreground">{currentEvent.customerName}</span>
            <span>in {currentEvent.location}</span>
          </div>
          <p className="text-sm font-semibold truncate leading-tight mb-1">
            Purchased {currentEvent.productName}
          </p>
          <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-500">
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified • {currentEvent.timeAgo}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
