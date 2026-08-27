import React from 'react';
import type { Metadata } from 'next';
import { HeroSection } from '@/components/marketing/home/HeroSection';
import { ValueProposition } from '@/components/marketing/home/ValueProposition';
import { StoreCreationFlow } from '@/components/marketing/home/StoreCreationFlow';
import { Differentiators } from '@/components/marketing/home/Differentiators';
import { AIIntelligence } from '@/components/home/AIIntelligence';
import { ComparisonMatrix } from '@/components/home/ComparisonMatrix';
import { ThemeBuilder } from '@/components/home/ThemeBuilder';
import { OrderTimeline } from '@/components/home/OrderTimeline';
import { GlobalEdgeMap } from '@/components/home/GlobalEdgeMap';
import { IntegrationsMarquee } from '@/components/home/IntegrationsMarquee';
import { HeadlessCode } from '@/components/home/HeadlessCode';
import { AgencyDashboard } from '@/components/home/AgencyDashboard';
import { ArchitectureGraph } from '@/components/home/ArchitectureGraph';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'CommerceX — Commerce infrastructure for ambitious brands',
  description: 'Build, operate, market, and scale multi-tenant ecommerce from one connected platform.',
  alternates: { canonical: '/' },
};

const softwareSchema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'CommerceX',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export default function MarketingHomePage() {
  return (
    <div className="flex min-h-full w-full flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
      <HeroSection />
      <ValueProposition />
      <StoreCreationFlow />
      <Differentiators />
      <AIIntelligence />
      <ComparisonMatrix />
      <ThemeBuilder />
      <OrderTimeline />
      <GlobalEdgeMap />
      <IntegrationsMarquee />
      <HeadlessCode />
      <AgencyDashboard />
      <ArchitectureGraph />
    </div>
  );
}
