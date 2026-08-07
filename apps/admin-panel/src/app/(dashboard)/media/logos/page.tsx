"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent,
  Button,
} from "@commercex/ui";
import { UploadIcon, BuildingIcon, MoreVerticalIcon } from "lucide-react";

export default function MediaLogosPage() {
  const logos = [
    { id: "1", name: "primary-logo.svg", type: "Header Logo", size: "12 KB" },
    { id: "2", name: "logo-white.svg", type: "Footer Logo", size: "12 KB" },
    { id: "3", name: "favicon.ico", type: "Favicon", size: "4 KB" },
    { id: "4", name: "email-header.png", type: "Email Logo", size: "45 KB" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Logos & Brand Assets" 
        text="Manage your store logos and brand identifiers."
      >
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Logo
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {logos.map((logo) => (
          <Card key={logo.id} className="overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer">
            <div className="aspect-[3/2] bg-slate-50 dark:bg-slate-900 border-b flex flex-col items-center justify-center relative p-4">
              <BuildingIcon className="h-12 w-12 text-slate-300 dark:text-slate-700" />
              
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="icon" className="h-7 w-7 rounded-full shadow-sm">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate" title={logo.type}>{logo.type}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{logo.name} &middot; {logo.size}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
