'use client';

import { useState } from 'react';
import { Mail, Smartphone, Bell, MessageCircle, Save } from 'lucide-react';
import { NotificationChannelBlock } from '@/components/account/NotificationChannelBlock';
import { ToggleSwitch } from '@/components/account/ToggleSwitch';

export default function NotificationPreferencesPage() {
  const [hasChanges, setHasChanges] = useState(false);
  const [globalUnsubscribe, setGlobalUnsubscribe] = useState(false);

  // Simulated State for Preferences
  const [preferences, setPreferences] = useState({
    email: {
      orders: true,
      promotions: true,
      newsletter: false,
      abandonedCart: true,
    },
    sms: {
      orders: true,
      promotions: false,
      flashSales: true,
    },
    push: {
      orders: true,
      shipping: true,
      promotions: false,
    },
    whatsapp: {
      orders: false,
      support: true,
    }
  });

  const handleToggle = (channel: keyof typeof preferences, optionId: string, newValue: boolean) => {
    setPreferences(prev => ({
      ...prev,
      [channel]: {
        ...prev[channel],
        [optionId]: newValue
      }
    }));
    setHasChanges(true);
  };

  const handleGlobalUnsubscribe = (val: boolean) => {
    setGlobalUnsubscribe(val);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate API call
    setTimeout(() => {
      setHasChanges(false);
      alert('Preferences saved successfully.');
    }, 500);
  };

  return (
    <div className="max-w-4xl mx-auto pb-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Notification Preferences</h1>
        <p className="text-gray-600 dark:text-gray-400">Control how and when we communicate with you across all channels.</p>
      </div>

      {/* Global Unsubscribe */}
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/30 rounded-2xl p-6 mb-12 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-red-900 dark:text-red-400 mb-1">Unsubscribe from all marketing</h3>
          <p className="text-sm text-red-700 dark:text-red-300">You will only receive critical transactional messages (order confirmations, shipping updates).</p>
        </div>
        <div className="ml-4 flex-shrink-0">
          <ToggleSwitch enabled={globalUnsubscribe} onChange={handleGlobalUnsubscribe} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <NotificationChannelBlock
          icon={Mail}
          title="Email Preferences"
          description="Manage updates sent to your inbox."
          masterEnabled={!globalUnsubscribe}
          onToggle={(id, val) => handleToggle('email', id, val)}
          options={[
            { id: 'orders', label: 'Order & Shipping Updates', description: 'Receipts, tracking info (Required)', enabled: true }, // Should be un-toggleable in a real app if required
            { id: 'promotions', label: 'Promotions & Sales', description: 'Early access to sales and exclusive offers', enabled: preferences.email.promotions },
            { id: 'newsletter', label: 'Weekly Newsletter', description: 'Our latest articles, guides, and lookbooks', enabled: preferences.email.newsletter },
            { id: 'abandonedCart', label: 'Abandoned Cart Reminders', description: 'Helpful reminders if you leave something behind', enabled: preferences.email.abandonedCart },
          ]}
        />

        {/* SMS */}
        <NotificationChannelBlock
          icon={Smartphone}
          title="SMS Preferences"
          description="Text messages to your mobile device."
          masterEnabled={!globalUnsubscribe}
          onToggle={(id, val) => handleToggle('sms', id, val)}
          options={[
            { id: 'orders', label: 'Order Delivery Updates', description: 'Real-time text alerts when your package is out for delivery', enabled: preferences.sms.orders },
            { id: 'promotions', label: 'Special Offers', description: 'Occasional text-only discounts', enabled: preferences.sms.promotions },
            { id: 'flashSales', label: 'Flash Sale Alerts', description: 'Get notified minutes before a flash sale starts', enabled: preferences.sms.flashSales },
          ]}
        />

        {/* Push */}
        <NotificationChannelBlock
          icon={Bell}
          title="Push Notifications"
          description="Alerts sent to your mobile app or browser."
          masterEnabled={!globalUnsubscribe}
          onToggle={(id, val) => handleToggle('push', id, val)}
          options={[
            { id: 'orders', label: 'Order Status', enabled: preferences.push.orders },
            { id: 'shipping', label: 'Delivery Tracking', enabled: preferences.push.shipping },
            { id: 'promotions', label: 'App-Exclusive Promos', enabled: preferences.push.promotions },
          ]}
        />

        {/* WhatsApp */}
        <NotificationChannelBlock
          icon={MessageCircle}
          title="WhatsApp Preferences"
          description="Updates sent directly to your WhatsApp."
          masterEnabled={!globalUnsubscribe}
          onToggle={(id, val) => handleToggle('whatsapp', id, val)}
          options={[
            { id: 'orders', label: 'Order Confirmations', description: 'Receive your receipt via WhatsApp', enabled: preferences.whatsapp.orders },
            { id: 'support', label: 'Customer Support Transcripts', description: 'Get a copy of your chat history sent to WhatsApp', enabled: preferences.whatsapp.support },
          ]}
        />
      </div>

      {/* Floating Save Bar */}
      <div className={`fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 transform transition-transform duration-300 ease-in-out flex justify-center z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] ${hasChanges ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="max-w-4xl w-full flex items-center justify-between">
          <p className="font-medium text-gray-900 dark:text-white hidden sm:block">You have unsaved changes to your preferences.</p>
          <div className="flex space-x-4 w-full sm:w-auto">
            <button 
              onClick={() => setHasChanges(false)}
              className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-full font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Discard
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 sm:flex-none px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
