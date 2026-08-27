'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@commercex/ui';
import { featuresData, FeatureKey } from '@/lib/data/features';

export function FeatureHero({ featureKey }: { featureKey: FeatureKey }) {
  const feature = featuresData[featureKey];
  const Icon = feature.icon;
  
  return (
    <section className="relative pt-24 pb-32 md:pt-32 md:pb-40 overflow-hidden">
      {/* Dynamic Background Gradients */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br ${feature.color} blur-[120px] rounded-full pointer-events-none opacity-50`} />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
          >
            <Icon className="mr-2 h-4 w-4" /> {feature.title}
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-display tracking-tight leading-[1.1]"
          >
            {feature.subtitle.split('. ')[0]}. <br className="hidden sm:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              {feature.subtitle.split('. ')[1]}
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            {feature.description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all h-12 px-8 text-body bg-primary text-primary-foreground">
              Start Free Trial
            </Button>
            <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-body">
              Book a Demo
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
