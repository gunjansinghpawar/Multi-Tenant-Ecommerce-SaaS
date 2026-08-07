'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function BlogSearch({ onSearch, placeholder = 'Search articles...' }: BlogSearchProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-3 border border-gray-200 dark:border-gray-800 rounded-full leading-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent transition-shadow shadow-sm"
        placeholder={placeholder}
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          // Optional: onSearch(e.target.value) for real-time search
        }}
      />
      <button 
        type="submit" 
        className="absolute inset-y-1.5 right-1.5 px-4 py-1.5 bg-black dark:bg-white text-white dark:text-black font-medium text-sm rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
