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
  RHFSelect,
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

type ShippingRate = {
  id: string;
  name: string;
  zone: string;
  condition: string;
  price: string;
  status: "Active" | "Inactive";
};

const data: ShippingRate[] = [
  { id: "RATE-1", name: "Standard Delivery", zone: "Domestic (US)", condition: "0kg - 5kg", price: "$5.00", status: "Active" },
  { id: "RATE-2", name: "Express Delivery", zone: "Domestic (US)", condition: "0kg - 5kg", price: "$15.00", status: "Active" },
  { id: "RATE-3", name: "International Standard", zone: "Europe", condition: "0kg - 2kg", price: "$25.00", status: "Inactive" },
];

const columns: ColumnDef<ShippingRate>[] = [
  { accessorKey: "name", header: "Rate Name" },
  { accessorKey: "zone", header: "Zone" },
  { accessorKey: "condition", header: "Condition (Weight/Price)" },
  { accessorKey: "price", header: "Price" },
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
  zoneId: z.string().min(1, "Zone is required"),
  price: z.string().min(1, "Price is required"),
  conditionType: z.string(),
  minVal: z.string(),
  maxVal: z.string(),
  isActive: z.boolean()
});

export default function RatesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", zoneId: "domestic_us", price: "", conditionType: "weight", minVal: "0", maxVal: "", isActive: true },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Shipping Rate:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Shipping Rates" 
        text="Define shipping costs for zones based on weight or order total."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Rate
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Shipping Rate</SheetTitle>
            <SheetDescription>Configure the cost and conditions for a new shipping rate.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Rate Name" inputProps={{ placeholder: "e.g. Standard Delivery" }} />
                <RHFSelect 
                  name="zoneId" 
                  label="Shipping Zone" 
                  options={[
                    { label: "Domestic (US)", value: "domestic_us" },
                    { label: "North America", value: "north_america" },
                    { label: "Europe", value: "europe" },
                  ]} 
                />
                <RHFInput name="price" label="Rate Price ($)" inputProps={{ type: "number", step: "0.01", placeholder: "0.00" }} />
                
                <div className="p-4 bg-muted/50 rounded-lg space-y-4 mt-2">
                  <h4 className="text-sm font-semibold">Conditions</h4>
                  <RHFSelect 
                    name="conditionType" 
                    label="Based On" 
                    options={[
                      { label: "Weight (kg)", value: "weight" },
                      { label: "Order Price ($)", value: "price" },
                    ]} 
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <RHFInput name="minVal" label="Min Value" inputProps={{ type: "number" }} />
                    <RHFInput name="maxVal" label="Max Value (No limit if empty)" inputProps={{ type: "number" }} />
                  </div>
                </div>

                <div className="pt-2">
                  <RHFSwitch name="isActive" label="Rate Active" description="Enable this rate." />
                </div>
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Rate</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
