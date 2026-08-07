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

export default function LogoSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Logo Settings" 
        text="Manage your store's primary logos for light and dark modes."
      />
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Light Theme Logo</CardTitle>
            <CardDescription>Used on light backgrounds (header, emails).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="border-2 border-dashed bg-slate-50 flex flex-col items-center justify-center p-8 rounded-lg">
              <UploadCloudIcon className="h-10 w-10 text-muted-foreground mb-4" />
              <Button variant="outline">Upload Light Logo</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dark Theme Logo</CardTitle>
            <CardDescription>Used on dark backgrounds (footer, dark mode).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <div className="border-2 border-dashed bg-slate-900 border-slate-700 flex flex-col items-center justify-center p-8 rounded-lg">
              <UploadCloudIcon className="h-10 w-10 text-slate-400 mb-4" />
              <Button variant="outline" className="text-white border-slate-600 hover:bg-slate-800">Upload Dark Logo</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
