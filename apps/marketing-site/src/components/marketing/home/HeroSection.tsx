'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@commercex/ui';
import Link from 'next/link';
import { ArrowRight, Play, CheckCircle2 } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 md:pt-32 md:pb-40">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-info/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            CommerceX Platform 2.0 is now live
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            Build your entire <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-info">ecommerce business</span>
            <br className="hidden md:block" /> from one platform.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Create your store, manage products, sell everywhere, automate customer communication, analyze performance, and scale — all from one connected ecosystem.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link href="/register">
              <Button size="lg" className="rounded-full px-8 h-14 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all group">
                Start Building Free
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/platform">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base group">
                <Play className="mr-2 h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                Explore Platform
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center justify-center gap-6 text-sm text-muted-foreground pt-8"
          >
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-success" /> No credit card required</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-success" /> 14-day free trial</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 size={16} className="text-success" /> Cancel anytime</div>
          </motion.div>
        </div>

        {/* Product UI Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 mx-auto max-w-6xl relative"
        >
          <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col">
            {/* Fake Browser Header */}
            <div className="h-12 border-b border-border bg-muted/50 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-warning/80" />
                <div className="w-3 h-3 rounded-full bg-success/80" />
              </div>
              <div className="mx-auto w-1/2 h-6 bg-background rounded-md border border-border flex items-center justify-center text-xs text-muted-foreground font-mono">
                admin.commercex.app
              </div>
            </div>
            
            {/* Dashboard Mockup content */}
            <div className="flex h-[600px]">
              {/* Sidebar */}
              <div className="w-64 border-r border-border bg-background p-4 hidden md:flex flex-col gap-4">
                <div className="h-8 w-32 bg-muted rounded-md mb-4" />
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-muted rounded-md" />
                    <div className="h-4 w-24 bg-muted rounded-md" />
                  </div>
                ))}
              </div>
              
              {/* Main Content Area */}
              <div className="flex-1 bg-muted/20 p-8 flex flex-col gap-6 overflow-hidden">
                <div className="flex justify-between items-center">
                  <div className="h-8 w-48 bg-muted rounded-md" />
                  <div className="h-8 w-32 bg-primary/20 rounded-md" />
                </div>
                
                {/* Stats row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-background border border-border p-5 rounded-xl shadow-sm space-y-3">
                      <div className="h-4 w-24 bg-muted rounded-md" />
                      <div className="h-8 w-32 bg-foreground/10 rounded-md" />
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="flex-1 bg-background border border-border rounded-xl shadow-sm p-5 flex flex-col gap-4">
                  <div className="h-5 w-32 bg-muted rounded-md" />
                  <div className="flex-1 rounded-lg border border-dashed border-border flex items-end p-4 gap-2">
                    {/* Fake Bar Chart */}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-primary/30 rounded-t-sm"
                        style={{ height: `${Math.random() * 80 + 20}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating UI Elements for depth */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -right-12 top-32 w-64 bg-background border border-border shadow-dialog rounded-xl p-4 hidden lg:block"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success"><CheckCircle2 size={16} /></div>
              <div>
                <div className="text-sm font-medium">Order #4092 Paid</div>
                <div className="text-xs text-muted-foreground">Just now</div>
              </div>
            </div>
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success w-full" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
