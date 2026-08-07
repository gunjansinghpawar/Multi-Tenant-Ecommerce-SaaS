import { create } from 'zustand';
import { temporal } from 'zundo';
import { BuilderState, BuilderNode } from '@commercex/builder-core';

interface BuilderStore extends BuilderState {
  // Actions
  setDeviceMode: (mode: 'desktop' | 'tablet' | 'mobile') => void;
  selectNode: (id: string | null) => void;
  hoverNode: (id: string | null) => void;
  
  // Node Operations
  addNode: (node: BuilderNode, parentId: string | null, index?: number) => void;
  updateNode: (id: string, updates: Partial<BuilderNode>) => void;
  removeNode: (id: string) => void;
  moveNode: (id: string, newParentId: string | null, newIndex: number) => void;
  
  // Initialization
  setInitialState: (nodes: Record<string, BuilderNode>, rootNodes: string[]) => void;
}

const initialState: BuilderState = {
  nodes: {},
  rootNodes: [],
  selectedNodeId: null,
  hoveredNodeId: null,
  deviceMode: 'desktop',
};

export const useBuilderStore = create<BuilderStore>()(
  // @ts-expect-error temporal middleware types can be unstable with latest zustand
  temporal(
    (set, get) => ({
      ...initialState,
      
      setDeviceMode: (mode: 'desktop' | 'tablet' | 'mobile') => set({ deviceMode: mode }),
      selectNode: (id: string | null) => set({ selectedNodeId: id }),
      hoverNode: (id: string | null) => set({ hoveredNodeId: id }),
      
      addNode: (node: BuilderNode, parentId: string | null, index?: number) => set((state: BuilderStore) => {
        const newNodes = { ...state.nodes, [node.id]: node };
        const newRootNodes = [...state.rootNodes];
        
        if (parentId && newNodes[parentId]) {
          const parent = { ...newNodes[parentId] };
          const children = [...parent.children];
          if (typeof index === 'number') {
            children.splice(index, 0, node.id);
          } else {
            children.push(node.id);
          }
          parent.children = children;
          newNodes[parentId] = parent;
        } else {
          if (typeof index === 'number') {
            newRootNodes.splice(index, 0, node.id);
          } else {
            newRootNodes.push(node.id);
          }
        }
        
        return { nodes: newNodes, rootNodes: newRootNodes };
      }),
      
      updateNode: (id: string, updates: Partial<BuilderNode>) => set((state: BuilderStore) => {
        if (!state.nodes[id]) return state;
        return {
          nodes: {
            ...state.nodes,
            [id]: { ...state.nodes[id], ...updates }
          }
        };
      }),
      
      removeNode: (id: string) => set((state: BuilderStore) => {
        const newNodes = { ...state.nodes };
        const nodeToRemove = newNodes[id];
        if (!nodeToRemove) return state;
        
        // Remove node from dictionary
        delete newNodes[id];
        
        let newRootNodes = [...state.rootNodes];
        if (nodeToRemove.parentId && newNodes[nodeToRemove.parentId]) {
           const parent = { ...newNodes[nodeToRemove.parentId] };
           parent.children = parent.children.filter((childId: string) => childId !== id);
           newNodes[nodeToRemove.parentId] = parent;
        } else {
           newRootNodes = newRootNodes.filter((rootId: string) => rootId !== id);
        }
        
        return { nodes: newNodes, rootNodes: newRootNodes };
      }),
      
      moveNode: (id: string, newParentId: string | null, newIndex: number) => set((state: BuilderStore) => {
        // Placeholder for phase 1 - Drag & Drop engine handles this logic
        return state;
      }),
      
      setInitialState: (nodes: Record<string, BuilderNode>, rootNodes: string[]) => set({ nodes, rootNodes }),
    }),
    {
      partialize: (state: any) => {
        const { nodes, rootNodes } = state;
        return { nodes, rootNodes }; // Track only the visual nodes in history
      },
      limit: 100, // Keep 100 history snapshots for Undo/Redo
    }
  )
);
