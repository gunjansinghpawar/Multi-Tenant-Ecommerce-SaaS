'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ThumbsUp, ThumbsDown, CheckCircle2 } from 'lucide-react';
import { SupportWidget } from '@/components/support/SupportWidget';

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [feedback, setFeedback] = useState<'idle' | 'yes' | 'no'>('idle');

  // Simulated article data based on slug
  const article = {
    title: resolvedParams.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    category: 'Returns & Refunds',
    lastUpdated: 'August 12, 2026',
    content: `
      <h2>Standard Return Window</h2>
      <p>We want you to be completely satisfied with your purchase. If you are not entirely happy, we offer a 30-day return window from the date of delivery.</p>
      
      <h2>Conditions for Return</h2>
      <ul>
        <li>Items must be unused and in their original condition.</li>
        <li>Original tags and packaging must be intact.</li>
        <li>Final sale items, customized products, and personal care goods are not eligible for return.</li>
      </ul>

      <h2>How to initiate a return</h2>
      <p>The fastest way to start your return is through our automated portal. You will need your Order Number and the Email Address used at checkout.</p>
      
      <ol>
        <li>Navigate to the <a href="/support/returns">Returns Portal</a>.</li>
        <li>Enter your details to pull up your order history.</li>
        <li>Select the items you wish to return and the reason.</li>
        <li>Print the prepaid shipping label provided and drop the package at any authorized shipping location.</li>
      </ol>

      <p>Please allow 3-5 business days for your refund to be processed once we receive the returned items at our warehouse.</p>
    `
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-24">
      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link href="/help" className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline mb-8">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Help Center
          </Link>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>{article.category}</span>
            <span>•</span>
            <span>Updated {article.lastUpdated}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            {article.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article 
          className="prose prose-lg dark:prose-invert max-w-none prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-500 prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Feedback block */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col items-center">
          {feedback === 'idle' ? (
            <>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Was this article helpful?</h3>
              <div className="flex space-x-4">
                <button 
                  onClick={() => setFeedback('yes')}
                  className="flex items-center px-6 py-2 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-200 dark:hover:border-green-800 hover:text-green-700 dark:hover:text-green-400 transition-colors font-medium text-gray-700 dark:text-gray-300"
                >
                  <ThumbsUp className="w-4 h-4 mr-2" /> Yes
                </button>
                <button 
                  onClick={() => setFeedback('no')}
                  className="flex items-center px-6 py-2 border border-gray-200 dark:border-gray-700 rounded-full hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-200 dark:hover:border-red-800 hover:text-red-700 dark:hover:text-red-400 transition-colors font-medium text-gray-700 dark:text-gray-300"
                >
                  <ThumbsDown className="w-4 h-4 mr-2" /> No
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center text-green-600 dark:text-green-400 font-medium">
              <CheckCircle2 className="w-5 h-5 mr-2" /> Thanks for your feedback!
            </div>
          )}
        </div>
      </div>
      <SupportWidget />
    </main>
  );
}
