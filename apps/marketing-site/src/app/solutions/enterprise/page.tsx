import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Building2, ArrowRight, ShieldCheck, Globe, Cpu } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Enterprise Ecommerce Platform | CommerceX',
  description: 'Scalable, secure, and customizable ecommerce infrastructure for high-volume, multi-brand enterprise organizations.',
};

export default function EnterprisePage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-24 bg-background">
      {/* Hero Section */}
      <section className="relative px-4 md:px-6 mb-24 lg:mb-32">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent pointer-events-none" />
        <div className="container mx-auto max-w-5xl text-center space-y-8 relative z-10">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium shadow-sm">
            <Building2 className="mr-2 h-4 w-4 text-primary" /> CommerceX for Enterprise
          </div>
          <h1 className="text-display tracking-tight text-foreground">
            Uncapped performance.<br />
            Uncompromising control.
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Move away from legacy monoliths. Adopt a modern, API-first commerce operating system designed specifically for the complexities of global enterprise retail.
          </p>
          <div className="flex justify-center gap-4 pt-4">
            <Button size="lg" className="rounded-full shadow-lg h-12 px-8">
              Contact Enterprise Sales
            </Button>
            <Button size="lg" variant="outline" className="rounded-full h-12 px-8">
              View SLA Details
            </Button>
          </div>
        </div>
      </section>

      {/* Grid Features */}
      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[24px] bg-card border border-border shadow-sm">
            <ShieldCheck className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-h4 mb-3">Enterprise Security</h3>
            <p className="text-muted-foreground leading-relaxed">
              SOC2 Type II compliance, dedicated single-tenant database options, granular RBAC, and forced SSO/SAML integrations for your entire staff.
            </p>
          </div>
          <div className="p-8 rounded-[24px] bg-card border border-border shadow-sm">
            <Globe className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-h4 mb-3">Multi-Region Scale</h3>
            <p className="text-muted-foreground leading-relaxed">
              Deploy storefronts globally with edge-rendered caching. Manage multiple brands, currencies, and languages from a centralized master admin panel.
            </p>
          </div>
          <div className="p-8 rounded-[24px] bg-card border border-border shadow-sm">
            <Cpu className="h-10 w-10 text-primary mb-6" />
            <h3 className="text-h4 mb-3">Headless Architecture</h3>
            <p className="text-muted-foreground leading-relaxed">
              Decouple your frontend. Use our GraphQL Commerce API to power native mobile apps, custom POS systems, and bespoke web experiences.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
