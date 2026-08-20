'use client';

import React, { useState } from 'react';
import { Mail, Lock, User as UserIcon, ArrowLeft, Github, Chrome, KeyRound } from 'lucide-react';
import { Dialog, DialogContent, Button, Input, Label } from '@commercex/ui';
import { useUiStore, AuthView } from '../../store/use-ui-store';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { PasswordForm } from './PasswordForm';
import { ResetPasswordForm } from './ResetPasswordForm';

export function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, authModalView, setAuthModalView } = useUiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  // Handle Mock Submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (authModalView === 'magic_link') {
        setAuthModalView('otp');
      } else {
        setAuthModalOpen(false);
        // Navigate to account page in real app
      }
    }, 1500);
  };

  const SocialButtons = () => (
    <div className="flex flex-col gap-3 mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="w-full h-11" type="button">
          <Chrome className="mr-2 h-4 w-4" /> Google
        </Button>
        <Button variant="outline" className="w-full h-11" type="button">
          <svg className="mr-2 h-4 w-4 fill-current" viewBox="0 0 24 24">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.31-.83 3.61-.75 1.55.15 2.68.79 3.39 1.95-2.9 1.69-2.38 5.6.49 6.77-.73 1.83-1.63 3.3-2.57 4.2zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg> Apple
        </Button>
      </div>
    </div>
  );

  return (
    <Dialog open={isAuthModalOpen} onOpenChange={setAuthModalOpen}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-background rounded-2xl border-border/50">
        <div className="p-8">
          
          {/* Header */}
          <div className="flex flex-col space-y-2 text-center mb-8">
            {authModalView !== 'login' && authModalView !== 'register' && (
              <button 
                onClick={() => setAuthModalView('login')}
                className="absolute left-6 top-8 text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
            )}
            
            <h2 className="text-2xl font-bold tracking-tight">
              {authModalView === 'login' && "Welcome back"}
              {authModalView === 'register' && "Create an account"}
              {authModalView === 'forgot_password' && "Reset password"}
              {authModalView === 'reset_password' && "Create new password"}
              {authModalView === 'magic_link' && "Passwordless sign in"}
              {authModalView === 'otp' && "Verify code"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {authModalView === 'login' && "Enter your email and password to sign in."}
              {authModalView === 'register' && "Enter your details below to create your account."}
              {authModalView === 'forgot_password' && "Enter your email address and we will send you a reset link."}
              {authModalView === 'reset_password' && "Enter your new password below."}
              {authModalView === 'magic_link' && "Enter your email to receive a secure login code."}
              {authModalView === 'otp' && "We sent a 6-digit verification code to your email."}
            </p>
          </div>

          <div className="mt-4">
            {authModalView === 'login' && <LoginForm />}
            {authModalView === 'register' && <RegisterForm />}
            {authModalView === 'forgot_password' && <PasswordForm />}
            {authModalView === 'reset_password' && <ResetPasswordForm />}
            {authModalView === 'magic_link' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input id="email" type="email" placeholder="name@example.com" className="pl-10 h-11" required />
                  </div>
                </div>
                <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                  {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
                  Send Login Code
                </Button>
              </form>
            )}
            {authModalView === 'otp' && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex justify-between gap-2 pb-4">
                  {otp.map((digit, idx) => (
                    <Input 
                      key={idx}
                      type="text" 
                      maxLength={1} 
                      className="w-12 h-14 text-center text-lg font-bold"
                      aria-label={`Digit ${idx + 1} of verification code`}
                      value={digit}
                      onChange={(e) => {
                        const newOtp = [...otp];
                        newOtp[idx] = e.target.value;
                        setOtp(newOtp);
                      }}
                    />
                  ))}
                </div>
                <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                  {isLoading && <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
                  Verify & Sign In
                </Button>
              </form>
            )}
          </div>

          {/* Alternative Login Options (Removed Duplicate) */}

          {/* Socials (Only on Login/Register) */}
          {(authModalView === 'login' || authModalView === 'register') && <SocialButtons />}

          {/* Footer Links */}
          <div className="mt-8 text-center text-sm text-muted-foreground">
            {authModalView === 'login' ? (
              <>
                Don't have an account?{' '}
                <button onClick={() => setAuthModalView('register')} className="font-semibold text-primary hover:underline underline-offset-4">
                  Sign up
                </button>
              </>
            ) : authModalView === 'register' ? (
              <>
                Already have an account?{' '}
                <button onClick={() => setAuthModalView('login')} className="font-semibold text-primary hover:underline underline-offset-4">
                  Sign in
                </button>
              </>
            ) : null}
          </div>

        </div>
      </DialogContent>
    </Dialog>
  );
}
