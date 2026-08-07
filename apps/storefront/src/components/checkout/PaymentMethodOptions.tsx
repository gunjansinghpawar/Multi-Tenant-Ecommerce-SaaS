'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput } from '@commercex/ui';
import { useCheckoutStore } from '../../store/use-checkout-store';
import { CreditCard, Wallet } from 'lucide-react';

const paymentSchema = z.object({
  method: z.enum(['credit_card', 'paypal']),
  cardNumber: z.string().min(16, 'Invalid card number').optional(),
  expiry: z.string().min(5, 'Invalid expiry').optional(),
  cvc: z.string().min(3, 'Invalid CVC').optional(),
  name: z.string().min(2, 'Name is required').optional(),
}).refine(data => {
  if (data.method === 'credit_card') {
    return !!data.cardNumber && !!data.expiry && !!data.cvc && !!data.name;
  }
  return true;
}, {
  message: "Credit card details are required",
  path: ["method"], // Attach error broadly
});

type PaymentFormData = z.infer<typeof paymentSchema>;

export function PaymentMethodOptions() {
  const { paymentMethodId, setPaymentMethodId, setStep, billingSameAsShipping } = useCheckoutStore();
  const [selected, setSelected] = useState<'credit_card' | 'paypal'>((paymentMethodId as 'credit_card' | 'paypal') || 'credit_card');

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      method: selected,
      cardNumber: '',
      expiry: '',
      cvc: '',
      name: '',
    },
  });

  const onSubmit = (data: PaymentFormData) => {
    setPaymentMethodId(data.method);
    setStep('review');
  };

  const handleSelection = (method: 'credit_card' | 'paypal') => {
    setSelected(method);
    form.setValue('method', method);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-4">
          {/* Credit Card Option */}
          <div className={`border rounded-lg overflow-hidden transition-colors ${
            selected === 'credit_card' ? 'border-primary' : 'hover:border-foreground/30'
          }`}>
            <div 
              className={`p-4 cursor-pointer flex items-center gap-4 ${selected === 'credit_card' ? 'bg-primary/5' : ''}`}
              onClick={() => handleSelection('credit_card')}
            >
              <input 
                type="radio" 
                checked={selected === 'credit_card'}
                readOnly
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <span className="font-medium">Credit Card</span>
            </div>
            
            {selected === 'credit_card' && (
              <div className="p-4 border-t bg-card space-y-4">
                <RHFInput name="cardNumber" label="Card Number" inputProps={{ placeholder: "0000 0000 0000 0000" }} />
                <div className="grid grid-cols-2 gap-4">
                  <RHFInput name="expiry" label="Expiry Date" inputProps={{ placeholder: "MM/YY" }} />
                  <RHFInput name="cvc" label="CVC" inputProps={{ placeholder: "123" }} />
                </div>
                <RHFInput name="name" label="Name on Card" inputProps={{ placeholder: "John Doe" }} />
                <p className="text-xs text-muted-foreground">Simulator: This is a dummy form, no real processing happens.</p>
              </div>
            )}
          </div>

          {/* PayPal Option */}
          <div className={`border rounded-lg overflow-hidden transition-colors ${
            selected === 'paypal' ? 'border-primary' : 'hover:border-foreground/30'
          }`}>
            <div 
              className={`p-4 cursor-pointer flex items-center gap-4 ${selected === 'paypal' ? 'bg-primary/5' : ''}`}
              onClick={() => handleSelection('paypal')}
            >
              <input 
                type="radio" 
                checked={selected === 'paypal'}
                readOnly
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
              <Wallet className="h-5 w-5 text-[#003087]" />
              <span className="font-medium">PayPal</span>
            </div>
            {selected === 'paypal' && (
              <div className="p-4 border-t bg-card text-center">
                <p className="text-sm text-muted-foreground mb-4">You will be redirected to PayPal to complete your purchase securely.</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setStep(billingSameAsShipping ? 'shipping-method' : 'billing-address')}
          >
            Back
          </Button>
          <Button type="submit">Continue to Review</Button>
        </div>
      </form>
    </Form>
  );
}
