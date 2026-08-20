'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput } from '@commercex/ui';
import { X, AlertTriangle } from 'lucide-react';

const profileSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileTab() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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
    setTimeout(() => {
      setIsLoading(false);
      alert('Profile updated successfully!');
    }, 1000);
  };

  const handleDeleteAccount = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Account deletion request submitted. You will be logged out.');
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Personal Profile</h2>
        <p className="text-muted-foreground mt-1">Manage your personal information and how we can contact you.</p>
      </div>

      <div className="bg-card border rounded-xl p-6 shadow-sm">
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

      <div className="space-y-6 bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900 rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-semibold border-b border-red-200 dark:border-red-800 pb-4 text-red-600 dark:text-red-400 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" /> Danger Zone
        </h3>
        <p className="text-sm text-red-700/80 dark:text-red-300/80">
          Permanently delete your account and all associated data. This action cannot be undone.
        </p>
        <Button variant="destructive" onClick={() => setIsDeleteModalOpen(true)} className="w-full sm:w-auto">Delete Account</Button>
      </div>

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-background rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-xl font-bold text-destructive flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Delete Account</h3>
              <button onClick={() => setIsDeleteModalOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleDeleteAccount} className="p-6">
              <p className="text-sm text-muted-foreground mb-4">
                Are you absolutely sure you want to delete your account? This will permanently erase all your data, order history, and preferences.
              </p>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Type "DELETE" to confirm</label>
                <input required pattern="DELETE" className="w-full p-2 border rounded-md bg-background" placeholder="DELETE" />
              </div>
              <div className="flex justify-end gap-3">
                <Button variant="outline" type="button" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                <Button variant="destructive" type="submit">Permanently Delete</Button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
