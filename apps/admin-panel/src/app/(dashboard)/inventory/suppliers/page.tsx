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
  RHFInput
} from "@commercex/ui";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";

type Supplier = {
  id: string;
  name: string;
  contactName: string;
  email: string;
  leadTime: string;
};

const data: Supplier[] = [
  { id: "SUP-001", name: "Global Electronics Ltd", contactName: "Sarah Connor", email: "sarah@globalelec.com", leadTime: "14 days" },
  { id: "SUP-002", name: "Acme Packaging", contactName: "Wile E. Coyote", email: "orders@acme.com", leadTime: "3 days" },
  { id: "SUP-003", name: "Prime Textiles", contactName: "John Smith", email: "john@primetextiles.com", leadTime: "21 days" },
];

const columns: ColumnDef<Supplier>[] = [
  { accessorKey: "name", header: "Supplier Name" },
  { accessorKey: "contactName", header: "Contact Person" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "leadTime", header: "Avg. Lead Time" },
];

const createSchema = z.object({
  name: z.string().min(2, "Name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Valid email required"),
  leadTime: z.string(),
});

export default function SuppliersPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: "", contactName: "", email: "", leadTime: "" },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    console.log("Creating supplier:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Suppliers" 
        text="Manage your vendors, manufacturers, and packaging suppliers."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add Supplier</SheetTitle>
            <SheetDescription>Register a new supplier profile.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Company Name" inputProps={{ placeholder: "e.g. Alpha Manufacturing" }} />
                <RHFInput name="contactName" label="Contact Person" inputProps={{ placeholder: "e.g. Jane Doe" }} />
                <RHFInput name="email" label="Email Address" inputProps={{ type: "email", placeholder: "contact@alpha.com" }} />
                <RHFInput name="leadTime" label="Average Lead Time" inputProps={{ placeholder: "e.g. 10 days" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Supplier</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
