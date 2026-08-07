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
  domain: z.string().min(1, "Sending domain is required"),
  isActive: z.boolean(),
});

export default function ResendPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      domain: "yourdomain.com",
      isActive: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Resend configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Resend Integration" 
        text="Configure Resend as your email delivery provider."
      >
        <Button variant="outline">
          <MailIcon className="mr-2 h-4 w-4" />
          Send Test Email
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Enter your Resend API credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="apiKey" label="Resend API Key" inputProps={{ type: "password", placeholder: "re_..." }} />
              <RHFInput name="domain" label="Verified Sending Domain" />
              
              <div className="pt-2">
                <RHFSwitch name="isActive" label="Set as Primary Provider" description="Use Resend for all outbound emails." />
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
