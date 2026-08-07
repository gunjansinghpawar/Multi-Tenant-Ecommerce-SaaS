import React from 'react';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function PageHero({ 
  title, 
  subtitle, 
  backgroundImage, 
  align = 'center',
  className = ''
}: PageHeroProps) {
  const isCenter = align === 'center';

  return (
    <div className={`relative w-full overflow-hidden ${backgroundImage ? 'min-h-[500px] flex items-center justify-center' : 'py-20 md:py-32'} ${className}`}>
      {backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <img
              src={backgroundImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Dark gradient overlay for readability when image is present */}
          <div className="absolute inset-0 bg-black/60 z-10" />
        </>
      )}

      <div className={`relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full ${isCenter ? 'text-center' : 'text-left'}`}>
        <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 ${backgroundImage ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
          {title}
        </h1>
        {subtitle && (
          <p className={`text-xl sm:text-2xl max-w-3xl ${isCenter ? 'mx-auto' : ''} ${backgroundImage ? 'text-gray-200' : 'text-gray-600 dark:text-gray-400'}`}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
