'use client';

import { Star } from 'lucide-react';
import { ReviewSummaryData } from './types';

interface ReviewSummaryProps {
  summary: ReviewSummaryData;
  onWriteReview: () => void;
}

export function ReviewSummary({ summary, onWriteReview }: ReviewSummaryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-8 border-b border-gray-100 dark:border-gray-800">
      <div className="md:col-span-4 flex flex-col items-center justify-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl">
        <h3 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          {summary.averageRating.toFixed(1)}
        </h3>
        <div className="flex items-center mt-3 mb-2 space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-5 h-5 ${
                star <= Math.round(summary.averageRating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
              }`}
            />
          ))}
        </div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          Based on {summary.totalReviews} reviews
        </p>
      </div>

      <div className="md:col-span-8 flex flex-col justify-center space-y-3">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = summary.ratingDistribution[rating as keyof typeof summary.ratingDistribution];
          const percentage = summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;

          return (
            <div key={rating} className="flex items-center text-sm group">
              <div className="flex items-center w-12 font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                <span>{rating}</span>
                <Star className="w-3.5 h-3.5 ml-1 fill-current" />
              </div>
              <div className="flex-1 mx-4 h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-10 text-right text-gray-500 dark:text-gray-500 font-medium text-xs">
                {percentage > 0 ? Math.round(percentage) : 0}%
              </div>
            </div>
          );
        })}
      </div>

      <div className="md:col-span-12 flex justify-center mt-4 md:mt-0">
        <button
          onClick={onWriteReview}
          className="px-8 py-3.5 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-all active:scale-95 shadow-lg shadow-black/10 dark:shadow-white/10"
        >
          Write a Review
        </button>
      </div>
    </div>
  );
}
