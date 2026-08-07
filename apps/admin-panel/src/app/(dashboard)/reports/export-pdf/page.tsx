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
  RHFInput
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { DownloadIcon, FileTextIcon, PrinterIcon } from "lucide-react";

const formSchema = z.object({
  reportName: z.string(),
  dataset: z.string(),
  dateRange: z.string(),
  orientation: z.string(),
});

export default function ExportPdfPage() {
  const [isExporting, setIsExporting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reportName: "Quarterly Review",
      dataset: "Executive Summary",
      dateRange: "Last Quarter",
      orientation: "Portrait",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`PDF Document Generated: ${values.reportName}.pdf`);
    }, 2500);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Export to PDF" 
        text="Download stylized, print-ready PDF documents with charts and your store branding."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600 dark:text-red-500">
            <FileTextIcon className="mr-2 h-5 w-5" />
            Configure PDF Document
          </CardTitle>
          <CardDescription>PDFs are formatted for standard A4 printing.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput name="reportName" label="Document Title" />

              <div className="grid grid-cols-2 gap-4">
                <RHFSelect 
                  name="dataset" 
                  label="Report Content" 
                  options={[
                    { label: "Executive Dashboard Summary", value: "Executive Summary" },
                    { label: "Detailed Order Log", value: "Orders" },
                    { label: "Product Performance", value: "Products" },
                  ]} 
                />
                <RHFSelect 
                  name="dateRange" 
                  label="Date Range" 
                  options={[
                    { label: "Last Month", value: "Last Month" },
                    { label: "Last Quarter", value: "Last Quarter" },
                    { label: "Year to Date", value: "Year to Date" },
                  ]} 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <RHFSelect 
                  name="orientation" 
                  label="Page Orientation" 
                  options={[
                    { label: "Portrait (Vertical)", value: "Portrait" },
                    { label: "Landscape (Horizontal)", value: "Landscape" },
                  ]} 
                />
              </div>
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button type="button" variant="outline">
                  <PrinterIcon className="mr-2 h-4 w-4" /> Print Directly
                </Button>
                <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white" disabled={isExporting}>
                  <DownloadIcon className={`mr-2 h-4 w-4 ${isExporting ? 'animate-bounce' : ''}`} />
                  {isExporting ? "Rendering PDF..." : "Download .PDF File"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
