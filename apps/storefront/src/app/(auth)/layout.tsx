import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-24 bg-muted/30">
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Store
        </Link>
      </div>
      
      {/* We reuse the styling of the AuthModal for consistency */}
      <div className="w-full max-w-md p-0 overflow-hidden bg-background rounded-2xl border border-border/50 shadow-2xl">
        {children}
      </div>
    </div>
  );
}
