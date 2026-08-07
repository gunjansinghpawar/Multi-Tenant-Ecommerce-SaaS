"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button,
} from "@commercex/ui";
import { LinkIcon } from "lucide-react";

export default function YouTubeIntegrationPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="YouTube Shopping" 
        text="Enable your customers to easily purchase your products directly from your YouTube videos."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>YouTube Channel Connection</CardTitle>
          <CardDescription>Connect to YouTube to enable product tagging.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-md">
          <div className="rounded-md border p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <LinkIcon className="h-6 w-6 text-red-600" />
            </div>
            <h3 className="text-lg font-medium">Connect YouTube</h3>
            <p className="text-sm text-muted-foreground">
              Authorize CommerceX to sync your products to your YouTube channel for live streams and videos.
            </p>
            <Button className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white border-0">
              Authenticate with YouTube
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
