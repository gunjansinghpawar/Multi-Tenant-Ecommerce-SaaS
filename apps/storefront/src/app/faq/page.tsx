'use client';

import { useState } from 'react';
import { PageHero } from '@/components/static/PageHero';
import { Accordion } from '@/components/static/Accordion';
import { Search } from 'lucide-react';

export default function FAQPage() {
  const [search, setSearch] = useState('');

  const faqs = [
    {
      category: 'Orders & Shipping',
      items: [
        { id: '1', title: 'How long will it take to get my order?', content: 'Standard shipping normally takes 3-5 days. Next day shipping is available on all domestic orders (for an additional charge). International shipping times depend on the products and destination.' },
        { id: '2', title: 'Do you ship internationally?', content: 'Yes! We ship to most countries worldwide. International shipping rates are calculated at checkout based on your location.' },
        { id: '3', title: 'How can I track my order?', content: 'Once your order has shipped, you will receive an email with a tracking link. You can also view tracking information in your account dashboard.' },
      ]
    },
    {
      category: 'Returns & Refunds',
      items: [
        { id: '4', title: 'What is your return policy?', content: 'We offer a 30-day return window for all unused items in their original packaging. Custom or personalized items are final sale.' },
        { id: '5', title: 'When will I get my refund?', content: 'Once we receive and inspect your return, refunds are processed within 3-5 business days back to your original payment method.' },
      ]
    },
    {
      category: 'Products',
      items: [
        { id: '6', title: 'Are your products ethically sourced?', content: 'Absolutely. We work closely with our manufacturers to ensure fair labor practices and sustainable materials are used whenever possible.' },
        { id: '7', title: 'Do you offer warranty?', content: 'Yes, all our hardware products come with a standard 1-year limited warranty against manufacturing defects.' },
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.title.toLowerCase().includes(search.toLowerCase()) || 
      item.content.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-24">
      <PageHero 
        title="Frequently Asked Questions" 
        subtitle="Find answers to common questions about our products, shipping, and returns."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-2 flex items-center">
          <div className="pl-4 pr-2">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search for an answer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full py-4 bg-transparent border-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-400 text-lg"
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 space-y-16">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((category, idx) => (
            <div key={idx}>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 pl-2 border-l-4 border-black dark:border-white">
                {category.category}
              </h2>
              <Accordion items={category.items} />
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">No results found for "{search}".</p>
            <p className="mt-2 text-gray-400 dark:text-gray-500">Please try a different search term or contact support.</p>
          </div>
        )}
      </div>
    </main>
  );
}
