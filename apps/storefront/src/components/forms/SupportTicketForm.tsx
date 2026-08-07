'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput, RHFTextarea } from '@commercex/ui';
import { LifeBuoy } from 'lucide-react';

const ticketSchema = z.object({
  department: z.string().min(1, 'Please select a department'),
  priority: z.enum(['low', 'normal', 'high', 'urgent']),
  subject: z.string().min(5, 'Subject is required'),
  description: z.string().min(10, 'Description is required'),
});

type TicketFormData = z.infer<typeof ticketSchema>;

export function SupportTicketForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      department: '',
      priority: 'normal',
      subject: '',
      description: '',
    },
  });

  const onSubmit = (data: TicketFormData) => {
    setIsLoading(true);
    console.log('Support ticket submitted:', data);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-6 bg-card border rounded-xl animate-in fade-in zoom-in-95">
        <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
          <LifeBuoy className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Ticket Created!</h3>
        <p className="text-muted-foreground mb-6">Your ticket ID is #TKT-4892. Our support team will review it shortly.</p>
        <Button variant="outline" onClick={() => { setIsSuccess(false); form.reset(); }}>
          Create Another Ticket
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm">
      <div className="mb-6 border-b pb-4">
        <h3 className="text-2xl font-bold tracking-tight">Open a Support Ticket</h3>
        <p className="text-muted-foreground">Need help with an order or product? We're here for you.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Department</label>
              <select 
                className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                {...form.register('department')}
              >
                <option value="">Select a department...</option>
                <option value="general">General Inquiry</option>
                <option value="sales">Sales & Billing</option>
                <option value="technical">Technical Support</option>
                <option value="returns">Returns & Refunds</option>
              </select>
              {form.formState.errors.department && (
                <p className="text-sm font-medium text-destructive">{form.formState.errors.department.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <select 
                className="flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                {...form.register('priority')}
              >
                <option value="low">Low</option>
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          
          <RHFInput name="subject" label="Subject" inputProps={{ placeholder: 'Briefly describe the issue' }} />
          
          <RHFTextarea 
            name="description" 
            label="Detailed Description" 
            textareaProps={{ rows: 6, placeholder: 'Please provide as much detail as possible so we can best assist you.' }} 
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
            Submit Ticket
          </Button>
        </form>
      </Form>
    </div>
  );
}
