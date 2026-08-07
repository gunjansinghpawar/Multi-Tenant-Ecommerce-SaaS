import React from 'react';
import { Construction } from 'lucide-react';
import { Button } from '@commercex/ui';
import Link from 'next/link';

export function PlaceholderTab({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 py-24 border rounded-2xl bg-muted/10 border-dashed animate-in fade-in duration-500">
      <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
        <Construction className="h-10 w-10 text-primary" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        This section is currently under construction. It will be connected to the backend API in the next development phase.
      </p>
      <Link href="/account">
        <Button variant="outline">Return to Dashboard</Button>
      </Link>
    </div>
  );
}
