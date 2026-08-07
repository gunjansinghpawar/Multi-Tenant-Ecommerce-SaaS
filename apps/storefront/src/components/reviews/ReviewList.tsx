'use client';

import { useState } from 'react';
import { Filter, ChevronDown } from 'lucide-react';
import { Review } from './types';
import { ReviewCard } from './ReviewCard';

interface ReviewListProps {
  reviews: Review[];
  currentUserId?: string;
  onEditReview?: (review: Review) => void;
  onDeleteReview?: (reviewId: string) => void;
}

export function ReviewList({ reviews, currentUserId, onEditReview, onDeleteReview }: ReviewListProps) {
  const [sort, setSort] = useState<'helpful' | 'newest' | 'highest' | 'lowest'>('helpful');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const filteredReviews = reviews.filter((review) => {
    if (filterRating && review.rating !== filterRating) return false;
    return true;
  });

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sort) {
      case 'helpful':
        return b.helpfulVotes - a.helpfulVotes;
      case 'newest':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  return (
    <div className="mt-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-gray-100 dark:border-gray-800 space-y-4 sm:space-y-0">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {reviews.length} Reviews
        </h3>
        
        <div className="flex items-center space-x-4">
          {/* Filter */}
          <div className="relative group">
            <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
              <Filter className="w-4 h-4" />
              <span>{filterRating ? `${filterRating} Stars` : 'Filter'}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="py-2">
                <button
                  onClick={() => setFilterRating(null)}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors ${!filterRating ? 'bg-gray-50 dark:bg-gray-800 text-black dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                >
                  All Stars
                </button>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setFilterRating(rating)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${filterRating === rating ? 'bg-gray-50 dark:bg-gray-800 text-black dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  >
                    {rating} Stars
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sort */}
          <div className="relative group">
            <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
              <span>Sort: {
                sort === 'helpful' ? 'Most Helpful' : 
                sort === 'newest' ? 'Newest' : 
                sort === 'highest' ? 'Highest Rating' : 'Lowest Rating'
              }</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <div className="py-2">
                {[
                  { id: 'helpful', label: 'Most Helpful' },
                  { id: 'newest', label: 'Newest' },
                  { id: 'highest', label: 'Highest Rating' },
                  { id: 'lowest', label: 'Lowest Rating' }
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setSort(option.id as any)}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${sort === option.id ? 'bg-gray-50 dark:bg-gray-800 text-black dark:text-white font-medium' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {sortedReviews.length > 0 ? (
          sortedReviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              currentUserId={currentUserId}
              onEdit={onEditReview}
              onDelete={onDeleteReview}
            />
          ))
        ) : (
          <div className="py-12 text-center text-gray-500 dark:text-gray-400">
            No reviews found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
