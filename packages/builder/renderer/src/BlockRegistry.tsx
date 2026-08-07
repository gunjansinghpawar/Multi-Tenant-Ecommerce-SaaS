import React from 'react';
import { BuilderNode } from '@commercex/builder-core';

export type BlockComponent = React.FC<{ node: BuilderNode; children?: React.ReactNode }>;

class Registry {
  private blocks: Map<string, BlockComponent> = new Map();

  register(type: string, component: BlockComponent) {
    this.blocks.set(type, component);
  }

  get(type: string): BlockComponent | undefined {
    return this.blocks.get(type);
  }
}

export const BlockRegistry = new Registry();

// Basic blocks registration for prototype phase
BlockRegistry.register('Container', ({ node, children }) => {
  const styles = {
    padding: node.styles?.spacing?.base?.padding,
    backgroundColor: node.styles?.background?.base?.backgroundColor,
    textAlign: node.styles?.typography?.base?.textAlign as any,
  };

  return (
    <div className={`p-4 border border-dashed border-primary/20 min-h-[100px] w-full transition-all`} style={styles} data-builder-id={node.id}>
      {children || <div className="text-muted-foreground text-sm flex items-center justify-center h-full opacity-50">Empty Container</div>}
    </div>
  );
});

BlockRegistry.register('Heading', ({ node }) => {
  const styles = {
    padding: node.styles?.spacing?.base?.padding,
    backgroundColor: node.styles?.background?.base?.backgroundColor,
    textAlign: node.styles?.typography?.base?.textAlign as any,
  };

  return (
    <h1 className="text-3xl font-bold py-2 transition-all" style={styles} data-builder-id={node.id}>
      {node.props.text || 'Heading Text'}
    </h1>
  );
});

BlockRegistry.register('Text', ({ node }) => {
  const styles = {
    padding: node.styles?.spacing?.base?.padding,
    backgroundColor: node.styles?.background?.base?.backgroundColor,
    textAlign: node.styles?.typography?.base?.textAlign as any,
  };

  return (
    <p className="text-base py-1 text-muted-foreground transition-all" style={styles} data-builder-id={node.id}>
      {node.props.text || 'Paragraph text here.'}
    </p>
  );
});

BlockRegistry.register('Button', ({ node }) => {
  const styles = {
    padding: node.styles?.spacing?.base?.padding || '0.5rem 1rem',
    backgroundColor: node.styles?.background?.base?.backgroundColor || 'var(--primary)',
    textAlign: node.styles?.typography?.base?.textAlign as any,
  };

  return (
    <button className="bg-primary text-primary-foreground rounded-md font-medium text-sm transition-all" style={styles} data-builder-id={node.id}>
      {node.props.text || 'Click Me'}
    </button>
  );
});
