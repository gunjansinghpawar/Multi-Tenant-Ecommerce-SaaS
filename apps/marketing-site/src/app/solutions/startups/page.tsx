import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import Link from 'next/link';
import { Rocket, Zap, Globe, Blocks } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Startups & Emerging Brands | CommerceX',
  description: 'Scale your emerging brand with zero technical debt on CommerceX.',
};

export default function StartupsSolutionsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Rocket size={16} /> Solutions for Startups
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Scale fast with zero technical debt.</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Launch your brand on the only platform that scales from your first sale to millions in GMV without requiring a full replatforming.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 text-base">Start Free Trial</Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base">View Pricing</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="p-8 rounded-2xl bg-card border border-border">
            <Zap className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Launch in Days</h3>
            <p className="text-muted-foreground">Use our visual builder to launch a stunning headless storefront in days, not months.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card border border-border">
            <Globe className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Global from Day 1</h3>
            <p className="text-muted-foreground">Multi-currency, multi-language, and edge-cached out of the box.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card border border-border">
            <Blocks className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">No Replatforming</h3>
            <p className="text-muted-foreground">Start simple, then tap into our GraphQL API when you need custom experiences.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
