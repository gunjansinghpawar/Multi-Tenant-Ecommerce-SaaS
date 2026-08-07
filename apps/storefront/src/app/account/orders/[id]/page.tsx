'use client';

import { useState } from 'react';
import { Package, Download, Truck, RotateCcw, XCircle, MapPin, Search } from 'lucide-react';
import Link from 'next/link';

import { use } from 'react';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

  // Mock specific order
  const order = {
    id: id,
    date: 'October 24, 2026',
    status: 'Delivered', // Set to Delivered to show Return/Review options. If Processing, show Cancel.
    total: 234.00,
    trackingNumber: 'TRK987654321',
    address: '123 E-commerce Blvd, San Francisco, CA 94105',
    items: [
      { id: 'p1', name: 'Linen Summer Blazer', price: 189, quantity: 1, image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop' },
      { id: 'p2', name: 'Artisan Ceramic Mug', price: 45, quantity: 1, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop' },
    ]
  };

  const handleDownloadInvoice = () => {
    alert('Downloading PDF Invoice...');
  };

  const handleReorder = () => {
    alert('All items added to cart!');
  };

  const handleCancel = () => {
    const confirm = window.confirm('Are you sure you want to cancel this order? This cannot be undone.');
    if (confirm) alert('Order cancelled and refund initiated.');
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      
      {/* Breadcrumb & Header */}
      <div className="mb-8">
        <Link href="/account/orders" className="text-sm text-gray-500 hover:text-black dark:hover:text-white mb-4 inline-block">
          &larr; Back to Orders
        </Link>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order #{order.id}</h1>
            <p className="text-gray-500">Placed on {order.date}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button onClick={handleDownloadInvoice} className="flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm">
              <Download className="w-4 h-4 mr-2" /> Invoice
            </button>
            <button onClick={handleReorder} className="flex items-center px-4 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-gray-900 transition-colors text-sm">
              <RotateCcw className="w-4 h-4 mr-2" /> Reorder All
            </button>
          </div>
        </div>
      </div>

      {/* Main Order Actions Banner */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 sm:p-8 border border-gray-100 dark:border-gray-800 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${order.status === 'Delivered' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'}`}>
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{order.status}</h2>
            {order.status === 'Delivered' ? (
              <p className="text-sm text-gray-500">Package was delivered on Oct 28, 2026.</p>
            ) : (
              <p className="text-sm text-gray-500">Estimated delivery: Tomorrow</p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 w-full md:w-auto">
          {/* Action Buttons based on status */}
          <button onClick={() => alert('Tracking details opening...')} className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Truck className="w-4 h-4 mr-2" /> Track
          </button>
          
          {order.status === 'Delivered' ? (
            <Link href="/support/returns" className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <RotateCcw className="w-4 h-4 mr-2" /> Return / Exchange
            </Link>
          ) : (
            <button onClick={handleCancel} className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors">
              <XCircle className="w-4 h-4 mr-2" /> Cancel / Refund
            </button>
          )}
        </div>
      </div>

      {/* Grid Layout for Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Items List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Items in this order</h3>
          
          <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            {order.items.map((item, index) => (
              <div key={item.id} className={`p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 ${index !== order.items.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
                <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <Link href={`/products/${item.id}`} className="font-bold text-gray-900 dark:text-white hover:underline line-clamp-1">{item.name}</Link>
                  <p className="text-gray-500 text-sm mt-1">Qty: {item.quantity} &times; ${item.price}</p>
                </div>
                <div className="flex flex-col items-end gap-2 w-full sm:w-auto mt-4 sm:mt-0">
                  <span className="font-bold text-gray-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  {order.status === 'Delivered' && (
                    <button className="text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-full transition-colors">
                      Write a Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Info */}
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
              <MapPin className="w-4 h-4 mr-2" /> Shipping Address
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {order.address.split(',').map((line, i) => <span key={i} className="block">{line.trim()}</span>)}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4">Payment Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-gray-900 dark:text-white">${order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax</span>
                <span className="text-gray-900 dark:text-white">$0.00</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between font-bold">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span className="text-gray-900 dark:text-white">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
