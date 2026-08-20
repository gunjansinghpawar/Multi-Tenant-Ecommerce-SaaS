'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Box, CreditCard, Globe, Rocket, Check, Truck } from 'lucide-react';

const steps = [
  { id: 1, title: 'Choose Theme', icon: Palette, description: 'Start with a premium responsive template tailored to your industry.' },
  { id: 2, title: 'Add Branding', icon: Box, description: 'Live preview colors, fonts, and layouts without a single line of code.' },
  { id: 3, title: 'Configure Store', icon: CreditCard, description: 'Add products, set up payments (Stripe/Razorpay), and define shipping.' },
  { id: 4, title: 'Connect Domain', icon: Globe, description: 'Bring your custom domain and instantly secure it with automated SSL.' },
  { id: 5, title: 'Launch', icon: Rocket, description: 'Publish to our global CDN edge network for sub-second load times.' },
];

export function StoreCreationFlow() {
  const [activeStep, setActiveStep] = useState(1);

  // Auto-cycle through steps for demo purposes
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev % steps.length) + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Instant Store Creation</h2>
          <p className="text-lg text-muted-foreground">
            From concept to live enterprise-grade store in minutes. Our setup workflow handles the infrastructure so you can focus on selling.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center max-w-6xl mx-auto">
          
          {/* Steps List */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            {steps.map((step) => {
              const isActive = activeStep === step.id;
              const isPast = activeStep > step.id;
              return (
                <div 
                  key={step.id} 
                  className={`flex gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-300 ${isActive ? 'bg-muted/50 border border-border shadow-sm scale-105' : 'hover:bg-muted/30 opacity-70'}`}
                  onClick={() => setActiveStep(step.id)}
                >
                  <div className="relative mt-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${isActive ? 'bg-primary border-primary text-primary-foreground shadow-md shadow-primary/20' : isPast ? 'bg-success/10 border-success text-success' : 'bg-background border-muted-foreground/30 text-muted-foreground'}`}>
                      {isPast ? <Check size={18} strokeWidth={3} /> : <step.icon size={18} />}
                    </div>
                    {/* Connecting line */}
                    {step.id !== steps.length && (
                      <div className={`absolute top-10 bottom-[-24px] left-1/2 -translate-x-1/2 w-0.5 ${isPast ? 'bg-success' : 'bg-border'}`} />
                    )}
                  </div>
                  <div>
                    <h4 className={`text-xl font-semibold mb-1 ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>{step.title}</h4>
                    <p className={`text-sm ${isActive ? 'text-muted-foreground' : 'text-muted-foreground/60'}`}>{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Visual Mockup Area */}
          <div className="w-full lg:w-1/2">
            <div className="aspect-[4/3] relative rounded-2xl bg-card border border-border shadow-2xl overflow-hidden p-6 flex flex-col">
              {/* Browser Header */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                  <div className="w-2.5 h-2.5 rounded-full bg-border" />
                </div>
              </div>
              
              {/* Dynamic Content based on step */}
              <div className="flex-1 relative bg-background rounded-xl border border-border flex items-center justify-center p-8 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full flex flex-col items-center justify-center text-center gap-6"
                  >
                    {activeStep === 1 && (
                      <>
                        <div className="grid grid-cols-2 gap-4 w-full">
                          {[1,2,3,4].map(i => (
                            <div key={i} className="aspect-video bg-muted rounded-lg border border-border" />
                          ))}
                        </div>
                      </>
                    )}
                    {activeStep === 2 && (
                      <div className="flex w-full h-full gap-4">
                        <div className="w-1/3 border-r border-border flex flex-col gap-4 pr-4">
                          <div className="h-6 w-full bg-muted rounded" />
                          <div className="h-20 w-full bg-primary/20 rounded border border-primary/30" />
                          <div className="h-10 w-full bg-muted rounded" />
                        </div>
                        <div className="flex-1 bg-muted/20 rounded-lg flex items-center justify-center">
                          <div className="text-4xl font-bold text-primary">Brand Preview</div>
                        </div>
                      </div>
                    )}
                    {activeStep === 3 && (
                      <div className="w-full space-y-4">
                        <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-[#635BFF]/10 rounded flex items-center justify-center"><CreditCard className="text-[#635BFF]" /></div>
                            <span className="font-medium">Stripe</span>
                          </div>
                          <span className="text-success text-sm bg-success/10 px-2 py-1 rounded">Connected</span>
                        </div>
                        <div className="flex justify-between items-center p-4 border border-border rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-500/10 rounded flex items-center justify-center"><Truck className="text-blue-500" /></div>
                            <span className="font-medium">Shiprocket</span>
                          </div>
                          <span className="text-success text-sm bg-success/10 px-2 py-1 rounded">Connected</span>
                        </div>
                      </div>
                    )}
                    {activeStep === 4 && (
                      <div className="w-full space-y-6">
                        <div className="text-lg font-mono p-4 bg-muted rounded-lg border border-border text-center">
                          mystore.com
                        </div>
                        <div className="flex items-center justify-center gap-2 text-success">
                          <Check size={20} />
                          <span>SSL Certificate Provisioned</span>
                        </div>
                      </div>
                    )}
                    {activeStep === 5 && (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center">
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', delay: 0.2 }}
                          className="w-24 h-24 bg-success/20 text-success rounded-full flex items-center justify-center mb-6"
                        >
                          <Rocket size={48} />
                        </motion.div>
                        <h3 className="text-2xl font-bold">Your Store is Live!</h3>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
