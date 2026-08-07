"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent,
  Button,
} from "@commercex/ui";
import { UploadIcon, VideoIcon, MoreVerticalIcon, PlayCircleIcon } from "lucide-react";

export default function MediaVideosPage() {
  const videos = Array.from({ length: 4 }).map((_, i) => ({
    id: `vid_${i}`,
    name: `product-demo-0${i + 1}.mp4`,
    size: "24.5 MB",
    duration: "0:45",
  }));

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Videos" 
        text="Manage your product demos, tutorials, and promotional videos."
      >
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" />
          Upload Videos
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {videos.map((vid) => (
          <Card key={vid.id} className="overflow-hidden hover:border-primary/50 transition-colors group cursor-pointer">
            <div className="aspect-video bg-muted flex items-center justify-center relative">
              <VideoIcon className="h-10 w-10 text-muted-foreground/30 absolute" />
              <PlayCircleIcon className="h-12 w-12 text-white/50 z-10" />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <Button variant="secondary" size="icon" className="h-7 w-7 rounded-full shadow-sm">
                  <MoreVerticalIcon className="h-4 w-4" />
                </Button>
              </div>
              <div className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded">
                {vid.duration}
              </div>
            </div>
            <CardContent className="p-3">
              <p className="text-sm font-medium truncate" title={vid.name}>{vid.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{vid.size}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
