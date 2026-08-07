'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFTextarea } from '@commercex/ui';
import { Repeat } from 'lucide-react';

const exchangeSchema = z.object({
  reason: z.string().min(1, 'Please select a reason'),
  desiredVariant: z.string().min(1, 'Please specify the item you want'),
  comments: z.string().max(500, 'Comments must be less than 500 characters').optional(),
});

type ExchangeFormData = z.infer<typeof exchangeSchema>;

interface ExchangeRequestFormProps {
  orderId: string;
  itemId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ExchangeRequestForm({ orderId, itemId, onSuccess, onCancel }: ExchangeRequestFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ExchangeFormData>({
    resolver: zodResolver(exchangeSchema),
    defaultValues: {
      reason: '',
      desiredVariant: '',
      comments: '',
    },
  });

  const onSubmit = (data: ExchangeFormData) => {
    setIsLoading(true);
    console.log(`Exchange request for ${orderId} / ${itemId}:`, data);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess?.();
    }, 1500);
  };

  return (
    <div className="bg-card border rounded-xl p-6 max-w-lg mx-auto shadow-sm animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center">
          <Repeat className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Request an Exchange</h3>
          <p className="text-sm text-muted-foreground">Order: {orderId}</p>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Reason for Exchange</label>
            <select 
              className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...form.register('reason')}
            >
              <option value="">Select a reason...</option>
              <option value="wrong_size">Wrong size</option>
              <option value="wrong_color">Wrong color</option>
              <option value="defective">Item is defective</option>
            </select>
            {form.formState.errors.reason && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.reason.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Desired Variant</label>
            <select 
              className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...form.register('desiredVariant')}
            >
              <option value="">Select what you want instead...</option>
              <option value="size_small">Size: Small</option>
              <option value="size_medium">Size: Medium</option>
              <option value="size_large">Size: Large</option>
              <option value="color_black">Color: Black</option>
            </select>
            {form.formState.errors.desiredVariant && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.desiredVariant.message}</p>
            )}
          </div>

          <RHFTextarea 
            name="comments" 
            label="Additional Comments (Optional)" 
            textareaProps={{ rows: 3, placeholder: "Any specific instructions for the exchange?" }} 
          />

          <div className="flex gap-3 justify-end pt-4 border-t">
            {onCancel && (
              <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
              Submit Request
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
