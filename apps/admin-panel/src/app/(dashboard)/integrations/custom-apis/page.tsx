"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button,
  Badge,
} from "@commercex/ui";
import { CodeIcon, PlusIcon, ExternalLinkIcon } from "lucide-react";

export default function CustomApisIntegrationPage() {
  const customApps = [
    {
      id: "app_1",
      name: "Legacy POS Sync",
      description: "Custom script syncing in-store POS inventory with CommerceX.",
      version: "v2023-01",
      status: "active",
      lastRequest: "2 seconds ago",
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Custom Apps & APIs" 
        text="Build and manage custom applications that interact with the CommerceX API."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Custom App
        </Button>
      </PageHeader>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Your Custom Apps</CardTitle>
              <CardDescription>Private apps built specifically for your store.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {customApps.map((app) => (
                  <div key={app.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex gap-4 items-start">
                      <div className="mt-1 bg-muted p-2 rounded-md">
                        <CodeIcon className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{app.name}</h3>
                          <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-600 border-emerald-200">
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{app.description}</p>
                        <p className="text-xs text-muted-foreground">API Version: {app.version} &middot; Last Request: {app.lastRequest}</p>
                      </div>
                    </div>
                    <div className="mt-4 sm:mt-0 flex flex-col gap-2">
                      <Button variant="outline" size="sm">Manage App</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Developer Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Need to build a custom integration? Check out our developer documentation for API references, webhooks, and SDKs.
              </p>
              <Button variant="outline" className="w-full justify-between">
                Read API Docs <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="outline" className="w-full justify-between">
                GraphiQL Explorer <ExternalLinkIcon className="h-4 w-4 text-muted-foreground" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
