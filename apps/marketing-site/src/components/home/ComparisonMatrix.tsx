'use client';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, MinusCircle, ArrowRight, Package, Rocket } from 'lucide-react';
import { Button } from '@commercex/ui';
import Link from 'next/link';

export function ComparisonMatrix() {
  const rows = [
    { feature: 'Multi-Tenant Architecture', us: 'Native', shopify: 'Requires Multiple Accounts', custom: 'Custom Build ($$$)' },
    { feature: 'B2B Wholesale Pricing', us: 'Native', shopify: 'Paid App / Plus Only', custom: 'Custom Build ($$$)' },
    { feature: 'API Rate Limits', us: 'Uncapped', shopify: 'Strictly Capped', custom: 'Uncapped' },
    { feature: 'Transaction Fees', us: '0%', shopify: 'Up to 2%', custom: '0%' },
    { feature: 'Maintenance Overhead', us: 'Zero (SaaS)', shopify: 'Zero (SaaS)', custom: 'High (DevOps Required)' },
  ];

  return (
    <section className="py-32 bg-background border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-h2 mb-4">Why choose CommerceX?</h2>
          <p className="text-lg text-muted-foreground">The sweet spot between the ease of SaaS and the flexibility of custom open-source.</p>
        </div>

        <div className="max-w-5xl mx-auto overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="p-6 font-bold text-lg border-b border-border text-foreground w-1/4">Feature</th>
                <th className="p-6 font-bold text-xl border-b-2 border-primary text-primary bg-primary/5 rounded-t-xl w-1/4 text-center">CommerceX</th>
                <th className="p-6 font-bold text-lg border-b border-border text-muted-foreground w-1/4 text-center">Shopify Plus</th>
                <th className="p-6 font-bold text-lg border-b border-border text-muted-foreground w-1/4 text-center">Custom Build</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <motion.tr 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="border-b border-border/50 hover:bg-muted/20"
                >
                  <td className="p-6 font-medium text-foreground">{row.feature}</td>
                  <td className="p-6 font-bold text-center bg-primary/5 text-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle2 size={16} className="text-success" />
                      {row.us}
                    </div>
                  </td>
                  <td className="p-6 text-center text-muted-foreground">
                     <div className="flex items-center justify-center gap-2">
                      <MinusCircle size={16} />
                      {row.shopify}
                    </div>
                  </td>
                  <td className="p-6 text-center text-muted-foreground">
                     <div className="flex items-center justify-center gap-2">
                      <XCircle size={16} className="text-destructive" />
                      {row.custom}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-24 relative overflow-hidden rounded-[32px] bg-card/40 backdrop-blur-3xl border border-white/5 p-12 md:p-20 flex flex-col items-center text-center shadow-[0_0_80px_-20px_rgba(var(--primary),0.1)]">
           <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
           <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/20 blur-[100px] rounded-full pointer-events-none" />
           
           <h3 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight z-10 relative">
             Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-info">migrate?</span>
           </h3>
           <p className="text-muted-foreground text-lg mb-10 max-w-2xl z-10 relative">
             Join scaling brands [DEMO CONTENT - Insert real user metrics here] that have transitioned to the CommerceX operating system. Our dedicated engineering team guarantees zero downtime during your migration.
           </p>
           
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4 z-10 relative w-full sm:w-auto">
             <Link href="/demo" className="w-full sm:w-auto" data-track="migration_cta">
               <Button size="lg" className="w-full rounded-full shadow-[0_0_40px_-10px_rgba(var(--primary),0.5)] hover:shadow-[0_0_60px_-15px_rgba(var(--primary),0.7)] h-14 px-10 text-lg group transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                 Book a Migration Assessment
                 <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
               </Button>
             </Link>
             <Link href="/contact" className="w-full sm:w-auto" data-track="contact_sales">
                <Button variant="outline" size="lg" className="w-full rounded-full h-14 px-10 text-lg hover:bg-white/5 transition-colors border-white/10">
                  Talk to Sales
                </Button>
             </Link>
           </div>
           
           {/* Decorative elements */}
           <div className="absolute top-10 left-10 w-24 h-24 border border-white/5 rounded-full bg-white/5 backdrop-blur-3xl hidden md:flex items-center justify-center opacity-50 shadow-inner">
             <Package size={32} className="text-primary/50" />
           </div>
           <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/5 rounded-full bg-white/5 backdrop-blur-3xl hidden md:flex items-center justify-center opacity-50 shadow-inner">
             <Rocket size={40} className="text-info/50" />
           </div>
        </div>
      </div>
    </section>
  );
}
