import React from 'react';
import { Button } from '@commercex/ui';
import Link from 'next/link';

export default function StorefrontHomePage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-6 md:p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-center font-mono text-sm lg:flex">
        <div className="flex flex-col items-center space-y-8 text-center">
          <header className="space-y-4">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              CommerceX <span className="text-primary">Storefront</span>
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Enterprise Multi-Tenant SaaS Core Platform Foundation.
            </p>
          </header>

          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/login">
              <Button size="lg" className="w-full sm:w-auto">
                Sign In to Dashboard
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Create an Account
              </Button>
            </Link>
          </div>

          <div className="mt-12 rounded-2xl border bg-card p-8 text-card-foreground shadow-sm">
            <div className="flex flex-col space-y-2">
              <h3 className="font-semibold tracking-tight text-xl">Tenant Isolation Active</h3>
              <p className="text-sm text-muted-foreground">
                Phase 1 Foundation & Multi-Tenant Core initialized successfully.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
