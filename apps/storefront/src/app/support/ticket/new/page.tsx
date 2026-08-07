'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, CheckCircle2 } from 'lucide-react';
import { SupportWidget } from '@/components/support/SupportWidget';

export default function NewTicketPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  if (status === 'success') {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-black py-24 px-4 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-8">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Request Submitted</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          Your ticket (#TCK-9942) has been successfully created. Our team will review your request and get back to you within 24 hours.
        </p>
        <div className="space-x-4">
          <Link href="/account" className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-900 dark:hover:bg-gray-100">
            View My Tickets
          </Link>
          <Link href="/help" className="px-6 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 font-semibold rounded-full hover:bg-gray-50 dark:hover:bg-gray-800">
            Back to Help Center
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Link href="/help/contact" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Submit a Request</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">Please provide as much detail as possible so we can best assist you.</p>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-6">
          
          <div>
            <label htmlFor="issueType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">What do you need help with? *</label>
            <select id="issueType" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent">
              <option value="">Select an issue type...</option>
              <option value="order_issue">I have an issue with an existing order</option>
              <option value="product_question">I have a question about a product</option>
              <option value="complaint">I want to file a complaint</option>
              <option value="technical">I'm experiencing a technical issue on the website</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Number (Optional)</label>
              <input type="text" id="orderNumber" placeholder="e.g. ORD-12345" className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address *</label>
              <input type="email" id="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent" />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject *</label>
            <input type="text" id="subject" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent" />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description *</label>
            <textarea id="description" required rows={6} placeholder="Please describe your issue in detail..." className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Attachments (Optional)</label>
            <div className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mb-3" />
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500">SVG, PNG, JPG or PDF (max. 10MB)</p>
            </div>
          </div>

          <div className="pt-6">
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="w-full sm:w-auto px-8 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 disabled:opacity-70 transition-colors"
            >
              {status === 'submitting' ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
      <SupportWidget />
    </main>
  );
}
