"use client";

import React from "react";
import { Card, Button, Input } from "@commercex/ui";
import { UserCheckIcon, ShieldAlertIcon } from "lucide-react";

export default function RemoteLoginPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Remote Login</h1>
        <p className="text-muted-foreground mt-1">Impersonate tenant admin accounts for diagnostic purposes.</p>
      </div>

      <Card className="p-6 max-w-xl space-y-4">
        <div className="flex items-center gap-3 text-amber-500 bg-amber-500/10 p-3 rounded-lg text-sm font-medium">
          <ShieldAlertIcon className="h-5 w-5 shrink-0" />
          Impersonation session actions are logged to the immutable audit ledger.
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tenant ID or Store Domain</label>
          <Input placeholder="e.g. str_1 or fashion-boutique.commercex.com" />
        </div>

        <Button className="w-full">
          <UserCheckIcon className="mr-2 h-4 w-4" /> Start Impersonation Session
        </Button>
      </Card>
    </div>
  );
}