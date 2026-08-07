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
import { DownloadIcon, FileSpreadsheetIcon } from "lucide-react";

export default function ExportSettingsPage() {
  const exportTypes = [
    { title: "Products Matrix", desc: "Export all products with variants, pricing, and inventory." },
    { title: "Customer List", desc: "Export customer details, total spent, and marketing status." },
    { title: "Order History", desc: "Export historical orders for tax or accounting software." },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Export Data" 
        text="Download your store data in CSV format for analysis or backup."
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        {exportTypes.map((type, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FileSpreadsheetIcon className="h-4 w-4 text-emerald-500" /> {type.title}
              </CardTitle>
              <CardDescription>{type.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                <DownloadIcon className="mr-2 h-4 w-4" /> Export CSV
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
