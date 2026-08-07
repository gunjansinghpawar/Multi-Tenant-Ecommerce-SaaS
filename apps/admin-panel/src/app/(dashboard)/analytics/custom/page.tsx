"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Button
} from "@commercex/ui";
import { LayoutGridIcon, PlusIcon, GripHorizontalIcon, MoreVerticalIcon } from "lucide-react";

export default function CustomDashboardPage() {
  const [widgets, setWidgets] = useState([
    { id: 1, title: "Total Revenue (MTD)", type: "metric", value: "$42,500" },
    { id: 2, title: "Active Carts", type: "metric", value: "14" },
    { id: 3, title: "Top Referring Domains", type: "list", data: ["google.com", "instagram.com", "direct"] },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Custom Dashboard" 
          text="Build your own view by pinning your favorite metrics and charts."
        />
        <div className="flex space-x-2">
          <Button variant="outline">
            <LayoutGridIcon className="mr-2 h-4 w-4" />
            Edit Layout
          </Button>
          <Button>
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Widget
          </Button>
        </div>
      </div>
      
      {widgets.length === 0 ? (
        <Card className="border-dashed border-2 bg-muted/10">
          <CardContent className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <LayoutGridIcon className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Your Dashboard is Empty</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                Start building your custom view by adding metric cards, charts, and data tables.
              </p>
            </div>
            <Button className="mt-4"><PlusIcon className="mr-2 h-4 w-4" /> Add First Widget</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {widgets.map(w => (
            <Card key={w.id} className="relative group hover:border-primary/50 transition-colors cursor-move">
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <GripHorizontalIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVerticalIcon className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium pr-10">{w.title}</CardTitle>
              </CardHeader>
              <CardContent>
                {w.type === 'metric' && (
                  <div className="text-3xl font-bold">{w.value}</div>
                )}
                {w.type === 'list' && (
                  <ul className="space-y-2 mt-2">
                    {w.data?.map((item, i) => (
                      <li key={i} className="text-sm border-b pb-1 last:border-0">{i + 1}. {item}</li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          ))}
          
          <Card className="border-dashed border-2 bg-muted/5 hover:bg-muted/10 transition-colors cursor-pointer flex items-center justify-center min-h-[120px]">
            <CardContent className="p-0 flex flex-col items-center text-muted-foreground hover:text-primary transition-colors">
              <PlusIcon className="h-8 w-8 mb-2" />
              <span className="text-sm font-medium">Add Widget</span>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
