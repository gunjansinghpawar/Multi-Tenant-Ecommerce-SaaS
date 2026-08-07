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
import { PlusIcon, DownloadIcon, UploadIcon, MoreHorizontal, Copy, Edit, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger 
} from "@commercex/ui";
import { EntityRowActions, EntityBulkActions } from "../../../components/ui/entity-actions";
import { useGlobalDialogs } from "../../../components/providers/global-dialog-provider";

type Product = {
  id: string;
  name: string;
  price: string;
  inventory: number;
  status: "Active" | "Draft" | "Archived";
};

const data: Product[] = [
  { id: "PROD-1", name: "Premium SaaS Template", price: "$49.00", inventory: 999, status: "Active" },
  { id: "PROD-2", name: "UI Kit Professional", price: "$129.00", inventory: 450, status: "Active" },
  { id: "PROD-3", name: "E-Commerce Plugin", price: "$29.00", inventory: 0, status: "Draft" },
];

const columns: ColumnDef<Product>[] = [
  { accessorKey: "name", header: "Product Name" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "inventory", header: "Inventory" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => (
      <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
        row.original.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        row.original.status === 'Draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200' :
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}>
        {row.original.status}
      </div>
    )
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <EntityRowActions id={product.id} entityName="Product" />
      );
    }
  }
];

const createProductSchema = z.object({
  name: z.string().min(2, "Name is required"),
  price: z.string().min(1, "Price is required"),
  inventory: z.string(),
  status: z.string()
});

export default function AdminProductsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { openImportWizard, openMediaPicker, openKeyboardShortcuts } = useGlobalDialogs();

  const form = useForm<z.infer<typeof createProductSchema>>({
    resolver: zodResolver(createProductSchema),
    defaultValues: { name: "", price: "", inventory: "0", status: "Draft" },
  });

  const onSubmit = (values: z.infer<typeof createProductSchema>) => {
    console.log("Creating product:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="All Products" 
        text="Manage your product catalog, pricing, and inventory."
      >
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => openKeyboardShortcuts()}>
            Shortcuts
          </Button>
          <Button variant="outline" onClick={() => openMediaPicker((url) => console.log(url))}>
            Media Library
          </Button>
          <Button variant="outline" onClick={() => openImportWizard("Products")}>
            <UploadIcon className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button asChild>
            <Link href="/products/create">
              <PlusIcon className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </PageHeader>

      <Card>
        <CardContent>
          {/* Note: In a real app with row selection, you'd pass the actual selectedCount here */}
          <EntityBulkActions selectedCount={1} />
          <DataTable columns={columns} data={data} searchKey="name" />
        </CardContent>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Product</SheetTitle>
            <SheetDescription>Create a new product in your catalog.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Product Name" inputProps={{ placeholder: "e.g. T-Shirt" }} />
                <RHFInput name="price" label="Price" inputProps={{ type: "number", step: "0.01", placeholder: "0.00" }} />
                <RHFInput name="inventory" label="Inventory Count" inputProps={{ type: "number", placeholder: "0" }} />
                <RHFSelect 
                  name="status" 
                  label="Status" 
                  options={[
                    { label: "Active", value: "Active" },
                    { label: "Draft", value: "Draft" },
                    { label: "Archived", value: "Archived" },
                  ]} 
                />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Product</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
