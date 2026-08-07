'use client';

import React, { useEffect } from 'react';
import { useUiStore } from '../../../store/use-ui-store';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const { setAuthModalOpen, setAuthModalView, isAuthModalOpen } = useUiStore();
  const router = useRouter();

  useEffect(() => {
    setAuthModalView('login');
    setAuthModalOpen(true);
  }, [setAuthModalOpen, setAuthModalView]);

  useEffect(() => {
    // Basic redirect if modal is closed from this dedicated route
    if (!isAuthModalOpen) {
      router.push('/');
    }
  }, [isAuthModalOpen, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8">
      <h1 className="text-2xl font-bold mb-2">Sign In</h1>
      <p className="text-muted-foreground mb-8">Please use the secure popup to sign in.</p>
      <button 
        onClick={() => setAuthModalOpen(true)}
        className="text-primary underline font-medium"
      >
        Open Login Modal
      </button>
    </div>
  );
}
