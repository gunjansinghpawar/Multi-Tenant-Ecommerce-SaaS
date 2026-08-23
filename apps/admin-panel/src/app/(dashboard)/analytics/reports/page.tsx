"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription,
  Button,
  Form,
  RHFInput,
  RHFSelect,
  DataTable
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileTextIcon, DownloadIcon, ClockIcon, PlayIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type ReportData = {
  id: string;
  name: string;
  schedule: string;
  lastRun: string;
  format: string;
};

const data: ReportData[] = [
  { id: "R-01", name: "Weekly Sales Summary", schedule: "Every Monday 9:00 AM", lastRun: "2026-07-27", format: "PDF" },
  { id: "R-02", name: "Monthly Tax Report", schedule: "1st of Month 12:00 AM", lastRun: "2026-07-01", format: "CSV" },
  { id: "R-03", name: "Inventory Valuation", schedule: "Manual", lastRun: "2026-07-15", format: "XLSX" },
];

const columns: ColumnDef<ReportData>[] = [
  { accessorKey: "name", header: "Report Name" },
  { accessorKey: "schedule", header: "Schedule" },
  { accessorKey: "lastRun", header: "Last Run Date" },
  { accessorKey: "format", header: "Format" },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" title="Run Now">
            <PlayIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" title="Download Last Run">
            <DownloadIcon className="h-4 w-4" />
          </Button>
        </div>
      );
    }
  }
];

const formSchema = z.object({
  reportType: z.string(),
  dateRange: z.string(),
  format: z.string(),
  emailTo: z.string().email().optional().or(z.literal('')),
});

export default function ReportsAnalyticsPage() {
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportType: "Sales Summary",
      dateRange: "Last 30 Days",
      format: "PDF",
      emailTo: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Report generated: ${values.reportType}`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Reports & Exports" 
        text="Generate, schedule, and download custom data reports."
      />
      
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Generate Report</CardTitle>
            <CardDescription>Run a one-off custom report.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFSelect 
                  name="reportType" 
                  label="Report Type" 
                  options={[
                    { label: "Sales Summary", value: "Sales Summary" },
                    { label: "Inventory Velocity", value: "Inventory Velocity" },
                    { label: "Tax Liability", value: "Tax Liability" },
                    { label: "Customer Acquisition", value: "Customer Acquisition" },
                  ]} 
                />
                
                <RHFSelect 
                  name="dateRange" 
                  label="Date Range" 
                  options={[
                    { label: "Last 7 Days", value: "Last 7 Days" },
                    { label: "Last 30 Days", value: "Last 30 Days" },
                    { label: "This Quarter", value: "This Quarter" },
                    { label: "Year to Date", value: "Year to Date" },
                  ]} 
                />
                
                <RHFSelect 
                  name="format" 
                  label="Export Format" 
                  options={[
                    { label: "PDF Document", value: "PDF" },
                    { label: "CSV File", value: "CSV" },
                    { label: "Excel Spreadsheet", value: "XLSX" },
                  ]} 
                />

                <RHFInput name="emailTo" label="Email To (Optional)" inputProps={{ placeholder: "e.g. accountant@company.com" }} />
                
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isGenerating}>
                    <FileTextIcon className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-bounce' : ''}`} />
                    {isGenerating ? "Generating..." : "Generate & Download"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Scheduled Reports</CardTitle>
              <CardDescription>Reports that run automatically on a schedule.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
              <ClockIcon className="mr-2 h-4 w-4" />
              New Schedule
            </Button>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} searchKey="name" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
