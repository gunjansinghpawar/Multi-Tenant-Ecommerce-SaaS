'use client';

import { usePopupStore } from '@/store/usePopupStore';
import { X, Star, ShoppingBag, Ruler } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export function ProductQuickViewModal() {
  const { popupData, closePopup } = usePopupStore();
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('Black');
  
  if (!popupData) return null;

  // Mock product data for the quick view
  const product = {
    id: popupData.productId || 'mock-id',
    name: 'Premium Heavyweight Hoodie',
    price: 85.00,
    rating: 4.8,
    reviews: 124,
    description: 'Crafted from 500gsm organic cotton, this heavyweight hoodie features a relaxed fit and dropped shoulders for the ultimate comfortable silhouette.',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop',
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Heather Grey', 'Navy']
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-5xl relative animate-in zoom-in-95 duration-200 shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-auto max-h-[800px]">
      
      <button 
        onClick={closePopup}
        className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-black dark:hover:text-white bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {/* Image Gallery */}
      <div className="w-full md:w-1/2 bg-gray-100 relative h-64 md:h-auto flex-shrink-0">
        <img 
          src={product.images[0]} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Details */}
      <div className="w-full md:w-1/2 p-6 sm:p-10 flex flex-col overflow-y-auto">
        <div className="flex-1">
          <div className="flex items-center mb-2 text-sm">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-gray-500 underline">{product.reviews} reviews</span>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h2>
          <p className="text-2xl font-medium text-gray-900 dark:text-white mb-6">${product.price.toFixed(2)}</p>

          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-900 dark:text-white">Color: {selectedColor}</span>
            </div>
            <div className="flex space-x-3">
              {product.colors.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-xl text-sm font-medium transition-colors ${
                    selectedColor === color 
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black' 
                      : 'border-gray-200 text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:text-gray-300'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="font-bold text-gray-900 dark:text-white">Size: {selectedSize}</span>
              <button className="flex items-center text-xs font-bold text-gray-500 hover:text-black dark:hover:text-white">
                <Ruler className="w-3 h-3 mr-1" /> Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center border rounded-xl text-sm font-bold transition-colors ${
                    selectedSize === size 
                      ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black' 
                      : 'border-gray-200 text-gray-700 hover:border-gray-400 dark:border-gray-700 dark:text-gray-300'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-3 mt-auto">
          <button 
            onClick={() => { alert('Added to cart!'); closePopup(); }}
            className="w-full py-4 font-bold rounded-xl text-white bg-black hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-100 transition-colors flex items-center justify-center"
          >
            <ShoppingBag className="w-5 h-5 mr-2" /> Add to Cart
          </button>
          <Link 
            href={`/products/${product.id}`}
            onClick={closePopup}
            className="w-full py-4 font-bold rounded-xl text-gray-900 bg-gray-100 hover:bg-gray-200 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors flex items-center justify-center block text-center"
          >
            View Full Details
          </Link>
        </div>
      </div>

    </div>
  );
}
