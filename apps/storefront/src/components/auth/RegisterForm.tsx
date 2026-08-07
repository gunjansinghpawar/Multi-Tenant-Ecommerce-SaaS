'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput } from '@commercex/ui';
import { Mail, Lock } from 'lucide-react';
import { useUiStore } from '../../store/use-ui-store';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { setAuthModalOpen } = useUiStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '' },
  });

  const onSubmit = (data: RegisterFormData) => {
    setIsLoading(true);
    console.log('Register Data:', data);
    setTimeout(() => {
      setIsLoading(false);
      setAuthModalOpen(false);
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <RHFInput 
            name="firstName" 
            label="First name" 
            inputProps={{ placeholder: 'John', className: 'h-11' }} 
          />
          <RHFInput 
            name="lastName" 
            label="Last name" 
            inputProps={{ placeholder: 'Doe', className: 'h-11' }} 
          />
        </div>

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

        <div className="relative">
          <Lock className="absolute left-3 top-9 h-5 w-5 text-muted-foreground z-10" />
          <RHFInput 
            name="password" 
            label="Password" 
            inputProps={{ 
              type: 'password', 
              className: 'pl-10 h-11'
            }} 
          />
        </div>

        <Button type="submit" className="w-full h-11 text-base mt-2" disabled={isLoading}>
          {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
          Create Account
        </Button>
      </form>
    </Form>
  );
}
