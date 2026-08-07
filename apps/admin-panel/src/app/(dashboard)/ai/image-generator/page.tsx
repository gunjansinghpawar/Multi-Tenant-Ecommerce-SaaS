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
  RHFSelect
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { SparklesIcon, ImageIcon, DownloadIcon } from "lucide-react";

const formSchema = z.object({
  prompt: z.string().min(1, "Prompt is required"),
  style: z.string(),
  aspectRatio: z.string(),
});

export default function AIImageGeneratorPage() {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      style: "Photorealistic",
      aspectRatio: "1:1 (Square)",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setTimeout(() => {
      // Simulate generated image with a placeholder
      setGeneratedImage(`https://picsum.photos/seed/${Math.random()}/600/600`);
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AI Image Generator" 
        text="Create stunning product lifestyle images, banners, and promotional graphics."
      />
      
      <div className="grid gap-6 md:grid-cols-12">
        <Card className="md:col-span-5 h-fit">
          <CardHeader>
            <CardTitle>Image Prompt</CardTitle>
            <CardDescription>Describe what you want to see.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="flex min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g. A sleek, modern coffee maker sitting on a marble kitchen counter, morning sunlight streaming through a window..."
                    {...form.register("prompt")}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <RHFSelect 
                    name="style" 
                    label="Art Style" 
                    options={[
                      { label: "Photorealistic", value: "Photorealistic" },
                      { label: "Minimalist", value: "Minimalist" },
                      { label: "3D Render", value: "3D Render" },
                      { label: "Illustration", value: "Illustration" },
                    ]} 
                  />
                  <RHFSelect 
                    name="aspectRatio" 
                    label="Aspect Ratio" 
                    options={[
                      { label: "1:1 (Square)", value: "1:1 (Square)" },
                      { label: "16:9 (Landscape)", value: "16:9 (Landscape)" },
                      { label: "9:16 (Portrait)", value: "9:16 (Portrait)" },
                    ]} 
                  />
                </div>
                
                <div className="pt-4">
                  <Button type="submit" className="w-full" disabled={isGenerating}>
                    <SparklesIcon className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                    {isGenerating ? "Generating Image..." : "Generate"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="md:col-span-7 flex flex-col min-h-[500px]">
          <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
            <div>
              <CardTitle>Output</CardTitle>
              <CardDescription>Your generated image will appear here.</CardDescription>
            </div>
            {generatedImage && (
              <Button variant="outline" size="sm">
                <DownloadIcon className="mr-2 h-4 w-4" />
                Download HD
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1 p-6 flex items-center justify-center bg-muted/20">
            {!generatedImage ? (
              <div className="flex flex-col items-center justify-center text-muted-foreground">
                <ImageIcon className={`h-16 w-16 mb-4 ${isGenerating ? 'animate-pulse text-primary' : 'opacity-20'}`} />
                <p className="italic">{isGenerating ? "Painting pixels..." : "Waiting for prompt..."}</p>
              </div>
            ) : (
              <div className="relative rounded-md overflow-hidden border shadow-sm w-full h-full max-h-[600px] flex items-center justify-center bg-black/5">
                <img 
                  src={generatedImage} 
                  alt="AI Generated Output" 
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
