import React from 'react';

interface LoadingStateProps {
  message?: string;
  fullScreen?: boolean;
}

export function LoadingState({ message = 'Loading...', fullScreen = false }: LoadingStateProps) {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm"
    : "w-full min-h-[50vh] flex flex-col items-center justify-center p-4";

  return (
    <div className={containerClasses}>
      <div className="relative flex justify-center items-center">
        <div className="absolute animate-ping h-12 w-12 rounded-full bg-primary/20"></div>
        <div className="relative flex justify-center items-center h-12 w-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
      {message && (
        <p className="mt-6 text-lg font-medium text-muted-foreground animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
}
