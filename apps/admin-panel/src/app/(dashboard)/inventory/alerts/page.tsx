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
import { SettingsIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";

type Alert = {
  id: string;
  productName: string;
  sku: string;
  currentStock: number;
  threshold: number;
  status: "Critical" | "Warning";
};

const data: Alert[] = [
  { id: "ALT-01", productName: "Wireless Earbuds Pro", sku: "WEP-001", currentStock: 2, threshold: 15, status: "Critical" },
  { id: "ALT-02", productName: "USB-C Cable 2m", sku: "USBC-2M", currentStock: 12, threshold: 20, status: "Warning" },
];

const columns: ColumnDef<Alert>[] = [
  { accessorKey: "productName", header: "Product" },
  { accessorKey: "sku", header: "SKU" },
  { 
    accessorKey: "currentStock", 
    header: "Current Stock",
    cell: ({ row }) => {
      const stock = row.getValue("currentStock") as number;
      return <span className="font-bold text-destructive">{stock}</span>;
    }
  },
  { accessorKey: "threshold", header: "Alert Threshold" },
  { 
    accessorKey: "status", 
    header: "Severity",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Critical" ? "destructive" : "warning";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
];

const settingsSchema = z.object({
  globalThreshold: z.coerce.number(),
  notifyEmail: z.string().email(),
});

export default function AlertsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof settingsSchema>>({
    resolver: zodResolver(settingsSchema),
    defaultValues: { globalThreshold: 10, notifyEmail: "admin@store.com" },
  });

  const onSubmit = (values: z.infer<typeof settingsSchema>) => {
    console.log("Updating alert settings:", values);
    setIsSheetOpen(false);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Low Stock Alerts" 
        text="View items that are running low and configure alert thresholds."
      >
        <Button onClick={() => setIsSheetOpen(true)} variant="outline">
          <SettingsIcon className="mr-2 h-4 w-4" />
          Alert Settings
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="productName" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Alert Settings</SheetTitle>
            <SheetDescription>Configure global low stock rules.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="globalThreshold" label="Global Low Stock Threshold" inputProps={{ type: "number" }} />
                <RHFInput name="notifyEmail" label="Notification Email" inputProps={{ type: "email" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Settings</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
