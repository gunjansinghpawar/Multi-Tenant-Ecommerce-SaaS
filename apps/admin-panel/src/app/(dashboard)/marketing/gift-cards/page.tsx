"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  DataTable,
  Badge,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Form,
  RHFInput
} from "@commercex/ui";
import { PlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";

type GiftCard = {
  id: string;
  code: string;
  customer: string | "Anonymous";
  initialValue: string;
  balance: string;
  status: "Active" | "Empty" | "Disabled";
};

const data: GiftCard[] = [
  { id: "GC-1", code: "•••• 4242", customer: "Alice Smith", initialValue: "$100.00", balance: "$45.00", status: "Active" },
  { id: "GC-2", code: "•••• 8910", customer: "Anonymous", initialValue: "$50.00", balance: "$50.00", status: "Active" },
  { id: "GC-3", code: "•••• 1123", customer: "Charlie Brown", initialValue: "$200.00", balance: "$0.00", status: "Empty" },
];

const columns: ColumnDef<GiftCard>[] = [
  { accessorKey: "code", header: "Gift Card Code" },
  { 
    accessorKey: "customer", 
    header: "Customer",
    cell: ({ row }) => <span className={row.getValue("customer") === "Anonymous" ? "text-muted-foreground italic" : ""}>{row.getValue("customer")}</span>
  },
  { accessorKey: "initialValue", header: "Initial Value" },
  { accessorKey: "balance", header: "Current Balance" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const variant = status === "Active" ? "success" : status === "Empty" ? "secondary" : "destructive";
      return <Badge variant={variant as any}>{status}</Badge>;
    }
  },
];

const createGCSchema = z.object({
  value: z.string().min(1, "Value is required"),
  customerEmail: z.string().email().optional().or(z.literal("")),
});

export default function GiftCardsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof createGCSchema>>({
    resolver: zodResolver(createGCSchema),
    defaultValues: { value: "", customerEmail: "" },
  });

  const onSubmit = (values: z.infer<typeof createGCSchema>) => {
    console.log("Issuing gift card:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Gift Cards" 
        text="Issue and manage digital gift cards for your customers."
      >
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Issue Gift Card
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="code" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md">
          <SheetHeader>
            <SheetTitle>Issue Gift Card</SheetTitle>
            <SheetDescription>Generate a new gift card and optionally email it to a customer.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="value" label="Initial Value ($)" inputProps={{ type: "number", placeholder: "50" }} />
                <RHFInput name="customerEmail" label="Recipient Email (Optional)" inputProps={{ type: "email", placeholder: "recipient@example.com" }} />
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Issue Gift Card</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
