import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@commercex/ui';
import { CheckoutWizard } from '../../components/checkout/CheckoutWizard';
import { CheckoutSummary } from '../../components/checkout/CheckoutSummary';

export default function CheckoutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/cart">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground -ml-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
          </Button>
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mt-4">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
        <div className="lg:col-span-7 xl:col-span-8">
          <CheckoutWizard />
        </div>
        <div className="lg:col-span-5 xl:col-span-4">
          <CheckoutSummary />
        </div>
      </div>
    </div>
  );
}
