import React from 'react';
import { useBuilderStore } from '@commercex/builder-store';
import { BlockRegistry } from './BlockRegistry';

export const NodeRenderer: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const node = useBuilderStore((state) => state.nodes[nodeId]);
  const selectedNodeId = useBuilderStore((state) => state.selectedNodeId);
  const selectNode = useBuilderStore((state) => state.selectNode);
  
  if (!node) return null;

  const Component = BlockRegistry.get(node.type);

  if (!Component) {
    return <div className="text-red-500 border border-red-500 p-2">Unknown block type: {node.type}</div>;
  }

  const isSelected = selectedNodeId === node.id;

  return (
    <div 
      onClick={(e) => {
        e.stopPropagation();
        selectNode(node.id);
      }}
      className={`relative group ${isSelected ? 'ring-2 ring-primary ring-inset' : 'hover:ring-1 hover:ring-primary/50 hover:ring-inset'}`}
    >
      {isSelected && (
        <div className="absolute -top-3 -left-1 bg-primary text-primary-foreground text-[10px] px-1.5 py-0.5 rounded shadow z-10 pointer-events-none">
          {node.type}
        </div>
      )}
      <Component node={node}>
        {node.children && node.children.map((childId) => (
          <NodeRenderer key={childId} nodeId={childId} />
        ))}
      </Component>
    </div>
  );
};
