"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  Button
} from "@commercex/ui";
import { SparklesIcon, TrendingUpIcon, AlertTriangleIcon, CheckCircle2Icon, ScanSearchIcon } from "lucide-react";

export default function AIStoreOptimizerPage() {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const runScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="AI Store Optimizer" 
          text="Run an AI diagnostic scan on your storefront to find conversion rate improvements."
        />
        <Button onClick={runScan} disabled={isScanning}>
          <ScanSearchIcon className={`mr-2 h-4 w-4 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? "Scanning Store..." : "Run AI Diagnostic"}
        </Button>
      </div>

      {!hasScanned && !isScanning && (
        <Card className="border-dashed border-2 bg-muted/10">
          <CardContent className="flex flex-col items-center justify-center py-16 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <SparklesIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Ready to optimize your store?</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Our AI will analyze your page load speed, checkout friction, mobile responsiveness, and SEO metadata to suggest actionable improvements.
              </p>
            </div>
            <Button onClick={runScan} size="lg" className="mt-4">Start Diagnostic Scan</Button>
          </CardContent>
        </Card>
      )}

      {isScanning && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 space-y-6">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center animate-pulse">
              <SparklesIcon className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2 text-center w-full max-w-sm">
              <h3 className="text-lg font-semibold">Analyzing Storefront...</h3>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3 animate-[pulse_2s_ease-in-out_infinite]"></div>
              </div>
              <p className="text-xs text-muted-foreground animate-pulse">Checking mobile checkout flow...</p>
            </div>
          </CardContent>
        </Card>
      )}

      {hasScanned && !isScanning && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="border-green-200 dark:border-green-900/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center">
                  <TrendingUpIcon className="mr-2 h-4 w-4 text-green-500" />
                  Optimization Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">78/100</div>
                <p className="text-xs text-muted-foreground mt-1">Room for improvement</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-red-600 dark:text-red-400">
                  <AlertTriangleIcon className="mr-2 h-5 w-5" />
                  High Priority Fixes
                </CardTitle>
                <CardDescription>Address these immediately to boost conversions.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                  <h4 className="font-semibold text-sm">Slow LCP on Product Pages</h4>
                  <p className="text-xs text-muted-foreground mt-1">Large unoptimized hero images are delaying the Largest Contentful Paint. Consider using the AI Image Generator to compress or serve WebP.</p>
                  <Button variant="outline" size="sm" className="mt-3 bg-white dark:bg-black">Fix Now</Button>
                </div>
                
                <div className="p-4 rounded-lg bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                  <h4 className="font-semibold text-sm">Missing Meta Descriptions</h4>
                  <p className="text-xs text-muted-foreground mt-1">24 product pages are missing SEO meta descriptions, hurting search visibility.</p>
                  <Button variant="outline" size="sm" className="mt-3 bg-white dark:bg-black">Auto-Generate with AI</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-green-600 dark:text-green-400">
                  <CheckCircle2Icon className="mr-2 h-5 w-5" />
                  Passed Checks
                </CardTitle>
                <CardDescription>What you're already doing right.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center p-3 rounded-lg border bg-card">
                  <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-3 shrink-0" />
                  <span className="text-sm">Mobile checkout button is prominent</span>
                </div>
                <div className="flex items-center p-3 rounded-lg border bg-card">
                  <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-3 shrink-0" />
                  <span className="text-sm">No 404 broken links found</span>
                </div>
                <div className="flex items-center p-3 rounded-lg border bg-card">
                  <CheckCircle2Icon className="h-4 w-4 text-green-500 mr-3 shrink-0" />
                  <span className="text-sm">SSL certificate is valid and active</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
