"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button
} from "@commercex/ui";
import { DownloadIcon, DatabaseIcon } from "lucide-react";

export default function BackupSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Database Backups" 
        text="Securely backup your products, orders, and customer data."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Manual Backup</CardTitle>
          <CardDescription>Generate a complete snapshot of your store's database.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted p-4 rounded-md flex items-start gap-4">
            <DatabaseIcon className="h-6 w-6 text-muted-foreground mt-1" />
            <div>
              <h4 className="font-medium text-sm">Automated Backups</h4>
              <p className="text-xs text-muted-foreground mt-1">Your store is automatically backed up daily at 00:00 UTC. The last automated backup was successful.</p>
            </div>
          </div>
          
          <Button className="w-full sm:w-auto">
            <DownloadIcon className="mr-2 h-4 w-4" /> Trigger Manual Backup
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
