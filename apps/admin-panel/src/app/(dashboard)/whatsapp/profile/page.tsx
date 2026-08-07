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
  RHFSelect
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  about: z.string().max(139, "About text must be under 139 characters"),
  address: z.string().max(256),
  description: z.string().max(512),
  email: z.string().email(),
  industry: z.string(),
  websites: z.string(),
});

export default function BusinessProfilePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      about: "Available",
      address: "",
      description: "",
      email: "",
      industry: "OTHER",
      websites: "https://",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving profile:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Business Profile" 
        text="Manage the public profile customers see on WhatsApp."
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>These details are visible to users checking your WhatsApp business info.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="about" label="About (Status)" inputProps={{ placeholder: "e.g. Welcome to our store!" }} />
              <RHFInput name="description" label="Business Description" />
              <RHFInput name="address" label="Physical Address" />
              
              <div className="grid grid-cols-2 gap-4">
                <RHFInput name="email" label="Contact Email" />
                <RHFSelect 
                  name="industry" 
                  label="Industry" 
                  options={[
                    { label: "Retail", value: "RETAIL" },
                    { label: "Apparel", value: "APPAREL" },
                    { label: "Beauty", value: "BEAUTY" },
                    { label: "Electronics", value: "ELECTRONICS" },
                    { label: "Other", value: "OTHER" },
                  ]} 
                />
              </div>
              
              <RHFInput name="websites" label="Websites (Comma separated)" />
              
              <div className="pt-4 flex justify-end space-x-2">
                <Button variant="outline" type="button">Sync from Meta</Button>
                <Button type="submit">Update Profile</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
