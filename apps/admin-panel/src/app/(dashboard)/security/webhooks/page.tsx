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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@commercex/ui";
import { PlusIcon, WebhookIcon, SettingsIcon, TrashIcon } from "lucide-react";

export default function WebhooksPage() {
  const webhooks = [
    {
      id: "wh_1",
      url: "https://api.erp-system.com/webhooks/commercex",
      events: ["order.created", "order.updated"],
      status: "active",
      createdAt: "Jan 12, 2023",
      lastDelivery: "5 mins ago",
      successRate: "99.8%",
    },
    {
      id: "wh_2",
      url: "https://marketing.automation.io/ingest",
      events: ["customer.created", "customer.updated"],
      status: "failing",
      createdAt: "Feb 20, 2023",
      lastDelivery: "1 hour ago",
      successRate: "45.2%",
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Webhooks" 
        text="Configure webhooks to receive real-time notifications about events in your store."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Endpoint
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Configured Endpoints</CardTitle>
          <CardDescription>
            Manage your webhook endpoints. You can define specific events for each endpoint to listen to.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint URL / Events</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Delivery Success</TableHead>
                  <TableHead>Last Delivery</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell>
                      <div className="font-medium text-sm flex items-center gap-2 mb-1">
                        <WebhookIcon className="h-4 w-4 text-muted-foreground" />
                        {webhook.url}
                      </div>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {webhook.events.map(ev => (
                          <Badge key={ev} variant="secondary" className="text-[10px] bg-muted">{ev}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      {webhook.status === 'active' ? (
                        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-emerald-200">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="destructive">Failing</Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm font-medium ${webhook.status === 'failing' ? 'text-destructive' : 'text-emerald-600'}`}>
                        {webhook.successRate}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{webhook.lastDelivery}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <SettingsIcon className="h-4 w-4 text-muted-foreground" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
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
