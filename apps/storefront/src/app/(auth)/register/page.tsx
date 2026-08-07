'use client';

import React, { useEffect } from 'react';
import { useUiStore } from '../../../store/use-ui-store';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const { setAuthModalOpen, setAuthModalView, isAuthModalOpen } = useUiStore();
  const router = useRouter();

  useEffect(() => {
    setAuthModalView('register');
    setAuthModalOpen(true);
  }, [setAuthModalOpen, setAuthModalView]);

  useEffect(() => {
    if (!isAuthModalOpen) {
      router.push('/');
    }
  }, [isAuthModalOpen, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
      <h1 className="text-2xl font-bold mb-2">Create Account</h1>
      <p className="text-muted-foreground mb-8">Please use the secure popup to register.</p>
      <button 
        onClick={() => setAuthModalOpen(true)}
        className="text-primary underline font-medium"
      >
        Open Registration Modal
      </button>
    </div>
  );
}
