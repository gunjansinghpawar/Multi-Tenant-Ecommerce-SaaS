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

type StockAdjustment = {
  id: string;
  productName: string;
  sku: string;
  reason: string;
  quantityChanged: number;
  date: string;
};

const data: StockAdjustment[] = [
  { id: "ADJ-501", productName: "Wireless Earbuds Pro", sku: "WEP-001", reason: "Inventory Count", quantityChanged: -2, date: "Oct 14, 2026" },
  { id: "ADJ-502", productName: "Cotton T-Shirt (M)", sku: "TSH-M-WHT", reason: "Found in warehouse", quantityChanged: +5, date: "Oct 12, 2026" },
  { id: "ADJ-503", productName: "Ceramic Mug", sku: "MUG-CER-01", reason: "Breakage", quantityChanged: -1, date: "Oct 10, 2026" },
];

const columns: ColumnDef<StockAdjustment>[] = [
  { accessorKey: "id", header: "Adjustment ID" },
  { accessorKey: "productName", header: "Product" },
  { accessorKey: "sku", header: "SKU" },
  { accessorKey: "reason", header: "Reason" },
  { 
    accessorKey: "quantityChanged", 
    header: "Qty Changed",
    cell: ({ row }) => {
      const qty = row.getValue("quantityChanged") as number;
      const isPositive = qty > 0;
      return (
        <span className={`font-medium ${isPositive ? "text-emerald-500" : "text-destructive"}`}>
          {isPositive ? "+" : ""}{qty}
        </span>
      );
    }
  },
  { accessorKey: "date", header: "Date" },
];

const createSchema = z.object({
  sku: z.string().min(2, "SKU is required"),
  reason: z.string().min(2, "Reason is required"),
  quantity: z.coerce.number(),
});

export default function StockAdjustmentsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { sku: "", reason: "", quantity: 0 },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    console.log("Creating adjustment:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Stock Adjustments" 
        text="Record manual changes to inventory levels (e.g., shrinkage, found stock, cycle counts)."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          New Adjustment
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="productName" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>New Adjustment</SheetTitle>
            <SheetDescription>Manually increase or decrease stock levels.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="sku" label="Product SKU" inputProps={{ placeholder: "e.g. WEP-001" }} />
                <RHFInput name="quantity" label="Quantity Change (use - for reduction)" inputProps={{ type: "number" }} />
                <RHFInput name="reason" label="Reason" inputProps={{ placeholder: "e.g. Inventory count discrepancy" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Adjustment</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
