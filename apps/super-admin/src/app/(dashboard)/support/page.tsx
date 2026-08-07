"use client";

import React from "react";
import { Card, Button, Badge } from "@commercex/ui";
import { LifeBuoyIcon, MessageSquareIcon } from "lucide-react";

export default function SupportCenterPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Center</h1>
          <p className="text-muted-foreground mt-1">Escalated tickets and tenant technical support issues.</p>
        </div>
        <Button><MessageSquareIcon className="mr-2 h-4 w-4" /> Open Support Queue</Button>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Active Support Tickets</h3>
        <p className="text-sm text-muted-foreground">0 unresolved critical tickets in queue.</p>
      </Card>
    </div>
  );
}