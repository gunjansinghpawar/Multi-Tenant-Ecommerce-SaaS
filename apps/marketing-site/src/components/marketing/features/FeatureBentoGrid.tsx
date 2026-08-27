'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { featuresData, FeatureKey } from '@/lib/data/features';
import { cn } from '@/lib/utils';

export function FeatureBentoGrid({ featureKey }: { featureKey: FeatureKey }) {
  const feature = featuresData[featureKey];
  return (
    <section className="py-24 bg-muted/10 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-h2 mb-4">Everything you need to scale</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We don't compromise on architecture. Every feature in CommerceX is designed to deliver absolute performance and security.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {feature.bentoItems.map((item, index) => {
            const Icon = item.icon;
            const isWide = item.colSpan === 2;
            
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "bg-card border border-border rounded-3xl p-8 relative overflow-hidden group transition-all hover:shadow-lg",
                  isWide ? "lg:col-span-2" : "col-span-1"
                )}
              >
                {/* Background ambient icon */}
                <div className="absolute -bottom-8 -right-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-48 h-48 text-foreground" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-background border border-border flex items-center justify-center text-foreground mb-6 shadow-sm group-hover:border-primary/50 group-hover:text-primary transition-colors">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed max-w-md">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
