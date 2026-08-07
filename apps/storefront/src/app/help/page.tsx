'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Package, RefreshCcw, CreditCard, User, Mail, ArrowRight, FileText } from 'lucide-react';
import { SupportWidget } from '@/components/support/SupportWidget';

export default function HelpCenterPage() {
  const [search, setSearch] = useState('');

  const quickLinks = [
    { icon: Package, title: 'Track Order', href: '/account/orders' },
    { icon: RefreshCcw, title: 'Returns & Exchanges', href: '/support/returns' },
    { icon: CreditCard, title: 'Billing & Payments', href: '/help/article/billing' },
    { icon: User, title: 'Account Settings', href: '/account' },
  ];

  const categories = [
    {
      title: 'Getting Started',
      articles: [
        { title: 'How to create an account', slug: 'create-account' },
        { title: 'Managing your preferences', slug: 'manage-preferences' },
        { title: 'Rewards program explained', slug: 'rewards-program' },
      ]
    },
    {
      title: 'Shipping & Delivery',
      articles: [
        { title: 'Where is my order?', slug: 'track-order' },
        { title: 'International shipping rates', slug: 'international-shipping' },
        { title: 'What to do if a package is lost', slug: 'lost-package' },
      ]
    },
    {
      title: 'Returns & Refunds',
      articles: [
        { title: 'Our return policy', slug: 'return-policy' },
        { title: 'How to start a return', slug: 'start-return' },
        { title: 'When will I get my refund?', slug: 'refund-timeline' },
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black pb-24">
      {/* Hero / Search */}
      <div className="bg-black dark:bg-gray-900 py-24 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-8">How can we help?</h1>
          
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for answers (e.g. 'return policy')"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-5 bg-white rounded-2xl text-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/50 shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10 mb-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {quickLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.title} href={link.href} className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:-translate-y-1 hover:shadow-xl transition-all group">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{link.title}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Knowledge Base Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Browse by Category</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div key={category.title} className="bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.articles.map((article) => (
                  <li key={article.slug}>
                    <Link href={`/help/article/${article.slug}`} className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center justify-between group">
                      <span className="truncate pr-4">{article.title}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href={`/help/category/${category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className="inline-block mt-8 text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline">
                View all articles
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Still need help? */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="bg-blue-600 dark:bg-blue-900 rounded-3xl p-8 sm:p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
            <p className="text-blue-100 mb-8 max-w-xl mx-auto">Our support team is available 24/7 to assist you with any questions or concerns.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/help/contact" className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-colors inline-flex items-center justify-center">
                <Mail className="w-5 h-5 mr-2" /> Contact Support
              </Link>
              <Link href="/support/ticket/new" className="px-8 py-4 bg-blue-700 dark:bg-blue-800 text-white font-bold rounded-xl hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors inline-flex items-center justify-center border border-blue-500">
                Submit a Ticket
              </Link>
            </div>
          </div>
        </div>
      </div>

      <SupportWidget />
    </main>
  );
}
