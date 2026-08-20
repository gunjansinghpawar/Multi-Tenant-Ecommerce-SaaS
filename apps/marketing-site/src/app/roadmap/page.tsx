import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Map, Rocket, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Product Roadmap | CommerceX',
  description: 'See what we are building next. View the public roadmap for the CommerceX platform.',
};

export default function RoadmapPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <h1 className="text-display tracking-tight text-foreground mb-6">
          What's next.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Our public roadmap is driven by our merchants and agency partners. See what we're working on right now.
        </p>
      </section>

      <section className="container mx-auto px-4 md:px-6 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Now */}
          <div className="bg-card rounded-[24px] border border-border p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-primary">
              <Rocket size={20} />
              <h2 className="font-bold text-lg">In Progress</h2>
            </div>
            <div className="space-y-4">
              {[
                'Multi-currency checkout V2',
                'Advanced B2B Wholesale Pricing',
                'Custom AI Chatbot Builder for Storefronts',
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-background text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Next */}
          <div className="bg-card rounded-[24px] border border-border p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 text-foreground">
              <Map size={20} />
              <h2 className="font-bold text-lg">Up Next</h2>
            </div>
            <div className="space-y-4">
              {[
                'Native POS Integration',
                'TikTok Shop Sync',
                'Inventory Forecasting AI',
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-background text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Done */}
          <div className="bg-card rounded-[24px] border border-border p-6 opacity-60">
            <div className="flex items-center gap-2 mb-6 text-muted-foreground">
              <CheckCircle2 size={20} />
              <h2 className="font-bold text-lg">Recently Shipped</h2>
            </div>
            <div className="space-y-4 text-muted-foreground line-through">
              {[
                'Edge Caching Layer',
                'WhatsApp Abandoned Cart Flows',
                'Visual Theme Builder',
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-background text-sm font-medium">
                  {item}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
