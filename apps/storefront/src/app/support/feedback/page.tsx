'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Heart } from 'lucide-react';
import { SupportWidget } from '@/components/support/SupportWidget';

export default function FeedbackPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [rating, setRating] = useState<number | null>(null);
  const [feedback, setFeedback] = useState('');

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
        <div className="w-20 h-20 bg-pink-100 dark:bg-pink-900/30 text-pink-500 rounded-full flex items-center justify-center mb-8 animate-in zoom-in duration-500">
          <Heart className="w-10 h-10 fill-current" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Thank You!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-8">
          We appreciate you taking the time to share your feedback. Your insights help us build a better experience for everyone.
        </p>
        <Link href="/" className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors">
          Return to Store
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <Link href="/help" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-8">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Help Center
        </Link>
        
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Share your thoughts</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-12">We're constantly trying to improve. Let us know how we're doing.</p>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 space-y-10">
          
          {/* NPS Rating */}
          <div>
            <label className="block text-lg font-bold text-gray-900 dark:text-white mb-6 text-center">
              How likely are you to recommend us to a friend or colleague?
            </label>
            <div className="flex flex-wrap justify-center gap-2 mb-2">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setRating(num)}
                  className={`w-10 h-10 rounded-full font-bold transition-all ${
                    rating === num 
                      ? 'bg-black dark:bg-white text-white dark:text-black scale-110 shadow-lg' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-sm text-gray-500 px-4 sm:px-12">
              <span>Not likely</span>
              <span>Very likely</span>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-gray-800" />

          {/* Feedback Text */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              What is the primary reason for your score? Or do you have any feature requests?
            </label>
            <textarea 
              id="feedback" 
              required 
              rows={6}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us what you loved, or what we could do better..." 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none"
            ></textarea>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address (Optional)
            </label>
            <input 
              type="email" 
              id="email" 
              placeholder="If you'd like us to follow up" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent" 
            />
          </div>

          <div className="pt-4 text-center">
            <button 
              type="submit" 
              disabled={status === 'submitting' || rating === null || !feedback.trim()}
              className="w-full sm:w-auto px-12 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 disabled:opacity-50 transition-colors"
            >
              {status === 'submitting' ? 'Sending...' : 'Submit Feedback'}
            </button>
          </div>
        </form>
      </div>
      <SupportWidget />
    </main>
  );
}
