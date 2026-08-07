'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput } from '@commercex/ui';

const addressSchema = z.object({
  label: z.string().min(1, 'Label is required (e.g., Home, Work)'),
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  addressLine1: z.string().min(5, 'Address is required'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State/Province is required'),
  zipCode: z.string().min(3, 'ZIP/Postal Code is required'),
  country: z.string().min(2, 'Country is required'),
  phone: z.string().optional(),
  isDefault: z.boolean().optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

interface AccountAddressFormProps {
  initialData?: Partial<AddressFormData>;
  onSubmitSuccess: () => void;
  onCancel: () => void;
}

export function AccountAddressForm({ initialData, onSubmitSuccess, onCancel }: AccountAddressFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      label: initialData?.label || '',
      firstName: initialData?.firstName || '',
      lastName: initialData?.lastName || '',
      addressLine1: initialData?.addressLine1 || '',
      addressLine2: initialData?.addressLine2 || '',
      city: initialData?.city || '',
      state: initialData?.state || '',
      zipCode: initialData?.zipCode || '',
      country: initialData?.country || 'United States',
      phone: initialData?.phone || '',
      isDefault: initialData?.isDefault || false,
    },
  });

  const onSubmit = (data: AddressFormData) => {
    setIsLoading(true);
    console.log('Address saved:', data);
    setTimeout(() => {
      setIsLoading(false);
      onSubmitSuccess();
    }, 1000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        <RHFInput name="label" label="Address Label" inputProps={{ placeholder: 'e.g. Home, Work' }} />

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

        <div className="flex items-center space-x-2 pt-2 pb-4">
          <input 
            type="checkbox" 
            id="isDefault" 
            className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
            {...form.register('isDefault')}
          />
          <label htmlFor="isDefault" className="text-sm font-medium">
            Set as default address
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
            Save Address
          </Button>
        </div>
      </form>
    </Form>
  );
}
