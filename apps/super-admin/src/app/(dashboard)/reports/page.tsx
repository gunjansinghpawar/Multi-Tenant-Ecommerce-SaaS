"use client";

import React from "react";
import { Card, Button, Badge } from "@commercex/ui";
import { FileTextIcon, DownloadIcon, PlusIcon } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Exports</h1>
          <p className="text-muted-foreground mt-1">Generate automated operational and financial platform reports.</p>
        </div>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Create Custom Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <FileTextIcon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold">Monthly Revenue & Tax Summary</h4>
              <p className="text-sm text-muted-foreground">Generated on 1st of every month</p>
            </div>
          </div>
          <Button variant="outline" size="sm"><DownloadIcon className="h-4 w-4" /></Button>
        </Card>

        <Card className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
              <FileTextIcon className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-bold">Tenant Growth & Churn Audit</h4>
              <p className="text-sm text-muted-foreground">Weekly automated snapshot</p>
            </div>
          </div>
          <Button variant="outline" size="sm"><DownloadIcon className="h-4 w-4" /></Button>
        </Card>
      </div>
    </div>
  );
}