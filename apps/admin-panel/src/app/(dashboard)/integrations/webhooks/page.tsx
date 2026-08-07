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

export default function IntegrationsWebhooksPage() {
  const webhooks = [
    {
      id: "wh_out_1",
      url: "https://api.thirdparty-logistics.com/incoming",
      events: ["order.fulfilled", "shipment.updated"],
      status: "active",
      createdAt: "Mar 10, 2023",
      lastDelivery: "10 mins ago",
      successRate: "99.9%",
    },
    {
      id: "wh_out_2",
      url: "https://accounting-software.io/sync",
      events: ["order.created", "refund.issued"],
      status: "active",
      createdAt: "Apr 05, 2023",
      lastDelivery: "2 hours ago",
      successRate: "100%",
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Outbound Webhooks" 
        text="Push real-time event data from CommerceX to your custom applications."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Webhook
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Webhook Endpoints</CardTitle>
          <CardDescription>
            Manage active subscriptions to store events. (For security webhooks, check the Security settings).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint URL / Events</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Success Rate</TableHead>
                  <TableHead>Last Ping</TableHead>
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
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">
                        Active
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium text-emerald-600">
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
