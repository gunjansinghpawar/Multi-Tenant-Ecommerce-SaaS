'use client';

import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  targetDate: string;
  theme?: 'dark' | 'light' | 'neon' | 'gold';
  size?: 'sm' | 'md' | 'lg';
}

export function CountdownTimer({ targetDate, theme = 'dark', size = 'md' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  // Prevent hydration mismatch
  if (!isMounted) return <div className="h-24" />;

  const themeClasses = {
    dark: 'bg-black text-white border-gray-800',
    light: 'bg-white text-black border-gray-200 shadow-sm',
    neon: 'bg-black text-[#00ff00] border-[#00ff00] shadow-[0_0_15px_rgba(0,255,0,0.5)]',
    gold: 'bg-[#1a0f00] text-[#ffd700] border-[#ffd700] shadow-[0_0_15px_rgba(255,215,0,0.3)]',
  };

  const sizeClasses = {
    sm: { box: 'w-12 h-14 sm:w-16 sm:h-16', num: 'text-lg sm:text-2xl', label: 'text-[10px] sm:text-xs' },
    md: { box: 'w-16 h-20 sm:w-24 sm:h-24', num: 'text-2xl sm:text-4xl', label: 'text-xs sm:text-sm' },
    lg: { box: 'w-20 h-24 sm:w-32 sm:h-32', num: 'text-3xl sm:text-6xl', label: 'text-sm sm:text-base' },
  };

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <div className="flex items-center justify-center space-x-2 sm:space-x-4">
      {timeBlocks.map((block) => (
        <div key={block.label} className="flex flex-col items-center">
          <div 
            className={`
              ${themeClasses[theme]} 
              ${sizeClasses[size].box}
              border-2 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold font-mono tracking-tighter
            `}
          >
            <span className={sizeClasses[size].num}>
              {block.value.toString().padStart(2, '0')}
            </span>
          </div>
          <span className={`mt-2 font-medium uppercase tracking-widest ${sizeClasses[size].label} ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>
            {block.label}
          </span>
        </div>
      ))}
    </div>
  );
}
