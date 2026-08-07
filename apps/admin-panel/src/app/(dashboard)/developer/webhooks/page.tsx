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
import { WebhookIcon, PlusIcon, ActivityIcon } from "lucide-react";

export default function WebhooksPage() {
  const hooks = [
    { id: "wh_01", url: "https://api.myerp.com/orders/sync", events: ["order.created", "order.updated"], status: "Healthy" },
    { id: "wh_02", url: "https://marketing-tool.io/webhook", events: ["customer.created"], status: "Healthy" },
    { id: "wh_03", url: "https://custom-analytics.dev/ingest", events: ["*"], status: "Failing" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Webhooks" 
        text="Subscribe to real-time events happening in your store."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Endpoint
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Configured Endpoints</CardTitle>
          <CardDescription>We will send HTTP POST requests to these URLs when events occur.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Endpoint URL</TableHead>
                  <TableHead>Subscribed Events</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hooks.map((h) => (
                  <TableRow key={h.id}>
                    <TableCell>
                      <div className="font-medium text-sm flex items-center gap-2 text-primary truncate max-w-[250px]">
                        <WebhookIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        {h.url}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {h.events.map(ev => <Badge key={ev} variant="secondary" className="font-mono text-[10px]">{ev}</Badge>)}
                      </div>
                    </TableCell>
                    <TableCell>
                      {h.status === 'Healthy' ? (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Healthy</Badge>
                      ) : (
                        <Badge className="bg-destructive/10 text-destructive border-destructive/20">Failing</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <ActivityIcon className="h-4 w-4 mr-2" /> View Logs
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
