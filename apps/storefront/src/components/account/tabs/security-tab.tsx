'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput } from '@commercex/ui';
import { Shield, KeyRound, Smartphone } from 'lucide-react';

const passwordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your new password'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

export function SecurityTab() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: PasswordFormData) => {
    setIsLoading(true);
    console.log('Password updated:', data);
    setTimeout(() => {
      setIsLoading(false);
      form.reset();
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Security Settings</h2>
        <p className="text-muted-foreground mt-1">Manage your password and account security preferences.</p>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <div className="flex items-center gap-2 border-b pb-4 mb-6">
          <KeyRound className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Change Password</h3>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <RHFInput 
              name="currentPassword" 
              label="Current Password" 
              inputProps={{ type: 'password' }} 
            />
            <RHFInput 
              name="newPassword" 
              label="New Password" 
              inputProps={{ type: 'password' }} 
              description="Minimum 8 characters long."
            />
            <RHFInput 
              name="confirmPassword" 
              label="Confirm New Password" 
              inputProps={{ type: 'password' }} 
            />

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
                Update Password
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <div className="flex items-center gap-2 border-b pb-4 mb-6">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Two-Factor Authentication (2FA)</h3>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
          <div>
            <p className="font-medium">Authenticator App</p>
            <p className="text-sm text-muted-foreground">Add an extra layer of security to your account using an authenticator app.</p>
          </div>
          <Button variant="outline">Enable 2FA</Button>
        </div>
      </div>
    </div>
  );
}
