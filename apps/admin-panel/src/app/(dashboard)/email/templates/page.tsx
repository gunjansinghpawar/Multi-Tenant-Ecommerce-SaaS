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
import { PlusIcon, MoreHorizontal, Edit, Trash2, EyeIcon } from "lucide-react";
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

type EmailTemplate = {
  id: string;
  name: string;
  subject: string;
  type: "Transactional" | "Marketing";
  lastUpdated: string;
};

const data: EmailTemplate[] = [
  { id: "1", name: "Order Confirmation", subject: "Your order {{order_id}} has been received", type: "Transactional", lastUpdated: "2026-07-28" },
  { id: "2", name: "Welcome Email", subject: "Welcome to our store!", type: "Marketing", lastUpdated: "2026-07-29" },
  { id: "3", name: "Password Reset", subject: "Reset your password", type: "Transactional", lastUpdated: "2026-07-30" },
];

const columns: ColumnDef<EmailTemplate>[] = [
  { accessorKey: "name", header: "Template Name" },
  { accessorKey: "subject", header: "Subject Line" },
  { 
    accessorKey: "type", 
    header: "Type",
    cell: ({ row }) => (
      <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
        row.original.type === 'Transactional' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      }`}>
        {row.original.type}
      </div>
    )
  },
  { accessorKey: "lastUpdated", header: "Last Updated" },
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
              <EyeIcon className="mr-2 h-4 w-4" /> Preview
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit className="mr-2 h-4 w-4" /> Edit Design
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
  subject: z.string().min(2),
  type: z.string(),
});

export default function TemplatesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", subject: "", type: "Transactional" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Template Metadata:", values);
    setIsSheetOpen(false);
    form.reset();
    // In a real app, this would route to an email builder.
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Email Templates" 
        text="Manage the designs and content for all your outbound emails."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create Email Template</SheetTitle>
            <SheetDescription>Set up the metadata before designing.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Template Name (Internal)" />
                <RHFInput name="subject" label="Default Subject Line" />
                
                <RHFSelect 
                  name="type" 
                  label="Email Type" 
                  options={[
                    { label: "Transactional (Receipts, Resets)", value: "Transactional" },
                    { label: "Marketing (Newsletters, Promos)", value: "Marketing" },
                  ]} 
                />
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Continue to Builder</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
