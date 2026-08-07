"use client";

import React from "react";
import { Card, StatCard } from "@commercex/ui";
import { DatabaseIcon } from "lucide-react";

export default function DatabaseMonitoringPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Database Monitoring</h1>
        <p className="text-muted-foreground mt-1">PostgreSQL query performance, connections, and replica sync.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Active Connections" value="48 / 100" description="Pool healthy" icon={<DatabaseIcon className="h-4 w-4" />} />
        <StatCard title="Avg Query Duration" value="1.2 ms" description="Fast response" icon={<DatabaseIcon className="h-4 w-4" />} />
        <StatCard title="Replication Lag" value="0 ms" description="In sync" icon={<DatabaseIcon className="h-4 w-4 text-emerald-500" />} />
      </div>
    </div>
  );
}