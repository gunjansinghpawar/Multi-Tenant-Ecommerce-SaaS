import React from 'react';
import { DndContext, DragEndEvent, closestCenter } from '@dnd-kit/core';
import { useBuilderStore } from '@commercex/builder-store';
import { BuilderNode } from '@commercex/builder-core';

export const BuilderDndContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const addNode = useBuilderStore((state) => state.addNode);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.data.current?.isNewElement) {
      const type = active.data.current.type;
      
      const newNode: BuilderNode = {
        id: `node-${Date.now()}`,
        type,
        parentId: over.id === 'canvas-root' ? null : String(over.id),
        children: [],
        props: {},
        styles: {
          layout: { base: {} },
          spacing: { base: {} },
          typography: { base: {} },
          background: { base: {} },
          border: { base: {} },
        },
        visibility: { devices: ['desktop', 'tablet', 'mobile'], conditions: [] },
        animations: {},
        metadata: {}
      };
      
      addNode(newNode, over.id === 'canvas-root' ? null : String(over.id));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
};
