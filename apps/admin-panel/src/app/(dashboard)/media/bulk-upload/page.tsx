"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent,
  Button,
} from "@commercex/ui";
import { UploadCloudIcon, CheckCircle2Icon, AlertCircleIcon } from "lucide-react";

export default function MediaBulkUploadPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Bulk Upload" 
        text="Drag and drop multiple files to add them to your media library simultaneously."
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full border-dashed border-2 bg-muted/20">
            <CardContent className="h-full flex flex-col items-center justify-center p-12 text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <UploadCloudIcon className="h-10 w-10 text-primary" />
              </div>
              <h3 className="text-lg font-medium mb-2">Drag & Drop files here</h3>
              <p className="text-sm text-muted-foreground mb-6 max-w-sm">
                Supported formats: JPG, PNG, GIF, MP4, PDF, SVG. Maximum file size is 100MB per file.
              </p>
              <Button>Select Files from Computer</Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium text-sm mb-4">Recent Uploads</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2Icon className="h-4 w-4 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">product-hero.jpg</p>
                    <p className="text-xs text-muted-foreground">Uploaded just now</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2Icon className="h-4 w-4 text-emerald-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">summer-collection.pdf</p>
                    <p className="text-xs text-muted-foreground">Uploaded 2 mins ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 opacity-50">
                  <AlertCircleIcon className="h-4 w-4 text-destructive mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-destructive">large-video.mov</p>
                    <p className="text-xs text-muted-foreground">Failed: Exceeds 100MB</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
