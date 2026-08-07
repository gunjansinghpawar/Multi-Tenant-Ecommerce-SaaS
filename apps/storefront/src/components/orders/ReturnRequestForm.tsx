'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput, RHFTextarea } from '@commercex/ui';
import { PackageX } from 'lucide-react';

const returnSchema = z.object({
  reason: z.string().min(1, 'Please select a reason'),
  condition: z.string().min(1, 'Please select item condition'),
  comments: z.string().max(500, 'Comments must be less than 500 characters').optional(),
});

type ReturnFormData = z.infer<typeof returnSchema>;

interface ReturnRequestFormProps {
  orderId: string;
  itemId: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ReturnRequestForm({ orderId, itemId, onSuccess, onCancel }: ReturnRequestFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ReturnFormData>({
    resolver: zodResolver(returnSchema),
    defaultValues: {
      reason: '',
      condition: '',
      comments: '',
    },
  });

  const onSubmit = (data: ReturnFormData) => {
    setIsLoading(true);
    console.log(`Return request for ${orderId} / ${itemId}:`, data);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess?.();
    }, 1500);
  };

  return (
    <div className="bg-card border rounded-xl p-6 max-w-lg mx-auto shadow-sm animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-3 mb-6 border-b pb-4">
        <div className="h-10 w-10 bg-destructive/10 text-destructive rounded-full flex items-center justify-center">
          <PackageX className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold tracking-tight">Request a Return</h3>
          <p className="text-sm text-muted-foreground">Order: {orderId}</p>
        </div>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Reason for Return</label>
            <select 
              className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...form.register('reason')}
            >
              <option value="">Select a reason...</option>
              <option value="defective">Item is defective or broken</option>
              <option value="wrong_item">Received wrong item</option>
              <option value="changed_mind">Changed my mind</option>
              <option value="arrived_late">Arrived too late</option>
            </select>
            {form.formState.errors.reason && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.reason.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Item Condition</label>
            <select 
              className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              {...form.register('condition')}
            >
              <option value="">Select condition...</option>
              <option value="unopened">Unopened / New</option>
              <option value="opened_unused">Opened but unused</option>
              <option value="used">Used</option>
              <option value="damaged">Damaged</option>
            </select>
            {form.formState.errors.condition && (
              <p className="text-sm font-medium text-destructive">{form.formState.errors.condition.message}</p>
            )}
          </div>

          <RHFTextarea 
            name="comments" 
            label="Additional Comments (Optional)" 
            textareaProps={{ rows: 3, placeholder: "Please provide any additional details that might help us process your return faster." }} 
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
