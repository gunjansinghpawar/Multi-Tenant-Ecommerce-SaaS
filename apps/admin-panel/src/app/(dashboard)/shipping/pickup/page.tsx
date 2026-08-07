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
  RHFSelect
} from "@commercex/ui";
import { PlusIcon, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@commercex/ui";

type PickupLocation = {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  phone: string;
  status: "Active" | "Inactive";
};

const data: PickupLocation[] = [
  { id: "LOC-1", name: "Main Warehouse", address: "123 Ind Area", city: "Mumbai", state: "MH", pincode: "400001", phone: "9876543210", status: "Active" },
  { id: "LOC-2", name: "Store Front", address: "45 Market St", city: "Delhi", state: "DL", pincode: "110001", phone: "9876543211", status: "Active" },
];

const columns: ColumnDef<PickupLocation>[] = [
  { accessorKey: "name", header: "Location Name" },
  { accessorKey: "address", header: "Address" },
  { accessorKey: "city", header: "City" },
  { accessorKey: "pincode", header: "Pincode" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => (
      <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
        row.original.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {row.original.status}
      </div>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  pincode: z.string().min(6, "Pincode is required"),
  phone: z.string().min(10, "Phone is required"),
  status: z.string()
});

export default function PickupLocationsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", address: "", city: "", state: "", pincode: "", phone: "", status: "Active" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Pickup Location:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Pickup Locations" 
        text="Manage your shipping pickup addresses."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Location
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Pickup Location</SheetTitle>
            <SheetDescription>Create a new origin address for shipping.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Location Name" inputProps={{ placeholder: "e.g. Main Warehouse" }} />
                <RHFInput name="address" label="Street Address" />
                <div className="grid grid-cols-2 gap-4">
                  <RHFInput name="city" label="City" />
                  <RHFInput name="state" label="State" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <RHFInput name="pincode" label="Pincode / ZIP" />
                  <RHFInput name="phone" label="Phone Number" />
                </div>
                <RHFSelect 
                  name="status" 
                  label="Status" 
                  options={[
                    { label: "Active", value: "Active" },
                    { label: "Inactive", value: "Inactive" },
                  ]} 
                />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Location</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
