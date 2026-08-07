'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@commercex/ui';
import { cn } from '@commercex/utils';

interface SeoBlockProps {
  title: string;
  content: React.ReactNode;
  className?: string;
}

export function SeoBlock({ title, content, className }: SeoBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={cn("bg-muted/30 border-t border-border py-12 md:py-16 mt-16", className)}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-4">{title}</h2>
        
        <div 
          className={cn(
            "prose prose-sm sm:prose-base dark:prose-invert max-w-none transition-all duration-500 overflow-hidden text-muted-foreground",
            isExpanded ? "max-h-[2000px]" : "max-h-[100px]"
          )}
        >
          {content}
        </div>
        
        <div className={cn(
          "relative flex justify-center pt-4",
          !isExpanded && "mt-[-40px] pt-[40px] bg-gradient-to-t from-muted/30 to-transparent"
        )}>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary font-medium"
          >
            {isExpanded ? (
              <>Read Less <ChevronUp className="ml-2 h-4 w-4" /></>
            ) : (
              <>Read More <ChevronDown className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
