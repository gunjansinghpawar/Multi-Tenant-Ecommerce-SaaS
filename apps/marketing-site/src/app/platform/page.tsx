import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import Link from 'next/link';
import { PlatformHero } from '@/components/marketing/platform/PlatformHero';
import { ArchitectureDiagram } from '@/components/marketing/platform/ArchitectureDiagram';
import { CorePillars } from '@/components/marketing/platform/CorePillars';
import { TechStack } from '@/components/marketing/platform/TechStack';

export const metadata: Metadata = {
  title: 'Platform Architecture | CommerceX',
  description: 'Discover the engineering behind CommerceX. A true multi-tenant SaaS architecture designed for scale, speed, and absolute reliability.',
};

export default function PlatformPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PlatformHero />
      <ArchitectureDiagram />
      <CorePillars />
      <TechStack />

      {/* CTA Section */}
      <section className="py-32 border-t border-border bg-background">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-display tracking-tight mb-8">
            Ready to build on <span className="text-primary">CommerceX?</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-12">
            Read the API documentation, explore the open-source SDKs, or book a demo with our technical sales team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/developers">
              <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all h-12 px-8 text-body bg-primary text-primary-foreground">
                Explore the API Documentation
              </Button>
            </Link>
            <Link href="/demo">
              <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-body">
                Book Technical Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
