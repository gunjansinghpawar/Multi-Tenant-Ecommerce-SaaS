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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
} from "@commercex/ui";
import { AppWindowIcon, PlusIcon, SettingsIcon } from "lucide-react";

export default function OAuthAppsPage() {
  const apps = [
    { id: "app_991", name: "Zapier Integration", clientId: "client_zpr_123", users: 1, status: "Active" },
    { id: "app_992", name: "Custom Inventory Sync", clientId: "client_inv_456", users: 1, status: "Active" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="OAuth Applications" 
        text="Manage applications that have been granted access to your store."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create New App
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Installed Applications</CardTitle>
          <CardDescription>These apps use OAuth2 to authenticate and interact with your store's API.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>App Name</TableHead>
                  <TableHead>Client ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apps.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>
                      <div className="font-medium text-sm flex items-center gap-2">
                        <AppWindowIcon className="h-4 w-4 text-muted-foreground" />
                        {app.name}
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{app.clientId}</TableCell>
                    <TableCell>
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">{app.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <SettingsIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
