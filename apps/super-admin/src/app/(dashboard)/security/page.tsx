"use client";

import React from "react";
import { Card, StatCard, Badge, Button } from "@commercex/ui";
import { ShieldCheckIcon, AlertTriangleIcon, LockIcon } from "lucide-react";

export default function SecurityCenterPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Security Center</h1>
          <p className="text-muted-foreground mt-1">Platform threat detection, WAF rules, and access control audit.</p>
        </div>
        <Button variant="outline"><LockIcon className="mr-2 h-4 w-4" /> Configure WAF</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard title="Threat Status" value="Protected" description="WAF rules active" icon={<ShieldCheckIcon className="h-4 w-4 text-emerald-500" />} />
        <StatCard title="Blocked Requests" value="14,209" description="DDoS attempts deflected" icon={<AlertTriangleIcon className="h-4 w-4 text-amber-500" />} />
        <StatCard title="Failed Logins (24h)" value="12" description="No breaches detected" icon={<LockIcon className="h-4 w-4" />} />
      </div>
    </div>
  );
}