"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  DataTable,
  Badge,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Form,
  RHFInput,
  RHFSelect
} from "@commercex/ui";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";

type Promotion = {
  id: string;
  name: string;
  type: "Coupon Code" | "Automatic Discount" | "Flash Sale" | "BOGO" | "Bundle";
  status: "Active" | "Scheduled" | "Expired";
  usage: number;
};

const data: Promotion[] = [
  { id: "PRM-1", name: "Welcome 10% Off", type: "Coupon Code", status: "Active", usage: 1245 },
  { id: "PRM-2", name: "Buy 1 Get 1 Free Shirts", type: "BOGO", status: "Active", usage: 340 },
  { id: "PRM-3", name: "Black Friday 50% Off", type: "Flash Sale", status: "Scheduled", usage: 0 },
  { id: "PRM-4", name: "Winter Bundle (Jacket + Boots)", type: "Bundle", status: "Active", usage: 89 },
  { id: "PRM-5", name: "Free Shipping over $50", type: "Automatic Discount", status: "Active", usage: 4500 },
];

const columns: ColumnDef<Promotion>[] = [
  { accessorKey: "name", header: "Promotion Name" },
  { 
    accessorKey: "type", 
    header: "Type",
    cell: ({ row }) => <span className="font-medium">{row.getValue("type")}</span>
  },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Active" ? "success" : status === "Scheduled" ? "warning" : "secondary";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
  { accessorKey: "usage", header: "Times Used" },
];

const createPromoSchema = z.object({
  name: z.string().min(2, "Name is required"),
  type: z.string(),
  value: z.string().min(1, "Discount value is required"),
});

export default function PromotionsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createPromoSchema>>({
    resolver: zodResolver(createPromoSchema),
    defaultValues: { name: "", type: "Coupon Code", value: "" },
  });

  const onSubmit = (values: z.infer<typeof createPromoSchema>) => {
    console.log("Creating promotion:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Promotions & Discounts" 
        text="Manage coupon codes, automatic discounts, flash sales, BOGO offers, and product bundles."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Promotion
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Create Promotion</SheetTitle>
            <SheetDescription>Set up a new discount or offer for your customers.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Promotion Name (Internal or Code)" inputProps={{ placeholder: "e.g. SUMMER20" }} />
                <RHFSelect 
                  name="type" 
                  label="Promotion Type" 
                  options={[
                    { label: "Coupon Code", value: "Coupon Code" },
                    { label: "Automatic Discount", value: "Automatic Discount" },
                    { label: "Flash Sale", value: "Flash Sale" },
                    { label: "Buy X Get Y (BOGO)", value: "BOGO" },
                    { label: "Product Bundle", value: "Bundle" },
                  ]} 
                />
                <RHFInput name="value" label="Discount Value (%)" inputProps={{ type: "number", placeholder: "20" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Promotion</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
