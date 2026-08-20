import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Clock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Changelog | CommerceX',
  description: 'New features, improvements, and fixes across the CommerceX platform. We ship fast.',
};

export default function ChangelogPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32">
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-display tracking-tight text-foreground">
            Changelog
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We release updates every week. Keep track of the latest improvements, API additions, and new features here.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto relative border-l border-border pl-8 ml-4 space-y-24">
          {[
            { version: 'v2.4.0', date: 'October 24, 2024', title: 'Global Edge Caching & Analytics V2', type: 'Feature' },
            { version: 'v2.3.5', date: 'October 12, 2024', title: 'Improved webhook payload delivery', type: 'Improvement' },
            { version: 'v2.3.0', date: 'September 28, 2024', title: 'Native WhatsApp Business API integration', type: 'Feature' },
          ].map((log, i) => (
            <div key={i} className="relative">
              <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-background border-2 border-primary" />
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{log.type}</span>
                <span className="text-sm font-mono text-muted-foreground">{log.version}</span>
                <span className="text-sm text-muted-foreground">• {log.date}</span>
              </div>
              <h2 className="text-2xl font-bold mb-4">{log.title}</h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground">
                <p>
                  We've rolled out a major update to our infrastructure. Storefronts now leverage a new edge-caching layer that reduces TTFB by an average of 40ms globally.
                </p>
                <ul>
                  <li>Added new GraphQL mutation for cache invalidation.</li>
                  <li>Updated Analytics dashboard to support real-time edge metrics.</li>
                  <li>Fixed an issue where variants would occasionally sync out of order.</li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
