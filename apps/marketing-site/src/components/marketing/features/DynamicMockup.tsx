'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LayoutDashboard, BarChart3, MessageSquare, Code, Image as ImageIcon, ShoppingCart } from 'lucide-react';
import { featuresData, FeatureKey } from '@/lib/data/features';

export function DynamicMockup({ featureKey }: { featureKey: FeatureKey }) {
  const feature = featuresData[featureKey];
  
  const renderMockupContent = () => {
    switch (feature.mockupType) {
      case 'builder':
        return (
          <div className="flex h-full w-full bg-background">
            <div className="w-1/4 border-r border-border p-4 space-y-4">
              <div className="h-8 bg-muted rounded-md w-3/4" />
              <div className="grid grid-cols-2 gap-2">
                {[...Array(6)].map((_, i) => <div key={i} className="h-16 bg-muted/50 rounded border border-border flex items-center justify-center"><ImageIcon className="text-muted-foreground opacity-30" /></div>)}
              </div>
            </div>
            <div className="w-3/4 p-8 flex flex-col items-center justify-center bg-muted/20">
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="w-full max-w-md bg-card border border-border shadow-2xl rounded-lg p-6 space-y-4"
               >
                 <div className="h-48 bg-muted rounded-md flex items-center justify-center">
                    <ImageIcon className="text-muted-foreground opacity-50 w-12 h-12" />
                 </div>
                 <div className="h-6 bg-primary/20 rounded w-1/2 mx-auto" />
                 <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
                 <div className="h-10 bg-primary rounded-full w-full mt-4" />
               </motion.div>
            </div>
          </div>
        );
      
      case 'dashboard':
        return (
          <div className="flex h-full w-full bg-background flex-col p-6 space-y-6">
            <div className="flex justify-between items-center">
              <div className="h-8 bg-muted rounded-md w-48" />
              <div className="h-8 bg-primary/20 rounded-full w-24" />
            </div>
            <div className="grid grid-cols-3 gap-4">
               {[...Array(3)].map((_, i) => (
                 <div key={i} className="bg-card border border-border rounded-xl p-4 space-y-2">
                   <div className="h-4 bg-muted rounded w-1/2" />
                   <div className="h-8 bg-foreground/10 rounded w-3/4" />
                 </div>
               ))}
            </div>
            <div className="flex-1 bg-card border border-border rounded-xl p-4 space-y-4">
               <div className="h-6 bg-muted rounded w-32" />
               {[...Array(4)].map((_, i) => (
                 <div key={i} className="flex justify-between items-center border-b border-border pb-2">
                   <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center"><ShoppingCart className="w-4 h-4 text-muted-foreground" /></div>
                     <div className="h-4 bg-muted rounded w-32" />
                   </div>
                   <div className="h-4 bg-primary/20 rounded w-16" />
                 </div>
               ))}
            </div>
          </div>
        );
        
      case 'marketing':
      case 'charts':
        return (
          <div className="flex h-full w-full bg-background flex-col p-8 space-y-8">
            <div className="flex items-end h-48 gap-2 border-b border-border pb-4">
              {[...Array(12)].map((_, i) => (
                <motion.div 
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 100 + 20}%` }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="flex-1 bg-gradient-to-t from-primary/50 to-primary rounded-t-sm"
                />
              ))}
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="h-32 bg-card border border-border rounded-xl p-4 flex items-center justify-center">
                 <BarChart3 className="text-primary w-12 h-12 opacity-50" />
              </div>
              <div className="h-32 bg-card border border-border rounded-xl p-4 flex items-center justify-center">
                 <BarChart3 className="text-info w-12 h-12 opacity-50" />
              </div>
            </div>
          </div>
        );
        
      case 'ai-chat':
        return (
          <div className="flex h-full w-full bg-background flex-col">
            <div className="flex-1 p-6 space-y-6 overflow-hidden">
               <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex gap-4 max-w-[80%]">
                 <div className="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center"><MessageSquare className="w-4 h-4 text-primary-foreground" /></div>
                 <div className="bg-card border border-border rounded-2xl rounded-tl-none p-4 text-sm text-muted-foreground">
                   I have generated 1,452 SEO-optimized product descriptions based on your new inventory sync. Would you like to review them?
                 </div>
               </motion.div>
               <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse">
                 <div className="w-8 h-8 rounded-full bg-muted flex-shrink-0" />
                 <div className="bg-primary/20 text-primary rounded-2xl rounded-tr-none p-4 text-sm">
                   Yes, apply them to the storefront immediately.
                 </div>
               </motion.div>
            </div>
            <div className="p-4 border-t border-border">
              <div className="h-10 bg-muted rounded-full w-full relative">
                <div className="absolute right-2 top-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"><div className="w-2 h-2 bg-white rounded-sm" /></div>
              </div>
            </div>
          </div>
        );
        
      case 'code':
        return (
          <div className="flex h-full w-full bg-[#0d1117] flex-col font-mono text-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-white/40 ml-4 text-xs">query.graphql</span>
            </div>
            <div className="p-6 text-emerald-400 space-y-1">
              <div><span className="text-pink-400">query</span> GetProduct {'{'}</div>
              <div className="pl-4">product(id: <span className="text-yellow-300">"gid://123"</span>) {'{'}</div>
              <div className="pl-8 text-blue-300">title</div>
              <div className="pl-8 text-blue-300">description</div>
              <div className="pl-8 text-blue-300">variants {'{'}</div>
              <div className="pl-12 text-blue-300">price</div>
              <div className="pl-12 text-blue-300">inventoryQuantity</div>
              <div className="pl-8">{'}'}</div>
              <div className="pl-4">{'}'}</div>
              <div>{'}'}</div>
            </div>
          </div>
        );
        
      default:
        return <div className="flex items-center justify-center h-full w-full"><LayoutDashboard className="w-16 h-16 text-muted-foreground opacity-20" /></div>;
    }
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="w-full max-w-5xl mx-auto aspect-[16/10] md:aspect-[21/9] rounded-[24px] border border-border bg-card/50 backdrop-blur-3xl relative overflow-hidden shadow-2xl group">
          {/* Ambient Glow */}
          <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-20 group-hover:opacity-30 transition-opacity`} />
          
          {/* Mac OS Window frame wrapper */}
          <div className="absolute inset-x-0 top-0 h-10 border-b border-border bg-background/50 flex items-center px-4 gap-2 z-20">
            <div className="w-3 h-3 rounded-full bg-border" />
            <div className="w-3 h-3 rounded-full bg-border" />
            <div className="w-3 h-3 rounded-full bg-border" />
          </div>
          
          <div className="absolute inset-0 top-10 z-10 overflow-hidden bg-background">
            {renderMockupContent()}
          </div>
        </div>
      </div>
    </section>
  );
}
