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
import { MessageCircleIcon } from "lucide-react";

export default function WhatsAppAutomationsPage() {
  const templates = ["Order Confirmation", "Shipping Update", "Abandoned Cart Recovery (WhatsApp)", "Support Ticket Opened"];

  return (
    <div className="space-y-6">
      <PageHeader heading="WhatsApp Automations" text="Automate WhatsApp Business messages for transactional updates." />
      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((template, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MessageCircleIcon className="h-5 w-5 text-emerald-500" /> {template}</CardTitle>
              <CardDescription>Pre-built WhatsApp workflow template.</CardDescription>
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
