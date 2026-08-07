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

type Template = {
  id: string;
  name: string;
  category: string;
  language: string;
  status: "APPROVED" | "PENDING" | "REJECTED";
};

const data: Template[] = [
  { id: "1", name: "order_confirmation", category: "UTILITY", language: "en_US", status: "APPROVED" },
  { id: "2", name: "shipping_update", category: "UTILITY", language: "en_US", status: "APPROVED" },
  { id: "3", name: "summer_sale_promo", category: "MARKETING", language: "en_US", status: "PENDING" },
];

const columns: ColumnDef<Template>[] = [
  { accessorKey: "name", header: "Template Name" },
  { accessorKey: "category", header: "Category" },
  { accessorKey: "language", header: "Language" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass = "";
      if (status === 'APPROVED') colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      else if (status === 'PENDING') colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      else colorClass = 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';

      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${colorClass}`}>
          {status}
        </div>
      );
    }
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
  name: z.string().min(2),
  category: z.string(),
  language: z.string(),
  body: z.string().min(5),
});

export default function TemplatesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", category: "UTILITY", language: "en_US", body: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Template:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Message Templates" 
        text="Manage approved WhatsApp templates for outbound messaging."
      >
        <Button variant="outline" className="mr-2">Sync Templates</Button>
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create Template</SheetTitle>
            <SheetDescription>Submit a new template for Meta's approval.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Template Name" inputProps={{ placeholder: "e.g. order_update_v1" }} />
                
                <div className="grid grid-cols-2 gap-4">
                  <RHFSelect 
                    name="category" 
                    label="Category" 
                    options={[
                      { label: "Utility", value: "UTILITY" },
                      { label: "Marketing", value: "MARKETING" },
                      { label: "Authentication", value: "AUTHENTICATION" },
                    ]} 
                  />
                  <RHFSelect 
                    name="language" 
                    label="Language" 
                    options={[
                      { label: "English (US)", value: "en_US" },
                      { label: "English (UK)", value: "en_GB" },
                      { label: "Spanish", value: "es_ES" },
                    ]} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message Body</label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Hi {{1}}, your order {{2}} has been shipped."
                    {...form.register("body")}
                  />
                  <p className="text-[0.8rem] text-muted-foreground">Use {'{{1}}'}, {'{{2}}'} for variables.</p>
                </div>
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Submit to Meta</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
