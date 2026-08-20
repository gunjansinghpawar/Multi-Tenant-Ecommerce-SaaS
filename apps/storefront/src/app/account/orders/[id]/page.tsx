'use client';

import { useState } from 'react';
import { Package, Download, Truck, RotateCcw, XCircle, MapPin, Search, X } from 'lucide-react';
import Link from 'next/link';

import { use } from 'react';

export default function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  // Modals state
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  // Mock specific order
  const [order, setOrder] = useState({
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
  });

  const handleDownloadInvoice = () => {
    alert('Downloading PDF Invoice...');
  };

  const handleReorder = () => {
    alert('All items added to cart!');
  };

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrder({ ...order, status: 'Cancelled' });
    setIsCancelModalOpen(false);
    alert('Order cancelled and refund initiated.');
  };

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrder({ ...order, status: 'Return Requested' });
    setIsReturnModalOpen(false);
    alert('Return/Exchange requested successfully. You will receive an email with instructions.');
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
          <div className={`w-12 h-12 rounded-full flex items-center justify-center mr-4 flex-shrink-0 ${order.status === 'Delivered' ? 'bg-green-100 text-green-600 dark:bg-green-900/30' : order.status === 'Cancelled' ? 'bg-red-100 text-red-600 dark:bg-red-900/30' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/30'}`}>
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{order.status}</h2>
            {order.status === 'Delivered' ? (
              <p className="text-sm text-gray-500">Package was delivered on Oct 28, 2026.</p>
            ) : order.status === 'Cancelled' ? (
              <p className="text-sm text-gray-500">This order has been cancelled.</p>
            ) : (
              <p className="text-sm text-gray-500">Estimated delivery: Tomorrow</p>
            )}
          </div>
        </div>

        {order.status !== 'Cancelled' && order.status !== 'Return Requested' && (
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <button onClick={() => setIsTrackModalOpen(true)} className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <Truck className="w-4 h-4 mr-2" /> Track
            </button>
            
            {order.status === 'Delivered' ? (
              <button onClick={() => setIsReturnModalOpen(true)} className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <RotateCcw className="w-4 h-4 mr-2" /> Return / Exchange
              </button>
            ) : (
              <button onClick={() => setIsCancelModalOpen(true)} className="flex-1 md:flex-none flex items-center justify-center px-4 py-2 border border-red-200 text-red-600 font-bold rounded-lg hover:bg-red-50 transition-colors">
                <XCircle className="w-4 h-4 mr-2" /> Cancel / Refund
              </button>
            )}
          </div>
        )}
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

      {/* Track Modal */}
      {isTrackModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
              <h3 className="text-xl font-bold">Track Shipment</h3>
              <button onClick={() => setIsTrackModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <p className="font-bold mb-4">Tracking Number: <span className="text-blue-600">{order.trackingNumber}</span></p>
              <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-6">
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-gray-900" />
                  <p className="font-bold">Delivered</p>
                  <p className="text-sm text-gray-500">Oct 28, 2026 - 10:45 AM - San Francisco, CA</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-gray-900" />
                  <p className="font-bold">Out for Delivery</p>
                  <p className="text-sm text-gray-500">Oct 28, 2026 - 07:15 AM - San Francisco, CA</p>
                </div>
                <div className="relative pl-6">
                  <div className="absolute w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-gray-900" />
                  <p className="font-bold">Shipped</p>
                  <p className="text-sm text-gray-500">Oct 25, 2026 - 02:30 PM - Austin, TX</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cancel Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
              <h3 className="text-xl font-bold">Cancel Order</h3>
              <button onClick={() => setIsCancelModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCancelSubmit} className="p-6">
              <p className="mb-4 text-gray-600 dark:text-gray-400">Are you sure you want to cancel Order #{order.id}? The refund will be processed to your original payment method within 3-5 business days.</p>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Reason for cancellation (optional)</label>
                <select className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700">
                  <option>Changed my mind</option>
                  <option>Found a better price elsewhere</option>
                  <option>Ordered by mistake</option>
                  <option>Shipping takes too long</option>
                </select>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsCancelModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-700">Go Back</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">Confirm Cancellation</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Return/Exchange Modal */}
      {isReturnModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
              <h3 className="text-xl font-bold">Return or Exchange Items</h3>
              <button onClick={() => setIsReturnModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReturnSubmit} className="p-6">
              <p className="mb-4 text-gray-600 dark:text-gray-400 text-sm">Select the items you wish to return or exchange.</p>
              
              <div className="space-y-3 mb-6">
                {order.items.map((item) => (
                  <label key={item.id} className="flex items-start gap-3 p-3 border rounded-lg dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer">
                    <input type="checkbox" className="mt-1" />
                    <div className="flex items-center gap-3">
                      <img src={item.image} className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Request Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2"><input type="radio" name="rtype" required /> Refund</label>
                  <label className="flex items-center gap-2"><input type="radio" name="rtype" required /> Exchange</label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Reason</label>
                <select className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700" required>
                  <option value="">Select a reason...</option>
                  <option>Item arrived damaged</option>
                  <option>Wrong item sent</option>
                  <option>Does not fit</option>
                  <option>Quality not as expected</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsReturnModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-medium rounded-lg hover:bg-gray-900">Submit Request</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
