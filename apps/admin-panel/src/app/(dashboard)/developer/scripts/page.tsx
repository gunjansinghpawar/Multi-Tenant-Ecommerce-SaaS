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
  Button
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CodeIcon } from "lucide-react";

const formSchema = z.object({
  headScript: z.string(),
  bodyScript: z.string(),
  checkoutScript: z.string(),
});

export default function CustomScriptsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      headScript: "<!-- Google Analytics -->",
      bodyScript: "",
      checkoutScript: "<!-- Conversion Tracking -->",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Custom Scripts" 
        text="Inject tracking pixels, analytics, or custom JavaScript into your storefront."
      />
      
      <Card className="max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CodeIcon className="h-5 w-5 text-emerald-600" /> Storefront Code Injection
          </CardTitle>
          <CardDescription>Code placed here will be rendered across your theme.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Head Tag Scripts (Global)</label>
                <p className="text-xs text-muted-foreground">Injected just before the closing &lt;/head&gt; tag. Good for CSS or early analytics.</p>
                <textarea 
                  className="w-full min-h-[150px] p-3 rounded-md border bg-slate-950 text-emerald-400 font-mono text-sm" 
                  {...form.register("headScript")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Body Scripts (Global)</label>
                <p className="text-xs text-muted-foreground">Injected just before the closing &lt;/body&gt; tag. Good for chat widgets or deferred scripts.</p>
                <textarea 
                  className="w-full min-h-[150px] p-3 rounded-md border bg-slate-950 text-emerald-400 font-mono text-sm" 
                  {...form.register("bodyScript")}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Checkout Completion Scripts</label>
                <p className="text-xs text-muted-foreground">Only runs on the "Thank You" order confirmation page. Used for conversion tracking.</p>
                <textarea 
                  className="w-full min-h-[150px] p-3 rounded-md border bg-slate-950 text-emerald-400 font-mono text-sm" 
                  {...form.register("checkoutScript")}
                />
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button type="submit">Save Scripts</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
