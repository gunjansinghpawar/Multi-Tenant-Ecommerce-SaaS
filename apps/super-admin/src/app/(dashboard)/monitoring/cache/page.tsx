"use client";

import React from "react";
import { Card, StatCard } from "@commercex/ui";
import { ZapIcon } from "lucide-react";

export default function CacheMonitoringPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Cache Monitoring</h1>
        <p className="text-muted-foreground mt-1">Redis cluster telemetry and memory cache efficiency.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Cache Hit Ratio" value="96.4%" description="High hit efficiency" icon={<ZapIcon className="h-4 w-4 text-amber-500" />} />
        <StatCard title="Memory Used" value="1.8 GB / 4.0 GB" description="45% capacity" icon={<ZapIcon className="h-4 w-4" />} />
        <StatCard title="Evicted Keys" value="0" description="No memory pressure" icon={<ZapIcon className="h-4 w-4" />} />
      </div>
    </div>
  );
}