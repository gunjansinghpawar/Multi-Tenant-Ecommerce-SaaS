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
  RHFSelect
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DownloadIcon, FileJsonIcon } from "lucide-react";

const formSchema = z.object({
  dataset: z.string(),
  dateRange: z.string(),
  statusFilter: z.string(),
});

export default function ExportCsvPage() {
  const [isExporting, setIsExporting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataset: "Orders",
      dateRange: "Last 30 Days",
      statusFilter: "All",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`CSV Export Started for ${values.dataset} (${values.dateRange})`);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Export to CSV" 
        text="Download raw comma-separated value files for use in external tools."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileJsonIcon className="mr-2 h-5 w-5" />
            Configure CSV Export
          </CardTitle>
          <CardDescription>Select a dataset and apply filters before downloading.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFSelect 
                name="dataset" 
                label="Select Dataset" 
                options={[
                  { label: "Orders Ledger", value: "Orders" },
                  { label: "Customer Directory", value: "Customers" },
                  { label: "Inventory Stock Levels", value: "Inventory" },
                  { label: "Tax Liability Data", value: "Tax" },
                ]} 
              />
              
              <div className="grid grid-cols-2 gap-4">
                <RHFSelect 
                  name="dateRange" 
                  label="Date Range" 
                  options={[
                    { label: "Today", value: "Today" },
                    { label: "Last 7 Days", value: "Last 7 Days" },
                    { label: "Last 30 Days", value: "Last 30 Days" },
                    { label: "Year to Date", value: "Year to Date" },
                    { label: "All Time", value: "All Time" },
                  ]} 
                />
                <RHFSelect 
                  name="statusFilter" 
                  label="Data Status Filter" 
                  options={[
                    { label: "All Records", value: "All" },
                    { label: "Active / Completed Only", value: "Active" },
                    { label: "Pending / Drafts Only", value: "Pending" },
                  ]} 
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit" disabled={isExporting}>
                  <DownloadIcon className={`mr-2 h-4 w-4 ${isExporting ? 'animate-bounce' : ''}`} />
                  {isExporting ? "Preparing File..." : "Download CSV File"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
