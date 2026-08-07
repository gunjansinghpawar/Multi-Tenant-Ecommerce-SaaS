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
import { GlobeIcon, RefreshCwIcon, CloudIcon } from "lucide-react";

export default function MediaCdnPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Content Delivery Network (CDN)" 
        text="Manage global asset distribution and cache invalidation."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GlobeIcon className="h-5 w-5 text-blue-500" /> CDN Status
            </CardTitle>
            <CardDescription>Your assets are currently being served globally.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Provider</span>
              <span className="font-medium flex items-center gap-1"><CloudIcon className="h-4 w-4" /> Cloudflare Edge</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-sm text-muted-foreground">Cache Hit Ratio</span>
              <span className="font-medium text-emerald-600">98.4%</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Bandwidth (30d)</span>
              <span className="font-medium">1.4 TB</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cache Management</CardTitle>
            <CardDescription>Force the CDN to fetch fresh copies of your assets.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              If you recently replaced an image but it's still showing the old version on your storefront, purging the cache will fix it.
            </p>
            <div className="flex flex-col gap-3 mt-4">
              <Button variant="outline" className="w-full justify-start text-orange-600 hover:text-orange-700 hover:bg-orange-50">
                <RefreshCwIcon className="mr-2 h-4 w-4" /> Purge Specific URL
              </Button>
              <Button variant="destructive" className="w-full justify-start">
                <RefreshCwIcon className="mr-2 h-4 w-4" /> Purge All Cache (Use with caution)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
