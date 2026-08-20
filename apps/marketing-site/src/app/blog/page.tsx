import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog | CommerceX',
  description: 'The latest news, product updates, and ecommerce engineering insights from the CommerceX team.',
};

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32">
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <h1 className="text-display tracking-tight text-foreground mb-12 text-center">
          The CommerceX Blog
        </h1>

        {/* Featured Post */}
        <div className="relative rounded-[32px] overflow-hidden bg-card border border-border shadow-sm group mb-16 flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 aspect-video md:aspect-auto bg-muted">
             {/* Image Placeholder */}
          </div>
          <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
            <div className="text-sm font-medium text-primary mb-4">Engineering</div>
            <h2 className="text-3xl font-bold mb-4">How we achieved sub-50ms TTFB globally across 10,000 storefronts.</h2>
            <p className="text-muted-foreground mb-8 text-lg">A deep dive into our edge-rendering architecture, database sharding strategies, and why we chose Next.js App Router for tenant storefronts.</p>
            <Link href="#" className="inline-flex items-center text-primary font-medium">
              Read Article <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Grid Posts */}
        <div className="grid md:grid-cols-3 gap-8">
          {[1,2,3,4,5,6].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="aspect-[3/2] rounded-[24px] bg-muted mb-6 overflow-hidden border border-border">
                {/* Image Placeholder */}
              </div>
              <div className="text-xs font-medium text-muted-foreground mb-3">Product Update • Oct 24, 2024</div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">Introducing the new Visual Store Builder</h3>
              <p className="text-muted-foreground text-sm line-clamp-2">We've completely rewritten our theme editor from the ground up to support drag-and-drop section building without writing a single line of code.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
