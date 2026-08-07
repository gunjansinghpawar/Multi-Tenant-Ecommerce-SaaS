"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@commercex/ui";

export default function LoginHistoryPage() {
  const history = [
    {
      id: "1",
      timestamp: "Today, 10:45 AM",
      ip: "192.168.1.45",
      location: "San Francisco, CA, USA",
      device: "Mac OS X / Chrome",
      status: "success",
    },
    {
      id: "2",
      timestamp: "Yesterday, 04:30 PM",
      ip: "10.0.0.12",
      location: "New York, NY, USA",
      device: "Windows / Edge",
      status: "success",
    },
    {
      id: "3",
      timestamp: "Oct 22, 2023, 02:15 AM",
      ip: "45.22.19.120",
      location: "London, UK",
      device: "Unknown Device",
      status: "failed",
      reason: "Invalid password",
    },
    {
      id: "4",
      timestamp: "Oct 21, 2023, 09:12 AM",
      ip: "192.168.1.45",
      location: "San Francisco, CA, USA",
      device: "Mac OS X / Chrome",
      status: "success",
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "success":
        return <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100/80 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800">Success</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Login History" 
        text="Review recent authentication attempts for your account."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Showing the last 30 days of login activity. If you notice anything suspicious, please update your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Device / Browser</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="font-medium text-sm">{record.timestamp}</TableCell>
                    <TableCell className="text-sm">{record.location}</TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground">{record.ip}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{record.device}</TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1 items-start">
                        {getStatusBadge(record.status)}
                        {record.reason && (
                          <span className="text-[10px] text-destructive">{record.reason}</span>
                        )}
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
