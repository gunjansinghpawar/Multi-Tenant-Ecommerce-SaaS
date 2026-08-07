"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardContent
} from "@commercex/ui";
import { PlusIcon, ImageIcon, FileTextIcon, VideoIcon, Trash2 } from "lucide-react";

type MediaAsset = {
  id: string;
  name: string;
  type: "IMAGE" | "DOCUMENT" | "VIDEO";
  url: string;
  size: string;
};

const data: MediaAsset[] = [
  { id: "1", name: "summer_sale_banner.jpg", type: "IMAGE", url: "#", size: "1.2 MB" },
  { id: "2", name: "company_brochure.pdf", type: "DOCUMENT", url: "#", size: "3.5 MB" },
  { id: "3", name: "product_demo.mp4", type: "VIDEO", url: "#", size: "12 MB" },
];

export default function MediaPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Media Manager" 
        text="Manage images, documents, and videos for WhatsApp messages."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Upload Media
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.map((asset) => (
          <Card key={asset.id} className="overflow-hidden">
            <div className="h-32 bg-muted flex items-center justify-center">
              {asset.type === 'IMAGE' && <ImageIcon className="h-10 w-10 text-muted-foreground" />}
              {asset.type === 'DOCUMENT' && <FileTextIcon className="h-10 w-10 text-muted-foreground" />}
              {asset.type === 'VIDEO' && <VideoIcon className="h-10 w-10 text-muted-foreground" />}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium truncate w-32" title={asset.name}>{asset.name}</p>
                  <p className="text-xs text-muted-foreground">{asset.size}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
