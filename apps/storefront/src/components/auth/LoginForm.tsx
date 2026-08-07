'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Form, RHFInput } from '@commercex/ui';
import { Mail, Lock, KeyRound } from 'lucide-react';
import { useUiStore } from '../../store/use-ui-store';

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { setAuthModalView, setAuthModalOpen } = useUiStore();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormData) => {
    setIsLoading(true);
    console.log('Login Data:', data);
    setTimeout(() => {
      setIsLoading(false);
      setAuthModalOpen(false);
    }, 1500);
  };

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

        <div className="relative">
          <Lock className="absolute left-3 top-9 h-5 w-5 text-muted-foreground z-10" />
          <div className="flex items-center justify-between absolute right-0 top-0 text-sm">
            <button 
              type="button" 
              onClick={() => setAuthModalView('forgot_password')} 
              className="text-xs font-medium text-primary hover:underline underline-offset-4"
            >
              Forgot password?
            </button>
          </div>
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
          Sign In
        </Button>

        <div className="mt-4 text-center">
          <button 
            type="button" 
            onClick={() => setAuthModalView('magic_link')} 
            className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center justify-center w-full gap-2 transition-colors"
          >
            <KeyRound className="h-4 w-4" /> Sign in with Magic Link
          </button>
        </div>
      </form>
    </Form>
  );
}
