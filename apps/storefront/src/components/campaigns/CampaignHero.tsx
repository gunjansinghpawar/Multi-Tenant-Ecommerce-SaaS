import React from 'react';

interface CampaignHeroProps {
  title: string;
  subtitle: string;
  backgroundImage?: string;
  theme?: 'dark' | 'light' | 'neon' | 'gold';
  children?: React.ReactNode;
}

export function CampaignHero({ 
  title, 
  subtitle, 
  backgroundImage, 
  theme = 'dark',
  children 
}: CampaignHeroProps) {

  const themeClasses = {
    dark: 'text-white bg-black',
    light: 'text-gray-900 bg-white',
    neon: 'text-white bg-black', // Neon usually relies on text shadows/specific accents
    gold: 'text-[#ffd700] bg-[#1a0f00]',
  };

  const titleShadows = {
    dark: '',
    light: '',
    neon: 'drop-shadow-[0_0_15px_rgba(0,255,0,0.8)]',
    gold: 'drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]',
  };

  return (
    <div className={`relative w-full min-h-[70vh] flex flex-col items-center justify-center overflow-hidden py-24 ${themeClasses[theme]}`}>
      {backgroundImage && (
        <>
          <div className="absolute inset-0 z-0">
            <img
              src={backgroundImage}
              alt="Campaign Background"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          {/* Overlay to ensure text readability */}
          <div className={`absolute inset-0 z-10 ${theme === 'light' ? 'bg-white/40' : 'bg-black/60'}`} />
        </>
      )}

      <div className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <h1 className={`text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase mb-6 ${titleShadows[theme]} ${theme === 'neon' ? 'text-[#00ff00]' : ''}`}>
          {title}
        </h1>
        <p className={`text-xl sm:text-2xl md:text-3xl max-w-3xl mx-auto font-medium mb-12 ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'}`}>
          {subtitle}
        </p>

        {/* This is where the Countdown Timer usually goes */}
        {children}
      </div>
    </div>
  );
}
