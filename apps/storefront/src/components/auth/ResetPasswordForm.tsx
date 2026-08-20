'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput } from '@commercex/ui';
import { Lock, CheckCircle2 } from 'lucide-react';

const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = (data: ResetPasswordFormData) => {
    setIsLoading(true);
    console.log('Reset Password Data:', data);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center text-center space-y-4 py-4 animate-in fade-in slide-in-from-bottom-4">
        <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-500" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-lg">Password Reset Successfully</h3>
          <p className="text-sm text-muted-foreground">
            You can now log in with your new password.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="relative">
          <Lock className="absolute left-3 top-9 h-5 w-5 text-muted-foreground z-10" />
          <RHFInput 
            name="password" 
            label="New Password" 
            inputProps={{ 
              placeholder: '••••••••', 
              type: 'password',
              className: 'pl-10 h-11'
            }} 
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-9 h-5 w-5 text-muted-foreground z-10" />
          <RHFInput 
            name="confirmPassword" 
            label="Confirm New Password" 
            inputProps={{ 
              placeholder: '••••••••', 
              type: 'password',
              className: 'pl-10 h-11'
            }} 
          />
        </div>

        <Button type="submit" className="w-full h-11 text-base mt-2" disabled={isLoading}>
          {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
          Reset Password
        </Button>
      </form>
    </Form>
  );
}
