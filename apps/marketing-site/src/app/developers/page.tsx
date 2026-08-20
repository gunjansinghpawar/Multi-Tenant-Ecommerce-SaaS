import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Terminal, Code2, Webhook, BookOpen } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Developer Platform | CommerceX',
  description: 'Build custom commerce experiences, automate workflows, and develop private apps with the CommerceX API.',
};

export default function DevelopersPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32">
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="max-w-4xl space-y-6 text-center mx-auto">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm font-medium font-mono">
            <Terminal className="mr-2 h-4 w-4 text-primary" /> _developers
          </div>
          <h1 className="text-display tracking-tight text-foreground">
            The API-first <br/> commerce engine.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Every feature in the CommerceX dashboard is powered by our public GraphQL and REST APIs. Build headless storefronts, custom apps, and automated workflows.
          </p>
          <div className="pt-4 flex gap-4 justify-center">
            <Button size="lg" className="rounded-full shadow-lg h-12 px-8 font-mono">
              Read the Docs
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8 font-mono">
              Get API Key
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[24px] bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <Code2 className="h-8 w-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-h4 mb-2">GraphQL API</h3>
            <p className="text-muted-foreground text-sm">Query exactly what you need. Our GraphQL API powers the fastest headless storefronts on the web.</p>
          </div>
          <div className="p-8 rounded-[24px] bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <Webhook className="h-8 w-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-h4 mb-2">Webhooks & Events</h3>
            <p className="text-muted-foreground text-sm">Subscribe to over 100+ events in real-time. Trigger serverless functions when orders are placed.</p>
          </div>
          <div className="p-8 rounded-[24px] bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer group">
            <BookOpen className="h-8 w-8 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <h3 className="text-h4 mb-2">SDKs & Libraries</h3>
            <p className="text-muted-foreground text-sm">Official SDKs for React, Next.js, Node, Python, and Go. Get up and running in minutes.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
