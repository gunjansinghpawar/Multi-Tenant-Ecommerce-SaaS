"use client";

import React from "react";
import { 
  Card,
  Button
} from "@commercex/ui";
import { AlertTriangleIcon } from "lucide-react";

export default function AdvancedSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Advanced</h3>
        <p className="text-sm text-muted-foreground">
          Danger zone and advanced configurations.
        </p>
      </div>
      <div className="border-t border-border"></div>

      <div className="space-y-8">
        
        {/* Developer API */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="md:w-1/3">
            <h4 className="font-medium text-sm">API Access</h4>
            <p className="text-sm text-muted-foreground mt-1">Manage API keys for custom integrations.</p>
          </div>
          <div className="md:w-2/3">
            <Card className="p-4 space-y-4 max-w-md">
              <p className="text-sm text-muted-foreground">You currently have 0 active API keys.</p>
              <Button variant="outline">Generate API Key</Button>
            </Card>
          </div>
        </section>

        <div className="border-t border-border"></div>

        {/* Delete Store */}
        <section className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="md:w-1/3">
            <h4 className="font-medium text-sm text-destructive">Delete Store</h4>
            <p className="text-sm text-muted-foreground mt-1">Permanently delete your store and all associated data.</p>
          </div>
          <div className="md:w-2/3">
            <Card className="p-4 border-destructive/50 bg-destructive/5 space-y-4 max-w-md">
              <div className="flex gap-3">
                <AlertTriangleIcon className="h-5 w-5 text-destructive shrink-0" />
                <p className="text-sm text-destructive">
                  Once you delete a store, there is no going back. Please be certain.
                </p>
              </div>
              <Button variant="destructive">Delete Store Data</Button>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
