"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent,
  Button,
} from "@commercex/ui";
import { UploadIcon, SmileIcon, MoreVerticalIcon } from "lucide-react";

export default function MediaIconsPage() {
  const icons = Array.from({ length: 12 }).map((_, i) => ({
    id: `icon_${i}`,
    name: `ui-icon-0${i + 1}.svg`,
    size: "4 KB",
  }));

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Icons" 
        text="Manage SVG icons used across your storefront."
      >
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Icons
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {icons.map((icon) => (
          <Card key={icon.id} className="overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer text-center">
            <div className="aspect-square flex items-center justify-center relative p-4">
              <SmileIcon className="h-8 w-8 text-muted-foreground" />
              <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVerticalIcon className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <div className="px-2 pb-2">
              <p className="text-[10px] font-medium truncate text-muted-foreground" title={icon.name}>{icon.name}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
