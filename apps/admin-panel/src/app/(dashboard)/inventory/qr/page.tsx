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
import { QrCodeIcon, KeyboardIcon, CheckCircleIcon } from "lucide-react";

export default function QRScannerPage() {
  const [isScanning, setIsScanning] = useState(false);

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="QR Code Scanner" 
        text="Scan batch QR codes, supplier manifests, or location tags."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <QrCodeIcon className="mr-2 h-5 w-5" />
              Scanner Viewfinder
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex flex-col items-center justify-center border-2 border-dashed rounded-lg bg-black/5 relative overflow-hidden">
              {isScanning ? (
                <>
                  <div className="absolute inset-8 border-2 border-primary/50 rounded-lg">
                    <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-primary"></div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-primary"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-primary"></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-primary"></div>
                  </div>
                  <div className="w-full h-1 bg-primary absolute top-1/2 left-0 shadow-[0_0_10px_theme(colors.primary.DEFAULT)] animate-bounce"></div>
                  <p className="text-sm font-medium mt-4 z-10">Scanning for QR Codes...</p>
                </>
              ) : (
                <>
                  <QrCodeIcon className="h-16 w-16 text-muted-foreground/50 mb-4" />
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
                  placeholder="Enter QR data manually"
                />
                <Button>Submit</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent QR Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Batch Code", data: "LOT-A123-2026", time: "10 mins ago" },
                { type: "Location Tag", data: "WH1-Aisle4-Bin2", time: "1 hour ago" },
                { type: "Supplier Manifest", data: "SUP-MANIFEST-9902", time: "3 hours ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-3 rounded-lg border bg-card">
                  <div className="mt-1 bg-success/20 p-1 rounded-full">
                    <CheckCircleIcon className="h-4 w-4 text-success" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.type}</p>
                    <p className="text-xs text-muted-foreground font-mono mt-1 break-all">{item.data}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-6">View Scan History</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
