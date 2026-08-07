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

type SMSTemplate = {
  id: string;
  name: string;
  dltId: string;
  type: "OTP" | "Transactional" | "Marketing";
  status: "Approved" | "Pending";
};

const data: SMSTemplate[] = [
  { id: "1", name: "Login OTP", dltId: "DLT-123456789", type: "OTP", status: "Approved" },
  { id: "2", name: "Order Shipped", dltId: "DLT-987654321", type: "Transactional", status: "Approved" },
  { id: "3", name: "Weekend Promo", dltId: "DLT-555555555", type: "Marketing", status: "Pending" },
];

const columns: ColumnDef<SMSTemplate>[] = [
  { accessorKey: "name", header: "Template Name" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "dltId", header: "DLT Template ID" },
  { 
    accessorKey: "status", 
    header: "DLT Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass = "";
      if (status === 'Approved') colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      else colorClass = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';

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
  type: z.string(),
  dltId: z.string(),
  content: z.string().max(160, "Standard SMS should be under 160 characters"),
});

export default function TemplatesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", type: "Transactional", dltId: "", content: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Template:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="SMS Templates" 
        text="Manage your SMS messages and DLT (Distributed Ledger Technology) registrations."
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
            <SheetTitle>Create SMS Template</SheetTitle>
            <SheetDescription>Configure message content and DLT ID.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Template Name (Internal)" />
                
                <RHFSelect 
                  name="type" 
                  label="Message Type" 
                  options={[
                    { label: "OTP", value: "OTP" },
                    { label: "Transactional", value: "Transactional" },
                    { label: "Marketing", value: "Marketing" },
                  ]} 
                />
                
                <RHFInput name="dltId" label="DLT Template ID (Required in India)" />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Message Content</label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Your OTP is {{otp}}. Valid for 5 minutes."
                    maxLength={160}
                    {...form.register("content")}
                  />
                  <div className="flex justify-between text-[0.8rem] text-muted-foreground">
                    <span>Use {'{{var}}'} for variables.</span>
                    <span>Max 160 characters.</span>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Template</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
