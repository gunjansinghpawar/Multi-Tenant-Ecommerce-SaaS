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
import { RefreshCcwIcon } from "lucide-react";

const formSchema = z.object({
  catalogId: z.string().min(1, "Catalog ID is required"),
  autoSync: z.boolean(),
  syncInventory: z.boolean(),
});

export default function CatalogSyncPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      catalogId: "",
      autoSync: true,
      syncInventory: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Saving catalog settings:", values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Catalog Sync" 
        text="Sync your store products to Meta Commerce Manager for WhatsApp."
      >
        <Button>
          <RefreshCcwIcon className="mr-2 h-4 w-4" />
          Sync Now
        </Button>
      </PageHeader>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Synced Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,204</div>
            <p className="text-xs text-muted-foreground text-green-600">Last synced 2 hours ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground text-red-600">Failed to sync</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catalog Settings</CardTitle>
          <CardDescription>Configure how products are synchronized with Meta.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
              <RHFInput name="catalogId" label="Meta Commerce Catalog ID" />
              
              <div className="space-y-4 pt-2">
                <RHFSwitch name="autoSync" label="Auto Sync Daily" description="Automatically push product updates to Meta every 24 hours." />
                <RHFSwitch name="syncInventory" label="Sync Inventory Levels" description="Update out-of-stock status on WhatsApp catalog." />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Settings</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
