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
import { DownloadIcon, FilterIcon } from "lucide-react";

export default function AuditLogsPage() {
  const logs = [
    {
      id: "log_1",
      action: "API Key Created",
      actor: "Jane Doe (jane@example.com)",
      ip: "192.168.1.45",
      timestamp: "Oct 24, 2023, 11:20 AM",
      details: "Created 'ERP Integration Sync' key.",
      type: "create",
    },
    {
      id: "log_2",
      action: "Store Settings Updated",
      actor: "Jane Doe (jane@example.com)",
      ip: "192.168.1.45",
      timestamp: "Oct 23, 2023, 03:15 PM",
      details: "Changed store currency from USD to EUR.",
      type: "update",
    },
    {
      id: "log_3",
      action: "Staff Member Invited",
      actor: "John Smith (john@example.com)",
      ip: "10.0.0.12",
      timestamp: "Oct 22, 2023, 09:40 AM",
      details: "Invited mark@example.com as Support role.",
      type: "create",
    },
    {
      id: "log_4",
      action: "Webhook Deleted",
      actor: "System",
      ip: "127.0.0.1",
      timestamp: "Oct 20, 2023, 02:00 AM",
      details: "Deleted failing webhook wh_89x2.",
      type: "delete",
    }
  ];

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "create": return <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Create</Badge>;
      case "update": return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Update</Badge>;
      case "delete": return <Badge className="bg-red-100 text-red-800 border-red-200">Delete</Badge>;
      default: return <Badge variant="outline">Action</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Audit Logs" 
        text="A chronological record of all administrative actions in your account."
      >
        <div className="flex gap-2">
          <Button variant="outline">
            <FilterIcon className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>
            <DownloadIcon className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Organization Activity</CardTitle>
          <CardDescription>
            Audit logs are retained for 90 days on your current plan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Actor / IP</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead>Date & Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <div className="flex flex-col items-start gap-2">
                        <span className="font-medium text-sm">{log.action}</span>
                        {getTypeBadge(log.type)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm font-medium">{log.actor}</div>
                      <div className="text-xs text-muted-foreground font-mono">{log.ip}</div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm text-muted-foreground">{log.details}</span>
                    </TableCell>
                    <TableCell className="text-sm whitespace-nowrap">
                      {log.timestamp}
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
