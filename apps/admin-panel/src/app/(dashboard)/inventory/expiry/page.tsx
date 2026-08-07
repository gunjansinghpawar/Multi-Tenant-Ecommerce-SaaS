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

type ExpiryItem = {
  id: string;
  productName: string;
  batchNumber: string;
  quantity: number;
  expiryDate: string;
  status: "Safe" | "Expiring Soon" | "Expired";
};

const data: ExpiryItem[] = [
  { id: "EXP-001", productName: "Organic Coffee Beans", batchNumber: "B-8821", quantity: 150, expiryDate: "Nov 15, 2026", status: "Expiring Soon" },
  { id: "EXP-002", productName: "Vitamin C Gummies", batchNumber: "B-9004", quantity: 300, expiryDate: "Dec 01, 2027", status: "Safe" },
  { id: "EXP-003", productName: "Almond Milk 1L", batchNumber: "B-7755", quantity: 20, expiryDate: "Oct 10, 2026", status: "Expired" },
];

const columns: ColumnDef<ExpiryItem>[] = [
  { accessorKey: "productName", header: "Product" },
  { accessorKey: "batchNumber", header: "Batch Number" },
  { accessorKey: "quantity", header: "Qty" },
  { accessorKey: "expiryDate", header: "Expiry Date" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Expired" ? "destructive" : status === "Expiring Soon" ? "warning" : "success";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
];

const createSchema = z.object({
  productName: z.string().min(2, "Product name is required"),
  batchNumber: z.string().min(2, "Batch number is required"),
  expiryDate: z.string().min(2, "Expiry date is required"),
});

export default function ExpiryPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { productName: "", batchNumber: "", expiryDate: "" },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    console.log("Adding expiry item:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Expiry Tracking" 
        text="Monitor perishable goods and items with expiration dates."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Item
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="productName" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add Perishable Item</SheetTitle>
            <SheetDescription>Track a new batch of items with an expiry date.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="productName" label="Product Name" inputProps={{ placeholder: "e.g. Organic Coffee" }} />
                <RHFInput name="batchNumber" label="Batch Number" inputProps={{ placeholder: "e.g. B-1234" }} />
                <RHFInput name="expiryDate" label="Expiry Date" inputProps={{ type: "date" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Track Expiry</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
