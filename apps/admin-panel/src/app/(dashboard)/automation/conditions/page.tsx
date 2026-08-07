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
import { FilterIcon, ArrowRightIcon } from "lucide-react";

export default function ConditionsPage() {
  const conditions = [
    { group: "Customer Properties", items: ["Total Spent is greater than", "Customer Tag equals", "Accepts Marketing is true", "Country Code is"] },
    { group: "Order Properties", items: ["Total Price is greater than", "Line Item Count equals", "Discount Code Used is", "Risk Level is"] },
    { group: "Product Properties", items: ["Product Type equals", "Vendor is", "Inventory Quantity is less than", "Price is"] }
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Workflow Conditions" 
        text="Define logical rules to control the flow of your automations."
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        {conditions.map((cat, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <FilterIcon className="h-4 w-4 text-primary" /> {cat.group}
              </CardTitle>
              <CardDescription>Rules based on {cat.group.toLowerCase()}.</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <ul className="space-y-3">
                {cat.items.map((item, j) => (
                  <li key={j} className="text-sm flex items-start gap-2">
                    <ArrowRightIcon className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-medium">{item}...</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
