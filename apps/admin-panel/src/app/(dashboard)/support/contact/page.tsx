"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Form,
  RHFInput,
  Button
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  department: z.string(),
  message: z.string().min(10, "Please provide more details"),
});

export default function ContactSupportPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      department: "Technical Support",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Contact Support" 
        text="Open a new ticket and our team will get back to you shortly."
      />
      
      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Submit a Request</CardTitle>
          <CardDescription>Fill out the form below to reach the right department.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput name="department" label="Department" description="e.g. Technical Support, Billing, General Inquiry" />
              <RHFInput name="subject" label="Subject" inputProps={{ placeholder: "Brief summary of your issue" }} />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <textarea 
                  className="w-full min-h-[150px] p-3 rounded-md border bg-transparent text-sm" 
                  placeholder="Describe your issue in detail..."
                  {...form.register("message")}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Submit Ticket</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
