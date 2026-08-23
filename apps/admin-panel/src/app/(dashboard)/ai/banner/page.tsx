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
  campaignGoal: z.string().min(1, "Goal is required"),
  offer: z.string(),
  brandVoice: z.string(),
});

export default function AIBannerPage() {
  const [generatedOutput, setGeneratedOutput] = useState<{headline: string, subheadline: string, cta: string}[] | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      campaignGoal: "",
      offer: "",
      brandVoice: "Playful",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setTimeout(() => {
      setGeneratedOutput([
        {
          headline: `Don't miss out on ${values.offer || 'these deals'}!`,
          subheadline: `Achieve your ${values.campaignGoal} today. Shop now before it's gone.`,
          cta: "Shop the Sale"
        },
        {
          headline: `Unlock the magic of ${values.offer || 'our new collection'}`,
          subheadline: `Step up your game. ${values.campaignGoal.charAt(0).toUpperCase() + values.campaignGoal.slice(1)} made easy.`,
          cta: "Discover Now"
        },
        {
          headline: "Hurry! Limited Time Offer.",
          subheadline: `Get ${values.offer || 'exclusive access'} to help you ${values.campaignGoal}.`,
          cta: "Claim Offer"
        }
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AI Banner Copy" 
        text="Generate catchy headlines, subtext, and CTAs for your website banners and ads."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
            <CardDescription>What are you promoting?</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <RHFInput name="campaignGoal" label="Campaign Goal" inputProps={{ placeholder: "e.g. Sell summer apparel, clear inventory" }} />
                <RHFInput name="offer" label="Specific Offer (Optional)" inputProps={{ placeholder: "e.g. 50% Off Everything, Buy 1 Get 1 Free" }} />
                
                <RHFSelect 
                  name="brandVoice" 
                  label="Brand Voice" 
                  options={[
                    { label: "Playful", value: "Playful" },
                    { label: "Urgent", value: "Urgent" },
                    { label: "Elegant", value: "Elegant" },
                    { label: "Direct", value: "Direct" },
                  ]} 
                />
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isGenerating}>
                    <SparklesIcon className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                    {isGenerating ? "Generating..." : "Generate Banner Copy"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Generated Options</CardTitle>
            <CardDescription>Pick the combination that fits best.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            {!generatedOutput ? (
              <div className="h-full min-h-[200px] flex items-center justify-center text-muted-foreground italic rounded-md border bg-muted/30">
                Waiting for input...
              </div>
            ) : (
              generatedOutput.map((opt, idx) => (
                <div key={idx} className="p-4 border rounded-lg bg-card shadow-sm space-y-3 relative group">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => copyToClipboard(`${opt.headline}\n${opt.subheadline}\nCTA: ${opt.cta}`)}
                    title="Copy this set"
                  >
                    <CopyIcon className="h-4 w-4" />
                  </Button>
                  
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Headline</span>
                    <h3 className="text-xl font-bold tracking-tight mt-1">{opt.headline}</h3>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Subheadline</span>
                    <p className="text-sm text-muted-foreground mt-1">{opt.subheadline}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-muted-foreground uppercase">Button CTA</span>
                    <div className="mt-2">
                      <Button size="sm">{opt.cta}</Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
