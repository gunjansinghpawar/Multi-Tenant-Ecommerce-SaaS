'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Terminal } from 'lucide-react';

const codeSnippet = `query getProductDetails {
  product(slug: "summer-collection-tee") {
    id
    title
    description
    variants {
      edges {
        node {
          id
          price { amount currencyCode }
          inventory { available }
        }
      }
    }
  }
}`;

const responseSnippet = `{
  "data": {
    "product": {
      "id": "gid://commercex/Product/101",
      "title": "Summer Collection Tee",
      "variants": {
        "edges": [
          {
            "node": {
              "price": { "amount": "29.99", "currencyCode": "USD" },
              "inventory": { "available": 42 }
            }
          }
        ]
      }
    }
  }
}`;

export function HeadlessCode() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  return (
    <section className="py-32 bg-[#0B0914] text-white border-t border-white/10 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 order-1 lg:order-1">
            <div className="inline-flex items-center rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-sm font-medium text-indigo-400 font-mono">
              <Terminal className="mr-2 h-4 w-4" /> API-First
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Decouple your frontend.</h2>
            <p className="text-lg text-white/60 leading-relaxed">
              Build bespoke digital experiences on any device. Our GraphQL API provides sub-50ms query times, letting you fetch exactly what you need for lightning-fast headless storefronts.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 font-mono text-sm text-indigo-300">Next.js</div>
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 font-mono text-sm text-indigo-300">Remix</div>
              <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 font-mono text-sm text-indigo-300">React Native</div>
            </div>
          </div>

          <div ref={containerRef} className="order-2 lg:order-2 w-full max-w-2xl mx-auto bg-[#1E1E1E] rounded-xl overflow-hidden border border-white/10 shadow-2xl font-mono text-sm">
            {/* Editor Header */}
            <div className="h-10 bg-[#2D2D2D] border-b border-white/5 flex items-center px-4 gap-2">
              <div className="flex gap-1.5 hidden sm:flex">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
              </div>
              <div className="flex-1 text-center text-[#858585] text-[10px] md:text-xs truncate px-4">graphql.commercex.com/api</div>
            </div>
            
            <div className="grid md:grid-cols-2">
              <div className="p-4 md:p-6 border-b md:border-b-0 md:border-r border-white/5">
                <div className="text-[#858585] mb-2 text-xs">Request (GraphQL)</div>
                <motion.pre 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="text-[#9CDCFE] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  <code>
                    <span className="text-[#C586C0]">query</span> <span className="text-[#DCDCAA]">getProductDetails</span> {'{\n'}
                    {'  '}product(slug: <span className="text-[#CE9178]">"summer-tee"</span>) {'{\n'}
                    {'    '}id{'\n'}
                    {'    '}title{'\n'}
                    {'    '}variants {'{\n'}
                    {'      '}edges {'{\n'}
                    {'        '}node {'{\n'}
                    {'          '}price {'{'} amount {'}'}{'\n'}
                    {'        }'}{'\n'}
                    {'      }'}{'\n'}
                    {'    }'}{'\n'}
                    {'  }'}{'\n'}
                    {'}'}
                  </code>
                </motion.pre>
              </div>
              
              <div className="p-6 bg-[#1A1A1A]">
                <div className="text-[#858585] mb-2 text-xs">Response (JSON)</div>
                <motion.pre 
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="text-[#9CDCFE] overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  <code>
                    {'{'}{'\n'}
                    {'  '}<span className="text-[#9CDCFE]">"data"</span>: {'{'}{'\n'}
                    {'    '}<span className="text-[#9CDCFE]">"product"</span>: {'{'}{'\n'}
                    {'      '}<span className="text-[#9CDCFE]">"title"</span>: <span className="text-[#CE9178]">"Summer Tee"</span>,{'\n'}
                    {'      '}<span className="text-[#9CDCFE]">"variants"</span>: {'{'}{'\n'}
                    {'        '}<span className="text-[#9CDCFE]">"edges"</span>: [{'\n'}
                    {'          '}{'{'}{'\n'}
                    {'            '}<span className="text-[#9CDCFE]">"node"</span>: {'{'}{'\n'}
                    {'              '}<span className="text-[#9CDCFE]">"price"</span>: {'{'} <span className="text-[#9CDCFE]">"amount"</span>: <span className="text-[#B5CEA8]">"29.99"</span> {'}'}{'\n'}
                    {'            '}{'}'}{'\n'}
                    {'          '}{'}'}{'\n'}
                    {'        '}]{'\n'}
                    {'      '}{'}'}{'\n'}
                    {'    '}{'}'}{'\n'}
                    {'  '}{'}'}{'\n'}
                    {'}'}
                  </code>
                </motion.pre>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
