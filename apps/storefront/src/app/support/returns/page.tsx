'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, PackageOpen, CheckCircle2, Printer } from 'lucide-react';

export default function ReturnsWizardPage() {
  const [step, setStep] = useState(1);
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  
  // Mock data for the returned order
  const orderItems = [
    { id: '1', name: 'Classic White T-Shirt', size: 'M', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=200&auto=format&fit=crop' },
    { id: '2', name: 'Denim Jacket', size: 'L', price: 89.99, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=200&auto=format&fit=crop' },
  ];
  
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reason, setReason] = useState('');

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && email) setStep(2);
  };

  const handleSelection = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length > 0 && reason) setStep(3);
  };

  const toggleItem = (id: string) => {
    setSelectedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-black py-24 px-4 flex flex-col items-center">
      
      <div className="w-full max-w-2xl">
        <Link href="/help" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Help Center
        </Link>
        
        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-12 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-gray-800 -z-10 rounded-full" />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-black dark:bg-white -z-10 rounded-full transition-all duration-500" style={{ width: `${((step - 1) / 2) * 100}%` }} />
          
          {[1, 2, 3].map((s) => (
            <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-colors duration-500 ${
              step >= s 
                ? 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black' 
                : 'bg-white dark:bg-black border-gray-300 dark:border-gray-700 text-gray-400'
            }`}>
              {step > s ? <CheckCircle2 className="w-5 h-5" /> : s}
            </div>
          ))}
        </div>

        {/* Step 1: Lookup */}
        {step === 1 && (
          <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-right-8">
            <div className="text-center mb-8">
              <PackageOpen className="w-12 h-12 mx-auto text-gray-900 dark:text-white mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Start a Return</h1>
              <p className="text-gray-600 dark:text-gray-400">Enter your order details to get started.</p>
            </div>

            <form onSubmit={handleLookup} className="space-y-6">
              <div>
                <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Number</label>
                <input 
                  type="text" 
                  id="orderId" 
                  placeholder="e.g. ORD-12345" 
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Email used at checkout" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent text-gray-900 dark:text-white"
                />
              </div>
              <button type="submit" className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 flex items-center justify-center">
                Find My Order <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Select Items */}
        {step === 2 && (
          <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-right-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Select Items</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Order {orderId}</p>

            <form onSubmit={handleSelection}>
              <div className="space-y-4 mb-8">
                {orderItems.map(item => (
                  <label key={item.id} className={`flex items-center p-4 border rounded-2xl cursor-pointer transition-colors ${selectedItems.includes(item.id) ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800' : 'border-gray-200 dark:border-gray-800 hover:border-gray-300'}`}>
                    <input 
                      type="checkbox" 
                      className="w-5 h-5 rounded border-gray-300 text-black focus:ring-black"
                      checked={selectedItems.includes(item.id)}
                      onChange={() => toggleItem(item.id)}
                    />
                    <div className="w-16 h-16 ml-4 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="ml-4 flex-1">
                      <h4 className="font-bold text-gray-900 dark:text-white">{item.name}</h4>
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      ${item.price.toFixed(2)}
                    </div>
                  </label>
                ))}
              </div>

              <div className="mb-8">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason for return</label>
                <select 
                  id="reason" 
                  required 
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-black focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent text-gray-900 dark:text-white"
                >
                  <option value="">Select a reason...</option>
                  <option value="too_small">Too small</option>
                  <option value="too_large">Too large</option>
                  <option value="defective">Defective or damaged</option>
                  <option value="changed_mind">Changed my mind</option>
                </select>
              </div>

              <div className="flex space-x-4">
                <button type="button" onClick={() => setStep(1)} className="px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                  Back
                </button>
                <button type="submit" disabled={selectedItems.length === 0 || !reason} className="flex-1 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 flex items-center justify-center disabled:opacity-50">
                  Review Return <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Confirmation */}
        {step === 3 && (
          <div className="bg-white dark:bg-gray-900 p-8 sm:p-12 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 animate-in fade-in slide-in-from-bottom-8 text-center">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Return Approved!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              We've emailed you a prepaid shipping label. Please pack your items securely and drop them off at any authorized shipping location.
            </p>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl mb-8 inline-block text-left">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Return Tracking ID</p>
              <p className="text-xl font-mono font-bold text-gray-900 dark:text-white">RET-8849-XYZ</p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="px-6 py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 flex items-center justify-center">
                <Printer className="w-5 h-5 mr-2" /> Print Label Now
              </button>
              <Link href="/" className="px-6 py-4 border border-gray-200 dark:border-gray-700 rounded-xl font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 flex items-center justify-center">
                Back to Store
              </Link>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
