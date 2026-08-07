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
  RHFSwitch,
  RHFSelect
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { MailIcon } from "lucide-react";

const formSchema = z.object({
  apiKey: z.string().min(1, "API Key is required"),
  domain: z.string().min(1, "Domain is required"),
  region: z.string(),
  isActive: z.boolean(),
});

export default function MailgunPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      apiKey: "",
      domain: "",
      region: "US",
      isActive: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving Mailgun configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Mailgun Integration" 
        text="Configure Mailgun as your email delivery provider."
      >
        <Button variant="outline">
          <MailIcon className="mr-2 h-4 w-4" />
          Send Test Email
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Enter your Mailgun API credentials.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="apiKey" label="Mailgun API Key" inputProps={{ type: "password" }} />
              
              <div className="grid grid-cols-2 gap-4">
                <RHFInput name="domain" label="Mailgun Domain" inputProps={{ placeholder: "mg.yourdomain.com" }} />
                <RHFSelect 
                  name="region" 
                  label="API Region" 
                  options={[
                    { label: "US (Default)", value: "US" },
                    { label: "EU (Europe)", value: "EU" },
                  ]} 
                />
              </div>
              
              <div className="pt-2">
                <RHFSwitch name="isActive" label="Set as Primary Provider" description="Use Mailgun for all outbound emails." />
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
