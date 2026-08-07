"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@commercex/ui";
import { ScanIcon, KeyboardIcon, CheckCircleIcon } from "lucide-react";

export default function BarcodeScannerPage() {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Barcode Scanner" 
        text="Quickly receive stock or perform inventory counts using a barcode scanner."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <ScanIcon className="mr-2 h-5 w-5" />
              Scanner Viewfinder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg bg-black/5 relative overflow-hidden">
              {isScanning ? (
                <>
                  <div className="absolute inset-0 border-4 border-primary animate-pulse rounded-lg"></div>
                  <div className="w-full h-1 bg-primary absolute top-1/2 left-0 shadow-[0_0_10px_theme(colors.primary.DEFAULT)] animate-bounce"></div>
                  <p className="text-sm font-medium mt-4 z-10">Scanning for barcodes...</p>
                </>
              ) : (
                <>
                  <ScanIcon className="h-16 w-16 text-muted-foreground/50 mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">Camera inactive</p>
                  <Button onClick={() => setIsScanning(true)}>Start Camera</Button>
                </>
              )}
            </div>
            
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-2">
                <KeyboardIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Manual Entry</span>
              </div>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter barcode manually"
                />
                <Button>Submit</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Wireless Earbuds Pro", sku: "WEP-001", time: "Just now" },
                { name: "Cotton T-Shirt (M)", sku: "TSH-M-WHT", time: "2 mins ago" },
                { name: "Ceramic Mug", sku: "MUG-CER-01", time: "5 mins ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg border bg-card">
                  <div className="mt-1 bg-success/20 p-1 rounded-full">
                    <CheckCircleIcon className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1">{item.sku}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">View All Scans</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
