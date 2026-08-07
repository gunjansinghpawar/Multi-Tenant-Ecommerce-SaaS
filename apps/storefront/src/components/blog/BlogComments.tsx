'use client';

import { useState } from 'react';
import { Heart, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import { Comment } from './types';

interface BlogCommentsProps {
  initialComments: Comment[];
  postId: string;
}

export function BlogComments({ initialComments, postId }: BlogCommentsProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: `c-${Date.now()}`,
      postId,
      user: { name: 'Guest User' }, // In a real app, get from auth context
      text: newComment,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLike = (commentId: string) => {
    setComments(comments.map(c => {
      if (c.id === commentId) return { ...c, likes: c.likes + 1 };
      if (c.replies) {
        return {
          ...c,
          replies: c.replies.map(r => r.id === commentId ? { ...r, likes: r.likes + 1 } : r)
        };
      }
      return c;
    }));
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`flex ${isReply ? 'ml-12 mt-6' : 'mt-8'}`}>
      <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center overflow-hidden flex-shrink-0">
        {comment.user.avatarUrl ? (
          <img src={comment.user.avatarUrl} alt={comment.user.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-500 font-medium">{comment.user.name.charAt(0)}</span>
        )}
      </div>
      <div className="ml-4 flex-1">
        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-gray-900 dark:text-white">{comment.user.name}</span>
            <span className="text-xs text-gray-500">{format(new Date(comment.createdAt), 'MMM d, yyyy')}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">
            {comment.text}
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-2 ml-2">
          <button 
            onClick={() => handleLike(comment.id)}
            className="flex items-center text-xs font-medium text-gray-500 hover:text-red-500 transition-colors"
          >
            <Heart className="w-3 h-3 mr-1" /> {comment.likes > 0 ? comment.likes : 'Like'}
          </button>
          {!isReply && (
            <button className="flex items-center text-xs font-medium text-gray-500 hover:text-blue-500 transition-colors">
              <MessageSquare className="w-3 h-3 mr-1" /> Reply
            </button>
          )}
        </div>
        
        {/* Render Replies */}
        {comment.replies && comment.replies.map(reply => renderComment(reply, true))}
      </div>
    </div>
  );

  return (
    <div className="mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
        Comments ({comments.reduce((acc, c) => acc + 1 + (c.replies?.length || 0), 0)})
      </h3>

      <form onSubmit={handleSubmit} className="mb-12">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0">
            <span className="text-white dark:text-black font-bold text-sm">G</span>
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Join the discussion..."
              rows={3}
              className="w-full px-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-sm focus:ring-2 focus:ring-black dark:focus:ring-white focus:border-transparent resize-none transition-shadow shadow-sm"
            />
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-6 py-2 bg-black dark:bg-white text-white dark:text-black text-sm font-semibold rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="space-y-2">
        {comments.length > 0 ? (
          comments.map(comment => renderComment(comment))
        ) : (
          <p className="text-center text-gray-500 py-8">Be the first to share your thoughts!</p>
        )}
      </div>
    </div>
  );
}
