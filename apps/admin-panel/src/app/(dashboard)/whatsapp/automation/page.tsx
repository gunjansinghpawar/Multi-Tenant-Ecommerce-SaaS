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

type AutoRule = {
  id: string;
  name: string;
  trigger: string;
  template: string;
  status: "Active" | "Inactive";
};

const data: AutoRule[] = [
  { id: "1", name: "Abandoned Cart Recovery", trigger: "Cart Abandoned > 2h", template: "abandoned_cart_reminder", status: "Active" },
  { id: "2", name: "Welcome Message", trigger: "New Customer Registration", template: "welcome_onboard_v1", status: "Inactive" },
];

const columns: ColumnDef<AutoRule>[] = [
  { accessorKey: "name", header: "Automation Name" },
  { accessorKey: "trigger", header: "Trigger Event" },
  { accessorKey: "template", header: "Template Sent" },
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
  name: z.string().min(2),
  triggerEvent: z.string(),
  templateId: z.string(),
  delay: z.string(),
  isActive: z.boolean()
});

export default function AutomationRulesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", triggerEvent: "cart_abandoned", templateId: "", delay: "2", isActive: true },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Rule:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Automation Rules" 
        text="Set up custom triggers for automated WhatsApp messaging."
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
            <SheetTitle>Create Automation</SheetTitle>
            <SheetDescription>Define a trigger and the message to send.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Rule Name" />
                <RHFSelect 
                  name="triggerEvent" 
                  label="Trigger Event" 
                  options={[
                    { label: "Cart Abandoned", value: "cart_abandoned" },
                    { label: "New Customer Signup", value: "new_signup" },
                    { label: "Product Back in Stock", value: "back_in_stock" },
                  ]} 
                />
                
                <RHFInput name="delay" label="Delay before sending (Hours)" inputProps={{ type: "number" }} />
                
                <RHFSelect 
                  name="templateId" 
                  label="Message Template to Send" 
                  options={[
                    { label: "abandoned_cart_reminder", value: "abandoned_cart_reminder" },
                    { label: "welcome_onboard_v1", value: "welcome_onboard_v1" },
                  ]} 
                />
                
                <div className="pt-2">
                  <RHFSwitch name="isActive" label="Active" description="Enable this automation." />
                </div>
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Rule</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
