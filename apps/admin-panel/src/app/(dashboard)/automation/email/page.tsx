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
} from "@commercex/ui";
import { MailIcon } from "lucide-react";

export default function EmailAutomationsPage() {
  const templates = ["Welcome Series", "Abandoned Cart", "Win-back Campaign", "Post-Purchase Review Request"];

  return (
    <div className="space-y-6">
      <PageHeader heading="Email Automations" text="Set up automated email sequences based on customer behavior." />
      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((template, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MailIcon className="h-5 w-5 text-blue-500" /> {template}</CardTitle>
              <CardDescription>Pre-built email workflow template.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">Use Template</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
