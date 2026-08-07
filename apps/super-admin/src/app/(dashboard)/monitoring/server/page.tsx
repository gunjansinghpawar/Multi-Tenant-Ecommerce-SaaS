"use client";

import React from "react";
import { Card, StatCard } from "@commercex/ui";
import { ServerIcon } from "lucide-react";

export default function ServerMonitoringPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Server Monitoring</h1>
        <p className="text-muted-foreground mt-1">Real-time compute nodes status and memory allocation.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Avg CPU Utilization" value="28%" description="Optimal performance" icon={<ServerIcon className="h-4 w-4" />} />
        <StatCard title="RAM Allocation" value="14.2 GB / 32 GB" description="44% total load" icon={<ServerIcon className="h-4 w-4" />} />
        <StatCard title="Uptime SLA" value="99.99%" description="0 incidents today" icon={<ServerIcon className="h-4 w-4 text-emerald-500" />} />
      </div>
    </div>
  );
}