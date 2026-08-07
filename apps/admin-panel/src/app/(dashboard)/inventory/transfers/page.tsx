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
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";

type StockTransfer = {
  id: string;
  reference: string;
  fromLocation: string;
  toLocation: string;
  date: string;
  status: "Pending" | "In Transit" | "Completed" | "Cancelled";
};

const data: StockTransfer[] = [
  { id: "TRF-1001", reference: "Restock LA", fromLocation: "Main Fulfillment Center", toLocation: "West Coast Hub", date: "Oct 12, 2026", status: "In Transit" },
  { id: "TRF-1002", reference: "Winter Overflow", fromLocation: "West Coast Hub", toLocation: "Overflow Storage", date: "Oct 10, 2026", status: "Completed" },
  { id: "TRF-1003", reference: "Urgent Parts", fromLocation: "Main Fulfillment Center", toLocation: "Store #4", date: "Oct 15, 2026", status: "Pending" },
];

const columns: ColumnDef<StockTransfer>[] = [
  { accessorKey: "id", header: "Transfer ID" },
  { accessorKey: "reference", header: "Reference" },
  { accessorKey: "fromLocation", header: "Origin" },
  { accessorKey: "toLocation", header: "Destination" },
  { accessorKey: "date", header: "Date" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Completed" ? "success" : status === "In Transit" ? "warning" : status === "Cancelled" ? "destructive" : "secondary";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
];

const createSchema = z.object({
  reference: z.string().min(2, "Reference is required"),
  fromLocation: z.string().min(2, "Origin is required"),
  toLocation: z.string().min(2, "Destination is required"),
});

export default function StockTransfersPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { reference: "", fromLocation: "", toLocation: "" },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    console.log("Creating transfer:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Stock Transfers" 
        text="Move inventory between different warehouses or store locations."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Transfer
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="reference" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Initiate Transfer</SheetTitle>
            <SheetDescription>Create a new stock transfer request.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="reference" label="Reference / Reason" inputProps={{ placeholder: "e.g. Holiday Restock" }} />
                <RHFInput name="fromLocation" label="Origin Location" inputProps={{ placeholder: "e.g. Warehouse A" }} />
                <RHFInput name="toLocation" label="Destination Location" inputProps={{ placeholder: "e.g. Retail Store B" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Create Transfer</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
