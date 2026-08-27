import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { featuresData, FeatureKey } from '@/lib/data/features';
import { FeatureHero } from '@/components/marketing/features/FeatureHero';
import { DynamicMockup } from '@/components/marketing/features/DynamicMockup';
import { FeatureBentoGrid } from '@/components/marketing/features/FeatureBentoGrid';

type Props = {
  params: Promise<{ slug: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const feature = featuresData[resolvedParams.slug];
  
  if (!feature) {
    return { title: 'Not Found' };
  }

  return {
    title: `${feature.title} | CommerceX`,
    description: feature.description,
  };
}

export function generateStaticParams() {
  return Object.keys(featuresData).map((slug) => ({
    slug,
  }));
}

export default async function FeaturePage({ params }: Props) {
  const resolvedParams = await params;
  const feature = featuresData[resolvedParams.slug as FeatureKey];

  if (!feature) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <FeatureHero featureKey={resolvedParams.slug as FeatureKey} />
      <DynamicMockup featureKey={resolvedParams.slug as FeatureKey} />
      <FeatureBentoGrid featureKey={resolvedParams.slug as FeatureKey} />
      
      {/* Universal CTA */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-display tracking-tight mb-8">
            Ready to experience <span className="text-primary">{feature.title}?</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
            Join thousands of brands scaling on CommerceX. Start your free trial today or book a personalized demo with our experts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/pricing" className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 shadow-lg shadow-primary/20">
              Start Free Trial
            </a>
            <a href="/demo" className="inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-11 px-8">
              Book a Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
