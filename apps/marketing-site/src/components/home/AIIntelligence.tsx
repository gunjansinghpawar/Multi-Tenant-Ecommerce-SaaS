'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Sparkles, Bot } from 'lucide-react';
import { Button } from '@commercex/ui';

export function AIIntelligence() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isGenerating, setIsGenerating] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      setTimeout(() => setIsGenerating(true), 500);
    }
  }, [isInView]);

  return (
    <section className="py-32 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div ref={containerRef} className="order-2 lg:order-1 relative aspect-square md:aspect-video lg:aspect-square w-full max-w-md mx-auto rounded-[32px] bg-card border border-border shadow-2xl p-6 flex flex-col justify-center">
            {/* Ambient Glow */}
            <motion.div 
              animate={{ opacity: isGenerating ? [0.2, 0.5, 0.2] : 0 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-primary/20 pointer-events-none rounded-[32px]"
            />
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Bot size={20} />
                </div>
                <div className="font-bold">CommerceX AI</div>
              </div>
              
              <div className="p-4 rounded-xl bg-background border border-border text-sm text-muted-foreground">
                Write a high-converting product description for a "Minimalist Ceramic Coffee Mug".
              </div>
              
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 text-sm">
                {isGenerating ? (
                   <motion.div 
                     initial={{ opacity: 0 }} 
                     animate={{ opacity: 1 }}
                     className="space-y-2 text-foreground"
                   >
                     <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Elevate your morning ritual.</motion.p>
                     <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>Crafted from premium matte ceramic, this minimalist mug holds heat longer while staying cool to the touch. The ergonomic handle is designed for perfect balance.</motion.p>
                     <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="pt-2 flex gap-2">
                       <span className="px-2 py-1 bg-background rounded-md text-xs border border-border">#homedecor</span>
                       <span className="px-2 py-1 bg-background rounded-md text-xs border border-border">#coffee</span>
                     </motion.div>
                   </motion.div>
                ) : (
                   <div className="flex gap-1 items-center text-primary h-12">
                     <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                     <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                     <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
                   </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8 order-1 lg:order-2">
            <div className="inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm font-medium text-purple-600 dark:text-purple-400">
              <Sparkles className="mr-2 h-4 w-4" /> Embedded AI Intelligence
            </div>
            <h2 className="text-h2">Automate the busywork.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Our native AI engine writes product descriptions, generates SEO metadata, segments customers, and predicts inventory stockouts before they happen.
            </p>
            
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium">SEO Generation</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium">Customer Sentiment Analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-medium">Demand Forecasting</span>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
