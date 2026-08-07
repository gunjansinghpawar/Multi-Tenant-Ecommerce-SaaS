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
import { PlusIcon, MoreHorizontal, DownloadIcon, UserMinusIcon } from "lucide-react";
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

type Subscriber = {
  id: string;
  email: string;
  name: string;
  source: string;
  subscribedAt: string;
  status: "Subscribed" | "Unsubscribed" | "Bounced";
};

const data: Subscriber[] = [
  { id: "1", email: "john@example.com", name: "John Doe", source: "Footer Form", subscribedAt: "2026-07-28", status: "Subscribed" },
  { id: "2", email: "jane@example.com", name: "Jane Smith", source: "Checkout", subscribedAt: "2026-07-25", status: "Subscribed" },
  { id: "3", email: "spammy@bot.com", name: "Unknown", source: "Popup", subscribedAt: "2026-07-20", status: "Bounced" },
];

const columns: ColumnDef<Subscriber>[] = [
  { accessorKey: "email", header: "Email Address" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "source", header: "Signup Source" },
  { accessorKey: "subscribedAt", header: "Subscribed On" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let colorClass = "";
      if (status === 'Subscribed') colorClass = 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      else if (status === 'Unsubscribed') colorClass = 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
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
            <DropdownMenuItem className="text-red-600">
              <UserMinusIcon className="mr-2 h-4 w-4" /> Unsubscribe User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

const formSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  list: z.string(),
});

export default function NewsletterPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", name: "", list: "main" },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Adding Subscriber:", values);
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Newsletter Subscribers" 
        text="Manage your mailing list and subscriber segments."
      >
        <Button variant="outline" className="mr-2">
          <DownloadIcon className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Subscriber
        </Button>
      </PageHeader>

      <DataTable columns={columns} data={data} searchKey="email" />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Add Subscriber</SheetTitle>
            <SheetDescription>Manually add an email to your newsletter list.</SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="email" label="Email Address" />
                <RHFInput name="name" label="Name (Optional)" />
                <RHFSelect 
                  name="list" 
                  label="Add to List" 
                  options={[
                    { label: "Main Newsletter", value: "main" },
                    { label: "VIP Updates", value: "vip" },
                  ]} 
                />
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Add Subscriber</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
