'use client';

import { Sparkles, Info } from 'lucide-react';
import { useState } from 'react';

interface SizeRecommenderProps {
  recommendedSize: string;
  confidence: number;
  reason: string;
}

export function SizeRecommender({ recommendedSize, confidence, reason }: SizeRecommenderProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl p-4 mb-6">
      <div className="flex items-start">
        <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            We recommend size <span className="font-bold text-blue-700 dark:text-blue-400">{recommendedSize}</span> for you.
          </p>
          
          <button 
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline mt-1 flex items-center"
          >
            <Info className="w-3 h-3 mr-1" /> Why this size?
          </button>

          {showDetails && (
            <div className="mt-3 text-xs text-gray-600 dark:text-gray-300 bg-white/50 dark:bg-black/50 p-3 rounded-lg border border-white/20 dark:border-gray-700/50">
              <p className="mb-2">{reason}</p>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden mr-3">
                  <div 
                    className="bg-blue-600 dark:bg-blue-500 h-full rounded-full" 
                    style={{ width: `${confidence}%` }}
                  />
                </div>
                <span className="font-medium text-blue-700 dark:text-blue-400">{confidence}% Match</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
