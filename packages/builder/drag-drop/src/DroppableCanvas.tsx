import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export const DroppableCanvas: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-root',
  });

  return (
    <div 
      ref={setNodeRef} 
      className={`min-h-full transition-colors w-full h-full relative ${isOver ? 'bg-primary/5 border-2 border-dashed border-primary/50' : ''}`}
    >
      {children}
      {isOver && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="bg-background/80 px-4 py-2 rounded shadow-sm text-primary font-medium text-sm border">
            Drop to Add Block
          </div>
        </div>
      )}
    </div>
  );
};
