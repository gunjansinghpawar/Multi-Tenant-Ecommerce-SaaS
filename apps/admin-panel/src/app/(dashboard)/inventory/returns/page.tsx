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

type ReturnItem = {
  id: string;
  orderId: string;
  customer: string;
  date: string;
  status: "Pending Inspection" | "Restocked" | "Discarded";
};

const data: ReturnItem[] = [
  { id: "RET-001", orderId: "ORD-9921", customer: "Alice Smith", date: "Oct 16, 2026", status: "Pending Inspection" },
  { id: "RET-002", orderId: "ORD-9804", customer: "Bob Jones", date: "Oct 14, 2026", status: "Restocked" },
  { id: "RET-003", orderId: "ORD-9755", customer: "Charlie Davis", date: "Oct 12, 2026", status: "Discarded" },
];

const columns: ColumnDef<ReturnItem>[] = [
  { accessorKey: "id", header: "Return ID" },
  { accessorKey: "orderId", header: "Order ID" },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "date", header: "Return Date" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Restocked" ? "success" : status === "Discarded" ? "destructive" : "warning";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
];

const createSchema = z.object({
  orderId: z.string().min(2, "Order ID is required"),
  customer: z.string().min(2, "Customer name is required"),
});

export default function ReturnsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { orderId: "", customer: "" },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    console.log("Logging return:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Returns Processing" 
        text="Manage customer returns and update inventory accordingly."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Log Return
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="orderId" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Log Return</SheetTitle>
            <SheetDescription>Record a new returned item from a customer.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="orderId" label="Original Order ID" inputProps={{ placeholder: "e.g. ORD-1234" }} />
                <RHFInput name="customer" label="Customer Name" inputProps={{ placeholder: "e.g. Jane Doe" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Log Return</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
