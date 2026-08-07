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

type DamagedStock = {
  id: string;
  sku: string;
  productName: string;
  quantity: number;
  dateReported: string;
  resolution: "Pending" | "Written Off" | "Returned to Supplier";
};

const data: DamagedStock[] = [
  { id: "DMG-001", sku: "MUG-CER-01", productName: "Ceramic Mug", quantity: 5, dateReported: "Oct 16, 2026", resolution: "Pending" },
  { id: "DMG-002", sku: "LAP-MAC-14", productName: "MacBook Pro 14", quantity: 1, dateReported: "Oct 12, 2026", resolution: "Returned to Supplier" },
  { id: "DMG-003", sku: "TSH-M-WHT", productName: "Cotton T-Shirt (M)", quantity: 2, dateReported: "Oct 05, 2026", resolution: "Written Off" },
];

const columns: ColumnDef<DamagedStock>[] = [
  { accessorKey: "id", header: "Report ID" },
  { accessorKey: "productName", header: "Product" },
  { accessorKey: "sku", header: "SKU" },
  { accessorKey: "quantity", header: "Quantity" },
  { accessorKey: "dateReported", header: "Date Reported" },
  { 
    accessorKey: "resolution", 
    header: "Resolution",
    cell: ({ row }) => {
      const status = row.getValue("resolution") as string;
      const variant = status === "Written Off" ? "destructive" : status === "Returned to Supplier" ? "success" : "warning";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
];

const createSchema = z.object({
  sku: z.string().min(2, "SKU is required"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
});

export default function DamagedStockPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { sku: "", quantity: 1 },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    console.log("Reporting damage:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Damaged Stock" 
        text="Track items damaged in transit or in the warehouse."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Report Damage
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="productName" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Report Damaged Stock</SheetTitle>
            <SheetDescription>Record items that are no longer sellable due to damage.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="sku" label="Product SKU" inputProps={{ placeholder: "e.g. WEP-001" }} />
                <RHFInput name="quantity" label="Quantity Damaged" inputProps={{ type: "number" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Report Damage</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
