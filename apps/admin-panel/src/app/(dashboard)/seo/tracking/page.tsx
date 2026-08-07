"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Form,
  RHFInput
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { 
  BarChartIcon, 
  TargetIcon,
  CodeIcon,
  ActivityIcon
} from "lucide-react";

export default function TrackingPixelsPage() {
  const form = useForm({
    defaultValues: {
      ga4Id: "G-1A2B3C4D5E",
      metaPixelId: "123456789012345",
      customHead: "<!-- Custom tracking script -->",
      customBody: ""
    }
  });

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Tracking Pixels & Analytics" 
          text="Easily inject tracking scripts like Google Analytics and Meta Pixel into your storefront."
        />
        <Button>Save Settings</Button>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <BarChartIcon className="mr-2 h-5 w-5 text-[#f4b400]" />
                Google Analytics (GA4)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Automatically integrates GA4 events for Page Views, View Item, Add to Cart, and Purchase.</p>
              <RHFInput name="ga4Id" label="Measurement ID" inputProps={{ placeholder: "G-XXXXXXXXXX" }} />
              <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                <ActivityIcon className="h-4 w-4 text-success" /> Status: Receiving Data
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <TargetIcon className="mr-2 h-5 w-5 text-[#0668E1]" />
                Meta (Facebook) Pixel
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">Tracks user behavior and conversions to optimize your Facebook ad campaigns. Supports Conversions API.</p>
              <RHFInput name="metaPixelId" label="Pixel ID" inputProps={{ placeholder: "15-digit Pixel ID" }} />
              <div className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
                <ActivityIcon className="h-4 w-4 text-success" /> Status: Receiving Data
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <CodeIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                Custom Code Injection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-sm text-muted-foreground">Advanced: Add custom scripts (like Hotjar, TikTok Pixel, or Chat widgets) directly to your store's HTML.</p>
              
              <div className="space-y-2">
                <label className="text-sm font-medium flex justify-between">
                  Inject into &lt;head&gt;
                  <span className="text-xs text-warning font-normal bg-warning/10 px-2 py-0.5 rounded border border-warning/20">Caution</span>
                </label>
                <textarea 
                  {...form.register("customHead")}
                  className="flex min-h-[150px] w-full rounded-md border border-input bg-muted/20 px-3 py-2 text-sm font-mono shadow-sm" 
                  placeholder="<!-- Scripts here will run before the page loads -->"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Inject at end of &lt;body&gt;</label>
                <textarea 
                  {...form.register("customBody")}
                  className="flex min-h-[150px] w-full rounded-md border border-input bg-muted/20 px-3 py-2 text-sm font-mono shadow-sm" 
                  placeholder="<!-- Scripts here will run after the page loads (Recommended for performance) -->"
                />
              </div>
            </CardContent>
          </Card>

        </form>
      </Form>
    </div>
  );
}
