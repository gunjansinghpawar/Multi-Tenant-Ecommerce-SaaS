'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput } from '@commercex/ui';
import { CheckCircle2 } from 'lucide-react';
import { useAnalytics } from '../../hooks/use-analytics';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type NewsletterFormData = z.infer<typeof newsletterSchema>;

export function NewsletterForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<NewsletterFormData>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: '' },
  });

  const { track } = useAnalytics();

  const onSubmit = (data: NewsletterFormData) => {
    setIsLoading(true);
    console.log('Newsletter subscription:', data);
    setTimeout(() => {
      track('newsletter_signup', { email: data.email });
      setIsLoading(false);
      setIsSuccess(true);
    }, 1000);
  };

  if (isSuccess) {
    return (
      <div className="flex items-center gap-2 text-green-600 dark:text-green-500 bg-green-50 dark:bg-green-900/20 p-3 rounded-md animate-in fade-in">
        <CheckCircle2 className="h-5 w-5" />
        <span className="text-sm font-medium">Successfully subscribed!</span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 max-w-md" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex gap-2">
          <div className="flex-1">
            <RHFInput 
              name="email" 
              inputProps={{ 
                type: 'email', 
                placeholder: 'Enter your email',
                className: 'bg-background',
                'aria-label': 'Email address for newsletter'
              }} 
            />
          </div>
          <div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? '...' : 'Subscribe'}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
