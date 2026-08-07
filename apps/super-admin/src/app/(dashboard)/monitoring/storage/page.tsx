"use client";

import React from "react";
import { Card, StatCard } from "@commercex/ui";
import { HardDriveIcon } from "lucide-react";

export default function StorageMonitorPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Storage Monitor</h1>
        <p className="text-muted-foreground mt-1">Global object storage, CDN bandwidth, and media quotas.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Total Storage Used" value="842 GB" description="Across 1,248 tenants" icon={<HardDriveIcon className="h-4 w-4" />} />
        <StatCard title="CDN Bandwidth" value="4.2 TB" description="This billing cycle" icon={<HardDriveIcon className="h-4 w-4" />} />
        <StatCard title="Media Files" value="1.2M" description="Images & assets" icon={<HardDriveIcon className="h-4 w-4" />} />
      </div>
    </div>
  );
}