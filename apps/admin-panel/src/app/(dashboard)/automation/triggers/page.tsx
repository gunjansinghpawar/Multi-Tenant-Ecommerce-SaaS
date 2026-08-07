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
  Badge,
} from "@commercex/ui";
import { ZapIcon, ShoppingCartIcon, UsersIcon, PackageIcon, BoxIcon } from "lucide-react";

export default function TriggersPage() {
  const triggerCategories = [
    {
      title: "Order Events",
      icon: <ShoppingCartIcon className="h-5 w-5 text-blue-500" />,
      items: ["Order Created", "Order Paid", "Order Fulfilled", "Order Cancelled", "Checkout Abandoned"]
    },
    {
      title: "Customer Events",
      icon: <UsersIcon className="h-5 w-5 text-purple-500" />,
      items: ["Customer Created", "Customer Updated", "Customer Tag Added", "Customer Account Enabled"]
    },
    {
      title: "Product Events",
      icon: <PackageIcon className="h-5 w-5 text-orange-500" />,
      items: ["Product Created", "Product Updated", "Product Deleted", "Variant Added"]
    },
    {
      title: "Inventory Events",
      icon: <BoxIcon className="h-5 w-5 text-emerald-500" />,
      items: ["Inventory Quantity Changed", "Inventory Level Updated", "Out of Stock"]
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Workflow Triggers" 
        text="Explore the events that can start an automation workflow."
      >
        <Button>Request New Trigger</Button>
      </PageHeader>
      
      <div className="grid gap-6 md:grid-cols-2">
        {triggerCategories.map((cat, i) => (
          <Card key={i}>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                {cat.icon} {cat.title}
              </CardTitle>
              <CardDescription>Available events for {cat.title.toLowerCase()}.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {cat.items.map((item, j) => (
                  <div key={j} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 border border-transparent hover:border-border cursor-default transition-colors">
                    <span className="text-sm font-medium flex items-center gap-2">
                      <ZapIcon className="h-3 w-3 text-muted-foreground" /> {item}
                    </span>
                    <Badge variant="secondary" className="text-[10px]">Trigger</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
