'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Layers, Database, Webhook, Box, Cloud, Network, Shield } from 'lucide-react';

export function ArchitectureGraph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 bg-[#0B0914] text-white border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20 relative z-10">
          <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 font-mono mb-6">
            <Network className="mr-2 h-4 w-4" /> System Architecture
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Engineered for limitless scale.</h2>
          <p className="text-lg text-white/60">A multi-layer, globally distributed composable commerce engine. Designed from the ground up to support high-volume enterprise traffic with zero latency.</p>
        </div>

        <div className="relative max-w-5xl mx-auto pt-10 pb-20">
          {/* Background Core Glow */}
          <motion.div 
            style={{ opacity: glowOpacity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" 
          />

          <div className="relative z-10 flex flex-col items-center gap-16">
            
            {/* Layer 1: Edge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <div className="text-center text-xs font-mono text-indigo-400 mb-4 uppercase tracking-widest">1. The Delivery Edge</div>
              <div className="w-full max-w-2xl mx-auto p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent">
                <div className="bg-[#131022] rounded-xl border border-white/5 p-6 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-xl">
                  <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
                    <div className="w-12 h-12 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 border border-indigo-500/30 shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                      <Cloud size={24} />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-lg">Global Edge CDN</h3>
                      <p className="text-sm text-white/50">300+ PoPs worldwide</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {['Tokyo', 'London', 'New York'].map(city => (
                      <span key={city} className="px-3 py-1 rounded-md bg-white/5 text-xs text-white/60 border border-white/5">{city}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Connecting Lines */}
            <div className="absolute top-[160px] left-1/2 -translate-x-1/2 h-[80px] w-px bg-gradient-to-b from-indigo-500/50 to-purple-500/50 hidden md:block" />
            
            <div className="absolute top-[180px] left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[40px] border-t border-l border-r border-indigo-500/30 rounded-t-3xl hidden md:block" />

            {/* Layer 2: Compute */}
            <div className="w-full relative mt-4">
              <div className="text-center text-xs font-mono text-purple-400 mb-4 uppercase tracking-widest">2. The Compute Layer</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="bg-[#131022] rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Layers className="text-purple-400 mb-4 h-8 w-8" />
                  <h3 className="font-bold text-lg mb-2">Storefront Renderer</h3>
                  <p className="text-sm text-white/50">Next.js SSR/ISR engine serving headless storefronts.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="bg-[#1A1635] rounded-2xl p-6 border border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.1)] relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent" />
                  <Webhook className="text-indigo-400 mb-4 h-8 w-8 relative z-10" />
                  <h3 className="font-bold text-lg mb-2 relative z-10">GraphQL Core API</h3>
                  <p className="text-sm text-white/70 relative z-10">The central router processing mutations & queries.</p>
                </motion.div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="bg-[#131022] rounded-2xl p-6 border border-white/5 hover:border-purple-500/30 transition-colors group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <Box className="text-purple-400 mb-4 h-8 w-8" />
                  <h3 className="font-bold text-lg mb-2">App Ecosystem</h3>
                  <p className="text-sm text-white/50">Webhook dispatchers and 3rd-party integrations.</p>
                </motion.div>
              </div>
            </div>

            {/* Connecting Lines */}
            <div className="absolute top-[400px] md:top-[380px] left-1/2 -translate-x-1/2 h-[80px] w-px bg-gradient-to-b from-purple-500/50 to-blue-500/50 hidden md:block" />

            {/* Layer 3: Data */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-full mt-4 md:mt-12"
            >
              <div className="text-center text-xs font-mono text-blue-400 mb-4 uppercase tracking-widest">3. The Data Foundation</div>
              <div className="w-full max-w-3xl mx-auto bg-[#131022] border border-white/10 rounded-2xl overflow-hidden shadow-2xl relative">
                 <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
                 <div className="p-8 flex flex-col md:flex-row items-center justify-between gap-8">
                   <div className="flex-1 space-y-4">
                     <div className="flex items-center gap-3">
                       <Database className="text-blue-400 h-6 w-6" />
                       <h3 className="font-bold text-xl">Multi-Tenant Database</h3>
                     </div>
                     <p className="text-white/60 text-sm">PostgreSQL clusters with logical tenant isolation, backed by Redis caching layers and Kafka event streams.</p>
                   </div>
                   <div className="w-full md:w-auto grid grid-cols-2 gap-4">
                      <div className="bg-white/5 px-4 py-3 rounded-lg border border-white/5 flex items-center gap-3">
                        <Shield className="h-4 w-4 text-success" />
                        <span className="text-sm font-medium">SOC2 Type II</span>
                      </div>
                      <div className="bg-white/5 px-4 py-3 rounded-lg border border-white/5 flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                        <span className="text-sm font-medium">Zero Data Loss</span>
                      </div>
                   </div>
                 </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
