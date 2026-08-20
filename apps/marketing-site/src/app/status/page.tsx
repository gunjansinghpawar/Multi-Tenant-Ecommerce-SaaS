import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'System Status | CommerceX',
  description: 'Real-time uptime and incident tracking for the CommerceX platform APIs and CDN.',
};

export default function StatusPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6 mb-16 text-center">
        <h1 className="text-display tracking-tight text-foreground mb-6">
          System Status
        </h1>
        <div className="inline-flex items-center gap-3 bg-success/10 text-success px-4 py-2 rounded-full font-medium">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-success"></span>
          </span>
          All Systems Operational
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="space-y-4">
          {['Global Edge CDN', 'Commerce API', 'Tenant Admin Panel', 'Super Admin Dashboard', 'Checkout Engine', 'Webhooks & Events'].map((sys, i) => (
            <div key={i} className="flex items-center justify-between p-6 rounded-2xl border border-border bg-card">
              <span className="font-bold text-lg">{sys}</span>
              <div className="flex items-center gap-2 text-success font-medium text-sm">
                <CheckCircle2 size={16} /> Operational
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 p-8 rounded-2xl border border-border bg-card text-center">
          <h3 className="font-bold text-lg mb-2">Past Incidents</h3>
          <p className="text-muted-foreground text-sm">No incidents reported in the last 90 days.</p>
        </div>
      </section>
    </div>
  );
}
