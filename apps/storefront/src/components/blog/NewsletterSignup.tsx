'use client';

import { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2 } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="bg-black dark:bg-gray-900 rounded-[2.5rem] p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10 animate-blob" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />
      
      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/10">
          <Mail className="w-8 h-8 text-white" />
        </div>
        
        <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
          Get the latest insights delivered weekly
        </h3>
        <p className="text-gray-400 text-lg mb-8 max-w-lg">
          Join 50,000+ modern merchants receiving our best strategies, case studies, and product updates. No spam, ever.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md relative">
          <div className="flex bg-white/5 border border-white/10 rounded-full p-1.5 focus-within:ring-2 focus-within:ring-white/50 focus-within:border-transparent transition-all backdrop-blur-md">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="flex-1 bg-transparent border-none text-white placeholder-gray-500 px-6 py-3 focus:outline-none focus:ring-0 sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status !== 'idle'}
            />
            <button
              type="submit"
              disabled={status !== 'idle' || !email}
              className={`flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all ${
                status === 'success'
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-black hover:bg-gray-100 disabled:opacity-50'
              }`}
            >
              {status === 'loading' ? (
                <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : status === 'success' ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" /> Subscribed
                </>
              ) : (
                <>
                  Subscribe <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
