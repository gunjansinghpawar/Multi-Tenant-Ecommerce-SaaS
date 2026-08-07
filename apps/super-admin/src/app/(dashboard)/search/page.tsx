"use client";

import React from "react";
import { Card, Input } from "@commercex/ui";
import { SearchIcon, CommandIcon } from "lucide-react";

export default function GlobalSearchPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Global Search</h1>
        <p className="text-muted-foreground mt-1">Cross-system index search for stores, users, and logs.</p>
      </div>

      <Card className="p-6">
        <div className="relative mb-6">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input placeholder="Type a command or search query (Cmd + K)..." className="pl-10 text-lg h-12" />
        </div>
      </Card>
    </div>
  );
}