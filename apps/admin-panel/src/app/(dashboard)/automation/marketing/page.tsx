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
import { TagsIcon } from "lucide-react";

export default function MarketingAutomationsPage() {
  const templates = ["Post-Purchase Cross-Sell", "Lead Capture Follow-up", "Product Review Request", "Abandoned Checkout Series"];

  return (
    <div className="space-y-6">
      <PageHeader heading="Marketing Automations" text="Build campaigns to increase conversions and customer retention." />
      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((template, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><TagsIcon className="h-5 w-5 text-pink-500" /> {template}</CardTitle>
              <CardDescription>Marketing workflow template.</CardDescription>
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
