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
import { PlusIcon, ClockIcon, MoreVerticalIcon } from "lucide-react";

export default function SchedulerPage() {
  const crons = [
    { id: "cron_1", name: "Daily Sales Report Sync", schedule: "Every day at 00:00 UTC", nextRun: "In 10 hours", status: "active" },
    { id: "cron_2", name: "Delete Abandoned Carts > 30 Days", schedule: "Every Sunday at 02:00 UTC", nextRun: "In 3 days", status: "active" },
    { id: "cron_3", name: "Weekly Newsletter Blast", schedule: "Every Friday at 09:00 AM UTC", nextRun: "-", status: "paused" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Task Scheduler" 
        text="Set up recurring tasks and workflows using cron syntax."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Scheduled Task
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Workflows</CardTitle>
          <CardDescription>Manage workflows that run on a time-based interval rather than an event trigger.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task Name</TableHead>
                  <TableHead>Schedule</TableHead>
                  <TableHead>Next Run</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {crons.map((cron) => (
                  <TableRow key={cron.id}>
                    <TableCell className="font-medium text-sm flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-muted-foreground" />
                      {cron.name}
                    </TableCell>
                    <TableCell className="text-sm font-mono text-muted-foreground">{cron.schedule}</TableCell>
                    <TableCell className="text-sm">{cron.nextRun}</TableCell>
                    <TableCell>
                      {cron.status === 'active' ? (
                        <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Paused</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="h-4 w-4" />
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
