"use client";

import React from "react";
import { Card, Button, Badge, Switch } from "@commercex/ui";
import { PuzzleIcon, PlusIcon } from "lucide-react";

export default function PluginsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Plugin Marketplace</h1>
          <p className="text-muted-foreground mt-1">Control available platform integrations and modules.</p>
        </div>
        <Button><PlusIcon className="mr-2 h-4 w-4" /> Install Plugin</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {['Stripe Payments Gateway', 'Klaviyo Email Marketing', 'Algolia Search', 'ShipStation Fulfillment'].map((plugin, i) => (
          <Card key={i} className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-indigo-500/10 text-indigo-500 rounded-lg flex items-center justify-center">
                <PuzzleIcon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-bold">{plugin}</h4>
                <p className="text-xs text-muted-foreground">Official CommerceX Integration</p>
              </div>
            </div>
            <Switch defaultChecked />
          </Card>
        ))}
      </div>
    </div>
  );
}