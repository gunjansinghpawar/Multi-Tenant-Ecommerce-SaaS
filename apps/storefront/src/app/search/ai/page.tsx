'use client';

import { useState } from 'react';
import { Search, Sparkles, Filter, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';

export default function AISearchPage() {
  const [query, setQuery] = useState('cozy winter vibes');
  const [isSearching, setIsSearching] = useState(false);

  // Mock results for "cozy winter vibes"
  const results = [
    { id: '1', name: 'Chunky Knit Oversized Sweater', price: 89.00, image: 'https://images.unsplash.com/photo-1572495532056-8583af1cbf89?q=80&w=800&auto=format&fit=crop' },
    { id: '2', name: 'Ceramic Artisan Mug', price: 24.00, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop' },
    { id: '3', name: 'Faux Fur Throw Blanket', price: 120.00, image: 'https://images.unsplash.com/photo-1580136579312-94651dfd596d?q=80&w=800&auto=format&fit=crop' },
    { id: '4', name: 'Sandalwood & Vanilla Candle', price: 35.00, image: 'https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop' },
    { id: '5', name: 'Wool Blend Cabin Socks', price: 18.00, image: 'https://images.unsplash.com/photo-1582967191316-092bfcb78051?q=80&w=800&auto=format&fit=crop' },
    { id: '6', name: 'Fleece Lined Joggers', price: 65.00, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 1500);
  };

  return (
    <main className="min-h-screen bg-white dark:bg-black pb-24">
      
      {/* Search Header */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 mr-2" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Semantic Search</h1>
          </div>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto">
            Don't worry about exact keywords. Describe the vibe, the occasion, or the aesthetic you're looking for.
          </p>
          
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-32 py-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-full text-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            />
            <div className="absolute inset-y-2 right-2">
              <button 
                type="submit"
                disabled={isSearching}
                className="px-6 py-2 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-colors h-full flex items-center"
              >
                {isSearching ? 'Thinking...' : 'Search'}
              </button>
            </div>
          </form>
          
          <div className="flex justify-center mt-6 space-x-3 text-sm">
            <span className="text-gray-400 font-medium">Try:</span>
            {['Minimalist office setup', 'Summer beach day', 'Goth aesthetic'].map(tag => (
              <button key={tag} onClick={() => setQuery(tag)} className="text-gray-600 dark:text-gray-300 hover:text-purple-600 hover:underline">
                "{tag}"
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {isSearching ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Sparkles className="w-12 h-12 text-purple-600 animate-spin mb-4" />
            <p className="text-xl font-bold text-gray-900 dark:text-white">Decoding your vibe...</p>
          </div>
        ) : (
          <div className="animate-in fade-in duration-500">
            
            {/* AI Explanation Banner */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 border border-purple-100 dark:border-purple-800/50 rounded-2xl p-6 mb-12 flex items-start">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Here's what I found for "{query}"</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  I curated a collection of oversized knits, warm amber scents, and textured home goods to perfectly capture that snug, cold-weather feeling you're looking for.
                </p>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-between items-center mb-8">
              <p className="font-bold text-gray-900 dark:text-white">{results.length} matches</p>
              <div className="flex space-x-4">
                <button className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
                  <SlidersHorizontal className="w-4 h-4 mr-2" /> Filters
                </button>
                <select className="text-sm font-medium bg-transparent text-gray-900 dark:text-white focus:outline-none">
                  <option>Sort by: Most Relevant</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {results.map((product) => (
                <Link href={`/products/${product.id}`} key={product.id} className="group flex flex-col">
                  <div className="relative aspect-[4/5] bg-gray-100 dark:bg-gray-900 rounded-2xl overflow-hidden mb-4">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Visual match indicator */}
                    <div className="absolute top-2 right-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm text-xs font-bold px-2 py-1 rounded-full shadow-sm text-gray-900 dark:text-white">
                      Top Match
                    </div>
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:underline">{product.name}</h3>
                  <p className="text-gray-500 mt-1">${product.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
