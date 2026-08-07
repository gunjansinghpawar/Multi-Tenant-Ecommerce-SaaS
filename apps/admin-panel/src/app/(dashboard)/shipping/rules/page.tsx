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

type ShippingRule = {
  id: string;
  name: string;
  condition: string;
  action: string;
  status: "Active" | "Inactive";
};

const data: ShippingRule[] = [
  { id: "RULE-1", name: "Free Shipping > $100", condition: "Order Total > 100", action: "Free Shipping", status: "Active" },
  { id: "RULE-2", name: "Heavy Items Fee", condition: "Weight > 20kg", action: "Add $50 Base Rate", status: "Active" },
];

const columns: ColumnDef<ShippingRule>[] = [
  { accessorKey: "name", header: "Rule Name" },
  { accessorKey: "condition", header: "Condition" },
  { accessorKey: "action", header: "Action" },
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
  conditionType: z.string(),
  conditionValue: z.string().min(1, "Value is required"),
  actionType: z.string(),
  actionValue: z.string(),
  isActive: z.boolean()
});

export default function ShippingRulesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", conditionType: "order_total", conditionValue: "", actionType: "free_shipping", actionValue: "", isActive: true },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Shipping Rule:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Shipping Rules" 
        text="Define conditions for automated shipping actions."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Rule
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="name" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Shipping Rule</SheetTitle>
            <SheetDescription>Create a new conditional shipping rule.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Rule Name" inputProps={{ placeholder: "e.g. VIP Free Shipping" }} />
                
                <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                  <h4 className="text-sm font-semibold">IF Condition</h4>
                  <RHFSelect 
                    name="conditionType" 
                    label="Property" 
                    options={[
                      { label: "Order Total (Subtotal)", value: "order_total" },
                      { label: "Total Weight", value: "total_weight" },
                      { label: "Customer Tag", value: "customer_tag" },
                    ]} 
                  />
                  <RHFInput name="conditionValue" label="Value" inputProps={{ placeholder: "e.g. 100" }} />
                </div>

                <div className="p-4 bg-muted/50 rounded-lg space-y-4">
                  <h4 className="text-sm font-semibold">THEN Action</h4>
                  <RHFSelect 
                    name="actionType" 
                    label="Action" 
                    options={[
                      { label: "Apply Free Shipping", value: "free_shipping" },
                      { label: "Add Flat Surcharge", value: "add_surcharge" },
                      { label: "Disable Provider", value: "disable_provider" },
                    ]} 
                  />
                  <RHFInput name="actionValue" label="Action Value (Optional)" />
                </div>

                <div className="pt-2">
                  <RHFSwitch name="isActive" label="Rule Active" description="Enable this rule immediately." />
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
