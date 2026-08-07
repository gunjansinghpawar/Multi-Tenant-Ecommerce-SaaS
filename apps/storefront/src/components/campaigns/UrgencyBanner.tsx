'use client';

interface UrgencyBannerProps {
  message: string;
  theme?: 'danger' | 'warning' | 'dark' | 'neon';
  sticky?: boolean;
}

export function UrgencyBanner({ message, theme = 'danger', sticky = true }: UrgencyBannerProps) {
  const themeClasses = {
    danger: 'bg-red-600 text-white',
    warning: 'bg-yellow-400 text-black',
    dark: 'bg-black text-white',
    neon: 'bg-[#00ff00] text-black font-bold tracking-widest',
  };

  return (
    <div className={`
      ${themeClasses[theme]} 
      ${sticky ? 'sticky top-0 z-50' : 'relative'}
      w-full overflow-hidden py-3
    `}>
      <div className="animate-[marquee_20s_linear_infinite] whitespace-nowrap">
        <span className="text-sm sm:text-base font-bold uppercase tracking-wider mx-4">
          {message}
        </span>
        <span className="text-sm sm:text-base font-bold uppercase tracking-wider mx-4" aria-hidden="true">
          {message}
        </span>
        <span className="text-sm sm:text-base font-bold uppercase tracking-wider mx-4" aria-hidden="true">
          {message}
        </span>
        <span className="text-sm sm:text-base font-bold uppercase tracking-wider mx-4" aria-hidden="true">
          {message}
        </span>
      </div>
    </div>
  );
}
