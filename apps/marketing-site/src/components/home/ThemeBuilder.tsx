'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Paintbrush, LayoutTemplate, Palette, Type } from 'lucide-react';

const themes = [
  { id: 'minimal', name: 'Minimal', primary: '#000000', secondary: '#F5F5F5', font: 'font-sans', radius: 'rounded-none' },
  { id: 'playful', name: 'Playful', primary: '#6366F1', secondary: '#EEF2FF', font: 'font-mono', radius: 'rounded-3xl' },
  { id: 'luxury', name: 'Luxury', primary: '#9381FF', secondary: '#0B0914', font: 'font-serif', radius: 'rounded-md' },
];

export function ThemeBuilder() {
  const [activeTheme, setActiveTheme] = useState(themes[1]);

  return (
    <section className="py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              <Paintbrush className="mr-2 h-4 w-4" /> Visual Editor
            </div>
            <h2 className="text-h2">Design without limits.</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Don't get boxed in by rigid templates. Our visual engine allows you to completely transform your storefront's DNA without writing a single line of CSS.
            </p>
            
            <div className="space-y-6 pt-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Select a Base Vibe</h4>
              <div className="flex flex-wrap gap-4">
                {themes.map(t => (
                  <button
                    key={t.id}
                    onClick={() => setActiveTheme(t)}
                    className={`px-6 py-3 rounded-xl border flex items-center gap-3 transition-all ${activeTheme.id === t.id ? 'border-primary bg-primary/5 shadow-sm' : 'border-border bg-card hover:border-muted-foreground/30'}`}
                  >
                    <div className="flex gap-1">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.primary }} />
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: t.secondary }} />
                    </div>
                    <span className="font-medium">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
               <div className="p-4 rounded-xl bg-card border border-border">
                 <Type className="text-primary mb-2" />
                 <div className="font-bold">Typography</div>
                 <div className="text-xs text-muted-foreground">800+ Google Fonts</div>
               </div>
               <div className="p-4 rounded-xl bg-card border border-border">
                 <LayoutTemplate className="text-primary mb-2" />
                 <div className="font-bold">Layouts</div>
                 <div className="text-xs text-muted-foreground">CSS Grid Native</div>
               </div>
            </div>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="relative aspect-[4/5] sm:aspect-square w-full rounded-[24px] lg:rounded-[32px] bg-muted/30 border border-border p-4 sm:p-8 flex items-center justify-center overflow-hidden order-1 lg:order-2">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <motion.div 
              layout
              className={`w-full max-w-sm bg-background border border-border shadow-2xl overflow-hidden ${activeTheme.font} ${activeTheme.radius === 'rounded-none' ? '' : activeTheme.radius === 'rounded-3xl' ? 'rounded-[2rem]' : 'rounded-lg'}`}
              style={{ backgroundColor: activeTheme.secondary, color: activeTheme.secondary === '#0B0914' ? '#fff' : '#000' }}
            >
              {/* Header */}
              <div className="h-14 border-b border-border/50 flex items-center justify-between px-6">
                 <div className="font-bold text-lg tracking-tight">BRAND.</div>
                 <div className="flex gap-4">
                   <div className="w-4 h-4 rounded-full border border-current opacity-50" />
                   <div className="w-4 h-4 rounded-full border border-current opacity-50" />
                 </div>
              </div>

              {/* Hero */}
              <div className="p-8 text-center space-y-4">
                <motion.h3 layout className="text-3xl font-bold">New Arrival</motion.h3>
                <motion.p layout className="text-sm opacity-70">The summer collection is here.</motion.p>
                <motion.button 
                  layout
                  className={`mt-4 px-6 py-2 font-bold text-sm transition-all ${activeTheme.radius === 'rounded-none' ? '' : activeTheme.radius === 'rounded-3xl' ? 'rounded-full' : 'rounded-md'}`}
                  style={{ backgroundColor: activeTheme.primary, color: activeTheme.primary === '#F5F5F5' ? '#000' : '#fff' }}
                >
                  Shop Now
                </motion.button>
              </div>

              {/* Products */}
              <div className="p-6 grid grid-cols-2 gap-4 bg-background/50 backdrop-blur-md">
                 <div className={`aspect-[3/4] bg-muted/50 ${activeTheme.radius === 'rounded-none' ? '' : 'rounded-xl'}`} />
                 <div className={`aspect-[3/4] bg-muted/50 ${activeTheme.radius === 'rounded-none' ? '' : 'rounded-xl'}`} />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
