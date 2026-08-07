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
import { SparklesIcon, CopyIcon, CheckIcon, ArrowRightIcon } from "lucide-react";

const formSchema = z.object({
  sourceLanguage: z.string(),
  targetLanguage: z.string(),
  textToTranslate: z.string().min(1, "Text is required"),
  tonePreservation: z.boolean(),
});

export default function AITranslationPage() {
  const [translatedText, setTranslatedText] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sourceLanguage: "English",
      targetLanguage: "Spanish",
      textToTranslate: "",
      tonePreservation: true,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsTranslating(true);
    setTimeout(() => {
      setTranslatedText(`[Translated to ${values.targetLanguage} with preserved tone]\n\nEste es un texto de ejemplo traducido que demuestra las capacidades de la IA. La traducción no solo convierte las palabras, sino que también intenta mantener el estilo y el contexto originales de su contenido.`);
      setIsTranslating(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const languages = [
    { label: "English", value: "English" },
    { label: "Spanish", value: "Spanish" },
    { label: "French", value: "French" },
    { label: "German", value: "German" },
    { label: "Italian", value: "Italian" },
    { label: "Hindi", value: "Hindi" },
    { label: "Arabic", value: "Arabic" },
    { label: "Chinese (Simplified)", value: "Chinese (Simplified)" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="AI Translation" 
        text="Translate product descriptions, policies, or emails into multiple languages."
      />
      
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Original Content</CardTitle>
            <CardDescription>Enter the text you want to translate.</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4 items-center">
                  <RHFSelect name="sourceLanguage" label="Source Language" options={languages} />
                  <RHFSelect name="targetLanguage" label="Target Language" options={languages} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Text to Translate</label>
                  <textarea 
                    className="flex min-h-[300px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Enter English text here..."
                    {...form.register("textToTranslate")}
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button type="submit" disabled={isTranslating} className="w-full md:w-auto">
                    {isTranslating ? "Translating..." : "Translate Content"}
                    {!isTranslating && <ArrowRightIcon className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Translation Output</CardTitle>
              <CardDescription>Context-aware AI translation.</CardDescription>
            </div>
            {translatedText && (
              <Button variant="ghost" size="icon" onClick={copyToClipboard} title="Copy translation">
                {isCopied ? <CheckIcon className="h-4 w-4 text-green-500" /> : <CopyIcon className="h-4 w-4" />}
              </Button>
            )}
          </CardHeader>
          <CardContent className="flex-1">
            <textarea 
              className={`h-full min-h-[300px] w-full resize-none rounded-md border-0 bg-muted/30 p-4 text-sm focus-visible:outline-none ${!translatedText ? 'text-muted-foreground flex items-center justify-center italic' : ''}`}
              value={translatedText || "Translated text will appear here..."}
              readOnly
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
