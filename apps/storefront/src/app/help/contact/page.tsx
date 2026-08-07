'use client';

import Link from 'next/link';
import { Phone, MessageCircle, Mail, TicketIcon, MessageSquare } from 'lucide-react';
import { SupportWidget } from '@/components/support/SupportWidget';

export default function OmnichannelContactPage() {
  const contactOptions = [
    {
      icon: MessageSquare,
      title: 'Live Chat',
      description: 'Chat instantly with our support team.',
      actionText: 'Start Chat',
      status: 'Wait time: < 2 mins',
      statusColor: 'text-green-600 dark:text-green-400',
      action: 'widget'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      description: 'Message us securely via WhatsApp.',
      actionText: 'Open WhatsApp',
      status: 'Usually replies in 5 mins',
      statusColor: 'text-green-600 dark:text-green-400',
      href: 'https://wa.me/1234567890'
    },
    {
      icon: Phone,
      title: 'Phone Call',
      description: 'Speak directly with an agent.',
      actionText: 'Call 1-800-COMMERCE',
      status: 'Current wait time: 12 mins',
      statusColor: 'text-yellow-600 dark:text-yellow-400',
      href: 'tel:18001234567'
    },
    {
      icon: TicketIcon,
      title: 'Support Ticket',
      description: 'Submit a detailed request or complaint.',
      actionText: 'Open Ticket',
      status: 'Response within 24 hours',
      statusColor: 'text-blue-600 dark:text-blue-400',
      href: '/support/ticket/new'
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Contact Support</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Choose the channel that works best for you. We're here to help.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {contactOptions.map(option => {
            const Icon = option.icon;
            const isWidget = option.action === 'widget';
            
            const cardContent = (
              <>
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-900 dark:text-white">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{option.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1">{option.description}</p>
                
                <div className="flex items-center justify-between w-full mt-auto">
                  <span className={`text-sm font-medium ${option.statusColor}`}>{option.status}</span>
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400 group-hover:underline">
                    {option.actionText}
                  </span>
                </div>
              </>
            );

            const className = "flex flex-col bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer text-left h-full";

            if (isWidget) {
              return (
                <button key={option.title} className={className} onClick={() => alert("Please click the floating widget in the bottom right!")}>
                  {cardContent}
                </button>
              );
            }

            return (
              <Link key={option.title} href={option.href!} className={className}>
                {cardContent}
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center bg-white dark:bg-gray-900 p-8 rounded-3xl border border-gray-100 dark:border-gray-800">
          <Mail className="w-8 h-8 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Prefer Email?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">Send us an email directly at support@commercex.com.</p>
          <a href="mailto:support@commercex.com" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">support@commercex.com</a>
        </div>

      </div>
      <SupportWidget />
    </main>
  );
}
