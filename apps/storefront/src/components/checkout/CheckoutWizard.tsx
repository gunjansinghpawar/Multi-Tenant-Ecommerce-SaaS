'use client';

import React from 'react';
import { useCheckoutStore, CheckoutStep } from '../../store/use-checkout-store';
import { CheckoutAuth } from './CheckoutAuth';
import { AddressForm } from './AddressForm';
import { ShippingMethodOptions } from './ShippingMethodOptions';
import { PaymentMethodOptions } from './PaymentMethodOptions';
import { OrderReview } from './OrderReview';
import { Check } from 'lucide-react';
import { useAnalytics } from '../../hooks/use-analytics';

const STEPS: { id: CheckoutStep; title: string }[] = [
  { id: 'auth', title: 'Authentication' },
  { id: 'shipping-address', title: 'Shipping Address' },
  { id: 'billing-address', title: 'Billing Address' },
  { id: 'shipping-method', title: 'Shipping Method' },
  { id: 'payment-method', title: 'Payment Method' },
  { id: 'review', title: 'Review & Place Order' },
];

export function CheckoutWizard() {
  const { currentStep, setStep, billingSameAsShipping } = useCheckoutStore();
  const { track } = useAnalytics();

  React.useEffect(() => {
    track('checkout_started');
  }, [track]);

  const getStepIndex = (step: CheckoutStep) => STEPS.findIndex(s => s.id === step);
  const currentIndex = getStepIndex(currentStep);

  const renderStepContent = (stepId: CheckoutStep) => {
    switch (stepId) {
      case 'auth':
        return <CheckoutAuth />;
      case 'shipping-address':
        return <AddressForm type="shipping" />;
      case 'billing-address':
        return <AddressForm type="billing" />;
      case 'shipping-method':
        return <ShippingMethodOptions />;
      case 'payment-method':
        return <PaymentMethodOptions />;
      case 'review':
        return <OrderReview />;
      default:
        return null;
    }
  };

  const handleStepClick = (index: number, stepId: CheckoutStep) => {
    // Only allow navigating back to completed steps
    if (index < currentIndex) {
      setStep(stepId);
    }
  };

  return (
    <div className="space-y-6">
      {STEPS.map((step, index) => {
        // Skip billing address step visually if it's same as shipping
        if (step.id === 'billing-address' && billingSameAsShipping) {
          return null;
        }

        const isCurrent = currentStep === step.id;
        const isCompleted = index < currentIndex;
        const isUpcoming = index > currentIndex;

        return (
          <div key={step.id} className="border-b pb-6 last:border-0">
            <button
              type="button"
              onClick={() => handleStepClick(index, step.id)}
              disabled={isUpcoming}
              className={`flex items-center gap-4 w-full text-left transition-colors ${
                isCompleted ? 'cursor-pointer hover:text-primary' : isUpcoming ? 'cursor-not-allowed opacity-50' : ''
              }`}
            >
              <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 shrink-0 ${
                isCompleted ? 'bg-primary border-primary text-primary-foreground' : 
                isCurrent ? 'border-primary text-primary' : 
                'border-muted-foreground text-muted-foreground'
              }`}>
                {isCompleted ? <Check className="h-4 w-4" /> : <span className="text-sm font-medium">{index + 1}</span>}
              </div>
              <h2 className={`text-xl font-semibold tracking-tight ${isCurrent ? '' : 'text-muted-foreground'}`}>
                {step.title}
              </h2>
            </button>

            {isCurrent && (
              <div className="pt-6 pl-12 pr-2">
                {renderStepContent(step.id)}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
