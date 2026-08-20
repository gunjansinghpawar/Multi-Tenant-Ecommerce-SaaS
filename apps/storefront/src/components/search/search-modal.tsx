'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Mic, Camera, ArrowRight, History, TrendingUp, Sparkles } from 'lucide-react';
import { Button, Dialog, DialogContent } from '@commercex/ui';
import { cn } from '@commercex/utils';
import { useUiStore } from '../../store/use-ui-store';
import { useVoiceSearch } from '../../hooks/use-voice-search';
import Image from 'next/image';
import Link from 'next/link';
import { useAnalytics } from '../../hooks/use-analytics';

// Mock predictive data
const TRENDING_SEARCHES = ['Wireless Earbuds', 'Running Shoes Men', 'Smart Watches', 'Office Chairs'];
const POPULAR_CATEGORIES = [
  { name: 'Electronics', href: '/collections/electronics' },
  { name: 'Fashion', href: '/collections/fashion' },
  { name: 'Home & Living', href: '/collections/home' },
];

const PREDICTIVE_PRODUCTS = [
  { id: '1', name: 'Premium Wireless Headphones', price: 349.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop' },
  { id: '2', name: 'Minimalist Smartwatch', price: 499.00, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=200&auto=format&fit=crop' },
];

export function SearchModal() {
  const router = useRouter();
  const { isSearchModalOpen, setSearchModalOpen } = useUiStore();
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const { isListening, isSupported, startListening, stopListening } = useVoiceSearch((text) => {
    setQuery(text);
    handleSearch(text);
  });

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      const stored = localStorage.getItem('commercex_recent_searches');
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    }
  }, [isSearchModalOpen]);

  const saveRecentSearch = (term: string) => {
    if (!term.trim()) return;
    const updated = [term, ...recentSearches.filter(s => s !== term)].slice(0, 5);
    setRecentSearches(updated);
    localStorage.setItem('commercex_recent_searches', JSON.stringify(updated));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('commercex_recent_searches');
  };

  const { track } = useAnalytics();

  const handleSearch = (searchTerm: string = query) => {
    if (!searchTerm.trim()) return;
    saveRecentSearch(searchTerm.trim());
    setSearchModalOpen(false);
    track('search', { query: searchTerm.trim() });
    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Dialog open={isSearchModalOpen} onOpenChange={setSearchModalOpen}>
      <DialogContent className="max-w-3xl w-full p-0 gap-0 overflow-hidden bg-background rounded-xl border-border/50 shadow-2xl top-[10%] translate-y-0">
        
        {/* Search Header */}
        <div className="flex items-center p-4 border-b">
          <Search className="h-5 w-5 text-muted-foreground ml-2" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for products, brands, categories..."
            className="flex-1 bg-transparent border-none outline-none px-4 text-lg h-12 placeholder:text-muted-foreground/70"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          
          <div className="flex items-center gap-1 mr-2">
            {isSupported && (
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={isListening ? stopListening : startListening}
                className={cn("rounded-full", isListening && "text-destructive bg-destructive/10 animate-pulse")}
                aria-label="Voice Search"
              >
                <Mic className="h-5 w-5" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="rounded-full" aria-label="Image Search (Future)">
              <Camera className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full ml-2 bg-muted/50" onClick={() => setSearchModalOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-h-[70vh] overflow-y-auto">
          {query.trim().length === 0 ? (
            // EMPTY STATE (No query)
            <div className="p-6 grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {recentSearches.length > 0 && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                        <History className="h-4 w-4" /> Recent Searches
                      </h3>
                      <button onClick={clearRecentSearches} className="text-xs text-muted-foreground hover:underline">Clear</button>
                    </div>
                    <ul className="space-y-2">
                      {recentSearches.map(term => (
                        <li key={term}>
                          <button 
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 w-full text-left"
                            onClick={() => { setQuery(term); handleSearch(term); }}
                          >
                            <Search className="h-3 w-3 opacity-50" /> {term}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" /> Trending Now
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {TRENDING_SEARCHES.map(term => (
                      <button 
                        key={term} 
                        className="text-xs bg-muted hover:bg-muted/80 text-foreground px-3 py-1.5 rounded-full transition-colors"
                        onClick={() => { setQuery(term); handleSearch(term); }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Popular Categories
                </h3>
                <ul className="space-y-3">
                  {POPULAR_CATEGORIES.map(cat => (
                    <li key={cat.name}>
                      <Link 
                        href={cat.href} 
                        className="group flex items-center justify-between text-sm hover:text-primary transition-colors"
                        onClick={() => setSearchModalOpen(false)}
                      >
                        {cat.name}
                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            // PREDICTIVE STATE (Query entered)
            <div className="p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4">
                Products matching "{query}"
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PREDICTIVE_PRODUCTS.map(product => (
                  <Link 
                    key={product.id} 
                    href={`/products/${product.id}`}
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
                    onClick={() => setSearchModalOpen(false)}
                  >
                    <div className="relative h-16 w-16 bg-muted rounded overflow-hidden shrink-0">
                      <Image src={product.image} alt={product.name} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-1">{product.name}</h4>
                      <p className="text-sm text-muted-foreground mt-0.5">${product.price.toFixed(2)}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t flex justify-center">
                <Button variant="link" onClick={() => handleSearch()} className="text-primary">
                  View all results for "{query}" <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
