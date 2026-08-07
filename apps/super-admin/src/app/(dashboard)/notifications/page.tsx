"use client";

import React from "react";
import { Card, Button, Badge } from "@commercex/ui";
import { BellIcon, SendIcon } from "lucide-react";

export default function NotificationsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications Center</h1>
          <p className="text-muted-foreground mt-1">Send platform broadcasts and configure system triggers.</p>
        </div>
        <Button><SendIcon className="mr-2 h-4 w-4" /> Send Announcement</Button>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">System Alerts</h3>
        <p className="text-sm text-muted-foreground">Configure automated email and push alerts for system health events.</p>
      </Card>
    </div>
  );
}