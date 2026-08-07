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
  Badge
} from "@commercex/ui";
import { PlusIcon, DownloadIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";

type Report = {
  id: string;
  name: string;
  type: string;
  dateGenerated: string;
  status: "Ready" | "Generating";
};

const data: Report[] = [
  { id: "RPT-110", name: "Q3 Inventory Valuation", type: "Valuation", dateGenerated: "Oct 01, 2026", status: "Ready" },
  { id: "RPT-111", name: "Weekly Stock Movement", type: "Movement", dateGenerated: "Oct 18, 2026", status: "Generating" },
  { id: "RPT-112", name: "Supplier Performance YTD", type: "Supplier", dateGenerated: "Oct 15, 2026", status: "Ready" },
];

const columns: ColumnDef<Report>[] = [
  { accessorKey: "name", header: "Report Name" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "dateGenerated", header: "Generated On" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Ready" ? "success" : "secondary";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Button variant="ghost" size="icon" disabled={status !== "Ready"}>
          <DownloadIcon className="h-4 w-4" />
        </Button>
      );
    }
  }
];

const createSchema = z.object({
  name: z.string().min(2, "Name is required"),
  type: z.string(),
});

export default function ReportsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: "", type: "Valuation" },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    console.log("Generating report:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Inventory Reports" 
        text="Generate and download historical data and valuation reports."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Generate Report</SheetTitle>
            <SheetDescription>Configure parameters for a new inventory report.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Report Name" inputProps={{ placeholder: "e.g. November Movement" }} />
                {/* Note: In a real app, use a Select component for type */}
                <RHFInput name="type" label="Report Type" inputProps={{ placeholder: "e.g. Valuation, Movement" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Generate</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
