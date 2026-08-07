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

type Automation = {
  id: string;
  name: string;
  trigger: string;
  status: "Active" | "Inactive";
};

const data: Automation[] = [
  { id: "1", name: "Abandoned Cart Flow (3 Steps)", trigger: "Cart Abandoned", status: "Active" },
  { id: "2", name: "Welcome Series", trigger: "Newsletter Signup", status: "Active" },
  { id: "3", name: "Win-back Flow", trigger: "No purchase in 90 days", status: "Inactive" },
];

const columns: ColumnDef<Automation>[] = [
  { accessorKey: "name", header: "Automation Name" },
  { accessorKey: "trigger", header: "Trigger Event" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => (
      <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
        row.original.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
        'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
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
              <Edit className="mr-2 h-4 w-4" /> Edit Flow
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
  triggerEvent: z.string(),
  isActive: z.boolean()
});

export default function AutomationPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", triggerEvent: "cart_abandoned", isActive: false },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Automation:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Email Automation" 
        text="Build multi-step email sequences based on customer actions."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Automation
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create Email Automation</SheetTitle>
            <SheetDescription>Set up the trigger for your sequence.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Automation Name" />
                <RHFSelect 
                  name="triggerEvent" 
                  label="Trigger Event" 
                  options={[
                    { label: "Cart Abandoned", value: "cart_abandoned" },
                    { label: "Newsletter Signup", value: "newsletter_signup" },
                    { label: "Purchase Completed", value: "purchase_completed" },
                    { label: "Customer Anniversary", value: "customer_anniversary" },
                  ]} 
                />
                
                <div className="pt-2">
                  <RHFSwitch name="isActive" label="Active" description="Enable this sequence." />
                </div>
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Build Workflow</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
