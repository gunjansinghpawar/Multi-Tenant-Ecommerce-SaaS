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
import { SparklesIcon, CopyIcon, CheckIcon, StarIcon } from "lucide-react";

const formSchema = z.object({
  reviewText: z.string().min(1, "Review text is required"),
  tone: z.string(),
  rating: z.string(),
});

export default function AIReviewResponsePage() {
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      reviewText: "",
      tone: "Professional & Empathetic",
      rating: "1 Star",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setTimeout(() => {
      let response = "";
      if (values.rating.includes("1") || values.rating.includes("2")) {
        response = `Hi there, we're so sorry to hear about your experience. Your feedback is incredibly important to us. Please reach out to our support team directly at support@store.com so we can make this right.`;
      } else {
        response = `Thank you so much for your feedback! We're thrilled to hear you had a good experience. We look forward to serving you again soon!`;
      }
      setGeneratedOutput(response);
      setIsGenerating(false);
    }, 1200);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedOutput);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AI Review Response" 
        text="Generate polite, professional replies to customer reviews instantly."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Review</CardTitle>
            <CardDescription>Paste the review you need to respond to.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Review Text</label>
                  <textarea 
                    className="flex min-h-[150px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g. 'The product arrived late and the packaging was damaged. Very disappointed.' "
                    {...form.register("reviewText")}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <RHFSelect 
                    name="rating" 
                    label="Star Rating Given" 
                    options={[
                      { label: "1 Star (Negative)", value: "1 Star" },
                      { label: "2 Stars", value: "2 Stars" },
                      { label: "3 Stars (Neutral)", value: "3 Stars" },
                      { label: "4 Stars", value: "4 Stars" },
                      { label: "5 Stars (Positive)", value: "5 Stars" },
                    ]} 
                  />
                  <RHFSelect 
                    name="tone" 
                    label="Response Tone" 
                    options={[
                      { label: "Professional & Empathetic", value: "Professional & Empathetic" },
                      { label: "Friendly & Upbeat", value: "Friendly & Upbeat" },
                      { label: "Direct & Solution-oriented", value: "Direct & Solution-oriented" },
                    ]} 
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isGenerating}>
                    <SparklesIcon className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                    {isGenerating ? "Drafting Reply..." : "Generate Reply"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Generated Reply</CardTitle>
              <CardDescription>Review and copy to your platform.</CardDescription>
            </div>
            {generatedOutput && (
              <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy reply">
                {isCopied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            <div className={`h-full min-h-[250px] w-full rounded-md border bg-muted/30 p-4 text-sm ${!generatedOutput ? 'text-muted-foreground flex items-center justify-center italic' : 'whitespace-pre-wrap'}`}>
              {generatedOutput || "Waiting for input..."}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
