'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput, RHFTextarea } from '@commercex/ui';
import { Mail } from 'lucide-react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message too long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = (data: ContactFormData) => {
    setIsLoading(true);
    console.log('Contact form submitted:', data);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12 px-6 bg-card border rounded-xl animate-in fade-in zoom-in-95">
        <div className="mx-auto w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
        <p className="text-muted-foreground mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
        <Button variant="outline" onClick={() => { setIsSuccess(false); form.reset(); }}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card border rounded-xl p-6 shadow-sm">
      <div className="mb-6 border-b pb-4">
        <h3 className="text-2xl font-bold tracking-tight">Contact Us</h3>
        <p className="text-muted-foreground">Have a question? We'd love to hear from you.</p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <RHFInput name="name" label="Your Name" inputProps={{ placeholder: 'John Doe' }} />
            <RHFInput name="email" label="Email Address" inputProps={{ type: 'email', placeholder: 'john@example.com' }} />
          </div>
          
          <RHFInput name="subject" label="Subject" inputProps={{ placeholder: 'How can we help?' }} />
          
          <RHFTextarea 
            name="message" 
            label="Message" 
            textareaProps={{ rows: 5, placeholder: 'Please describe your inquiry in detail...' }} 
          />

          <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
            {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
            Send Message
          </Button>
        </form>
      </Form>
    </div>
  );
}
