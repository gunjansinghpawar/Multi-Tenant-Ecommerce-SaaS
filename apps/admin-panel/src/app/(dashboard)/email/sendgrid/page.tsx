"use client";

import React from "react";
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
  RHFSwitch
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MailIcon } from "lucide-react";

const formSchema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
  fromEmail: z.string().email(),
  fromName: z.string(),
  isActive: z.boolean(),
});

export default function SendGridPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      fromEmail: "noreply@yourdomain.com",
      fromName: "Your Store",
      isActive: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving SendGrid configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="SendGrid Integration" 
        text="Configure SendGrid as your email delivery provider."
      >
        <Button variant="outline">
          <MailIcon className="mr-2 h-4 w-4" />
          Send Test Email
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Enter your SendGrid API key.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="apiKey" label="SendGrid API Key" inputProps={{ type: "password", placeholder: "SG...." }} />
              
              <div className="grid grid-cols-2 gap-4">
                <RHFInput name="fromName" label="Default Sender Name" />
                <RHFInput name="fromEmail" label="Default Sender Email" />
              </div>
              
              <div className="pt-2">
                <RHFSwitch name="isActive" label="Set as Primary Provider" description="Use SendGrid for all outbound emails." />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Configuration</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
