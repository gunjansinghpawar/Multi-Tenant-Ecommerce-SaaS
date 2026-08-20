import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { ChevronDown } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | CommerceX',
  description: 'Answers to common questions about CommerceX pricing, migration, architecture, and features.',
};

export default function FAQPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <h1 className="text-display tracking-tight text-foreground mb-6">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about migrating to and operating on CommerceX.
        </p>
      </section>

      <section className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="space-y-4">
          {[
            { q: 'How long does migration from Shopify typically take?', a: 'Depending on catalogue size and custom frontend requirements, standard migrations take 2-4 weeks. Enterprise headless migrations average 8-12 weeks.' },
            { q: 'Do you charge transaction fees?', a: 'No. Unlike Shopify, we do not penalize you for your success. You only pay your payment gateway fees.' },
            { q: 'Can I host my own storefront?', a: 'Yes. CommerceX is API-first. You can use our managed Next.js storefronts, or build and host your own custom frontend (Vercel, Netlify, AWS) and connect via our GraphQL API.' },
            { q: 'Is there a limit on API calls?', a: 'Enterprise plans include uncapped API usage. Standard plans include generous limits that support 99% of typical store operations without rate-limiting.' },
          ].map((faq, i) => (
            <div key={i} className="p-6 rounded-[16px] border border-border bg-card">
              <h3 className="text-lg font-bold mb-2 pr-8">{faq.q}</h3>
              <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
