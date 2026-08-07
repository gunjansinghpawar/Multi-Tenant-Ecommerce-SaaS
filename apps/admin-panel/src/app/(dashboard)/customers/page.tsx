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
import { PlusIcon, UploadIcon, DownloadIcon, TagsIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { EntityRowActions, EntityBulkActions } from "../../../components/ui/entity-actions";

type Customer = {
  id: string;
  name: string;
  email: string;
  orders: number;
  totalSpent: string;
  tags: string[];
};

const data: Customer[] = [
  { id: "CUS-001", name: "Alice Smith", email: "alice@example.com", orders: 5, totalSpent: "$450.00", tags: ["VIP", "Newsletter"] },
  { id: "CUS-002", name: "Bob Jones", email: "bob@example.com", orders: 1, totalSpent: "$45.50", tags: ["New"] },
  { id: "CUS-003", name: "Charlie Brown", email: "charlie@example.com", orders: 12, totalSpent: "$1,250.00", tags: ["VIP", "Wholesale"] },
];

const columns: ColumnDef<Customer>[] = [
  { 
    accessorKey: "name", 
    header: "Customer Name",
    cell: ({ row }) => (
      <Link href={`/customers/${row.original.id}`} className="font-medium text-primary hover:underline">
        {row.getValue("name")}
      </Link>
    )
  },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "orders", header: "Orders" },
  { accessorKey: "totalSpent", header: "Total Spent" },
  { 
    accessorKey: "tags", 
    header: "Tags",
    cell: ({ row }) => {
      const tags = row.getValue("tags") as string[];
      return (
        <div className="flex gap-1 flex-wrap">
          {tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-[10px]">{tag}</Badge>
          ))}
        </div>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <EntityRowActions id={row.original.id} entityName="Customer" />
    )
  }
];

const createCustomerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
});

export default function AdminCustomersPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createCustomerSchema>>({
    resolver: zodResolver(createCustomerSchema),
    defaultValues: { name: "", email: "" },
  });

  const onSubmit = (values: z.infer<typeof createCustomerSchema>) => {
    console.log("Creating customer:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="All Customers" 
        text="Manage your customer base, profiles, and order history."
      >
        <div className="flex space-x-2">
          <Button variant="outline">
            <UploadIcon className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={() => setIsSheetOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>
      </PageHeader>

      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm"><TagsIcon className="mr-2 h-3 w-3" /> Filter by Tags</Button>
      </div>

      <div className="bg-white dark:bg-slate-900 border rounded-lg p-6 shadow-sm">
        <EntityBulkActions selectedCount={1} />
        <DataTable columns={columns} data={data} searchKey="name" />
      </div>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add Customer</SheetTitle>
            <SheetDescription>Manually add a customer profile to your store.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Full Name" inputProps={{ placeholder: "e.g. John Doe" }} />
                <RHFInput name="email" label="Email Address" inputProps={{ type: "email", placeholder: "john@example.com" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Customer</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
