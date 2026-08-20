'use client';
import { motion } from 'framer-motion';

const integrations = [
  { name: 'Stripe', color: 'from-indigo-500/20 to-purple-500/20', border: 'border-indigo-500/30' },
  { name: 'Razorpay', color: 'from-blue-500/20 to-cyan-500/20', border: 'border-blue-500/30' },
  { name: 'Shiprocket', color: 'from-amber-500/20 to-orange-500/20', border: 'border-amber-500/30' },
  { name: 'Algolia', color: 'from-blue-600/20 to-indigo-600/20', border: 'border-blue-600/30' },
  { name: 'Contentful', color: 'from-sky-500/20 to-blue-500/20', border: 'border-sky-500/30' },
  { name: 'Sanity', color: 'from-red-500/20 to-rose-500/20', border: 'border-red-500/30' },
  { name: 'Klaviyo', color: 'from-emerald-500/20 to-teal-500/20', border: 'border-emerald-500/30' },
  { name: 'Mailchimp', color: 'from-yellow-400/20 to-amber-500/20', border: 'border-yellow-500/30' },
];

export function IntegrationsMarquee() {
  // Duplicate array for seamless loop
  const marqueeItems = [...integrations, ...integrations, ...integrations];

  return (
    <section className="py-32 bg-background border-t border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-20 text-center">
        <h2 className="text-h2 mb-4">Plays nicely with others.</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Native integrations with the tools you already rely on. Drop them into your CommerceX stack with zero configuration.</p>
      </div>

      <div className="relative w-full overflow-hidden flex flex-col gap-6 pb-8">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-64 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-64 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Track 1 (Moves Left) */}
        <motion.div 
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ ease: "linear", duration: 40, repeat: Infinity }}
          className="flex w-max gap-6 px-4"
        >
          {marqueeItems.map((integration, i) => (
            <div 
              key={i} 
              className={`flex-shrink-0 w-56 h-24 rounded-2xl bg-gradient-to-br ${integration.color} ${integration.border} border border-b-4 flex items-center justify-center shadow-lg backdrop-blur-sm group hover:-translate-y-1 transition-transform cursor-pointer`}
            >
              <span className="font-bold text-xl text-foreground group-hover:scale-110 transition-transform">{integration.name}</span>
            </div>
          ))}
        </motion.div>

        {/* Track 2 (Moves Right) */}
        <motion.div 
          animate={{ x: ["-33.33%", "0%"] }}
          transition={{ ease: "linear", duration: 45, repeat: Infinity }}
          className="flex w-max gap-6 px-4"
        >
          {[...marqueeItems].reverse().map((integration, i) => (
            <div 
              key={i} 
              className={`flex-shrink-0 w-56 h-24 rounded-2xl bg-card border border-border border-b-4 flex items-center justify-center shadow-lg group hover:border-primary/50 transition-colors cursor-pointer`}
            >
              <span className="font-bold text-xl text-muted-foreground group-hover:text-foreground transition-colors">{integration.name}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
