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
import { SparklesIcon, CopyIcon, CheckIcon, DownloadIcon } from "lucide-react";

const formSchema = z.object({
  topic: z.string().min(1, "Topic is required"),
  keywords: z.string(),
  length: z.string(),
});

export default function AIBlogPage() {
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "",
      keywords: "",
      length: "Short (500 words)",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedOutput(`# The Ultimate Guide to ${values.topic}

Welcome to our comprehensive guide on ${values.topic}. If you've been wondering how to get started or how to improve your current setup, you're in the right place.

## Why This Matters

Incorporating the right strategies can make a massive difference. Here are a few reasons why:
1. Improved efficiency.
2. Better long-term results.
3. Cost savings over time.

## Top Tips for Success

When thinking about ${values.keywords.split(',')[0] || 'your goals'}, it's important to focus on the basics first. Don't rush the process. 

### Conclusion

Thanks for reading! Stay tuned for more updates on ${values.topic}.`);
      setIsGenerating(false);
    }, 2500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AI Blog Writer" 
        text="Draft SEO-friendly blog posts and content marketing articles."
      />
      
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 h-fit">
          <CardHeader>
            <CardTitle>Article Brief</CardTitle>
            <CardDescription>What should the AI write about?</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="topic" label="Main Topic or Title" inputProps={{ placeholder: "e.g. 5 Benefits of Organic Skincare" }} />
                
                <RHFInput name="keywords" label="Target Keywords (Comma separated)" inputProps={{ placeholder: "e.g. organic skincare, natural ingredients" }} />
                
                <RHFSelect 
                  name="length" 
                  label="Target Length" 
                  options={[
                    { label: "Short (500 words)", value: "Short (500 words)" },
                    { label: "Medium (1000 words)", value: "Medium (1000 words)" },
                    { label: "Long-form (2000+ words)", value: "Long-form (2000+ words)" },
                  ]} 
                />
                
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isGenerating}>
                    <SparklesIcon className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                    {isGenerating ? "Drafting Article..." : "Generate Draft"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 flex flex-col min-h-[600px]">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <div>
              <CardTitle>Generated Draft</CardTitle>
              <CardDescription>Review and edit your markdown content.</CardDescription>
            </div>
            {generatedOutput && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  {isCopied ? <CheckIcon className="mr-2 h-4 w-4 text-green-500" /> : <CopyIcon className="mr-2 h-4 w-4" />}
                  Copy Markdown
                </Button>
                <Button variant="default" size="sm">
                  <DownloadIcon className="mr-2 h-4 w-4" />
                  Send to CMS
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1 p-0">
            <textarea 
              className={`h-full min-h-[500px] w-full resize-none rounded-b-md border-0 bg-transparent p-6 text-sm focus-visible:outline-none ${!generatedOutput ? 'text-muted-foreground italic' : 'font-mono'}`}
              value={generatedOutput || "Waiting for article brief..."}
              onChange={(e) => setGeneratedOutput(e.target.value)}
              readOnly={!generatedOutput}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
