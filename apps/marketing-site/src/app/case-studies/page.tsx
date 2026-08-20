import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Case Studies | CommerceX',
  description: 'In-depth case studies on how businesses achieved unprecedented scale and efficiency using the CommerceX ecosystem.',
};

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-display tracking-tight text-foreground">
            Proven outcomes.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Read detailed engineering and business reports on how companies migrated to CommerceX and transformed their digital retail experience.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="space-y-12">
          {[
            { tag: 'Enterprise Migration', title: 'Scaling a Global Retailer to $100M+ GMV without downtime.', stat: '+240% YoY Growth' },
            { tag: 'Headless Commerce', title: 'Building a blazing fast mobile app on the CommerceX API.', stat: '-60% Latency' },
            { tag: 'WhatsApp Automation', title: 'How a D2C brand recovered $2M in abandoned carts in 3 months.', stat: '32% Recovery Rate' },
          ].map((study, i) => (
            <div key={i} className="group flex flex-col md:flex-row gap-8 items-center p-8 rounded-[32px] border border-border bg-card hover:border-primary/50 transition-colors">
              <div className="w-full md:w-1/3 aspect-video bg-muted rounded-[20px] overflow-hidden flex items-center justify-center relative">
                 <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 <span className="text-muted-foreground font-medium text-sm">[Case Study Visual]</span>
              </div>
              <div className="w-full md:w-2/3 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">{study.tag}</span>
                <h2 className="text-3xl font-bold">{study.title}</h2>
                <div className="flex items-center gap-4 py-4">
                  <div className="flex items-center gap-2 text-success font-bold text-lg bg-success/10 px-4 py-2 rounded-full">
                    <TrendingUp size={20} />
                    {study.stat}
                  </div>
                </div>
                <Button variant="outline" className="rounded-full mt-4">
                  Read Full Report
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
