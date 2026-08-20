import React from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@commercex/ui';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const featureData: Record<string, { title: string, subtitle: string, description: string, highlights: string[] }> = {
  'store-builder': {
    title: 'Visual Store Builder',
    subtitle: 'Design without limits. No code required.',
    description: 'Create stunning, high-converting storefronts with our drag-and-drop visual builder. Start from premium templates and customize every pixel.',
    highlights: ['Live Preview Engine', 'Global CSS Variables', 'Section-based Architecture', 'Mobile-first Output']
  },
  'commerce': {
    title: 'Commerce Engine',
    subtitle: 'Powerful inventory and order management.',
    description: 'The core of your business. Manage complex product variants, track multi-warehouse inventory, and fulfill orders with enterprise-grade tooling.',
    highlights: ['Unlimited Variants', 'Multi-Warehouse', 'Automated Fulfillment', 'B2B Wholesale Pricing']
  },
  'analytics': {
    title: 'Analytics & SEO',
    subtitle: 'Data-driven growth tools.',
    description: 'Built-in technical SEO optimization and real-time analytics. Understand your customers, track conversion funnels, and optimize your return on ad spend.',
    highlights: ['Server-side Tagging', 'Dynamic Sitemaps', 'Real-time Dashboards', 'UTM Tracking']
  },
  'whatsapp': {
    title: 'WhatsApp Automation',
    subtitle: 'Meet customers where they are.',
    description: 'Native WhatsApp Business API integration. Send automated order updates, recover abandoned carts, and run marketing campaigns directly in WhatsApp.',
    highlights: ['Abandoned Cart Recovery', 'Order Status Updates', 'Two-way Support', 'Campaign Broadcasting']
  }
};

export default function FeaturePage({ params }: { params: { slug: string } }) {
  const feature = featureData[params.slug];

  if (!feature) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-16rem)]">
      <section className="relative pt-24 pb-32 overflow-hidden bg-background">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">{feature.title}</h1>
            <p className="text-2xl text-muted-foreground mb-4 font-medium">{feature.subtitle}</p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              {feature.description}
            </p>
            
            <div className="flex gap-4">
              <Button size="lg" className="rounded-full shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" className="rounded-full">
                Book a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="aspect-square md:aspect-video rounded-2xl bg-muted/50 border border-border shadow-2xl relative overflow-hidden flex items-center justify-center group">
               <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <p className="text-muted-foreground font-mono text-sm">[Interactive {feature.title} Demo UI]</p>
            </div>
            
            <div className="space-y-8">
              <h2 className="text-3xl font-bold">Everything you need to scale</h2>
              <ul className="space-y-4">
                {feature.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-primary mt-1" size={20} />
                    <span className="text-lg text-muted-foreground">{highlight}</span>
                  </li>
                ))}
              </ul>
              <Link href="/pricing" className="inline-flex items-center text-primary font-medium hover:underline pt-4">
                View detailed pricing <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
