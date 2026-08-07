"use client";

import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Card,
  Button,
  Form,
  RHFInput,
  useToast
} from "@commercex/ui";
import { getTenantSettingsAction, updateTenantSettingsAction } from "../../../actions/settings.actions";
import { Loader2 } from "lucide-react";

const generalSettingsSchema = z.object({
  storeName: z.string().min(2, "Store name must be at least 2 characters").max(50),
  companyName: z.string().max(100).optional().nullable(),
  supportEmail: z.string().email("Invalid email address").optional().nullable(),
  phone: z.string().max(20).optional().nullable(),
});

type GeneralSettingsValues = z.infer<typeof generalSettingsSchema>;

export default function GeneralSettingsPage() {
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const form = useForm<GeneralSettingsValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: {
      storeName: "",
      companyName: "",
      supportEmail: "",
      phone: "",
    },
  });

  useEffect(() => {
    async function loadSettings() {
      try {
        const settings = await getTenantSettingsAction();
        if (settings) {
          form.reset({
            storeName: settings.storeName || "",
            companyName: settings.companyName || "",
            supportEmail: settings.supportEmail || "",
            phone: settings.phone || "",
          });
        }
      } catch (error) {
        toast({ title: "Error", description: "Failed to load settings", variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    }
    loadSettings();
  }, [form, toast]);

  const onSubmit = (data: GeneralSettingsValues) => {
    startTransition(async () => {
      try {
        await updateTenantSettingsAction(data);
        toast({ title: "Success", description: "Settings saved successfully." });
      } catch (error) {
        toast({ title: "Error", description: "Failed to save settings.", variant: "destructive" });
      }
    });
  };

  if (isLoading) {
    return <div className="flex h-48 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General</h3>
        <p className="text-sm text-muted-foreground">
          Update your store's primary identity information.
        </p>
      </div>
      <div className="border-t border-border"></div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
          <section className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="md:w-1/3">
              <h4 className="font-medium text-sm">Store Name</h4>
              <p className="text-sm text-muted-foreground mt-1">This is your store's visible name. It will be used in emails and invoices.</p>
            </div>
            <div className="md:w-2/3">
              <Card className="p-4 space-y-4">
                <RHFInput name="storeName" inputProps={{ placeholder: "e.g. Acme Corp" }} />
              </Card>
            </div>
          </section>

          <div className="border-t border-border"></div>

          <section className="flex flex-col md:flex-row gap-6 md:gap-12">
            <div className="md:w-1/3">
              <h4 className="font-medium text-sm">Company Details</h4>
              <p className="text-sm text-muted-foreground mt-1">Legal company name and contact info.</p>
            </div>
            <div className="md:w-2/3">
              <Card className="p-4 space-y-4">
                <RHFInput name="companyName" label="Legal Company Name" inputProps={{ placeholder: "Acme Corporation Ltd." }} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RHFInput name="supportEmail" label="Support Email" inputProps={{ type: "email", placeholder: "support@acme.com" }} />
                  <RHFInput name="phone" label="Phone Number" inputProps={{ placeholder: "+1 (555) 000-0000" }} />
                </div>
              </Card>
            </div>
          </section>

          <div className="flex justify-end gap-4 pt-4">
            <Button type="button" variant="outline" onClick={() => form.reset()} disabled={isPending}>
              Discard
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
