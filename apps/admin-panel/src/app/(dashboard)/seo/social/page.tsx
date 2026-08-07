"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@commercex/ui";
import { 
  ImageIcon,
  Share2Icon,
  TwitterIcon,
  FacebookIcon
} from "lucide-react";

export default function SocialMetaPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Social Meta & Open Graph" 
          text="Configure how your store appears when links are shared on social media."
        />
        <Button>Save Settings</Button>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        
        {/* Settings Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Share2Icon className="h-5 w-5 mr-2 text-muted-foreground" />
                Default Fallback Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">This image will be used when a specific page or product does not have its own social image defined. (Recommended: 1200 x 630px)</p>
              
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/20 h-40 cursor-pointer hover:bg-muted/40 transition-colors">
                <ImageIcon className="h-8 w-8 text-muted-foreground/50 mb-2" />
                <p className="text-sm font-medium">Click to upload image</p>
              </div>

              <div className="space-y-1 pt-4">
                <label className="text-xs font-medium">Default Twitter Card Type</label>
                <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm">
                  <option>Summary with Large Image</option>
                  <option>Summary (Small Image)</option>
                </select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Previews Column */}
        <div className="space-y-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Live Previews</h3>
          
          {/* Facebook/OG Preview */}
          <Card className="overflow-hidden border-border/50">
            <div className="bg-[#f0f2f5] dark:bg-[#18191a] p-4 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <FacebookIcon className="h-5 w-5 text-[#1877f2]" />
                <span className="text-xs font-semibold dark:text-gray-300 text-gray-700">Facebook / LinkedIn</span>
              </div>
              
              <div className="bg-white dark:bg-[#242526] rounded-lg border dark:border-gray-700 overflow-hidden shadow-sm">
                <div className="h-48 bg-muted flex items-center justify-center border-b dark:border-gray-700">
                  <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                </div>
                <div className="p-3 bg-gray-50 dark:bg-[#242526]">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">STORE.COM</p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm mt-1">Premium Storefront | Home</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">Shop the latest premium collections. Featuring high quality materials.</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Twitter Preview */}
          <Card className="overflow-hidden border-border/50">
            <div className="bg-white dark:bg-black p-4 flex flex-col gap-2 border">
              <div className="flex items-center gap-2">
                <TwitterIcon className="h-5 w-5 text-[#1da1f2]" />
                <span className="text-xs font-semibold">Twitter</span>
              </div>
              
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <div className="h-48 bg-muted flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
                  <ImageIcon className="h-10 w-10 text-muted-foreground/30" />
                </div>
                <div className="p-3">
                  <p className="text-sm text-gray-900 dark:text-gray-100 line-clamp-1">Shop the latest premium collections. Featuring high quality materials.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <span className="truncate">store.com</span>
                  </p>
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
