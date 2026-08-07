'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput } from '@commercex/ui';
import { Mail, CheckCircle2 } from 'lucide-react';

const passwordSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export function PasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = (data: PasswordFormData) => {
    setIsLoading(true);
    console.log('Reset Password Data:', data);
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  if (isSent) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 py-4 animate-in fade-in slide-in-from-bottom-4">
        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-500" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">Check your email</h3>
          <p className="text-sm text-muted-foreground">
            We've sent password reset instructions to your email.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <Mail className="absolute left-3 top-9 h-5 w-5 text-muted-foreground z-10" />
          <RHFInput 
            name="email" 
            label="Email" 
            inputProps={{ 
              placeholder: 'name@example.com', 
              type: 'email',
              className: 'pl-10 h-11'
            }} 
          />
        </div>

        <Button type="submit" className="w-full h-11 text-base mt-2" disabled={isLoading}>
          {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
          Send Reset Link
        </Button>
      </form>
    </Form>
  );
}
