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
import { ShoppingCartIcon } from "lucide-react";

export default function OrdersAutomationsPage() {
  const templates = ["High-Risk Order Flagging", "Auto-Fulfill Digital Products", "Route Orders by Location", "Tag B2B Orders"];

  return (
    <div className="space-y-6">
      <PageHeader heading="Order Automations" text="Streamline order processing and fulfillment routing." />
      <div className="grid gap-6 md:grid-cols-2">
        {templates.map((template, i) => (
          <Card key={i}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ShoppingCartIcon className="h-5 w-5 text-emerald-600" /> {template}</CardTitle>
              <CardDescription>Order processing template.</CardDescription>
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
