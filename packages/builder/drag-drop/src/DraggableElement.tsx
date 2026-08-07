import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface Props {
  id: string;
  type: string;
  children: React.ReactNode;
}

export const DraggableElement: React.FC<Props> = ({ id, type, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data: { isNewElement: true, type }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="cursor-grab hover:ring-1 hover:ring-primary touch-none">
      {children}
    </div>
  );
};
