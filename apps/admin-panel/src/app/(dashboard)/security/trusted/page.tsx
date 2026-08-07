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
  Badge,
} from "@commercex/ui";
import { CheckCircle2Icon, MonitorSmartphoneIcon, XCircleIcon } from "lucide-react";

export default function TrustedDevicesPage() {
  const devices = [
    {
      id: "1",
      name: "Jane's MacBook Air",
      addedOn: "Sep 12, 2023",
      lastUsed: "Today, 10:45 AM",
      browser: "Chrome on macOS",
    },
    {
      id: "2",
      name: "Work iPhone",
      addedOn: "Oct 01, 2023",
      lastUsed: "Yesterday, 06:15 PM",
      browser: "CommerceX iOS App",
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Trusted Devices" 
        text="Devices that bypass two-factor authentication challenges for 30 days."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Your Trusted Devices</CardTitle>
          <CardDescription>
            You opted to "Remember this device" when logging in. These devices won't ask for a 2FA code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {devices.map((device) => (
              <div key={device.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <MonitorSmartphoneIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{device.name}</p>
                      <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-600 border-emerald-200 flex gap-1 items-center">
                        <CheckCircle2Icon className="h-3 w-3" /> Trusted
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {device.browser}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Trusted on {device.addedOn} &middot; Last used {device.lastUsed}
                    </p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 self-start sm:self-center">
                  <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10 text-xs">
                    <XCircleIcon className="mr-1 h-3 w-3" /> Remove Trust
                  </Button>
                </div>
              </div>
            ))}
            
            {devices.length === 0 && (
              <div className="text-center p-8 border border-dashed rounded-lg">
                <MonitorSmartphoneIcon className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-20" />
                <h3 className="text-sm font-medium">No trusted devices</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  When you log in with 2FA, you can choose to trust a device.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
