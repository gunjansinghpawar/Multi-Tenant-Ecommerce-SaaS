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
import { SparklesIcon, CopyIcon, CheckIcon, SendIcon } from "lucide-react";

const formSchema = z.object({
  objective: z.string().min(1, "Objective is required"),
  audience: z.string(),
  tone: z.string(),
});

export default function AIEmailPage() {
  const [generatedOutput, setGeneratedOutput] = useState<{subject: string, body: string} | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      objective: "",
      audience: "All Subscribers",
      tone: "Friendly",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedOutput({
        subject: `Big News! We've just achieved: ${values.objective}`,
        body: `Hi there,\n\nWe wanted to reach out to our favorite ${values.audience.toLowerCase()} to let you know about something special.\n\n${values.objective}.\n\nThis means you can now enjoy better service, faster shipping, and higher quality products.\n\nThanks for being with us!\n\nBest,\nYour Store Team`
      });
      setIsGenerating(false);
    }, 1800);
  };

  const copyToClipboard = () => {
    if (generatedOutput) {
      navigator.clipboard.writeText(`Subject: ${generatedOutput.subject}\n\n${generatedOutput.body}`);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AI Email Writer" 
        text="Draft high-converting newsletters and promotional emails."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Email Objective</CardTitle>
            <CardDescription>What do you want this email to accomplish?</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Main Objective</label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g. Announce our new summer collection and offer a 20% discount code (SUMMER20)."
                    {...form.register("objective")}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <RHFInput name="audience" label="Target Audience" inputProps={{ placeholder: "e.g. VIP Customers" }} />
                  <RHFSelect 
                    name="tone" 
                    label="Tone of Voice" 
                    options={[
                      { label: "Friendly", value: "Friendly" },
                      { label: "Professional", value: "Professional" },
                      { label: "Urgent", value: "Urgent" },
                    ]} 
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isGenerating}>
                    <SparklesIcon className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                    {isGenerating ? "Drafting..." : "Generate Email"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <div>
              <CardTitle>Generated Email</CardTitle>
              <CardDescription>Review and copy your draft.</CardDescription>
            </div>
            {generatedOutput && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  {isCopied ? <CheckIcon className="mr-2 h-4 w-4 text-green-500" /> : <CopyIcon className="mr-2 h-4 w-4" />}
                  Copy
                </Button>
                <Button variant="default" size="sm">
                  <SendIcon className="mr-2 h-4 w-4" />
                  Send to Campaigns
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1 pt-6 space-y-4">
            {!generatedOutput ? (
              <div className="h-full min-h-[200px] flex items-center justify-center text-muted-foreground italic rounded-md border bg-muted/30">
                Waiting for input...
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Subject Line</label>
                  <div className="p-3 bg-muted rounded-md font-medium">{generatedOutput.subject}</div>
                </div>
                <div className="space-y-1 h-full">
                  <label className="text-xs font-semibold text-muted-foreground uppercase">Email Body</label>
                  <div className="p-4 border rounded-md whitespace-pre-wrap text-sm min-h-[250px]">
                    {generatedOutput.body}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
