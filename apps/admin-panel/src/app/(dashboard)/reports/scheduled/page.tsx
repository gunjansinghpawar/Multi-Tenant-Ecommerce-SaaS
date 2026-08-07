"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  DataTable,
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Form,
  RHFInput,
  RHFSelect
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ClockIcon, PlusIcon, PlayIcon, PauseIcon, TrashIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type ScheduledReport = {
  id: string;
  name: string;
  frequency: string;
  format: string;
  recipients: string;
  status: "Active" | "Paused";
};

const data: ScheduledReport[] = [
  { id: "SR-1", name: "Weekly Executive Summary", frequency: "Weekly (Monday 8:00 AM)", format: "PDF", recipients: "ceo@company.com", status: "Active" },
  { id: "SR-2", name: "Daily Order Ledger", frequency: "Daily (11:59 PM)", format: "CSV", recipients: "ops@company.com", status: "Active" },
  { id: "SR-3", name: "Monthly Tax Export", frequency: "Monthly (1st Day)", format: "Excel", recipients: "accounting@firm.com", status: "Paused" },
];

const columns: ColumnDef<ScheduledReport>[] = [
  { accessorKey: "name", header: "Report Name" },
  { accessorKey: "frequency", header: "Frequency" },
  { accessorKey: "format", header: "Format" },
  { accessorKey: "recipients", header: "Recipients" },
  { 
    accessorKey: "status", 
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {status}
        </span>
      );
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" title={status === 'Active' ? 'Pause' : 'Resume'}>
            {status === 'Active' ? <PauseIcon className="h-4 w-4 text-yellow-600" /> : <PlayIcon className="h-4 w-4 text-green-600" />}
          </Button>
          <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700">
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    }
  }
];

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  reportType: z.string(),
  frequency: z.string(),
  format: z.string(),
  recipients: z.string().min(1, "At least one email is required"),
});

export default function ScheduledReportsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      reportType: "Sales Summary",
      frequency: "Weekly",
      format: "PDF",
      recipients: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSheetOpen(false);
    form.reset();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Scheduled Reports" 
          text="Automate data delivery by scheduling reports to be emailed to your team."
        />
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Schedule
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Automations</CardTitle>
          <CardDescription>Manage your recurring report emails.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="name" />
        </CardContent>
      </Card>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Schedule New Report</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="name" label="Schedule Name" placeholder="e.g. Weekly Executive Report" />
                
                <RHFSelect 
                  name="reportType" 
                  label="Report Dataset" 
                  options={[
                    { label: "Sales Summary", value: "Sales Summary" },
                    { label: "Detailed Orders", value: "Detailed Orders" },
                    { label: "Tax Liability", value: "Tax Liability" },
                  ]} 
                />

                <RHFSelect 
                  name="format" 
                  label="Attachment Format" 
                  options={[
                    { label: "PDF Document", value: "PDF" },
                    { label: "Excel Spreadsheet (.xlsx)", value: "Excel" },
                    { label: "CSV File", value: "CSV" },
                  ]} 
                />

                <RHFSelect 
                  name="frequency" 
                  label="Delivery Frequency" 
                  options={[
                    { label: "Daily (Midnight)", value: "Daily" },
                    { label: "Weekly (Monday 8AM)", value: "Weekly" },
                    { label: "Monthly (1st of Month)", value: "Monthly" },
                  ]} 
                />
                
                <RHFInput name="recipients" label="Email Recipients (Comma separated)" placeholder="ceo@company.com, ops@company.com" />
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button variant="outline" type="button" onClick={() => setIsSheetOpen(false)}>Cancel</Button>
                  <Button type="submit">Save Schedule</Button>
                </div>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
