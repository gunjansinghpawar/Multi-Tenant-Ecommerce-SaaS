'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCheckoutStore } from '../../store/use-checkout-store';
import { Button, Form, RHFInput } from '@commercex/ui';

const guestSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

type GuestFormData = z.infer<typeof guestSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

export function CheckoutAuth() {
  const { setCheckoutMode, isGuest, guestEmail, setGuestEmail, setStep } = useCheckoutStore();

  const guestForm = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
    defaultValues: { email: guestEmail || '' },
  });

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleContinueAsGuest = (data: GuestFormData) => {
    setGuestEmail(data.email);
    setStep('shipping-address');
  };

  const handleLogin = (data: LoginFormData) => {
    console.log('Login attempt:', data);
    setStep('shipping-address');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex space-x-6 border-b pb-4">
        <button
          onClick={() => setCheckoutMode(true)}
          className={`text-lg font-medium pb-2 transition-colors relative ${
            isGuest ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Guest Checkout
          {isGuest && (
            <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-primary rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setCheckoutMode(false)}
          className={`text-lg font-medium pb-2 transition-colors relative ${
            !isGuest ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Login Checkout
          {!isGuest && (
            <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-primary rounded-t-full" />
          )}
        </button>
      </div>

      {isGuest ? (
        <Form {...guestForm}>
          <form onSubmit={guestForm.handleSubmit(handleContinueAsGuest)} className="space-y-4 max-w-md">
            <RHFInput 
              name="email" 
              label="Email Address" 
              description="We'll use this to send your order confirmation."
              inputProps={{ placeholder: 'you@example.com', type: 'email' }} 
            />
            <Button type="submit" className="w-full">Continue as Guest</Button>
          </form>
        </Form>
      ) : (
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4 max-w-md">
            <RHFInput 
              name="email" 
              label="Email Address" 
              inputProps={{ placeholder: 'you@example.com', type: 'email' }} 
            />
            <RHFInput 
              name="password" 
              label="Password" 
              inputProps={{ type: 'password' }} 
            />
            <Button type="submit" className="w-full">
              Login & Continue
            </Button>
            <div className="text-center text-sm text-muted-foreground mt-4">
              (Simulator: Just enter anything and continue)
            </div>
          </form>
        </Form>
      )}
    </div>
  );
}
