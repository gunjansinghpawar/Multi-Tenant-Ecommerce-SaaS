import { Metadata } from 'next';
import { Building2, Globe2, Users2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | CommerceX',
  description: 'Learn about the team and mission behind the CommerceX platform.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="max-w-4xl space-y-6 mx-auto text-center">
          <h1 className="text-display tracking-tight text-foreground">
            We build tools for <br/> ambitious merchants.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            CommerceX was founded on a simple premise: enterprise-grade ecommerce infrastructure shouldn't be restricted to companies with 50-person engineering teams.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-[24px] border border-border bg-card text-center space-y-4">
            <Globe2 className="mx-auto h-8 w-8 text-primary" />
            <div className="text-3xl font-bold">140+</div>
            <p className="text-muted-foreground">Countries Served</p>
          </div>
          <div className="p-8 rounded-[24px] border border-border bg-card text-center space-y-4">
            <Building2 className="mx-auto h-8 w-8 text-primary" />
            <div className="text-3xl font-bold">$2B+</div>
            <p className="text-muted-foreground">Annual GMV</p>
          </div>
          <div className="p-8 rounded-[24px] border border-border bg-card text-center space-y-4">
            <Users2 className="mx-auto h-8 w-8 text-primary" />
            <div className="text-3xl font-bold">400+</div>
            <p className="text-muted-foreground">Team Members</p>
          </div>
        </div>
      </section>
    </div>
  );
}
