'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Star, X, Image as ImageIcon } from 'lucide-react';
import { Form, RHFInput, RHFTextarea } from '@commercex/ui';
import { Review } from './types';

const reviewSchema = z.object({
  rating: z.number().min(1, 'Please select a rating'),
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title is too long'),
  text: z.string().min(10, 'Review must be at least 10 characters').max(1000, 'Review is too long'),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

interface WriteReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ReviewFormValues, media: File[]) => void;
  initialData?: Review;
}

export function WriteReviewModal({ isOpen, onClose, onSubmit, initialData }: WriteReviewModalProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  const formMethods = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: initialData?.rating || 0,
      title: initialData?.title || '',
      text: initialData?.text || '',
    },
  });

  const rating = formMethods.watch('rating');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMediaFiles(Array.from(e.target.files));
    }
  };

  const submitForm = (data: ReviewFormValues) => {
    onSubmit(data, mediaFiles);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {initialData ? 'Edit Review' : 'Write a Review'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <Form {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(submitForm)} className="p-6 overflow-y-auto max-h-[75vh]">
            {/* Rating */}
            <div className="mb-8 flex flex-col items-center">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Overall Rating
              </label>
              <div 
                className="flex items-center space-x-2"
                onMouseLeave={() => setHoverRating(0)}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => formMethods.setValue('rating', star, { shouldValidate: true })}
                    onMouseEnter={() => setHoverRating(star)}
                    className="p-1 transition-transform hover:scale-110 active:scale-95"
                  >
                    <Star
                      className={`w-10 h-10 transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'fill-gray-100 text-gray-200 dark:fill-gray-800 dark:text-gray-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
              {formMethods.formState.errors.rating && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">{formMethods.formState.errors.rating.message}</p>
              )}
            </div>

            <div className="space-y-6">
              <RHFInput
                name="title"
                label="Add a headline"
                inputProps={{ placeholder: "What's most important to know?" }}
              />
              <RHFTextarea
                name="text"
                label="Write your review"
                textareaProps={{
                  placeholder: "What did you like or dislike? What did you use this product for?",
                  rows: 5,
                  className: "resize-none"
                }}
              />
            </div>

            {/* Media Upload */}
            <div className="mb-8 mt-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Add photos or video (optional)
              </label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="media-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                  </div>
                  <input 
                    id="media-upload" 
                    type="file" 
                    multiple 
                    accept="image/*,video/*"
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {mediaFiles.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {mediaFiles.map((file, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center overflow-hidden">
                      {file.type.startsWith('image') ? (
                         <img src={URL.createObjectURL(file)} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-gray-500">Video</span>
                      )}
                      <button
                        type="button"
                        onClick={() => setMediaFiles(mediaFiles.filter((_, i) => i !== idx))}
                        className="absolute top-1 right-1 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-gray-800">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 mr-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={formMethods.formState.isSubmitting}
                className="px-6 py-2.5 text-sm font-medium text-white bg-black dark:text-black dark:bg-white rounded-full hover:bg-gray-900 dark:hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                {formMethods.formState.isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
