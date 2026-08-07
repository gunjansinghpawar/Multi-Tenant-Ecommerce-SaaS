// packages/ui/src/components/global-search/search-item.tsx
"use client";

import React from "react";
import Link from "next/link";
import { Card } from "@commercex/ui";
import { Search } from "lucide-react";

type ItemProps = {
  item: {
    id: string;
    title: string;
    href: string;
    category: string;
  };
  onSelect: () => void;
};

export default function SearchItem({ item, onSelect }: ItemProps) {
  return (
    <Link href={item.href} onClick={onSelect}>
      <Card className="flex items-center p-2 hover:bg-muted transition-colors">
        <Search className="h-4 w-4 mr-2 text-muted-foreground" />
        <div className="flex flex-col">
          <span className="font-medium text-sm">{item.title}</span>
          <span className="text-xs text-muted-foreground">{item.category}</span>
        </div>
      </Card>
    </Link>
  );
}
