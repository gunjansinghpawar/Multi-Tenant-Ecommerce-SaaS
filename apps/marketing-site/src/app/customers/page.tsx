import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Customers | CommerceX',
  description: 'See how the world\'s fastest-growing ecommerce brands and enterprise organizations use CommerceX to scale their operations.',
};

export default function CustomersPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32">
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-display tracking-tight text-foreground">
            Trusted by the best.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From agile D2C startups to global retail giants, discover how businesses are transforming their ecommerce operations with our platform.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-10 rounded-[32px] bg-card border border-border shadow-sm flex flex-col justify-between h-[400px]">
              <div className="flex justify-between items-start">
                <div className="w-32 h-10 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-sm font-medium">
                  [Brand Logo]
                </div>
                <div className="flex gap-1 text-primary">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                </div>
              </div>
              <div>
                <p className="text-2xl font-medium leading-snug mb-6 text-foreground">
                  "CommerceX allowed us to consolidate our fragmented tech stack into a single, highly performant ecosystem. Our conversion rates are up 40%."
                </p>
                <Link href="/case-studies" className="inline-flex items-center text-primary font-medium group">
                  Read the Case Study <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
