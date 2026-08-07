"use client";

import React from "react";
import { Card, Badge } from "@commercex/ui";
import { ActivityIcon, CheckCircle2Icon } from "lucide-react";

export default function ActivityCenterPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity Center</h1>
        <p className="text-muted-foreground mt-1">Live real-time event stream across the entire platform infrastructure.</p>
      </div>

      <Card className="p-6 space-y-4">
        {[
          { msg: "Store 'Tech Store' generated invoice #1029", time: "Just now" },
          { msg: "User 'admin@platform.com' updated DB indices", time: "2 mins ago" },
          { msg: "Automated backup job succeeded", time: "10 mins ago" }
        ].map((act, i) => (
          <div key={i} className="flex items-center gap-3 border-b pb-3 last:border-0 last:pb-0">
            <CheckCircle2Icon className="h-4 w-4 text-emerald-500" />
            <div className="flex-1">
              <p className="text-sm font-medium">{act.msg}</p>
              <span className="text-xs text-muted-foreground">{act.time}</span>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}