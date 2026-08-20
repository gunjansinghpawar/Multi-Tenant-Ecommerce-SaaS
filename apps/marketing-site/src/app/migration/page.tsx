import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { ArrowRightLeft, Database, Code2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Platform Migration | CommerceX',
  description: 'Seamlessly migrate your existing ecommerce business to CommerceX with our dedicated engineering support.',
};

export default function MigrationPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            <ArrowRightLeft className="mr-2 h-4 w-4" /> Migration Services
          </div>
          <h1 className="text-display tracking-tight text-foreground">
            Move to CommerceX.<br/>Without the downtime.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Our expert solutions engineers map your data, port your design, and execute the migration so your customers never notice the transition.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div className="p-8 rounded-[24px] bg-card border border-border shadow-sm">
            <Database className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-h4 mb-3">Automated Data Import</h3>
            <p className="text-muted-foreground mb-6">
              Migrate products, variants, customers, and order history directly from Shopify, WooCommerce, Magento, or custom databases using our automated import tooling.
            </p>
            <Button variant="outline" className="rounded-full">Read Migration Docs</Button>
          </div>
          
          <div className="p-8 rounded-[24px] bg-card border border-border shadow-sm">
            <Code2 className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-h4 mb-3">Whiteglove Engineering</h3>
            <p className="text-muted-foreground mb-6">
              For high-volume merchants, our Enterprise team handles the entire technical transition. We map bespoke integrations and handle custom frontend rebuilds.
            </p>
            <Button className="rounded-full shadow-lg">Contact Enterprise Sales</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
