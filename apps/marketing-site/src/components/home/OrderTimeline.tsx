'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, CreditCard, Box, MessageCircle, Truck } from 'lucide-react';

export function OrderTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const steps = [
    { icon: ShoppingBag, title: "Checkout Initiated", desc: "Edge-rendered cart loads in 40ms.", color: "text-blue-500", bg: "bg-blue-500/10" },
    { icon: CreditCard, title: "Payment Processed", desc: "Native Stripe integration clears payment.", color: "text-indigo-500", bg: "bg-indigo-500/10" },
    { icon: Box, title: "Inventory Synced", desc: "Multi-tenant DB locks and decrements stock.", color: "text-purple-500", bg: "bg-purple-500/10" },
    { icon: MessageCircle, title: "WhatsApp Sent", desc: "Automated confirmation sent to customer.", color: "text-success", bg: "bg-success/10" },
    { icon: Truck, title: "Fulfillment Created", desc: "3PL API pinged for dispatch.", color: "text-primary", bg: "bg-primary/10" },
  ];

  return (
    <section ref={containerRef} className="py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-24">
          <h2 className="text-h2 mb-4">Event-driven workflow.</h2>
          <p className="text-lg text-muted-foreground">Every action emits an event. Build complex internal workflows or trigger external services seamlessly.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Track */}
          <div className="absolute left-[27px] md:left-1/2 top-0 bottom-0 w-1 bg-muted -translate-x-1/2 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 w-full bg-primary"
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => {
              const stepProgress = (index + 1) / steps.length;
              // Fade in slightly before the line reaches it
              const opacity = useTransform(scrollYProgress, [stepProgress - 0.2, stepProgress], [0.3, 1]);
              const scale = useTransform(scrollYProgress, [stepProgress - 0.2, stepProgress], [0.9, 1]);

              return (
                <motion.div 
                  key={index}
                  style={{ opacity, scale }}
                  className={`relative flex items-center md:justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className="hidden md:block md:w-5/12" />
                  
                  {/* Center Node */}
                  <div className="absolute left-[27px] md:left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border-4 border-background bg-card shadow-lg flex items-center justify-center z-10">
                    <step.icon size={20} className={step.color} />
                  </div>

                  {/* Content Card */}
                  <div className="ml-20 md:ml-0 md:w-5/12 w-full">
                    <div className="p-6 rounded-[24px] border border-border bg-card shadow-sm">
                      <div className={`inline-flex items-center justify-center w-8 h-8 rounded-lg ${step.bg} ${step.color} mb-4`}>
                        <span className="font-mono text-sm font-bold">{index + 1}</span>
                      </div>
                      <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                      <p className="text-muted-foreground text-sm">{step.desc}</p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
