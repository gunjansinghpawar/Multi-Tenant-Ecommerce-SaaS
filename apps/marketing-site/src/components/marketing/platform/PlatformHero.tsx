'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Server } from 'lucide-react';

export function PlatformHero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
          >
            <Server className="mr-2 h-4 w-4" /> Platform Architecture
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display tracking-tight leading-[1.1]"
          >
            Engineered for <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              unrelenting scale.
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Underneath the beautiful interface is a battle-tested, multi-tenant architecture processing millions of transactions with sub-second latency.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
