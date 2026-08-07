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
} from "@commercex/ui";
import { HistoryIcon, RotateCcwIcon } from "lucide-react";

export default function RestoreSettingsPage() {
  const backups = [
    { id: "bkp_103", date: "Today, 00:00 UTC", size: "45.2 MB", type: "Automated" },
    { id: "bkp_102", date: "Yesterday, 00:00 UTC", size: "44.8 MB", type: "Automated" },
    { id: "bkp_101", date: "Oct 24, 15:30 UTC", size: "44.5 MB", type: "Manual" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Restore Data" 
        text="Roll back your store to a previous state."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Available Recovery Points</CardTitle>
          <CardDescription>Select a backup to restore. This will overwrite current data.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Backup ID</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {backups.map((bkp) => (
                  <TableRow key={bkp.id}>
                    <TableCell>
                      <div className="font-medium text-sm flex items-center gap-2">
                        <HistoryIcon className="h-4 w-4 text-muted-foreground" />
                        {bkp.id}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{bkp.date}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{bkp.size}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{bkp.type}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        <RotateCcwIcon className="h-3 w-3 mr-1" /> Restore
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
