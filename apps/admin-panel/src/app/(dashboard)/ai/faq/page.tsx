"use client";

import React, { useState } from "react";
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
import { SparklesIcon, CopyIcon, CheckIcon, PlusIcon } from "lucide-react";

const formSchema = z.object({
  context: z.string().min(1, "Context is required"),
  numQuestions: z.string(),
});

export default function AIFAQPage() {
  const [generatedOutput, setGeneratedOutput] = useState<{q: string, a: string}[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      context: "",
      numQuestions: "3",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setTimeout(() => {
      const qs = parseInt(values.numQuestions) || 3;
      const fakeFAQs = Array.from({ length: qs }).map((_, i) => ({
        q: `What is the return policy for ${values.context.substring(0, 15)}...?`,
        a: `Our standard return policy applies. You can return the item within 30 days of receipt as long as it is unused and in its original packaging. Please contact support for a return label.`
      }));
      setGeneratedOutput(fakeFAQs);
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AI FAQ Generator" 
        text="Automatically generate Frequently Asked Questions for products or store policies."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Information Source</CardTitle>
            <CardDescription>Paste product descriptions, policies, or raw details.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Source Material</label>
                  <textarea 
                    className="flex min-h-[200px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Paste your product description or store policy here. The AI will extract the most common questions customers might have."
                    {...form.register("context")}
                  />
                </div>
                
                <RHFSelect 
                  name="numQuestions" 
                  label="Number of Questions" 
                  options={[
                    { label: "3 Questions", value: "3" },
                    { label: "5 Questions", value: "5" },
                    { label: "10 Questions", value: "10" },
                  ]} 
                />
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isGenerating}>
                    <SparklesIcon className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                    {isGenerating ? "Analyzing..." : "Generate FAQ"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Generated FAQs</CardTitle>
            <CardDescription>Review and add to your store.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            {!generatedOutput ? (
              <div className="h-full min-h-[200px] flex items-center justify-center text-muted-foreground italic rounded-md border bg-muted/30">
                Waiting for input...
              </div>
            ) : (
              <div className="space-y-4">
                {generatedOutput.map((faq, idx) => (
                  <div key={idx} className="p-4 border rounded-lg bg-card shadow-sm space-y-2 relative group">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => navigator.clipboard.writeText(`Q: ${faq.q}\nA: ${faq.a}`)}
                    >
                      <CopyIcon className="h-4 w-4" />
                    </Button>
                    <h4 className="font-semibold pr-8 text-sm">{faq.q}</h4>
                    <p className="text-sm text-muted-foreground">{faq.a}</p>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full border-dashed">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add to FAQ Manager
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
