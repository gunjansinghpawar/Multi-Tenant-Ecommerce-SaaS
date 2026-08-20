import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Store, CreditCard, Box, MapPin } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Omnichannel Retail | CommerceX',
  description: 'Unify your physical stores and digital channels.',
};

export default function RetailSolutionsPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Store size={16} /> Solutions for Retail
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Unify online and offline.</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Connect your physical point-of-sale with your digital storefront for true omnichannel commerce. Buy online, pick up in store.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="rounded-full px-8 text-base">Talk to Retail Sales</Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="p-8 rounded-2xl bg-card border border-border">
            <CreditCard className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Unified POS API</h3>
            <p className="text-muted-foreground">Sync orders, customers, and inventory in real-time across all locations.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card border border-border">
            <MapPin className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">BOPIS & Local Delivery</h3>
            <p className="text-muted-foreground">Native support for Buy Online, Pick Up In Store and local route optimization.</p>
          </div>
          <div className="p-8 rounded-2xl bg-card border border-border">
            <Box className="text-primary mb-4" size={32} />
            <h3 className="text-xl font-bold mb-2">Multi-Location Inventory</h3>
            <p className="text-muted-foreground">Route fulfillment to the warehouse or retail store closest to the customer.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
