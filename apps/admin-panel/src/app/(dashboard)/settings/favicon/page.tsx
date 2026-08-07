"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button
} from "@commercex/ui";
import { UploadCloudIcon } from "lucide-react";

export default function FaviconSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Favicon Settings" 
        text="Update the icon that appears in browser tabs and bookmarks."
      />
      
      <Card className="max-w-md">
        <CardHeader>
          <CardTitle>Browser Favicon</CardTitle>
          <CardDescription>Upload a square image (recommended 512x512px). We will automatically generate the required sizes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <div className="border-2 border-dashed flex flex-col items-center justify-center p-8 rounded-lg">
            <UploadCloudIcon className="h-10 w-10 text-muted-foreground mb-4" />
            <Button variant="outline">Upload Favicon</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
