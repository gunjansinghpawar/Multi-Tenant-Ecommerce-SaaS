'use client';

import { useState } from 'react';
import { Star, MessageCircle, AlertTriangle, Edit2, Trash2, MoreVertical, X } from 'lucide-react';
import Link from 'next/link';

interface Review {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  rating: number;
  date: string;
  comment: string;
  status: 'Published' | 'Pending';
  merchantReply?: {
    id: string;
    author: string;
    date: string;
    text: string;
    userReply?: string; // Users can reply to the merchant
  };
}

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 'r1',
      productId: 'p1',
      productName: 'Linen Summer Blazer',
      productImage: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=800&auto=format&fit=crop',
      rating: 5,
      date: 'Oct 15, 2026',
      comment: 'Absolutely love this blazer. The fit is perfect and the material is very breathable.',
      status: 'Published',
      merchantReply: {
        id: 'mr1',
        author: 'Store Support',
        date: 'Oct 16, 2026',
        text: 'Thank you for your wonderful review! We are so glad you love the blazer.'
      }
    },
    {
      id: 'r2',
      productId: 'p2',
      productName: 'Ceramic Mug',
      productImage: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=800&auto=format&fit=crop',
      rating: 3,
      date: 'Oct 10, 2026',
      comment: 'Nice mug, but it arrived with a small chip on the handle.',
      status: 'Published',
      merchantReply: {
        id: 'mr2',
        author: 'Store Support',
        date: 'Oct 11, 2026',
        text: 'We sincerely apologize for the damage! Please contact support and we will send a replacement immediately.'
      }
    }
  ]);

  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  
  // Modals state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [editText, setEditText] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [replyText, setReplyText] = useState('');

  const openEditModal = (review: Review) => {
    setSelectedReview(review);
    setEditText(review.comment);
    setEditRating(review.rating);
    setIsEditModalOpen(true);
    setActiveMenuId(null);
  };

  const openReplyModal = (review: Review) => {
    setSelectedReview(review);
    setReplyText(review.merchantReply?.userReply || '');
    setIsReplyModalOpen(true);
    setActiveMenuId(null);
  };

  const openReportModal = (review: Review) => {
    setSelectedReview(review);
    setIsReportModalOpen(true);
    setActiveMenuId(null);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReview) {
      setReviews(reviews.map(r => r.id === selectedReview.id ? { ...r, comment: editText, rating: editRating } : r));
    }
    setIsEditModalOpen(false);
  };

  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedReview && selectedReview.merchantReply) {
      setReviews(reviews.map(r => {
        if (r.id === selectedReview.id) {
          return {
            ...r,
            merchantReply: { ...r.merchantReply!, userReply: replyText }
          };
        }
        return r;
      }));
    }
    setIsReplyModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
    setActiveMenuId(null);
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for reporting. Our moderation team will review this shortly.');
    setIsReportModalOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Reviews</h1>
        <p className="text-gray-500">Manage all your product reviews in one place.</p>
      </div>

      <div className="space-y-6">
        {reviews.map(review => (
          <div key={review.id} className="bg-white dark:bg-gray-900 rounded-3xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm relative">
            
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="w-20 h-20 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                <img src={review.productImage} alt={review.productName} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Link href={`/products/${review.productId}`} className="font-bold text-lg text-gray-900 dark:text-white hover:underline">
                      {review.productName}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400' : 'text-gray-300 dark:text-gray-700'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{review.date}</span>
                      <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full">{review.status}</span>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <button onClick={() => setActiveMenuId(activeMenuId === review.id ? null : review.id)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                    {activeMenuId === review.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-10">
                        <button onClick={() => openEditModal(review)} className="w-full flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <Edit2 className="w-4 h-4 mr-3" /> Edit
                        </button>
                        <button onClick={() => handleDelete(review.id)} className="w-full flex items-center px-4 py-3 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                          <Trash2 className="w-4 h-4 mr-3" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mt-3">{review.comment}</p>

                {/* Merchant Reply Section */}
                {review.merchantReply && (
                  <div className="mt-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm bg-black text-white dark:bg-white dark:text-black px-2 py-0.5 rounded text-[10px] uppercase">Merchant</span>
                        <span className="font-bold text-sm text-gray-900 dark:text-white">{review.merchantReply.author}</span>
                        <span className="text-xs text-gray-500">{review.merchantReply.date}</span>
                      </div>
                      <button onClick={() => openReportModal(review)} title="Report this reply" className="text-gray-400 hover:text-red-500 transition-colors">
                        <AlertTriangle className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{review.merchantReply.text}</p>
                    
                    {/* User Reply to Merchant */}
                    {review.merchantReply.userReply ? (
                      <div className="ml-4 pl-4 border-l-2 border-gray-200 dark:border-gray-700 mt-3">
                        <span className="font-bold text-sm text-gray-900 dark:text-white">Your Reply</span>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{review.merchantReply.userReply}</p>
                        <button onClick={() => openReplyModal(review)} className="text-xs font-bold text-blue-600 mt-2 hover:underline">Edit Reply</button>
                      </div>
                    ) : (
                      <button onClick={() => openReplyModal(review)} className="flex items-center text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                        <MessageCircle className="w-4 h-4 mr-1.5" /> Reply to Merchant
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {reviews.length === 0 && (
          <p className="text-gray-500 py-12 text-center bg-white dark:bg-gray-900 rounded-3xl border border-gray-100 dark:border-gray-800">You haven't written any reviews yet.</p>
        )}
      </div>

      {/* Edit Review Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
              <h3 className="text-xl font-bold">Edit Review</h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button type="button" key={star} onClick={() => setEditRating(star)} className="focus:outline-none">
                      <Star className={`w-8 h-8 ${star <= editRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-700'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Review Comment</label>
                <textarea required value={editText} onChange={e => setEditText(e.target.value)} rows={4} className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-medium rounded-lg hover:bg-gray-900">Update Review</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reply Modal */}
      {isReplyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
              <h3 className="text-xl font-bold">Reply to Merchant</h3>
              <button onClick={() => setIsReplyModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReplySubmit} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Your Reply</label>
                <textarea required value={replyText} onChange={e => setReplyText(e.target.value)} rows={4} placeholder="Type your response here..." className="w-full p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsReplyModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-medium rounded-lg hover:bg-gray-900">Submit Reply</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="flex justify-between items-center p-6 border-b dark:border-gray-800">
              <h3 className="text-xl font-bold text-red-600 flex items-center"><AlertTriangle className="w-5 h-5 mr-2" /> Report Abuse</h3>
              <button onClick={() => setIsReportModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleReportSubmit} className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Please select a reason for reporting this content. Our moderation team will review it.</p>
              <div className="mb-6 space-y-2">
                <label className="flex items-center gap-2"><input type="radio" name="report_reason" required /> Spam or promotional</label>
                <label className="flex items-center gap-2"><input type="radio" name="report_reason" required /> Harassment or hate speech</label>
                <label className="flex items-center gap-2"><input type="radio" name="report_reason" required /> Inappropriate content</label>
                <label className="flex items-center gap-2"><input type="radio" name="report_reason" required /> Other</label>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setIsReportModalOpen(false)} className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-700">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
