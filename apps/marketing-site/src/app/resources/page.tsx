import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { FileText, PlayCircle, BookOpen, Layers } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Commerce Resources & Guides | CommerceX',
  description: 'Expert guides, tutorials, and resources to help you build, launch, and scale your ecommerce business.',
};

export default function ResourcesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <h1 className="text-display tracking-tight text-foreground mb-6">
          Learn to scale.
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about modern ecommerce architecture, marketing automation, and business growth.
        </p>
      </section>

      <section className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6">
          <Link href="/blog" className="group">
            <div className="p-8 rounded-[24px] border border-border bg-card hover:shadow-lg transition-all flex items-start gap-6">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <FileText size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">The Blog</h3>
                <p className="text-muted-foreground text-sm">Insights on ecommerce trends, product updates, and growth strategies.</p>
              </div>
            </div>
          </Link>
          <Link href="/guides" className="group">
            <div className="p-8 rounded-[24px] border border-border bg-card hover:shadow-lg transition-all flex items-start gap-6">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <BookOpen size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">In-depth Guides</h3>
                <p className="text-muted-foreground text-sm">Step-by-step playbooks for technical SEO, headless migration, and automation.</p>
              </div>
            </div>
          </Link>
          <Link href="/webinars" className="group">
            <div className="p-8 rounded-[24px] border border-border bg-card hover:shadow-lg transition-all flex items-start gap-6">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <PlayCircle size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Video Tutorials</h3>
                <p className="text-muted-foreground text-sm">Watch our engineers and product experts demonstrate advanced platform capabilities.</p>
              </div>
            </div>
          </Link>
          <Link href="/case-studies" className="group">
            <div className="p-8 rounded-[24px] border border-border bg-card hover:shadow-lg transition-all flex items-start gap-6">
              <div className="p-4 rounded-xl bg-primary/10 text-primary">
                <Layers size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">Case Studies</h3>
                <p className="text-muted-foreground text-sm">See how top brands use CommerceX to solve complex engineering and sales challenges.</p>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
}
