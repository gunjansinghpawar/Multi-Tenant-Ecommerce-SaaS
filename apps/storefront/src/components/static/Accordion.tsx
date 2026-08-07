'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  allowMultiple?: boolean;
}

export function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    const newOpenIds = new Set(openIds);
    if (newOpenIds.has(id)) {
      newOpenIds.delete(id);
    } else {
      if (!allowMultiple) {
        newOpenIds.clear();
      }
      newOpenIds.add(id);
    }
    setOpenIds(newOpenIds);
  };

  return (
    <div className="w-full space-y-4">
      {items.map((item) => {
        const isOpen = openIds.has(item.id);
        
        return (
          <div 
            key={item.id} 
            className="border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-gray-900 transition-colors"
          >
            <button
              onClick={() => toggle(item.id)}
              className="flex justify-between items-center w-full p-6 text-left"
            >
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {item.title}
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
              />
            </button>
            
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-6 pt-0 text-gray-600 dark:text-gray-300 prose prose-sm dark:prose-invert max-w-none">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
