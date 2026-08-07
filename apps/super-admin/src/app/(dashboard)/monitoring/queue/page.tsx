"use client";

import React from "react";
import { Card, StatCard, Button } from "@commercex/ui";
import { LayersIcon, PlayIcon, PauseIcon } from "lucide-react";

export default function QueueMonitoringPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Queue Monitoring</h1>
        <p className="text-muted-foreground mt-1">Background job processing state and worker node capacity.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Active Workers" value="12 Nodes" description="Processing at 420 jobs/s" icon={<LayersIcon className="h-4 w-4" />} />
        <StatCard title="Pending Jobs" value="0" description="No backlog" icon={<LayersIcon className="h-4 w-4" />} />
        <StatCard title="Failed Jobs" value="3" description="Requires retry" icon={<LayersIcon className="h-4 w-4 text-destructive" />} />
      </div>
    </div>
  );
}