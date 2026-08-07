"use client";

import React, { useState } from "react";
import { ChevronRight, ChevronDown, MoreHorizontal, Edit2, Trash2, Plus, GripVertical, Image as ImageIcon } from "lucide-react";
import { Button, Checkbox, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, Badge } from "@commercex/ui";
import { cn } from "@commercex/utils";
import { motion, AnimatePresence } from "framer-motion";

export type CategoryNodeData = {
  id: string;
  name: string;
  slug: string;
  productsCount: number;
  isActive: boolean;
  children?: CategoryNodeData[];
};

interface CategoryTreeProps {
  data: CategoryNodeData[];
  selectedIds: string[];
  onSelectChange: (ids: string[]) => void;
  onEdit: (category: CategoryNodeData) => void;
  onAddSubcategory: (parentId: string) => void;
  onMoveNode?: (draggedId: string, targetId: string) => void;
}

const CategoryNode = ({
  node,
  level,
  selectedIds,
  onSelectChange,
  onEdit,
  onAddSubcategory,
  onMoveNode,
}: {
  node: CategoryNodeData;
  level: number;
  selectedIds: string[];
  onSelectChange: (ids: string[]) => void;
  onEdit: (category: CategoryNodeData) => void;
  onAddSubcategory: (parentId: string) => void;
  onMoveNode?: (draggedId: string, targetId: string) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  const isSelected = selectedIds.includes(node.id);

  const toggleSelection = (checked: boolean) => {
    if (checked) {
      onSelectChange([...selectedIds, node.id]);
    } else {
      onSelectChange(selectedIds.filter(id => id !== node.id));
    }
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", node.id);
    e.currentTarget.style.opacity = "0.5";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = "1";
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // allow drop
    e.currentTarget.classList.add("bg-muted/80");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove("bg-muted/80");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("bg-muted/80");
    const draggedId = e.dataTransfer.getData("text/plain");
    if (draggedId && draggedId !== node.id && onMoveNode) {
      onMoveNode(draggedId, node.id);
    }
  };

  return (
    <div className="flex flex-col">
      <div
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "group flex items-center justify-between py-2 pr-4 border-b hover:bg-muted/50 transition-colors",
          isSelected && "bg-primary/5"
        )}
      >
        <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 24}px` }}>
          <div className="w-6 flex items-center justify-center">
            {hasChildren ? (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            ) : (
              <div className="w-6" /> // spacer
            )}
          </div>
          <Checkbox
            checked={isSelected}
            onCheckedChange={toggleSelection}
            className="data-[state=checked]:bg-primary"
          />
          <div className="cursor-grab active:cursor-grabbing p-1 text-muted-foreground/30 group-hover:text-muted-foreground">
            <GripVertical className="h-4 w-4" />
          </div>

          <div className="flex items-center gap-3 ml-1">
            <div className="h-8 w-8 rounded-md bg-secondary flex items-center justify-center border">
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-sm">{node.name}</span>
              <span className="text-xs text-muted-foreground">{node.slug}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Badge variant={node.isActive ? "success" : "secondary"} className="hidden md:inline-flex">
            {node.isActive ? "Active" : "Draft"}
          </Badge>
          <span className="text-xs text-muted-foreground w-20 text-right hidden sm:inline-block">
            {node.productsCount} products
          </span>

          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onAddSubcategory(node.id)}>
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onEdit(node)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[160px]">
                <DropdownMenuItem onClick={() => onEdit(node)}>
                  <Edit2 className="mr-2 h-4 w-4" /> Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onAddSubcategory(node.id)}>
                  <Plus className="mr-2 h-4 w-4" /> Add Subcategory
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            {node.children!.map(child => (
              <CategoryNode
                key={child.id}
                node={child}
                level={level + 1}
                selectedIds={selectedIds}
                onSelectChange={onSelectChange}
                onEdit={onEdit}
                onAddSubcategory={onAddSubcategory}
                onMoveNode={onMoveNode}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function CategoryTree({ data, selectedIds, onSelectChange, onEdit, onAddSubcategory, onMoveNode }: CategoryTreeProps) {
  const allIds = React.useMemo(() => {
    const ids: string[] = [];
    const extractIds = (nodes: CategoryNodeData[]) => {
      nodes.forEach(node => {
        ids.push(node.id);
        if (node.children) extractIds(node.children);
      });
    };
    extractIds(data);
    return ids;
  }, [data]);

  const isAllSelected = selectedIds.length > 0 && selectedIds.length === allIds.length;
  const isSomeSelected = selectedIds.length > 0 && selectedIds.length < allIds.length;

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      onSelectChange(allIds);
    } else {
      onSelectChange([]);
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div className="flex items-center gap-4">
          <Checkbox
            checked={isAllSelected || (isSomeSelected ? "indeterminate" : false)}
            onCheckedChange={toggleSelectAll}
          />
          <span className="text-sm font-medium">Category Name</span>
        </div>
        <div className="flex items-center gap-4 pr-[120px]">
          <span className="text-sm font-medium hidden md:inline-block">Status</span>
          <span className="text-sm font-medium hidden sm:inline-block">Products</span>
        </div>
      </div>

      <div className="flex flex-col">
        {data.length > 0 ? (
          data.map(node => (
            <CategoryNode
              key={node.id}
              node={node}
              level={0}
              selectedIds={selectedIds}
              onSelectChange={onSelectChange}
              onEdit={onEdit}
              onAddSubcategory={onAddSubcategory}
              onMoveNode={onMoveNode}
            />
          ))
        ) : (
          <div className="p-8 text-center text-muted-foreground text-sm">
            No categories found. Create one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
