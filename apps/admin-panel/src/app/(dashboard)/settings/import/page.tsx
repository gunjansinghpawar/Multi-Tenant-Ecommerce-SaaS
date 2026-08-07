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
import { UploadCloudIcon } from "lucide-react";

export default function ImportSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Import Data" 
        text="Bulk import products, customers, or orders via CSV."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>CSV Import</CardTitle>
          <CardDescription>Upload a properly formatted CSV file to import records.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="border-2 border-dashed flex flex-col items-center justify-center p-12 rounded-lg text-center bg-muted/20">
            <UploadCloudIcon className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="font-medium mb-1">Drop your CSV file here</h3>
            <p className="text-xs text-muted-foreground mb-4">Maximum file size: 50MB</p>
            <Button variant="secondary">Browse Files</Button>
          </div>
          
          <div className="flex gap-4">
            <Button variant="link" className="px-0">Download Product CSV Template</Button>
            <Button variant="link" className="px-0">Download Customer CSV Template</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
