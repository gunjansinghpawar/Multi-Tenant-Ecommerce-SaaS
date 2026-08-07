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
  messageGoal: z.string().min(1, "Goal is required"),
  emojiUsage: z.string(),
  ctaType: z.string(),
});

export default function AIWhatsAppPage() {
  const [generatedOutput, setGeneratedOutput] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      messageGoal: "",
      emojiUsage: "Moderate",
      ctaType: "Link to Store",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsGenerating(true);
    setTimeout(() => {
      let emojis = values.emojiUsage === 'High' ? '🚀 🔥 🛍️' : values.emojiUsage === 'Moderate' ? '✨' : '';
      setGeneratedOutput(`Hey there! ${emojis}\n\nWe wanted to share something exciting: ${values.messageGoal}.\n\nDon't miss out on this opportunity. Tap the button below to check it out now!\n\n👇 [${values.ctaType}]`);
      setIsGenerating(false);
    }, 1200);
  };

  const copyToClipboard = () => {
    if (generatedOutput) {
      navigator.clipboard.writeText(generatedOutput);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AI WhatsApp Assistant" 
        text="Generate concise, punchy WhatsApp broadcast messages and templates."
      />
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Message Details</CardTitle>
            <CardDescription>What do you want to communicate?</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Main Objective</label>
                  <textarea 
                    className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g. Let customers know our new app is live and they get 10% off their first order via the app."
                    {...form.register("messageGoal")}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <RHFSelect 
                    name="emojiUsage" 
                    label="Emoji Usage" 
                    options={[
                      { label: "None", value: "None" },
                      { label: "Moderate (Recommended)", value: "Moderate" },
                      { label: "High (Playful)", value: "High" },
                    ]} 
                  />
                  <RHFSelect 
                    name="ctaType" 
                    label="Call to Action (Button)" 
                    options={[
                      { label: "Link to Store", value: "Link to Store" },
                      { label: "Reply for info", value: "Reply for info" },
                      { label: "Track Order", value: "Track Order" },
                    ]} 
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isGenerating}>
                    <SparklesIcon className={`mr-2 h-4 w-4 ${isGenerating ? 'animate-pulse' : ''}`} />
                    {isGenerating ? "Drafting..." : "Generate WhatsApp Message"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col relative overflow-hidden">
          {/* Mock WhatsApp Background */}
          <div className="absolute inset-0 bg-[#E5DDD5] dark:bg-[#0B141A] opacity-50 pointer-events-none z-0" style={{ backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png")', backgroundSize: '400px' }}></div>
          
          <CardHeader className="relative z-10 bg-card/80 backdrop-blur-sm border-b">
            <CardTitle>Preview</CardTitle>
            <CardDescription>How it might look on WhatsApp.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 p-6 relative z-10 flex flex-col justify-end">
            {!generatedOutput ? (
              <div className="flex items-center justify-center h-full text-muted-foreground italic bg-card/60 rounded-md py-8">
                Waiting for input...
              </div>
            ) : (
              <div className="self-start max-w-[85%] bg-white dark:bg-[#202C33] text-gray-900 dark:text-gray-100 p-3 rounded-lg rounded-tl-none shadow-sm space-y-2">
                <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                  {generatedOutput}
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-muted-foreground">10:42 AM</span>
                </div>
              </div>
            )}
            
            {generatedOutput && (
              <div className="mt-6 flex justify-end">
                <Button variant="secondary" onClick={copyToClipboard} className="shadow-md">
                  {isCopied ? <CheckIcon className="mr-2 h-4 w-4 text-green-600" /> : <CopyIcon className="mr-2 h-4 w-4" />}
                  Copy Text
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
