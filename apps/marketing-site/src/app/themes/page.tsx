import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Search, MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Theme Marketplace | CommerceX',
  description: 'Discover premium, conversion-optimized themes for your ecommerce storefront. Fully responsive and customizable.',
};

export default function ThemesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="max-w-4xl space-y-6 text-center mx-auto">
          <h1 className="text-display tracking-tight text-foreground">
            Stunning storefronts.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Start with a world-class foundation. Browse our curated marketplace of premium, high-converting themes engineered specifically for the CommerceX engine.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="flex gap-4 overflow-x-auto pb-4 mb-12 snap-x">
          {['All Industries', 'Fashion', 'Electronics', 'Beauty', 'Food & Grocery', 'B2B Wholesale'].map((cat, i) => (
            <button key={cat} className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-colors snap-start ${i === 0 ? 'bg-foreground text-background' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="group rounded-[24px] border border-border bg-card overflow-hidden shadow-sm hover:shadow-lg transition-all">
              <div className="aspect-[4/3] bg-muted relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <Button variant="secondary" className="rounded-full shadow-lg">Preview Theme</Button>
                </div>
                <MonitorSmartphone size={48} className="text-muted-foreground/30" />
              </div>
              <div className="p-6 flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">Lumina {i}</h3>
                  <p className="text-sm text-muted-foreground">Minimal Fashion</p>
                </div>
                <div className="text-sm font-bold bg-primary/10 text-primary px-3 py-1 rounded-full">Free</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
