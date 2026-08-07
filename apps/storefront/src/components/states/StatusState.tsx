import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatusStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  type?: 'error' | 'warning' | 'success' | 'info';
  actionText?: string;
  onAction?: () => void;
}

export function StatusState({ icon: Icon, title, description, type = 'info', actionText, onAction }: StatusStateProps) {
  
  const getStyles = () => {
    switch (type) {
      case 'error': return { bg: 'bg-red-50 dark:bg-red-900/20', iconColor: 'text-red-500', btn: 'bg-red-600 hover:bg-red-700 text-white' };
      case 'warning': return { bg: 'bg-yellow-50 dark:bg-yellow-900/20', iconColor: 'text-yellow-500', btn: 'bg-yellow-600 hover:bg-yellow-700 text-white' };
      case 'success': return { bg: 'bg-green-50 dark:bg-green-900/20', iconColor: 'text-green-500', btn: 'bg-green-600 hover:bg-green-700 text-white' };
      default: return { bg: 'bg-gray-100 dark:bg-gray-800', iconColor: 'text-gray-900 dark:text-white', btn: 'bg-black hover:bg-gray-900 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black' };
    }
  };

  const styles = getStyles();

  return (
    <div className="w-full min-h-[50vh] flex flex-col items-center justify-center p-4">
      <div className={`w-full max-w-lg ${styles.bg} rounded-3xl p-8 sm:p-12 text-center shadow-sm border border-gray-100 dark:border-gray-800/50`}>
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 bg-white dark:bg-gray-900 shadow-sm ${styles.iconColor}`}>
          <Icon className="w-10 h-10" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">{description}</p>
        
        {actionText && (
          <button 
            onClick={onAction}
            className={`px-8 py-3 font-bold rounded-full transition-colors ${styles.btn}`}
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
}
