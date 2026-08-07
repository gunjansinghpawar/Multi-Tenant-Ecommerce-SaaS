"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
} from "@commercex/ui";
import { 
  UploadIcon,
  ImageIcon,
  FolderIcon,
  MoreVerticalIcon
} from "lucide-react";

export default function MediaLibraryPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Media Library" 
          text="Manage images, videos, and files used across your storefront."
        />
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Files
        </Button>
      </div>

      {/* Folders */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Folders</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            { name: "Product Images", count: 245 },
            { name: "Blog Covers", count: 42 },
            { name: "Logos & Brand", count: 8 },
            { name: "Banners", count: 15 },
          ].map((folder, i) => (
            <Card key={i} className="p-4 cursor-pointer hover:border-primary transition-colors flex items-center gap-3">
              <FolderIcon className="h-6 w-6 text-primary/70" />
              <div>
                <p className="text-sm font-medium leading-none">{folder.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{folder.count} files</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <div className="border-t pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium text-muted-foreground">All Media</h3>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Search media..." 
              className="flex h-9 w-64 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            />
          </div>
        </div>
        
        {/* Media Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            "summer_banner_1.jpg", "product_tshirt_front.png", "product_tshirt_back.png",
            "logo_light.svg", "logo_dark.svg", "blog_winter_fashion.jpg",
            "hero_video_bg.mp4", "promo_bf_2026.jpg", "icon_shipping.svg",
            "icon_returns.svg", "team_photo_1.jpg", "product_mug_side.png"
          ].map((file, i) => (
            <div key={i} className="group relative border rounded-md overflow-hidden bg-muted/20 aspect-square flex items-center justify-center cursor-pointer hover:ring-2 ring-primary ring-offset-2 transition-all">
              <ImageIcon className="h-8 w-8 text-muted-foreground/30" />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
                <div className="flex justify-end">
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-white hover:bg-white/20"><MoreVerticalIcon className="h-4 w-4"/></Button>
                </div>
                <div>
                  <p className="text-xs text-white font-medium truncate">{file}</p>
                  <p className="text-[10px] text-white/70">1.{i} MB</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
