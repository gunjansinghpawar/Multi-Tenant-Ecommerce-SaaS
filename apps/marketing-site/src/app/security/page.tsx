import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Shield, Lock, FileKey2, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Security & Trust | CommerceX',
  description: 'Enterprise-grade security, SOC2 compliance, tenant isolation, and strict RBAC controls to protect your business data.',
};

export default function SecurityPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32">
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-sm font-medium">
            <Shield className="mr-2 h-4 w-4 text-success" /> CommerceX Security
          </div>
          <h1 className="text-display tracking-tight text-foreground">
            Bank-grade protection.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
            We operate a zero-trust architecture. From strict logical tenant isolation to continuous penetration testing, your commerce data is cryptographically secured.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="space-y-4">
            <Lock className="h-8 w-8 text-primary" />
            <h3 className="text-h4">Data Encryption</h3>
            <p className="text-muted-foreground">All data is encrypted at rest using AES-256 and in transit via TLS 1.3. Key management is handled by hardware security modules (HSM).</p>
          </div>
          <div className="space-y-4">
            <FileKey2 className="h-8 w-8 text-primary" />
            <h3 className="text-h4">Compliance & Privacy</h3>
            <p className="text-muted-foreground">We maintain strict adherence to SOC2 Type II, GDPR, CCPA, and PCI-DSS Level 1 compliance standards across all infrastructure.</p>
          </div>
          <div className="space-y-4">
            <Shield className="h-8 w-8 text-primary" />
            <h3 className="text-h4">Tenant Isolation</h3>
            <p className="text-muted-foreground">Every merchant's data is logically isolated. Enterprise customers can opt for dedicated single-tenant database instances.</p>
          </div>
        </div>

        <div className="p-12 rounded-[32px] bg-card border border-border flex flex-col md:flex-row gap-12 items-center">
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-h2">Report a Vulnerability</h2>
            <p className="text-muted-foreground text-lg">
              Security is a collaborative effort. We offer a competitive bug bounty program for responsible disclosure of security flaws.
            </p>
            <Button size="lg" className="rounded-full shadow-lg">View Bounty Program</Button>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            {['24/7 Threat Monitoring', 'Automated DDoS Mitigation', 'Annual Third-Party Pen Tests', 'Strict RBAC Controls'].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-background border border-border">
                <CheckCircle2 className="text-success" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
