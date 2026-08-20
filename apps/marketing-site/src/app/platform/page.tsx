import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Layers, Server, Shield, Zap } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Platform Architecture | CommerceX',
  description: 'Discover the engineering behind CommerceX. A true multi-tenant SaaS architecture designed for scale, speed, and absolute reliability.',
};

export default function PlatformPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mb-24">
          <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
            <Server className="mr-2 h-4 w-4" /> Platform Architecture
          </div>
          <h1 className="text-display tracking-tight mb-8">
            Engineered for <br/> unrelenting scale.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            Underneath the beautiful interface is a battle-tested, multi-tenant architecture processing millions of transactions with sub-second latency.
          </p>
        </div>

        {/* Architecture Visual Placeholder */}
        <div className="w-full aspect-[21/9] rounded-[24px] border border-border bg-card/50 backdrop-blur-3xl relative flex items-center justify-center mb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
          <p className="text-muted-foreground font-mono text-sm relative z-10">[Interactive Architecture Diagram: Global Edge CDN -&gt; API Layer -&gt; Multi-Tenant DBs]</p>
        </div>

        {/* Pillars */}
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-foreground shadow-sm">
              <Layers size={24} />
            </div>
            <h3 className="text-h3">True Multi-Tenancy</h3>
            <p className="text-muted-foreground leading-relaxed">
              Complete data isolation per merchant with centralized management. Push updates to thousands of stores instantly without breaking individual configurations.
            </p>
          </div>
          
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-foreground shadow-sm">
              <Zap size={24} />
            </div>
            <h3 className="text-h3">Edge Delivery</h3>
            <p className="text-muted-foreground leading-relaxed">
              Storefronts are statically generated and cached at the edge across 300+ global nodes, ensuring zero-layout-shift and instant page loads.
            </p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-foreground shadow-sm">
              <Shield size={24} />
            </div>
            <h3 className="text-h3">Bank-grade Security</h3>
            <p className="text-muted-foreground leading-relaxed">
              SOC2 compliant infrastructure, automated DDoS protection, end-to-end encryption, and rigorous RBAC for both merchants and staff.
            </p>
          </div>
        </div>

        <div className="mt-32 text-center">
          <Link href="/developers">
            <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all h-12 px-8 text-body">
              Explore the API Documentation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
