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

export default function SessionsPage() {
  const sessions = [
    {
      id: "sess_1a2b3c",
      ip: "192.168.1.45",
      location: "San Francisco, CA, USA",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/114.0.0.0",
      createdAt: "Oct 24, 2023, 10:45 AM",
      expiresAt: "Nov 24, 2023, 10:45 AM",
      status: "active",
      isCurrent: true,
    },
    {
      id: "sess_9x8y7z",
      ip: "10.0.0.12",
      location: "New York, NY, USA",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/114.0.1823.58",
      createdAt: "Oct 23, 2023, 04:30 PM",
      expiresAt: "Nov 23, 2023, 04:30 PM",
      status: "active",
      isCurrent: false,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Active Sessions" 
        text="View and manage active sessions across all your devices."
      >
        <Button variant="destructive">Revoke All Sessions</Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Session List</CardTitle>
          <CardDescription>
            These are the current active access tokens for your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Session Info</TableHead>
                  <TableHead>Location / IP</TableHead>
                  <TableHead>Created / Expires</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell>
                      <div className="font-medium text-sm flex items-center gap-2">
                        {session.id}
                        {session.isCurrent && <Badge variant="secondary" className="text-[10px]">Current</Badge>}
                      </div>
                      <div className="text-xs text-muted-foreground truncate max-w-[200px]" title={session.userAgent}>
                        {session.userAgent}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{session.location}</div>
                      <div className="text-xs text-muted-foreground">{session.ip}</div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{session.createdAt}</div>
                      <div className="text-xs text-muted-foreground">{session.expiresAt}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900">
                        {session.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" disabled={session.isCurrent}>
                        Revoke
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
