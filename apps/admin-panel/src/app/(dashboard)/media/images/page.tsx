"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent,
  Button,
} from "@commercex/ui";
import { UploadIcon, ImageIcon, MoreVerticalIcon } from "lucide-react";

export default function MediaImagesPage() {
  const images = Array.from({ length: 8 }).map((_, i) => ({
    id: `img_${i}`,
    name: `product-shot-0${i + 1}.jpg`,
    size: "2.4 MB",
    dimensions: "2000x2000",
  }));

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Images" 
        text="Manage your product photos, lifestyle shots, and other image assets."
      >
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Images
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <Card key={img.id} className="overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer">
            <div className="aspect-square bg-muted flex items-center justify-center relative">
              <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="icon" className="h-7 w-7 rounded-full shadow-sm">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate" title={img.name}>{img.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{img.dimensions} &middot; {img.size}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
