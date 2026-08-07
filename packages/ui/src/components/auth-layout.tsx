import React from "react";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { CommandIcon } from "lucide-react";

export interface AuthLayoutProps {
  children: React.ReactNode;
  heading: string;
  description: string;
  illustration?: React.ReactNode;
  illustrationTitle?: string;
  illustrationDescription?: string;
  brandName?: string;
}

export function AuthLayout({
  children,
  heading,
  description,
  illustration,
  illustrationTitle = "Streamline your commerce operations.",
  illustrationDescription = "The enterprise-grade platform for modern multi-tenant SaaS architectures.",
  brandName = "CommerceX"
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background">
      
      {/* LEFT COLUMN: FORM */}
      <div className="flex flex-col p-6 md:p-10 justify-between h-full relative z-10">
        <div className="flex items-center justify-between w-full">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CommandIcon className="h-5 w-5" />
            </div>
            {brandName}
          </Link>
          <ThemeToggle />
        </div>
        
        <div className="flex-1 flex flex-col justify-center max-w-[420px] w-full mx-auto py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight mb-2">{heading}</h1>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
          
          {children}
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground max-w-[420px] w-full mx-auto mt-auto pt-6">
          <Link href="/support" className="hover:text-foreground transition-colors hover:underline">Support</Link>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-foreground transition-colors hover:underline">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors hover:underline">Privacy</Link>
          </div>
        </div>
      </div>
      
      {/* RIGHT COLUMN: BRANDING & ILLUSTRATION */}
      <div className="hidden md:flex flex-col relative bg-muted p-10 overflow-hidden border-l border-border">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02] bg-[size:20px_20px]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl opacity-50 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col h-full justify-between items-center text-center">
          <div className="w-full flex-1 flex items-center justify-center">
            {illustration || (
              <div className="relative w-full max-w-md aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl border border-primary/10 flex items-center justify-center backdrop-blur-sm shadow-2xl animate-in zoom-in duration-1000">
                <CommandIcon className="w-32 h-32 text-primary/40" />
                <div className="absolute inset-4 bg-background/40 backdrop-blur-xl rounded-xl border border-border/50 flex flex-col p-6 shadow-inner">
                   <div className="w-1/2 h-4 bg-primary/20 rounded mb-4" />
                   <div className="w-full h-12 bg-muted/50 rounded-lg mb-3" />
                   <div className="w-full h-12 bg-muted/50 rounded-lg mb-3" />
                   <div className="w-full flex-1 bg-primary/10 rounded-lg" />
                </div>
              </div>
            )}
          </div>
          
          <div className="max-w-md mx-auto space-y-4 mb-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
            <h2 className="text-2xl font-bold tracking-tight">{illustrationTitle}</h2>
            <p className="text-muted-foreground">{illustrationDescription}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
