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
  Badge
} from "@commercex/ui";
import { LaptopIcon, SmartphoneIcon, GlobeIcon } from "lucide-react";

export default function DevicesPage() {
  const devices = [
    {
      id: "1",
      name: "MacBook Pro M2",
      type: "desktop",
      browser: "Chrome on macOS",
      location: "San Francisco, CA, USA",
      ip: "192.168.1.45",
      lastActive: "Active now",
      isCurrent: true,
    },
    {
      id: "2",
      name: "iPhone 14 Pro",
      type: "mobile",
      browser: "Safari on iOS",
      location: "San Francisco, CA, USA",
      ip: "192.168.1.102",
      lastActive: "2 hours ago",
      isCurrent: false,
    },
    {
      id: "3",
      name: "Windows Desktop",
      type: "desktop",
      browser: "Edge on Windows 11",
      location: "New York, NY, USA",
      ip: "10.0.0.12",
      lastActive: "Yesterday at 4:30 PM",
      isCurrent: false,
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Logged In Devices" 
        text="Manage the devices that are currently signed in to your account."
      >
        <Button variant="destructive">Sign out of all other devices</Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Devices</CardTitle>
          <CardDescription>
            These devices have logged into your account recently. If you don't recognize a device, sign out and change your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devices.map((device) => (
              <div key={device.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex gap-4">
                  <div className="mt-1">
                    {device.type === "desktop" ? (
                      <LaptopIcon className="h-6 w-6 text-muted-foreground" />
                    ) : (
                      <SmartphoneIcon className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{device.name}</p>
                      {device.isCurrent && <Badge variant="secondary" className="text-[10px]">Current Device</Badge>}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <GlobeIcon className="h-3 w-3" />
                      {device.browser} &middot; {device.ip}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {device.location} &middot; <span className={device.isCurrent ? "text-emerald-500 font-medium" : ""}>{device.lastActive}</span>
                    </p>
                  </div>
                </div>
                {!device.isCurrent && (
                  <div className="mt-4 sm:mt-0">
                    <Button variant="outline" size="sm" className="w-full sm:w-auto text-destructive hover:bg-destructive hover:text-destructive-foreground">
                      Sign Out
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
