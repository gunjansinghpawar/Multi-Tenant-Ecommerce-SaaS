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

type Warehouse = {
  id: string;
  name: string;
  location: string;
  capacity: string;
  status: "Active" | "Inactive";
};

const data: Warehouse[] = [
  { id: "WH-001", name: "Main Fulfillment Center", location: "New York, NY", capacity: "100,000 sq ft", status: "Active" },
  { id: "WH-002", name: "West Coast Hub", location: "Los Angeles, CA", capacity: "50,000 sq ft", status: "Active" },
  { id: "WH-003", name: "Overflow Storage", location: "Newark, NJ", capacity: "20,000 sq ft", status: "Inactive" },
];

const columns: ColumnDef<Warehouse>[] = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "location", header: "Location" },
  { accessorKey: "capacity", header: "Capacity" },
  { accessorKey: "status", header: "Status" },
];

const createSchema = z.object({
  name: z.string().min(2, "Name is required"),
  location: z.string().min(2, "Location is required"),
  capacity: z.string().min(1, "Capacity is required"),
});

export default function WarehousesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: "", location: "", capacity: "" },
  });

  const onSubmit = (values: z.infer<typeof createSchema>) => {
    console.log("Creating warehouse:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Warehouses" 
        text="Manage your physical storage locations and fulfillment centers."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Warehouse
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Add Warehouse</SheetTitle>
            <SheetDescription>Register a new physical storage location.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Warehouse Name" inputProps={{ placeholder: "e.g. Dallas Distribution Center" }} />
                <RHFInput name="location" label="Location/Address" inputProps={{ placeholder: "e.g. 123 Storage Lane, TX" }} />
                <RHFInput name="capacity" label="Capacity" inputProps={{ placeholder: "e.g. 75,000 sq ft" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Warehouse</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
