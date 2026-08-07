'use client';

import { useState } from 'react';
import { Package, Download, Search, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { MOCK_ORDERS } from '@/lib/mock-orders';

export default function OrdersListPage() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    // Simulate exporting a CSV
    setTimeout(() => {
      setIsExporting(false);
      alert('Orders export CSV downloaded!');
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Order History</h1>
          <p className="text-gray-500">View and manage all your past orders.</p>
        </div>

        <div className="flex space-x-3 w-full sm:w-auto">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {isExporting ? (
              <span className="w-4 h-4 border-2 border-gray-400 border-t-gray-800 rounded-full animate-spin mr-2" />
            ) : (
              <Download className="w-4 h-4 mr-2" />
            )}
            Export Orders (CSV)
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">

        <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by order ID or product..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <select className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-sm focus:outline-none focus:ring-2 focus:ring-black">
            <option>All Orders (Last 6 Months)</option>
            <option>2026</option>
            <option>2025</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-gray-800">
          {MOCK_ORDERS.map((order) => (
            <div key={order.id} className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4">

                <div className="flex-1 flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 text-gray-500">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="font-bold text-gray-900 dark:text-white">Order #{order.id}</span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${order.status === 'Delivered' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                          order.status === 'Processing' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                            'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
                        }`}>
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mb-2">Placed on {order.date}</p>

                    <div className="flex -space-x-2 overflow-hidden">
                      {order.items.slice(0, 3).map((item, i) => (
                        <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900 object-cover" src={item.image} alt={item.name} />
                      ))}
                      {order.items.length > 3 && (
                        <div className="h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-900 bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-6 w-full lg:w-auto">
                  <div className="text-left lg:text-right">
                    <p className="text-sm text-gray-500">Total Amount</p>
                    <p className="font-bold text-gray-900 dark:text-white">${order.total.toFixed(2)}</p>
                  </div>
                  <Link
                    href={`/account/orders/${order.id}`}
                    className="flex items-center text-sm font-bold text-black dark:text-white hover:underline"
                  >
                    View Details <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
