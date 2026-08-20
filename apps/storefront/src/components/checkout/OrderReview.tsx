'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@commercex/ui';
import { useCheckoutStore } from '../../store/use-checkout-store';
import { useAnalytics } from '../../hooks/use-analytics';

export function OrderReview() {
  const router = useRouter();
  const { termsAccepted, setTermsAccepted, setStep } = useCheckoutStore();
  const { track } = useAnalytics();

  const handlePlaceOrder = () => {
    if (!termsAccepted) return;
    
    // Simulate API call for placing order
    setTimeout(() => {
      // randomly fail 10% of the time to demonstrate the failed state
      const isSuccess = Math.random() > 0.1;
      if (isSuccess) {
        track('payment_success');
        track('order_completed');
        router.push('/checkout/success');
      } else {
        track('payment_failed');
        router.push('/checkout/failed');
      }
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-muted/20 border rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-medium">Review your details</h3>
        <p className="text-sm text-muted-foreground">
          Please review your items, shipping, and billing details on this page. 
          If everything looks correct, accept the terms and conditions below to place your order.
        </p>
      </div>

      <div className="flex items-start space-x-3 pt-4 border-t">
        <input 
          type="checkbox" 
          id="terms" 
          checked={termsAccepted}
          onChange={(e) => setTermsAccepted(e.target.checked)}
          className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <label htmlFor="terms" className="text-sm leading-tight text-muted-foreground">
          I have read and agree to the website <a href="#" className="text-primary hover:underline">Terms and Conditions</a>, 
          and I understand the <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
        </label>
      </div>

      <div className="flex gap-4 pt-4">
        <Button 
          type="button" 
          variant="outline" 
          onClick={() => setStep('payment-method')}
        >
          Back
        </Button>
        <Button 
          onClick={handlePlaceOrder}
          disabled={!termsAccepted}
          className="flex-1"
        >
          Place Order
        </Button>
      </div>
    </div>
  );
}
