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

export default function TikTokIntegrationPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="TikTok For Business" 
        text="Connect your TikTok account to manage ads and sync your product catalog."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>TikTok Account Integration</CardTitle>
          <CardDescription>Unlock TikTok Pixel and Catalog Sync.</CardDescription>
        </CardHeader>
        <CardContent className="max-w-md">
          <div className="rounded-md border p-6 text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <LinkIcon className="h-6 w-6 text-slate-800" />
            </div>
            <h3 className="text-lg font-medium">Connect TikTok</h3>
            <p className="text-sm text-muted-foreground">
              Authorize CommerceX to automatically install your TikTok pixel and sync your product catalog for dynamic ads.
            </p>
            <Button className="w-full mt-4 bg-black hover:bg-slate-800 text-white border-0">
              Connect to TikTok
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
