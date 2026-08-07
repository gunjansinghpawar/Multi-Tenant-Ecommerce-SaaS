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
  RHFSwitch
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

type ShippingZone = {
  id: string;
  name: string;
  regions: string;
  status: "Active" | "Inactive";
};

const data: ShippingZone[] = [
  { id: "ZONE-1", name: "Domestic (US)", regions: "United States (All 50 states)", status: "Active" },
  { id: "ZONE-2", name: "North America", regions: "Canada, Mexico", status: "Active" },
  { id: "ZONE-3", name: "Europe", regions: "UK, France, Germany, Italy", status: "Inactive" },
];

const columns: ColumnDef<ShippingZone>[] = [
  { accessorKey: "name", header: "Zone Name" },
  { accessorKey: "regions", header: "Regions Covered" },
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
  regions: z.string().min(1, "Regions are required"),
  isActive: z.boolean()
});

export default function ZonesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", regions: "", isActive: true },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Shipping Zone:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Shipping Zones" 
        text="Organize geographic regions to assign shipping rates."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Zone
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Shipping Zone</SheetTitle>
            <SheetDescription>Create a geographic grouping for shipping rates.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Zone Name" inputProps={{ placeholder: "e.g. Domestic (US)" }} />
                
                {/* Simplified region selection for demo - usually a multi-select or specialized component */}
                <RHFInput name="regions" label="Included Regions (comma separated)" inputProps={{ placeholder: "e.g. United States, Canada" }} />
                
                <div className="pt-2">
                  <RHFSwitch name="isActive" label="Zone Active" description="Enable this zone." />
                </div>
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Zone</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
