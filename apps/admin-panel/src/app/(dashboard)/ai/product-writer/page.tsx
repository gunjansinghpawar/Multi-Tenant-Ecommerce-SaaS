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
import { SparklesIcon, CopyIcon, CheckIcon } from "lucide-react";

const formSchema = z.object({
  productName: z.string().min(1, "Product name is required"),
  features: z.string().min(1, "Key features are required"),
  tone: z.string(),
  targetAudience: z.string(),
});

export default function AIProductWriterPage() {
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      features: "",
      tone: "Professional",
      targetAudience: "General",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    // Simulate AI generation delay
    setTimeout(() => {
      setGeneratedOutput(`**${values.productName}**

Discover the perfect blend of utility and design. Tailored specifically for ${values.targetAudience.toLowerCase()} users, this product redefines convenience. 

**Key Features:**
- ${values.features.split(',').join('\n- ')}

*Experience the difference today. Upgrade your lifestyle with ${values.productName}.*`);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AI Product Writer" 
        text="Generate high-converting product descriptions in seconds."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Input Details</CardTitle>
            <CardDescription>Tell the AI about your product.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="productName" label="Product Name" placeholder="e.g. Wireless Noise-Cancelling Headphones" />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Key Features (comma separated)</label>
                  <textarea 
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g. 40hr battery, bluetooth 5.0, sweatproof"
                    {...form.register("features")}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <RHFSelect 
                    name="tone" 
                    label="Tone of Voice" 
                    options={[
                      { label: "Professional", value: "Professional" },
                      { label: "Exciting & Urgent", value: "Exciting" },
                      { label: "Luxurious", value: "Luxurious" },
                      { label: "Humorous", value: "Humorous" },
                    ]} 
                  />
                  <RHFInput name="targetAudience" label="Target Audience" placeholder="e.g. Commuters, Athletes" />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isGenerating}>
                    <SparklesIcon className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                    {isGenerating ? "Generating..." : "Generate Description"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>AI Output</CardTitle>
              <CardDescription>Your generated description will appear here.</CardDescription>
            </div>
            {generatedOutput && (
              <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy to clipboard">
                {isCopied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            <div className={`h-full min-h-[300px] w-full rounded-md border bg-muted/30 p-4 text-sm ${!generatedOutput ? 'text-muted-foreground flex items-center justify-center italic' : 'whitespace-pre-wrap'}`}>
              {generatedOutput || "Waiting for input..."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
