import React from 'react';
import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionText, actionHref, onAction }: EmptyStateProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="w-24 h-24 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center mb-6">
        <Icon className="w-10 h-10 text-gray-400 dark:text-gray-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
      <p className="text-gray-500 max-w-md mb-8">{description}</p>
      
      {actionText && (
        <>
          {actionHref ? (
            <Link 
              href={actionHref}
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
            >
              {actionText}
            </Link>
          ) : (
            <button 
              onClick={onAction}
              className="px-8 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors"
            >
              {actionText}
            </button>
          )}
        </>
      )}
    </div>
  );
}
