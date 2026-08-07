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

type Batch = {
  id: string;
  batchNumber: string;
  productName: string;
  manufactureDate: string;
  status: "Active" | "Recalled" | "Depleted";
};

const data: Batch[] = [
  { id: "BCH-100", batchNumber: "LOT-A123", productName: "Widget Alpha", manufactureDate: "Sep 01, 2026", status: "Active" },
  { id: "BCH-101", batchNumber: "LOT-B456", productName: "Widget Beta", manufactureDate: "Aug 15, 2026", status: "Depleted" },
  { id: "BCH-102", batchNumber: "LOT-C789", productName: "Widget Gamma", manufactureDate: "Oct 10, 2026", status: "Recalled" },
];

const columns: ColumnDef<Batch>[] = [
  { accessorKey: "batchNumber", header: "Batch Number" },
  { accessorKey: "productName", header: "Product" },
  { accessorKey: "manufactureDate", header: "Manufacture Date" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Active" ? "success" : status === "Recalled" ? "destructive" : "secondary";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
];

const createSchema = z.object({
  batchNumber: z.string().min(2, "Batch number is required"),
  productName: z.string().min(2, "Product name is required"),
  manufactureDate: z.string().min(2, "Date is required"),
});

export default function BatchTrackingPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { batchNumber: "", productName: "", manufactureDate: "" },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    console.log("Creating batch:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Batch Tracking" 
        text="Track production batches, lots, and manage recalls if necessary."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Register Batch
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="batchNumber" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Register Batch</SheetTitle>
            <SheetDescription>Record a new production lot or incoming batch.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="batchNumber" label="Batch / Lot Number" inputProps={{ placeholder: "e.g. LOT-X999" }} />
                <RHFInput name="productName" label="Product Name" inputProps={{ placeholder: "e.g. Widget Delta" }} />
                <RHFInput name="manufactureDate" label="Manufacture Date" inputProps={{ type: "date" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Register Batch</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
