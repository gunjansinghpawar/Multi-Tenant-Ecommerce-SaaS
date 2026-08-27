'use client';

import React from 'react';
import { motion } from 'framer-motion';

const techStack = [
  { name: 'Next.js', category: 'Frontend & API', color: 'text-white' },
  { name: 'TypeScript', category: 'Language', color: 'text-blue-500' },
  { name: 'Prisma', category: 'ORM', color: 'text-indigo-400' },
  { name: 'PostgreSQL', category: 'Database', color: 'text-blue-400' },
  { name: 'Redis', category: 'Cache', color: 'text-red-500' },
  { name: 'BullMQ', category: 'Message Queue', color: 'text-amber-500' },
  { name: 'Tailwind CSS', category: 'Styling', color: 'text-cyan-400' },
  { name: 'Framer Motion', category: 'Animations', color: 'text-purple-500' },
];

export function TechStack() {
  return (
    <section className="py-24 border-t border-border bg-muted/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-h2 mb-4">Modern Stack, Enterprise Scale</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We built CommerceX using the most reliable and developer-friendly technologies in the industry.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {techStack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center justify-center p-6 bg-card border border-border rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all"
            >
              <div className={`font-bold text-lg mb-1 ${tech.color}`}>{tech.name}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">{tech.category}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
