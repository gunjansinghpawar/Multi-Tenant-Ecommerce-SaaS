"use client";

import React from "react";
import { Card, Button, Badge } from "@commercex/ui";
import { DatabaseIcon, RefreshCwIcon } from "lucide-react";

export default function BackupsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Backup Manager</h1>
          <p className="text-muted-foreground mt-1">Automated snapshots and point-in-time disaster recovery.</p>
        </div>
        <Button><RefreshCwIcon className="mr-2 h-4 w-4" /> Trigger Snapshot</Button>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Snapshot Timeline</h3>
        <p className="text-sm text-muted-foreground">Automated backups taken every 6 hours.</p>
      </Card>
    </div>
  );
}