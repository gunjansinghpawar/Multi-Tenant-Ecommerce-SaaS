import { Metadata } from 'next';
import { Button } from '@commercex/ui';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Careers | CommerceX',
  description: 'Join the team building the future of commerce. View open positions at CommerceX.',
};

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32">
      <section className="container mx-auto px-4 md:px-6 mb-16">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-display tracking-tight text-foreground">
            Join the team.
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            We are a remote-first company building the world's most scalable commerce engine. Help us empower merchants globally.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
        <div className="space-y-4 max-w-4xl">
          {[
            { role: 'Senior Frontend Engineer (Next.js)', dept: 'Engineering', loc: 'Remote (US/EU)' },
            { role: 'Backend Distributed Systems Engineer', dept: 'Engineering', loc: 'Remote (Global)' },
            { role: 'Product Marketing Manager', dept: 'Marketing', loc: 'New York / Remote' },
            { role: 'Enterprise Account Executive', dept: 'Sales', loc: 'London / Remote' },
          ].map((job, i) => (
            <Link key={i} href="#" className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-[16px] border border-border bg-card hover:border-primary/50 transition-colors group">
              <div>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{job.role}</h3>
                <p className="text-sm text-muted-foreground mt-1">{job.dept} • {job.loc}</p>
              </div>
              <ArrowRight className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-4 sm:mt-0" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
