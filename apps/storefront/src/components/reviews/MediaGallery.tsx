'use client';

import { useState } from 'react';
import { Play, X } from 'lucide-react';
import { ReviewMedia } from './types';

interface MediaGalleryProps {
  media: ReviewMedia[];
}

export function MediaGallery({ media }: MediaGalleryProps) {
  const [selectedMedia, setSelectedMedia] = useState<ReviewMedia | null>(null);

  if (!media || media.length === 0) return null;

  return (
    <>
      <div className="flex flex-wrap gap-2 mt-4">
        {media.map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedMedia(item)}
            className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800 hover:ring-2 hover:ring-black dark:hover:ring-white transition-all duration-200 group"
          >
            <img
              src={item.thumbnailUrl || item.url}
              alt="Review media"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            {item.type === 'video' && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={() => setSelectedMedia(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {selectedMedia.type === 'image' ? (
              <img
                src={selectedMedia.url}
                alt="Review full size"
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                src={selectedMedia.url}
                controls
                autoPlay
                className="max-w-full max-h-full"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
}
