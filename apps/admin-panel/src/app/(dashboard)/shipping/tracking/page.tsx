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
import { SearchIcon, MoreHorizontal, Eye, Edit } from "lucide-react";
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

type TrackingRecord = {
  orderId: string;
  awb: string;
  provider: string;
  status: "In Transit" | "Delivered" | "Pending" | "Exception";
  eta: string;
};

const data: TrackingRecord[] = [
  { orderId: "#ORD-001", awb: "AWB987654321", provider: "Delhivery", status: "In Transit", eta: "Oct 12, 2026" },
  { orderId: "#ORD-002", awb: "AWB123456789", provider: "Shiprocket", status: "Delivered", eta: "Oct 10, 2026" },
  { orderId: "#ORD-003", awb: "AWB555444333", provider: "Blue Dart", status: "Exception", eta: "Unknown" },
];

const columns: ColumnDef<TrackingRecord>[] = [
  { accessorKey: "orderId", header: "Order ID" },
  { accessorKey: "awb", header: "AWB Number" },
  { accessorKey: "provider", header: "Provider" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass = "";
      if (status === 'Delivered') colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      else if (status === 'In Transit') colorClass = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      else if (status === 'Exception') colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      else colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';

      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${colorClass}`}>
          {status}
        </div>
      );
    }
  },
  { accessorKey: "eta", header: "ETA" },
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
              <Eye className="mr-2 h-4 w-4" /> View Details
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Update Status
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

const formSchema = z.object({
  awb: z.string().min(5, "AWB is required"),
  status: z.string(),
  notes: z.string()
});

export default function TrackingPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { awb: "", status: "In Transit", notes: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Updating Tracking:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Shipment Tracking" 
        text="Monitor order shipments and update statuses."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <Edit className="mr-2 h-4 w-4" />
          Manual Update
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="awb" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Manual Tracking Update</SheetTitle>
            <SheetDescription>Manually update the status of an AWB.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="awb" label="AWB Number" />
                <RHFSelect 
                  name="status" 
                  label="New Status" 
                  options={[
                    { label: "Pending", value: "Pending" },
                    { label: "In Transit", value: "In Transit" },
                    { label: "Out for Delivery", value: "Out for Delivery" },
                    { label: "Delivered", value: "Delivered" },
                    { label: "Exception", value: "Exception" },
                  ]} 
                />
                <RHFInput name="notes" label="Notes" inputProps={{ placeholder: "Optional update notes..." }} />
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Update Status</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
