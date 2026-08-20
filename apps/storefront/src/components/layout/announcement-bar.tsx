'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@commercex/utils';

export interface AnnouncementBarProps {
  message: string;
  href?: string;
  isClosable?: boolean;
  className?: string;
}

export function AnnouncementBar({
  message,
  href,
  isClosable = true,
  className,
}: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center bg-primary text-primary-foreground px-4 py-2 text-xs md:text-sm font-medium z-50",
        className
      )}
    >
      <div className="flex-1 text-center">
        {href ? (
          <a href={href} className="hover:underline underline-offset-4 decoration-primary-foreground/50">
            {message}
          </a>
        ) : (
          <span>{message}</span>
        )}
      </div>

      {isClosable && (
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          aria-label="Close announcement"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
