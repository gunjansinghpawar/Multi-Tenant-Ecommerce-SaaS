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
  RHFSelect,
  RHFSwitch
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DownloadIcon, FileSpreadsheetIcon } from "lucide-react";

const formSchema = z.object({
  dataset: z.string(),
  dateRange: z.string(),
  includeCharts: z.boolean(),
});

export default function ExportExcelPage() {
  const [isExporting, setIsExporting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dataset: "Sales Summary",
      dateRange: "This Month",
      includeCharts: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Excel (.xlsx) Export Started for ${values.dataset}`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Export to Excel" 
        text="Download formatted .xlsx files with multiple sheets and formulas."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-green-600 dark:text-green-500">
            <FileSpreadsheetIcon className="mr-2 h-5 w-5" />
            Configure Excel Export
          </CardTitle>
          <CardDescription>Generated Excel files include formatted tables and summary sheets.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <RHFSelect 
                  name="dataset" 
                  label="Report Type" 
                  options={[
                    { label: "Sales & Financial Summary", value: "Sales Summary" },
                    { label: "Inventory Valuation", value: "Inventory" },
                    { label: "Comprehensive Tax Report", value: "Tax" },
                  ]} 
                />
                <RHFSelect 
                  name="dateRange" 
                  label="Date Range" 
                  options={[
                    { label: "This Month", value: "This Month" },
                    { label: "Last Month", value: "Last Month" },
                    { label: "Q1", value: "Q1" },
                    { label: "Q2", value: "Q2" },
                    { label: "Year to Date", value: "Year to Date" },
                  ]} 
                />
              </div>

              <div className="border rounded-md p-4 bg-muted/20">
                <RHFSwitch name="includeCharts" label="Include Summary Charts" description="Auto-generate bar and pie charts on the first worksheet." />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white" disabled={isExporting}>
                  <DownloadIcon className={`mr-2 h-4 w-4 ${isExporting ? 'animate-bounce' : ''}`} />
                  {isExporting ? "Generating Worksheet..." : "Download .XLSX File"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
