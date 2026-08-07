"use client";

import React from "react";
import { Card, Button, Badge } from "@commercex/ui";
import { LayoutIcon, PlusIcon, StarIcon } from "lucide-react";

export default function ThemesPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Theme Marketplace</h1>
          <p className="text-muted-foreground mt-1">Manage official storefront themes and layout templates.</p>
        </div>
        <Button><PlusIcon className="mr-2 h-4 w-4" /> Upload Theme</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {['Minimal Luxe', 'Tech Grid', 'Modern Store'].map((theme, i) => (
          <Card key={i} className="overflow-hidden">
            <div className="h-40 bg-muted/40 flex items-center justify-center border-b">
              <LayoutIcon className="h-10 w-10 text-muted-foreground/50" />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">{theme}</h4>
                <Badge variant="outline">v2.4</Badge>
              </div>
              <p className="text-xs text-muted-foreground mb-4">Clean typography layout tailored for high-converting e-commerce.</p>
              <Button variant="outline" size="sm" className="w-full">Manage Theme</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}