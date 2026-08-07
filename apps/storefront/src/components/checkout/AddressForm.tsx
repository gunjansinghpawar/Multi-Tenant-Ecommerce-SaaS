'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput } from '@commercex/ui';
import { Address, useCheckoutStore } from '../../store/use-checkout-store';

const addressSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State/Province is required'),
  zipCode: z.string().min(3, 'ZIP/Postal Code is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AddressFormProps {
  type: 'shipping' | 'billing';
}

export function AddressForm({ type }: AddressFormProps) {
  const { 
    shippingAddress, setShippingAddress, 
    billingAddress, setBillingAddress, 
    billingSameAsShipping, setBillingSameAsShipping,
    setStep 
  } = useCheckoutStore();

  const isShipping = type === 'shipping';
  const savedAddress = isShipping ? shippingAddress : billingAddress;

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: savedAddress || {
      firstName: '',
      lastName: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States',
      phone: '',
    },
  });

  const onSubmit = (data: AddressFormData) => {
    if (isShipping) {
      setShippingAddress(data);
      if (billingSameAsShipping) {
        setBillingAddress(data);
      }
      setStep('shipping-method');
    } else {
      setBillingAddress(data);
      setStep('review'); 
    }
  };

  if (!isShipping && billingSameAsShipping) {
    return (
      <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <p className="text-muted-foreground">Billing address is the same as shipping address.</p>
        <div className="p-4 border rounded-lg bg-muted/20">
          <p className="font-medium">{shippingAddress?.firstName} {shippingAddress?.lastName}</p>
          <p>{shippingAddress?.addressLine1}</p>
          {shippingAddress?.addressLine2 && <p>{shippingAddress?.addressLine2}</p>}
          <p>{shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zipCode}</p>
          <p>{shippingAddress?.country}</p>
        </div>
        <Button onClick={() => setStep('shipping-method')} variant="outline" className="mr-2">Back</Button>
        <Button onClick={() => setStep('review')}>Continue</Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="grid grid-cols-2 gap-4">
          <RHFInput name="firstName" label="First Name" />
          <RHFInput name="lastName" label="Last Name" />
        </div>

        <RHFInput name="addressLine1" label="Address Line 1" />
        <RHFInput name="addressLine2" label="Address Line 2 (Optional)" />

        <div className="grid grid-cols-2 gap-4">
          <RHFInput name="city" label="City" />
          <RHFInput name="state" label="State / Province" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <RHFInput name="zipCode" label="ZIP / Postal Code" />
          <RHFInput name="country" label="Country" />
        </div>

        <RHFInput name="phone" label="Phone (Optional)" inputProps={{ type: 'tel' }} />

        {isShipping && (
          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="checkbox" 
              id="sameAsShipping" 
              className="rounded border-gray-300 text-primary focus:ring-primary"
              checked={billingSameAsShipping}
              onChange={(e) => setBillingSameAsShipping(e.target.checked)}
            />
            <label htmlFor="sameAsShipping" className="text-sm font-medium">
              Billing address is same as shipping
            </label>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setStep(isShipping ? 'auth' : 'shipping-method')}
          >
            Back
          </Button>
          <Button type="submit">
            Continue to {isShipping ? 'Shipping Method' : 'Review'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
