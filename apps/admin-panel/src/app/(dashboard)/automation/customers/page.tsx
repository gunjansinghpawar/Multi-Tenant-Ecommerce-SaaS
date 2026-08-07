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
import { UsersIcon } from "lucide-react";

export default function CustomersAutomationsPage() {
  const templates = ["Auto-Tag VIP Customers", "Birthday Rewards", "B2B Customer Onboarding", "Win-back Segment Sync"];

  return (
    <div className="space-y-6">
      <PageHeader heading="Customer Automations" text="Automate customer segmentation, tagging, and loyalty rewards." />
      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((template, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><UsersIcon className="h-5 w-5 text-indigo-500" /> {template}</CardTitle>
              <CardDescription>Customer management template.</CardDescription>
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
