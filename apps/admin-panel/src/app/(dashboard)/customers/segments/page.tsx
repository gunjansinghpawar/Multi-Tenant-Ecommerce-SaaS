"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  DataTable,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Form,
  RHFInput,
  Badge,
  Card,
  CardContent
} from "@commercex/ui";
import { PlusIcon, FilterIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";

type Segment = {
  id: string;
  name: string;
  type: "Dynamic Segment" | "Static Group";
  customerCount: number;
  condition: string;
};

const data: Segment[] = [
  { id: "SEG-01", name: "VIP Customers", type: "Dynamic Segment", customerCount: 1205, condition: "Total Spent > $1000" },
  { id: "SEG-02", name: "Summer Sale 2026 Cohort", type: "Static Group", customerCount: 340, condition: "Manual selection" },
  { id: "SEG-03", name: "Churn Risk", type: "Dynamic Segment", customerCount: 4500, condition: "Last Order > 6 months ago" },
];

const columns: ColumnDef<Segment>[] = [
  { accessorKey: "name", header: "Segment Name" },
  { 
    accessorKey: "type", 
    header: "Type",
    cell: ({ row }) => {
      const type = row.getValue("type") as string;
      return <Badge variant={type === "Dynamic Segment" ? "primary" : "secondary" as any}>{type}</Badge>;
    }
  },
  { accessorKey: "condition", header: "Rules / Conditions" },
  { accessorKey: "customerCount", header: "Customer Count" },
];

const createSegmentSchema = z.object({
  name: z.string().min(2, "Name is required"),
  type: z.string(),
});

export default function CustomerSegmentsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createSegmentSchema>>({
    resolver: zodResolver(createSegmentSchema),
    defaultValues: { name: "", type: "Dynamic Segment" },
  });

  const onSubmit = (values: z.infer<typeof createSegmentSchema>) => {
    console.log("Creating segment:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Segments & Groups" 
        text="Organize customers into static groups or dynamic segments based on rules."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Segment
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Create Segment</SheetTitle>
            <SheetDescription>Define rules to automatically group customers.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Segment Name" inputProps={{ placeholder: "e.g. VIP Customers" }} />
                
                <Card className="bg-muted/30">
                  <CardContent className="pt-6 space-y-4">
                    <p className="text-sm font-medium">Rules</p>
                    <Button variant="outline" type="button" className="w-full border-dashed">
                      <FilterIcon className="mr-2 h-4 w-4" />
                      Add Condition (e.g. Total Spent)
                    </Button>
                  </CardContent>
                </Card>

                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Segment</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
