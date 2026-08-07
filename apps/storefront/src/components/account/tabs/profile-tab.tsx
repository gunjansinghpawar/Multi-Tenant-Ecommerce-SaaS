'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput } from '@commercex/ui';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileTab() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 (555) 123-4567',
    },
  });

  const onSubmit = (data: ProfileFormData) => {
    setIsLoading(true);
    console.log('Profile saved:', data);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Personal Profile</h2>
        <p className="text-muted-foreground mt-1">Manage your personal information and how we can contact you.</p>
      </div>

      <div className="bg-card border rounded-xl p-6">
        <h3 className="text-lg font-semibold border-b pb-4 mb-6">Basic Information</h3>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <RHFInput name="firstName" label="First Name" />
              <RHFInput name="lastName" label="Last Name" />
            </div>
            
            <RHFInput name="email" label="Email Address" inputProps={{ type: 'email' }} />
            <RHFInput name="phone" label="Phone Number" inputProps={{ type: 'tel' }} />

            <div className="pt-4 flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="space-y-6 bg-card border rounded-xl p-6">
        <h3 className="text-lg font-semibold border-b pb-4 text-destructive">Danger Zone</h3>
        <p className="text-sm text-muted-foreground">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <Button variant="destructive" className="w-full sm:w-auto">Delete Account</Button>
      </div>
    </div>
  );
}
