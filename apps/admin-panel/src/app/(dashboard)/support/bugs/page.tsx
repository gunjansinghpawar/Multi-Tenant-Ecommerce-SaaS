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
import { BugIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1),
  steps: z.string().min(10),
  expected: z.string(),
});

export default function BugReportsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      steps: "",
      expected: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Report a Bug" 
        text="Experiencing an issue? Report it directly to our engineering team."
      />
      
      <Card className="max-w-2xl border-destructive/20">
        <CardHeader className="bg-destructive/5">
          <CardTitle className="flex items-center gap-2 text-destructive">
            <BugIcon className="h-5 w-5" /> Submit Bug Report
          </CardTitle>
          <CardDescription>Providing clear steps to reproduce helps us fix it faster.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput name="title" label="Issue Title" placeholder="e.g. Cannot save product when weight is zero" />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Steps to Reproduce</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 rounded-md border bg-transparent text-sm" 
                  placeholder="1. Go to...\n2. Click on...\n3. See error..."
                  {...form.register("steps")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Expected vs Actual Behavior</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 rounded-md border bg-transparent text-sm" 
                  placeholder="What did you expect to happen, and what actually happened?"
                  {...form.register("expected")}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit" variant="destructive">Submit Report</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
