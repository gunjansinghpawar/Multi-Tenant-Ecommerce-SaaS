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

type InteractiveButton = {
  id: string;
  name: string;
  type: "QUICK_REPLY" | "URL" | "PHONE_NUMBER";
  text: string;
  payload: string;
};

const data: InteractiveButton[] = [
  { id: "1", name: "Track Order CTA", type: "URL", text: "Track Order", payload: "https://store.com/track/{{1}}" },
  { id: "2", name: "Support Reply", type: "QUICK_REPLY", text: "Need Help", payload: "SUPPORT_REQ" },
  { id: "3", name: "Call Us", type: "PHONE_NUMBER", text: "Call Support", payload: "+1234567890" },
];

const columns: ColumnDef<InteractiveButton>[] = [
  { accessorKey: "name", header: "Button Name" },
  { accessorKey: "type", header: "Type" },
  { accessorKey: "text", header: "Display Text" },
  { accessorKey: "payload", header: "Value / Payload" },
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
  text: z.string().max(20),
  payload: z.string().min(1),
});

export default function ButtonsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", type: "QUICK_REPLY", text: "", payload: "" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Button:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Interactive Buttons" 
        text="Create reusable buttons for your WhatsApp templates."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Button
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create Button</SheetTitle>
            <SheetDescription>Configure a new interactive button.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Internal Name" />
                <RHFSelect 
                  name="type" 
                  label="Button Type" 
                  options={[
                    { label: "Quick Reply", value: "QUICK_REPLY" },
                    { label: "Call to Action (URL)", value: "URL" },
                    { label: "Call to Action (Phone)", value: "PHONE_NUMBER" },
                  ]} 
                />
                <RHFInput name="text" label="Button Text (Max 20 chars)" />
                <RHFInput name="payload" label="Value / URL / Payload" />
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Button</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
