'use client';

import { useState } from 'react';
import { ReviewSummary } from './ReviewSummary';
import { ReviewList } from './ReviewList';
import { QnAList } from './QnAList';
import { WriteReviewModal } from './WriteReviewModal';
import { mockReviews, mockSummary, mockQuestions } from './mock-data';
import { Review } from './types';

interface ProductReviewsProps {
  productId: string;
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const [activeTab, setActiveTab] = useState<'reviews' | 'qna'>('reviews');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  
  // Local state for interactive mock
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [questions, setQuestions] = useState(mockQuestions);
  const [editingReview, setEditingReview] = useState<Review | undefined>();

  // Mock logged-in user
  const currentUserId = 'u1'; 

  const handleWriteReview = (data: any, mediaFiles: File[]) => {
    if (editingReview) {
      // Update existing
      setReviews(reviews.map(r => r.id === editingReview.id ? { ...r, ...data } : r));
    } else {
      // Create new
      const newReview: Review = {
        id: `r-${Date.now()}`,
        productId,
        user: { id: currentUserId, name: 'Alex Johnson', avatarUrl: 'https://i.pravatar.cc/150?u=u1' },
        createdAt: new Date().toISOString(),
        isVerifiedPurchase: true,
        helpfulVotes: 0,
        ...data,
        media: mediaFiles.map((f, i) => ({
          id: `m-${Date.now()}-${i}`,
          type: f.type.startsWith('video') ? 'video' : 'image',
          url: URL.createObjectURL(f),
        }))
      };
      setReviews([newReview, ...reviews]);
    }
    setEditingReview(undefined);
  };

  const handleAskQuestion = (text: string) => {
    const newQuestion = {
      id: `q-${Date.now()}`,
      productId,
      user: { id: currentUserId, name: 'Alex Johnson' },
      text,
      createdAt: new Date().toISOString(),
      helpfulVotes: 0,
      answers: [],
    };
    setQuestions([newQuestion, ...questions]);
  };

  const handleDeleteReview = (reviewId: string) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
  };

  const openEditModal = (review: Review) => {
    setEditingReview(review);
    setIsWriteModalOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-6">
          Customer Reviews & Questions
        </h2>
        
        {/* Custom Tabs */}
        <div className="flex space-x-1 border-b border-gray-200 dark:border-gray-800">
          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-4 px-4 text-sm font-semibold transition-all relative ${
              activeTab === 'reviews'
                ? 'text-black dark:text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Reviews ({reviews.length})
            {activeTab === 'reviews' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white animate-in fade-in slide-in-from-left-4 duration-300" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('qna')}
            className={`pb-4 px-4 text-sm font-semibold transition-all relative ${
              activeTab === 'qna'
                ? 'text-black dark:text-white'
                : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
            }`}
          >
            Questions ({questions.length})
            {activeTab === 'qna' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black dark:bg-white animate-in fade-in slide-in-from-right-4 duration-300" />
            )}
          </button>
        </div>
      </div>

      <div className="animate-in fade-in duration-500">
        {activeTab === 'reviews' ? (
          <>
            <ReviewSummary 
              summary={{
                ...mockSummary, 
                totalReviews: reviews.length // Keep simple mock sync
              }} 
              onWriteReview={() => {
                setEditingReview(undefined);
                setIsWriteModalOpen(true);
              }} 
            />
            <ReviewList 
              reviews={reviews} 
              currentUserId={currentUserId}
              onEditReview={openEditModal}
              onDeleteReview={handleDeleteReview}
            />
          </>
        ) : (
          <QnAList 
            questions={questions} 
            currentUserId={currentUserId}
            onAskQuestion={handleAskQuestion}
          />
        )}
      </div>

      <WriteReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => {
          setIsWriteModalOpen(false);
          setEditingReview(undefined);
        }}
        onSubmit={handleWriteReview}
        initialData={editingReview}
      />
    </div>
  );
}
