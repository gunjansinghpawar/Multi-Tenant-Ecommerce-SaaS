// packages/ui/src/hooks/use-global-search.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import searchData from "../mocks/search-results.json";

type SearchResult = {
  id: string;
  title: string;
  href: string;
  category: string;
};

export function useGlobalSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const search = useCallback((q: string) => {
    setQuery(q);
  }, []);

  const clear = useCallback(() => {
    setQuery("");
    setResults([]);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const handler = setTimeout(() => {
      // simple case‑insensitive filter on mock data
      const filtered = searchData.filter((item) =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setLoading(false);
    }, 200); // debounce 200ms
    return () => clearTimeout(handler);
  }, [query]);

  return { query, results, loading, search, clear };
}
