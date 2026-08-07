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
import { EntityRowActions, EntityBulkActions } from "../../../../components/ui/entity-actions";

type PurchaseOrder = {
  id: string;
  supplier: string;
  date: string;
  total: string;
  status: "Draft" | "Sent" | "Partially Received" | "Received";
};

const data: PurchaseOrder[] = [
  { id: "PO-2001", supplier: "Global Electronics Ltd", date: "Oct 15, 2026", total: "$12,450.00", status: "Sent" },
  { id: "PO-2002", supplier: "Acme Packaging", date: "Oct 10, 2026", total: "$1,200.00", status: "Received" },
  { id: "PO-2003", supplier: "Prime Textiles", date: "Oct 16, 2026", total: "$5,400.00", status: "Draft" },
];

const columns: ColumnDef<PurchaseOrder>[] = [
  { accessorKey: "id", header: "PO Number" },
  { accessorKey: "supplier", header: "Supplier" },
  { accessorKey: "date", header: "Order Date" },
  { accessorKey: "total", header: "Total Amount" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Received" ? "success" : status === "Sent" ? "warning" : "secondary";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <EntityRowActions id={row.original.id} entityName="Purchase Order" />
    )
  }
];

const createSchema = z.object({
  supplier: z.string().min(2, "Supplier is required"),
  date: z.string().min(2, "Date is required"),
  total: z.string().min(1, "Total is required"),
});

export default function PurchaseOrdersPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { supplier: "", date: "", total: "" },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    console.log("Creating PO:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Purchase Orders" 
        text="Manage orders sent to your suppliers for restocking inventory."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create PO
        </Button>
      </PageHeader>
      <div className="bg-white dark:bg-slate-900 border rounded-lg p-6 shadow-sm">
        <EntityBulkActions selectedCount={1} />
        <DataTable columns={columns} data={data} searchKey="supplier" />
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Create Purchase Order</SheetTitle>
            <SheetDescription>Start a new purchase order draft.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="supplier" label="Supplier" inputProps={{ placeholder: "e.g. Acme Corp" }} />
                <RHFInput name="date" label="Order Date" inputProps={{ type: "date" }} />
                <RHFInput name="total" label="Estimated Total" inputProps={{ placeholder: "e.g. $1,000.00" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Draft</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
