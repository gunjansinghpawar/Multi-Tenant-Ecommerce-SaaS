'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Server, Database, ArrowRight, Zap, Shield, Blocks } from 'lucide-react';

export function ArchitectureDiagram() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="w-full aspect-auto md:aspect-[21/9] min-h-[600px] rounded-[32px] border border-border bg-card/50 backdrop-blur-3xl relative flex items-center justify-center p-8 overflow-hidden shadow-2xl">
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background opacity-50" />
          
          <div className="relative z-10 w-full h-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
            
            {/* Edge Layer */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 w-full md:w-1/3"
            >
              <div className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">Edge Layer</div>
              <div className="w-full bg-background border border-border rounded-2xl p-6 shadow-lg relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Globe className="h-10 w-10 text-blue-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Global CDN</h3>
                <p className="text-sm text-muted-foreground">300+ Edge nodes caching storefronts for sub-second delivery globally.</p>
                
                {/* Flow particles out of Edge */}
                <motion.div 
                  className="absolute top-1/2 -right-8 w-2 h-2 rounded-full bg-blue-500 hidden md:block"
                  animate={{ x: [0, 80], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
                <motion.div 
                  className="absolute top-1/2 -right-8 w-2 h-2 rounded-full bg-blue-500 hidden md:block"
                  animate={{ x: [0, 80], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
                />
              </div>
            </motion.div>

            {/* API Layer */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center gap-4 w-full md:w-1/3"
            >
              <div className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">Compute Layer</div>
              <div className="w-full bg-background border border-primary/30 rounded-2xl p-6 shadow-xl relative group shadow-primary/10">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl" />
                <Server className="h-10 w-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">API Gateway</h3>
                <p className="text-sm text-muted-foreground">Auto-scaling Node.js services orchestrating GraphQL and REST payloads.</p>
                
                {/* Flow particles out of API */}
                <motion.div 
                  className="absolute top-1/2 -right-8 w-2 h-2 rounded-full bg-primary hidden md:block"
                  animate={{ x: [0, 80], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
                <motion.div 
                  className="absolute top-1/2 -right-8 w-2 h-2 rounded-full bg-primary hidden md:block"
                  animate={{ x: [0, 80], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear", delay: 0.75 }}
                />
              </div>
              
              <div className="w-full bg-background border border-border rounded-xl p-4 flex items-center justify-between shadow-sm mt-2">
                 <div className="flex items-center gap-2 text-sm font-medium">
                   <Zap className="h-4 w-4 text-amber-500" /> BullMQ Workers
                 </div>
              </div>
            </motion.div>

            {/* Data Layer */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-4 w-full md:w-1/3"
            >
              <div className="text-sm font-bold tracking-widest text-muted-foreground uppercase mb-2">Data Layer</div>
              <div className="w-full bg-background border border-border rounded-2xl p-6 shadow-lg relative group">
                <div className="absolute inset-0 bg-gradient-to-l from-emerald-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Database className="h-10 w-10 text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">Isolated DBs</h3>
                <p className="text-sm text-muted-foreground">Strict Row-Level Security and logical separation for true multi-tenancy.</p>
              </div>
              
              <div className="w-full bg-background border border-border rounded-xl p-4 flex items-center justify-between shadow-sm mt-2">
                 <div className="flex items-center gap-2 text-sm font-medium">
                   <Blocks className="h-4 w-4 text-red-500" /> Redis Cache
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
