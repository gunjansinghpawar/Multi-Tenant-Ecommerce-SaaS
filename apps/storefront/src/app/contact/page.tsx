'use client';

import { useState } from 'react';
import { PageHero } from '@/components/static/PageHero';
import { Mail, Phone, MapPin, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 3000);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-24">
      <PageHero 
        title="Get in touch." 
        subtitle="Our team is here to help you with any questions or support you need."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How can we help?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 text-gray-900 dark:text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Email us</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 mb-2">Our friendly team is here to help.</p>
                  <a href="mailto:hi@commercex.com" className="text-blue-600 dark:text-blue-400 font-medium hover:underline">hi@commercex.com</a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 text-gray-900 dark:text-white">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Live chat</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 mb-2">Available 24/7 for urgent issues.</p>
                  <button className="text-blue-600 dark:text-blue-400 font-medium hover:underline">Start a chat</button>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0 text-gray-900 dark:text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Office</h4>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 mb-2">Come say hello at our HQ.</p>
                  <p className="text-gray-900 dark:text-white font-medium">100 Market St, San Francisco, CA 94105</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-8 sm:p-12 rounded-3xl border border-gray-100 dark:border-gray-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">First name</label>
                    <input type="text" id="firstName" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Last name</label>
                    <input type="text" id="lastName" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors" />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <input type="email" id="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-colors" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                  <textarea id="message" rows={4} required className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none transition-colors"></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={formStatus !== 'idle'}
                  className={`w-full flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl transition-all ${
                    formStatus === 'success' 
                      ? 'bg-green-500 text-white'
                      : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 disabled:opacity-70'
                  }`}
                >
                  {formStatus === 'submitting' ? (
                    <div className="w-6 h-6 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                  ) : formStatus === 'success' ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 mr-2" /> Message Sent
                    </>
                  ) : (
                    <>
                      Send Message <ArrowRight className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
