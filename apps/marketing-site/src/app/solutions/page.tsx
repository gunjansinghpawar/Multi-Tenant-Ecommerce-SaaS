import React from 'react';
import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Building2, Rocket, Briefcase, Store } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Ecommerce Solutions | CommerceX',
  description: 'Tailored ecommerce solutions for Startups, D2C brands, Retailers, Agencies, and Enterprise organizations.',
};

const solutions = [
  {
    title: 'For Startups & D2C',
    description: 'Launch your first store with enterprise-grade infrastructure. No need to migrate later when you scale.',
    icon: Rocket,
    href: '/solutions/startups'
  },
  {
    title: 'For Retail Brands',
    description: 'Bring your physical retail presence online with seamless inventory syncing and omnichannel tooling.',
    icon: Store,
    href: '/solutions/retail'
  },
  {
    title: 'For Agencies',
    description: 'Manage dozens of client stores from a single multi-tenant admin panel with centralized billing.',
    icon: Briefcase,
    href: '/solutions/agencies'
  },
  {
    title: 'For Enterprise',
    description: 'Custom SLAs, headless architecture, and dedicated support for high-volume, multi-brand companies.',
    icon: Building2,
    href: '/solutions/enterprise'
  }
];

export default function SolutionsPage() {
  return (
    <div className="pt-24 pb-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">Solutions for every scale</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Whether you are launching your first D2C brand or managing a portfolio of 50 enterprise storefronts, CommerceX adapts to your operational needs.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          {solutions.map((solution) => (
            <div key={solution.title} className="p-8 rounded-3xl border border-border bg-card hover:border-primary/50 transition-colors shadow-sm group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <solution.icon size={28} />
              </div>
              <h2 className="text-2xl font-bold mb-4">{solution.title}</h2>
              <p className="text-muted-foreground mb-8 text-lg">{solution.description}</p>
              <Link href={solution.href}>
                <Button variant="outline" className="rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Explore Solution
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
