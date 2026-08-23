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
  pageContent: z.string().min(1, "Page content or topic is required"),
  primaryKeyword: z.string().min(1, "Primary keyword is required"),
  pageType: z.string(),
});

export default function AISEOPage() {
  const [generatedOutput, setGeneratedOutput] = useState<{title: string, desc: string, slug: string} | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pageContent: "",
      primaryKeyword: "",
      pageType: "Product Page",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedOutput({
        title: `Buy ${values.primaryKeyword} Online | Premium ${values.pageType}`,
        desc: `Looking for the best ${values.primaryKeyword}? Discover our high-quality selection tailored for your needs. Fast shipping and great prices. Shop now!`,
        slug: `/${values.primaryKeyword.toLowerCase().replace(/\s+/g, '-')}`
      });
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AI SEO Generator" 
        text="Automatically generate meta titles, descriptions, and URL slugs."
      />
      
      <div className="grid gap-6 md:grid-cols-5">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Page Context</CardTitle>
            <CardDescription>Provide details to optimize for search engines.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFSelect 
                  name="pageType" 
                  label="Page Type" 
                  options={[
                    { label: "Product Page", value: "Product Page" },
                    { label: "Category Page", value: "Category Page" },
                    { label: "Blog Post", value: "Blog Post" },
                    { label: "Landing Page", value: "Landing Page" },
                  ]} 
                />
                
                <RHFInput name="primaryKeyword" label="Primary Keyword" inputProps={{ placeholder: "e.g. Running Shoes" }} />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Page Content Summary</label>
                  <textarea 
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Briefly describe what this page is about..."
                    {...form.register("pageContent")}
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isGenerating}>
                    <SparklesIcon className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                    {isGenerating ? "Optimizing..." : "Generate SEO Tags"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="md:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>SEO Output</CardTitle>
            <CardDescription>Copy and paste these tags into your page settings.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-6">
            {!generatedOutput ? (
              <div className="h-full min-h-[200px] flex items-center justify-center text-muted-foreground italic rounded-md border bg-muted/30">
                Waiting for input...
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Meta Title (Max 60 chars)</label>
                    <span className={`text-xs ${generatedOutput.title.length > 60 ? 'text-red-500' : 'text-green-500'}`}>
                      {generatedOutput.title.length}/60
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <RHFInput name="out_title" inputProps={{ value: generatedOutput.title, readOnly: true }} />
                    <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(generatedOutput.title)}><CopyIcon className="h-4 w-4" /></Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Meta Description (Max 160 chars)</label>
                    <span className={`text-xs ${generatedOutput.desc.length > 160 ? 'text-red-500' : 'text-green-500'}`}>
                      {generatedOutput.desc.length}/160
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <textarea 
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none"
                      value={generatedOutput.desc} 
                      readOnly 
                    />
                    <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(generatedOutput.desc)}><CopyIcon className="h-4 w-4" /></Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">URL Slug</label>
                  <div className="flex gap-2">
                    <RHFInput name="out_slug" inputProps={{ value: generatedOutput.slug, readOnly: true }} />
                    <Button variant="outline" size="icon" onClick={() => navigator.clipboard.writeText(generatedOutput.slug)}><CopyIcon className="h-4 w-4" /></Button>
                  </div>
                </div>
                
                {/* Google SERP Preview */}
                <div className="mt-8 p-4 border rounded-lg bg-white dark:bg-[#202124] shadow-sm">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-3">Google Search Preview</h4>
                  <div className="text-[14px] text-[#202124] dark:text-[#dadce0]">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-muted"></div>
                      <span className="text-[#202124] dark:text-[#dadce0] truncate">https://yourstore.com{generatedOutput.slug}</span>
                    </div>
                    <div className="text-[20px] text-[#1a0dab] dark:text-[#8ab4f8] hover:underline cursor-pointer truncate">
                      {generatedOutput.title}
                    </div>
                    <div className="text-[14px] text-[#4d5156] dark:text-[#bdc1c6] mt-1 line-clamp-2">
                      {generatedOutput.desc}
                    </div>
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
