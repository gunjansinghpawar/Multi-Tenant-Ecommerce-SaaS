"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent,
  Button,
} from "@commercex/ui";
import { UploadIcon, ImageAspecRatioIcon, MoreVerticalIcon } from "lucide-react";

export default function MediaBannersPage() {
  const banners = Array.from({ length: 4 }).map((_, i) => ({
    id: `banner_${i}`,
    name: `hero-banner-desktop-0${i + 1}.jpg`,
    dimensions: "1920x800",
    size: "800 KB",
  }));

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Banners" 
        text="Manage hero banners, promotional strips, and wide format images."
      >
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Banner
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {banners.map((banner) => (
          <Card key={banner.id} className="overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer">
            <div className="aspect-[21/9] bg-muted flex items-center justify-center relative">
              <ImageAspecRatioIcon className="h-10 w-10 text-muted-foreground/30" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="secondary" size="icon" className="h-7 w-7 rounded-full shadow-sm">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate" title={banner.name}>{banner.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{banner.dimensions} &middot; {banner.size}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
