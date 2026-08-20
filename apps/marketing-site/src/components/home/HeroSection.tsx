import { Button } from '@commercex/ui';
import { ArrowRight, LayoutDashboard, Database, Globe } from 'lucide-react';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center overflow-hidden pt-36 pb-20">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background pointer-events-none -z-10" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 duration-500 inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8"
        >
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse"></span>
          CommerceX V2.4 is Live
        </div>

        <h1 
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-bold tracking-tight text-foreground mb-6 max-w-5xl mx-auto leading-tight"
        >
          The enterprise commerce platform for <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-info">limitless scale.</span>
        </h1>

        <p 
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 duration-700 delay-200 fill-mode-both text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10 px-2"
        >
          A unified, API-first operating system engineered for high-volume brands, B2B wholesalers, and multi-tenant agencies.
        </p>

        <div 
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both flex flex-col sm:flex-row items-center justify-center gap-4 mb-24 w-full max-w-md mx-auto sm:max-w-none"
        >
          <Button size="lg" className="rounded-full shadow-lg h-14 px-8 text-lg group w-full sm:w-auto" data-track="hero_cta">
            Start Building Free <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Button>
          <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg w-full sm:w-auto" data-track="demo_cta">
            Book a Demo
          </Button>
        </div>
      </div>

      {/* Floating 3D Dashboard Mockup */}
      <div 
        className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both w-full max-w-6xl mx-auto px-4 md:px-6 relative perspective-[1000px]"
      >
        <div className="relative w-full h-[400px] md:h-[600px] xl:h-[700px] rounded-t-[24px] md:rounded-[32px] border border-border bg-card/80 backdrop-blur-3xl shadow-2xl overflow-hidden flex flex-col">
          {/* Mockup Header */}
          <div className="h-10 md:h-12 border-b border-border bg-muted/50 flex items-center px-4 gap-2 shrink-0">
            <div className="flex gap-1.5 hidden sm:flex">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-warning/80" />
              <div className="w-3 h-3 rounded-full bg-success/80" />
            </div>
            <div className="mx-auto bg-background border border-border text-[10px] md:text-xs text-muted-foreground px-3 md:px-4 py-1 rounded-md font-mono flex items-center gap-2 truncate max-w-[200px] md:max-w-xs">
              <Globe size={12} className="shrink-0" aria-hidden="true" /> <span className="truncate">admin.commercex.com</span>
            </div>
          </div>
          {/* Mockup Body */}
          <div className="flex-1 flex p-2 md:p-4 gap-4 overflow-hidden">
            <div className="w-48 hidden lg:flex flex-col gap-2 shrink-0">
              {[1,2,3,4,5,6].map(i => <div key={i} className="h-8 rounded-md bg-muted/50 w-full" />)}
            </div>
            <div className="flex-1 flex flex-col gap-2 md:gap-4 h-full">
               <div className="h-20 md:h-24 rounded-xl border border-border bg-background/50 p-2 md:p-4 flex gap-2 md:gap-4 shrink-0">
                 <div className="flex-1 rounded-md bg-primary/10" />
                 <div className="flex-1 rounded-md bg-success/10 hidden sm:block" />
                 <div className="flex-1 rounded-md bg-warning/10" />
               </div>
               <div className="flex-1 rounded-xl border border-border bg-background/50 p-2 md:p-4 relative overflow-hidden">
                 <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/20 to-transparent" />
                 <svg className="absolute bottom-0 w-full h-full preserve-3d" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                   <path d="M0,100 L0,50 Q25,80 50,40 T100,20 L100,100 Z" fill="currentColor" className="text-primary/10" />
                   <path d="M0,50 Q25,80 50,40 T100,20" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
                 </svg>
               </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div 
          className="absolute -right-8 top-32 p-4 rounded-xl border border-border bg-card shadow-xl hidden lg:flex items-center gap-3 motion-safe:animate-bounce"
        >
          <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success">
            <LayoutDashboard size={20} aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-bold">[DEMO: 14,203]</div>
            <div className="text-xs text-muted-foreground">Orders Today</div>
          </div>
        </div>

        <div 
          className="absolute -left-12 bottom-12 p-4 rounded-xl border border-border bg-card shadow-xl hidden lg:flex items-center gap-3 motion-safe:animate-bounce"
          style={{ animationDelay: '1s' }}
        >
          <div className="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center text-info">
            <Database size={20} aria-hidden="true" />
          </div>
          <div>
            <div className="text-sm font-bold">[DEMO: 24ms]</div>
            <div className="text-xs text-muted-foreground">Global Latency</div>
          </div>
        </div>
      </div>
    </section>
  );
}
