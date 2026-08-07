"use client";

import React from "react";
import { PageHeader, Card, CardContent, Form, RHFInput, Button } from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const createStoreSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters"),
  slug: z.string().min(3, "Store slug must be at least 3 characters"),
  ownerEmail: z.string().email("Invalid owner email address"),
});

type CreateStoreValues = z.infer<typeof createStoreSchema>;

export default function CreateStorePage() {
  const form = useForm<CreateStoreValues>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
      slug: "",
      ownerEmail: "",
    },
  });

  const onSubmit = (data: CreateStoreValues) => {
    console.log("Creating store:", data);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Create Store" 
        text="Provision a new tenant store and assign an initial owner."
      />

      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <RHFInput
                  name="name"
                  label="Store Name"
                  inputProps={{
                    placeholder: "Acme Corp Store",
                  }}
                />
                <RHFInput
                  name="slug"
                  label="Store URL Slug"
                  inputProps={{
                    placeholder: "acme-corp",
                  }}
                />
                <RHFInput
                  name="ownerEmail"
                  label="Owner Email Address"
                  inputProps={{
                    type: "email",
                    placeholder: "admin@acmecorp.com",
                  }}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" type="button" onClick={() => window.history.back()}>
                  Cancel
                </Button>
                <Button type="submit">
                  Provision Store
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
