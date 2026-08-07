"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  Button,
  DataTable,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Form,
  RHFInput,
  RHFSelect
} from "@commercex/ui";
import { PlusIcon, TicketIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";

type Discount = {
  id: string;
  code: string;
  type: "Percentage" | "Fixed Amount";
  value: string;
  status: "Active" | "Expired" | "Scheduled";
  usage: string;
};

const data: Discount[] = [
  { id: "DIS-1", code: "SUMMER24", type: "Percentage", value: "20%", status: "Active", usage: "154/Unlimited" },
  { id: "DIS-2", code: "WELCOME", type: "Fixed Amount", value: "$10.00", status: "Active", usage: "1,200/Unlimited" },
  { id: "DIS-3", code: "BLACKFRIDAY", type: "Percentage", value: "50%", status: "Expired", usage: "5,000/5000" },
];

const columns: ColumnDef<Discount>[] = [
  { accessorKey: "code", header: "Code" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "value", header: "Value" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => (
      <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
        row.original.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        row.original.status === 'Scheduled' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
      }`}>
        {row.original.status}
      </div>
    )
  },
  { accessorKey: "usage", header: "Usage" },
];

const createDiscountSchema = z.object({
  code: z.string().min(2, "Code is required").toUpperCase(),
  type: z.string(),
  value: z.string().min(1, "Value is required"),
});

export default function AdminDiscountsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createDiscountSchema>>({
    resolver: zodResolver(createDiscountSchema),
    defaultValues: { code: "", type: "Percentage", value: "" },
  });

  const onSubmit = (values: z.infer<typeof createDiscountSchema>) => {
    console.log("Creating discount:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Discounts" 
        text="Manage promotional codes and automatic discounts."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Discount
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="code" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Create Discount</SheetTitle>
            <SheetDescription>Create a new promotional code.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="code" label="Discount Code" inputProps={{ placeholder: "e.g. VIP20" }} />
                <RHFSelect 
                  name="type" 
                  label="Discount Type" 
                  options={[
                    { label: "Percentage (%)", value: "Percentage" },
                    { label: "Fixed Amount ($)", value: "Fixed Amount" },
                  ]} 
                />
                <RHFInput name="value" label="Discount Value" inputProps={{ type: "number", placeholder: "e.g. 20" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Discount</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
