'use client';

import React from 'react';
import { Truck, ShieldCheck, Clock, CreditCard } from 'lucide-react';

const badges = [
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On all orders over $100',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    icon: Clock,
    title: '30 Days Return',
    description: 'No questions asked',
  },
  {
    icon: CreditCard,
    title: 'Flexible Pay',
    description: 'Pay with multiple methods',
  },
];

export function TrustBadges() {
  return (
    <section className="py-12 border-y border-border/50 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex flex-col items-center text-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{badge.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
