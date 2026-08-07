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
  accessKey: z.string().min(1, "Access Key is required"),
  secretKey: z.string().min(1, "Secret Key is required"),
  region: z.string().min(1, "Region is required"),
  isActive: z.boolean(),
});

export default function AWSSESPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      accessKey: "",
      secretKey: "",
      region: "us-east-1",
      isActive: false,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving AWS SES configuration:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AWS SES Integration" 
        text="Configure Amazon Simple Email Service (SES) for scalable email delivery."
      >
        <Button variant="outline">
          <MailIcon className="mr-2 h-4 w-4" />
          Send Test Email
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>AWS Credentials</CardTitle>
          <CardDescription>Enter your AWS IAM credentials with SES access.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="accessKey" label="AWS Access Key ID" />
              <RHFInput name="secretKey" label="AWS Secret Access Key" inputProps={{ type: "password" }} />
              
              <RHFSelect 
                name="region" 
                label="AWS Region" 
                options={[
                  { label: "US East (N. Virginia) - us-east-1", value: "us-east-1" },
                  { label: "US West (Oregon) - us-west-2", value: "us-west-2" },
                  { label: "Europe (Ireland) - eu-west-1", value: "eu-west-1" },
                  { label: "Asia Pacific (Mumbai) - ap-south-1", value: "ap-south-1" },
                ]} 
              />
              
              <div className="pt-2">
                <RHFSwitch name="isActive" label="Set as Primary Provider" description="Use AWS SES for all outbound emails." />
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
