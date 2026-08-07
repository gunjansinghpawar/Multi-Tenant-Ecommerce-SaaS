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
import { MousePointerClickIcon, SettingsIcon } from "lucide-react";

export default function HeatmapsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Heatmaps & Recordings" 
          text="Visualize where users click, scroll, and spend time on your pages."
        />
        <Button variant="outline">
          <SettingsIcon className="mr-2 h-4 w-4" />
          Tracking Settings
        </Button>
      </div>
      
      <Card className="border-dashed border-2 bg-muted/10">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
            <MousePointerClickIcon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold">Heatmap Tracking is Paused</h3>
            <p className="text-muted-foreground mt-2 max-w-md mx-auto">
              You need to install the tracking script on your storefront to enable click and scroll heatmaps.
            </p>
          </div>
          <Button className="mt-4">Install Tracking Snippet</Button>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 opacity-50 pointer-events-none grayscale">
        <Card>
          <CardHeader>
            <CardTitle>Homepage (Click Heatmap)</CardTitle>
            <CardDescription>Sample Visualization</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center bg-muted/20 border rounded-md">
            <div className="text-center text-muted-foreground">Preview locked.</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Product Page (Scroll Map)</CardTitle>
            <CardDescription>Sample Visualization</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center bg-muted/20 border rounded-md">
            <div className="text-center text-muted-foreground">Preview locked.</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
