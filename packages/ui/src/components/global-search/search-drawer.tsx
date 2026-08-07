// packages/ui/src/components/global-search/search-drawer.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@commercex/ui";
import { Input } from "@commercex/ui";
import { SearchIcon, XIcon } from "lucide-react";
import { useGlobalSearch } from "../../hooks/use-global-search";
import SearchItem from "./search-item";

export default function SearchDrawer() {
  const [open, setOpen] = useState(false);
  const { results, loading, search, clear } = useGlobalSearch();

  const onClose = useCallback(() => {
    setOpen(false);
    clear();
  }, [clear]);

  // Register hotkey Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    search(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={(v) => (v ? setOpen(true) : onClose())}>
      <DialogContent className="max-w-xl rounded-[12px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <SearchIcon className="h-5 w-5 mr-2" />
            Search
          </DialogTitle>
          <DialogDescription>Press Esc to close</DialogDescription>
        </DialogHeader>
        <div className="relative mt-4">
          <SearchIcon className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search (Ctrl+K)" autoFocus onChange={onChange} className="pl-9" />
        </div>
        <div className="mt-4 max-h-96 overflow-y-auto">
          {loading && <p className="text-sm text-muted-foreground">Loading...</p>}
          {!loading && results.length === 0 && (
            <p className="text-sm text-muted-foreground">No results found.</p>
          )}
          {results.map((item) => (
            <SearchItem key={item.id} item={item} onSelect={onClose} />
          ))}
        </div>
        <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-full hover:bg-muted">
          <XIcon className="h-4 w-4" />
        </button>
      </DialogContent>
    </Dialog>
  );
}
