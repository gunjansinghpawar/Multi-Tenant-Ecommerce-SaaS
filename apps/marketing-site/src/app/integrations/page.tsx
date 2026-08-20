import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Search } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Integrations & Plugins | CommerceX',
  description: 'Connect your store with the tools you already use. Payment gateways, shipping providers, marketing automation, and more.',
};

export default function IntegrationsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32">
      <section className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <h1 className="text-display tracking-tight text-foreground mb-6">
          Connect your stack.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
          CommerceX plays nicely with the rest of the internet. Seamlessly integrate with hundreds of payment providers, ERPs, and marketing tools.
        </p>
        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <input 
            type="text" 
            placeholder="Search integrations (e.g. Stripe, Shiprocket, Razorpay)..." 
            className="w-full h-14 pl-12 pr-4 rounded-full border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
          />
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 snap-x">
          {['All', 'Payments', 'Shipping', 'Marketing', 'Analytics', 'Accounting', 'CRM'].map((cat, i) => (
            <button key={cat} className={`whitespace-nowrap px-6 py-2.5 rounded-full text-sm font-medium transition-colors snap-start ${i === 0 ? 'bg-foreground text-background' : 'bg-card border border-border text-muted-foreground hover:text-foreground'}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((i) => (
            <div key={i} className="aspect-square bg-card border border-border rounded-2xl flex flex-col items-center justify-center p-6 hover:border-primary/50 hover:shadow-md transition-all group cursor-pointer">
              <div className="w-16 h-16 bg-muted rounded-xl mb-4 group-hover:scale-110 transition-transform flex items-center justify-center text-muted-foreground text-xs font-mono">
                Logo
              </div>
              <span className="font-medium text-sm text-foreground">Integration {i}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
