'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@commercex/ui';
import { AlertCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { useCheckoutStore } from '../../../store/use-checkout-store';
import { useRouter } from 'next/navigation';

export default function CheckoutFailedPage() {
  const router = useRouter();
  const { setStep } = useCheckoutStore();

  const handleRetry = () => {
    // Go back to the payment step in checkout
    setStep('payment-method');
    router.push('/checkout');
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="bg-card border rounded-2xl shadow-sm p-8 max-w-md w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="h-20 w-20 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Payment Failed</h1>
          <p className="text-muted-foreground">
            We couldn't process your payment. This might be due to insufficient funds, 
            incorrect card details, or a network issue. Please check your payment method and try again.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Button onClick={handleRetry} className="w-full flex items-center justify-center gap-2">
            <RotateCcw className="h-4 w-4" /> Retry Payment
          </Button>
          <Link href="/cart" className="w-full">
            <Button variant="outline" className="w-full flex items-center justify-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Return to Cart
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
