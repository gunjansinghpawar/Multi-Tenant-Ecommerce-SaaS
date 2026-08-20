import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { Briefcase, Users, LayoutTemplate, LineChart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'For Development Agencies | CommerceX',
  description: 'Manage dozens of client stores from a single multi-tenant admin panel. White-labeling, centralized billing, and custom theme development for agencies.',
};

export default function AgenciesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 bg-background">
      <section className="px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Briefcase className="mr-2 h-4 w-4" /> CommerceX for Agencies
              </div>
              <h1 className="text-display tracking-tight text-foreground">
                Build faster.<br/>Manage centrally.
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Stop juggling multiple client logins and fragmented infrastructure. Launch, manage, and scale all your clients' stores from a single unified agency dashboard.
              </p>
              
              <ul className="space-y-4 pt-4">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Users size={16} />
                  </div>
                  <span className="font-medium text-lg">Centralized Client Management</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <LayoutTemplate size={16} />
                  </div>
                  <span className="font-medium text-lg">Reusable Agency Themes</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <LineChart size={16} />
                  </div>
                  <span className="font-medium text-lg">Aggregated Analytics & Billing</span>
                </li>
              </ul>

              <div className="pt-6">
                <Button size="lg" className="rounded-full shadow-lg h-12 px-8">
                  Apply for Agency Partner Program
                </Button>
              </div>
            </div>

            {/* Visual */}
            <div className="relative aspect-square md:aspect-[4/3] rounded-[32px] bg-card border border-border shadow-2xl overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-background to-background" />
               <p className="text-muted-foreground font-mono text-sm relative z-10">[Agency Dashboard Visualization]</p>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
