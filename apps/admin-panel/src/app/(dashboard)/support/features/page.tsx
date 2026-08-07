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
import { LightbulbIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(10),
  useCase: z.string(),
});

export default function FeatureRequestsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      useCase: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Feature Requests" 
        text="Have an idea to improve CommerceX? Let our product team know!"
      />
      
      <Card className="max-w-2xl border-indigo-100">
        <CardHeader className="bg-indigo-50/50">
          <CardTitle className="flex items-center gap-2 text-indigo-700">
            <LightbulbIcon className="h-5 w-5" /> Propose a Feature
          </CardTitle>
          <CardDescription>Your feedback directly shapes our product roadmap.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <RHFInput name="title" label="Feature Title" placeholder="e.g. Add integration for XYZ CRM" />
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 rounded-md border bg-transparent text-sm" 
                  placeholder="How should this feature work?"
                  {...form.register("description")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Use Case / Business Value</label>
                <textarea 
                  className="w-full min-h-[100px] p-3 rounded-md border bg-transparent text-sm" 
                  placeholder="Why do you need this? How would it help your business?"
                  {...form.register("useCase")}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Submit Idea</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
