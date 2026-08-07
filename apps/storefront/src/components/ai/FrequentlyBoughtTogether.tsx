'use client';

import { useState } from 'react';
import { Sparkles, Plus, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  href: string;
}

interface FrequentlyBoughtTogetherProps {
  mainProduct: Product;
  relatedProducts: Product[];
}

export function FrequentlyBoughtTogether({ mainProduct, relatedProducts }: FrequentlyBoughtTogetherProps) {
  // All items are selected by default to encourage the bundle
  const allItems = [mainProduct, ...relatedProducts];
  const [selectedIds, setSelectedIds] = useState<Set<string>>(
    new Set(allItems.map(p => p.id))
  );

  const toggleItem = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectedTotal = allItems
    .filter(p => selectedIds.has(p.id))
    .reduce((sum, p) => sum + p.price, 0);

  const discountAmount = selectedIds.size > 1 ? selectedTotal * 0.1 : 0; // 10% bundle discount
  const finalPrice = selectedTotal - discountAmount;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8">
      <div className="flex items-center mb-6">
        <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 mr-2" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">Frequently Bought Together</h3>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Images Row */}
        <div className="flex-1 flex items-center justify-between overflow-x-auto pb-4 md:pb-0 hide-scrollbar">
          {allItems.map((product, index) => (
            <div key={`img-${product.id}`} className="flex items-center shrink-0">
              <Link href={product.href} className="relative group block">
                <div className={`w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 transition-colors ${selectedIds.has(product.id) ? 'border-black dark:border-white' : 'border-transparent opacity-50'}`}>
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
              </Link>
              {index < allItems.length - 1 && (
                <div className="mx-2 sm:mx-4 text-gray-300 dark:text-gray-700">
                  <Plus className="w-6 h-6" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Total & Action */}
        <div className="md:w-64 flex flex-col justify-center border-t md:border-t-0 md:border-l border-gray-200 dark:border-gray-800 pt-6 md:pt-0 md:pl-8">
          <div className="mb-4">
            <div className="flex items-end space-x-2 mb-1">
              <span className="text-3xl font-black text-gray-900 dark:text-white">${finalPrice.toFixed(2)}</span>
              {discountAmount > 0 && (
                <span className="text-lg text-gray-500 line-through mb-1">${selectedTotal.toFixed(2)}</span>
              )}
            </div>
            {discountAmount > 0 ? (
              <span className="text-sm font-bold text-green-600 dark:text-green-400">Bundle Discount Applied!</span>
            ) : (
              <span className="text-sm text-gray-500">Select items to buy together</span>
            )}
          </div>
          <button 
            disabled={selectedIds.size === 0}
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" /> Add {selectedIds.size} Item{selectedIds.size !== 1 ? 's' : ''}
          </button>
        </div>
      </div>

      {/* Item Checklist */}
      <div className="mt-8 space-y-3">
        {allItems.map((product) => (
          <label key={`check-${product.id}`} className="flex items-center cursor-pointer group">
            <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${selectedIds.has(product.id) ? 'bg-black dark:bg-white border-black dark:border-white' : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-black group-hover:border-black dark:group-hover:border-white'}`}>
               {selectedIds.has(product.id) && <svg className="w-3.5 h-3.5 text-white dark:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={`font-medium ${selectedIds.has(product.id) ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
              <span className={product.id === mainProduct.id ? 'font-bold' : ''}>
                {product.id === mainProduct.id ? 'This item: ' : ''}
                {product.name}
              </span>
              <span className="ml-2 text-gray-500">${product.price.toFixed(2)}</span>
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
