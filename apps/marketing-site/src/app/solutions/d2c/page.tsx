import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Package, Smartphone, RefreshCw, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'D2C Brands | CommerceX',
  description: 'Direct-to-consumer digital experiences that convert.',
};

export default function D2CSolutionsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Package size={16} /> Solutions for D2C Brands
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Digital experiences that convert.</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Build immersive, lightning-fast direct-to-consumer storefronts that drive brand loyalty and maximize LTV.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 text-base">Book a Demo</Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base">Explore Features</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="p-8 rounded-2xl bg-card border border-border">
            <Smartphone className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Mobile-First headless</h3>
            <p className="text-muted-foreground">Deliver app-like performance on mobile web with sub-second page loads.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card border border-border">
            <RefreshCw className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Native Subscriptions</h3>
            <p className="text-muted-foreground">Manage recurring revenue without relying on expensive 3rd party apps.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card border border-border">
            <TrendingUp className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Advanced Merchandising</h3>
            <p className="text-muted-foreground">AI-driven product recommendations and personalized collections.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
