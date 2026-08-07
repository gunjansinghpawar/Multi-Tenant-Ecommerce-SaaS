'use client';

import { useState } from 'react';
import { Star, ThumbsUp, ThumbsDown, MoreVertical, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { Review } from './types';
import { MediaGallery } from './MediaGallery';

interface ReviewCardProps {
  review: Review;
  currentUserId?: string;
  onEdit?: (review: Review) => void;
  onDelete?: (reviewId: string) => void;
}

export function ReviewCard({ review, currentUserId, onEdit, onDelete }: ReviewCardProps) {
  const [helpfulStatus, setHelpfulStatus] = useState<'up' | 'down' | null>(null);
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulVotes);
  const [showMenu, setShowMenu] = useState(false);

  const isAuthor = currentUserId === review.user.id;

  const handleVote = (type: 'up' | 'down') => {
    if (helpfulStatus === type) {
      // Toggle off
      setHelpfulStatus(null);
      setHelpfulCount(type === 'up' ? helpfulCount - 1 : helpfulCount + 1);
    } else {
      // Toggle on (and potentially switch from other)
      const diff = type === 'up' 
        ? (helpfulStatus === 'down' ? 2 : 1) 
        : (helpfulStatus === 'up' ? -2 : -1);
      
      setHelpfulStatus(type);
      setHelpfulCount(helpfulCount + diff);
    }
  };

  return (
    <div className="py-6 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
            {review.user.avatarUrl ? (
              <img src={review.user.avatarUrl} alt={review.user.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {review.user.name.charAt(0).toUpperCase()}
              </span>
            )}
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-gray-900 dark:text-white">{review.user.name}</span>
              {review.isVerifiedPurchase && (
                <span className="flex items-center text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded-full font-medium">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified Purchase
                </span>
              )}
            </div>
            
            <div className="flex items-center space-x-2 mt-1">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${star <= review.rating ? 'fill-current' : 'text-gray-300 dark:text-gray-700'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(review.createdAt), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
        </div>

        {isAuthor && (
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 transition-colors"
            >
              <MoreVertical className="w-5 h-5" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-100 dark:border-gray-800 overflow-hidden z-10">
                <button
                  onClick={() => { setShowMenu(false); onEdit?.(review); }}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Edit Review
                </button>
                <button
                  onClick={() => { setShowMenu(false); onDelete?.(review.id); }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                >
                  Delete Review
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4">
        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{review.title}</h4>
        <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">{review.text}</p>
      </div>

      {review.media && review.media.length > 0 && (
        <MediaGallery media={review.media} />
      )}

      <div className="mt-6 flex items-center space-x-4">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">Was this helpful?</span>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleVote('up')}
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              helpfulStatus === 'up'
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${helpfulStatus === 'up' ? 'fill-current' : ''}`} />
            <span>{helpfulCount}</span>
          </button>
          <button
            onClick={() => handleVote('down')}
            className={`p-1.5 rounded-full transition-colors ${
              helpfulStatus === 'down'
                ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                : 'text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            <ThumbsDown className={`w-4 h-4 ${helpfulStatus === 'down' ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
}
