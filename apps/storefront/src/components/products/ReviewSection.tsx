'use client';

import { useState } from 'react';
import { Star, MoreVertical, Flag, MessageSquare, ThumbsUp } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  content: string;
  helpfulCount: number;
  replies: { author: string; content: string; date: string }[];
}

export function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      author: 'Sarah Jenkins',
      date: '2 months ago',
      rating: 5,
      content: 'Absolutely love this! The quality is outstanding and it fits perfectly. Would highly recommend.',
      helpfulCount: 24,
      replies: [
        { author: 'Storefront Support', content: 'Thank you so much for the kind words, Sarah! We are thrilled you love it.', date: '1 month ago' }
      ]
    },
    {
      id: '2',
      author: 'Mike Roberts',
      date: '3 weeks ago',
      rating: 4,
      content: 'Great product, but shipping took a little longer than expected. Otherwise, very happy.',
      helpfulCount: 5,
      replies: []
    }
  ]);

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const handleReport = (id: string) => {
    alert('Review has been reported to moderators.');
    setActiveMenuId(null);
  };

  const handleHelpful = (id: string) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, helpfulCount: r.helpfulCount + 1 } : r));
  };

  const submitReply = (e: React.FormEvent, reviewId: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('reply') as HTMLInputElement;
    
    setReviews(reviews.map(r => {
      if (r.id === reviewId) {
        return {
          ...r,
          replies: [...r.replies, { author: 'You', content: input.value, date: 'Just now' }]
        };
      }
      return r;
    }));
    
    setReplyingTo(null);
  };

  return (
    <div className="py-12 border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Reviews</h2>
        <button className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black font-bold rounded-full hover:bg-gray-900 transition-colors">
          Write a Review
        </button>
      </div>

      <div className="space-y-8">
        {reviews.map(review => (
          <div key={review.id} className="bg-gray-50 dark:bg-gray-900 rounded-3xl p-6 sm:p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 dark:text-gray-700'}`} />
                  ))}
                </div>
                <h3 className="font-bold text-gray-900 dark:text-white">{review.author}</h3>
                <span className="text-xs text-gray-500">{review.date}</span>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => setActiveMenuId(activeMenuId === review.id ? null : review.id)}
                  className="p-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors"
                >
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>

                {activeMenuId === review.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-10">
                    <button onClick={() => { setReplyingTo(review.id); setActiveMenuId(null); }} className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                      <MessageSquare className="w-4 h-4 mr-3 text-gray-400" /> Reply
                    </button>
                    <button onClick={() => handleReport(review.id)} className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Flag className="w-4 h-4 mr-3" /> Report
                    </button>
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{review.content}</p>
            
            <button 
              onClick={() => handleHelpful(review.id)}
              className="flex items-center text-sm font-medium text-gray-500 hover:text-black dark:hover:text-white transition-colors mb-6"
            >
              <ThumbsUp className="w-4 h-4 mr-2" /> Helpful ({review.helpfulCount})
            </button>

            {/* Replies */}
            {review.replies.length > 0 && (
              <div className="pl-4 sm:pl-6 border-l-2 border-gray-200 dark:border-gray-700 space-y-4">
                {review.replies.map((reply, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center">
                        {reply.author === 'Storefront Support' ? (
                          <span className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 px-2 py-0.5 rounded text-xs mr-2">Brand</span>
                        ) : null}
                        {reply.author}
                      </h4>
                      <span className="text-xs text-gray-500">{reply.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{reply.content}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Reply Input Box */}
            {replyingTo === review.id && (
              <form onSubmit={(e) => submitReply(e, review.id)} className="mt-4 pl-4 sm:pl-6 border-l-2 border-gray-200 dark:border-gray-700">
                <input 
                  type="text" 
                  name="reply"
                  placeholder="Write a reply..." 
                  className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 mb-2"
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button type="button" onClick={() => setReplyingTo(null)} className="text-xs font-medium text-gray-500 hover:text-black px-3 py-1.5 rounded-md">Cancel</button>
                  <button type="submit" className="text-xs font-bold bg-black dark:bg-white text-white dark:text-black px-4 py-1.5 rounded-full hover:bg-gray-900">Post Reply</button>
                </div>
              </form>
            )}

          </div>
        ))}
      </div>
    </div>
  );
}
