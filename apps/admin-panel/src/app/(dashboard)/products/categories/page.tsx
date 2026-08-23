"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@commercex/ui";
import { PlusIcon, Download, Upload } from "lucide-react";
import { CategoryTree, type CategoryNodeData } from "./components/category-tree";
import { CategoryForm } from "./components/category-form";

const initialCategories: CategoryNodeData[] = [
  {
    id: "cat-1",
    name: "Clothing",
    slug: "clothing",
    productsCount: 145,
    isActive: true,
    children: [
      {
        id: "cat-1-1",
        name: "Men",
        slug: "clothing/men",
        productsCount: 56,
        isActive: true,
        children: [
          { id: "cat-1-1-1", name: "T-Shirts", slug: "clothing/men/t-shirts", productsCount: 30, isActive: true },
          { id: "cat-1-1-2", name: "Jeans", slug: "clothing/men/jeans", productsCount: 26, isActive: true },
        ]
      },
      {
        id: "cat-1-2",
        name: "Women",
        slug: "clothing/women",
        productsCount: 89,
        isActive: true,
      }
    ]
  },
  {
    id: "cat-2",
    name: "Accessories",
    slug: "accessories",
    productsCount: 34,
    isActive: true,
    children: [
      { id: "cat-2-1", name: "Watches", slug: "accessories/watches", productsCount: 12, isActive: true },
      { id: "cat-2-2", name: "Bags", slug: "accessories/bags", productsCount: 22, isActive: true },
    ]
  },
  {
    id: "cat-3",
    name: "Electronics",
    slug: "electronics",
    productsCount: 0,
    isActive: false,
  }
];

export default function CategoriesPage() {
  const [categories, setCategories] = useState<CategoryNodeData[]>(initialCategories);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // Sheet state
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryNodeData | null>(null);
  const [parentForNew, setParentForNew] = useState<string | null>(null);

  const handleCreateNew = () => {
    setEditingCategory(null);
    setParentForNew(null);
    setIsSheetOpen(true);
  };

  const handleAddSubcategory = (parentId: string) => {
    setEditingCategory(null);
    setParentForNew(parentId);
    setIsSheetOpen(true);
  };

  const handleEdit = (category: CategoryNodeData) => {
    setEditingCategory(category);
    setParentForNew(null);
    setIsSheetOpen(true);
  };

  const handleFormSubmit = (values: any) => {
    console.log("Saving category:", values);
    setIsSheetOpen(false);
    // Real implementation would save via server action or API
  };

  const handleMoveNode = (draggedId: string, targetId: string) => {
    if (draggedId === targetId) return;

    // Deep clone to mutate safely
    const newCategories: CategoryNodeData[] = JSON.parse(JSON.stringify(categories));
    let draggedNode: CategoryNodeData | null = null;

    // 1. Remove the node from its current position
    const removeNode = (nodes: CategoryNodeData[]): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === draggedId) {
          draggedNode = nodes.splice(i, 1)[0];
          return true;
        }
        if (nodes[i].children && removeNode(nodes[i].children!)) {
          return true;
        }
      }
      return false;
    };

    // 2. Insert the node as a child of the target
    const insertNode = (nodes: CategoryNodeData[]): boolean => {
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].id === targetId) {
          if (!nodes[i].children) nodes[i].children = [];
          nodes[i].children!.push(draggedNode!);
          return true;
        }
        if (nodes[i].children && insertNode(nodes[i].children!)) {
          return true;
        }
      }
      return false;
    };

    if (removeNode(newCategories) && draggedNode) {
      insertNode(newCategories);
      setCategories(newCategories);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Categories" 
          text="Organize your products into an unlimited hierarchical category tree."
        />
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button onClick={handleCreateNew}>
            <PlusIcon className="mr-2 h-4 w-4" /> Add Category
          </Button>
        </div>
      </div>

      {/* Bulk Actions Bar */}
      {selectedIds.length > 0 && (
        <div className="flex justify-between items-center pb-2 animate-in fade-in slide-in-from-top-2">
          <div className="text-sm font-medium">
            {selectedIds.length} category(s) selected
          </div>
          <div className="flex items-center gap-2">
            <Button variant="secondary" size="sm">Bulk Edit</Button>
            <Button variant="secondary" size="sm">Publish Selected</Button>
            <Button variant="secondary" size="sm">Archive Selected</Button>
            <Button variant="destructive" size="sm">Delete Selected</Button>
          </div>
        </div>
      )}

      {/* Category Tree Component */}
      <CategoryTree 
        data={categories}
        selectedIds={selectedIds}
        onSelectChange={setSelectedIds}
        onEdit={handleEdit}
        onAddSubcategory={handleAddSubcategory}
        onMoveNode={handleMoveNode}
      />

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent className="sm:max-w-xl flex flex-col h-[100dvh]">
          <SheetHeader className="mb-6 shrink-0">
            <SheetTitle>{editingCategory ? "Edit Category" : "Create Category"}</SheetTitle>
            <SheetDescription>
              {editingCategory 
                ? "Update this category's details, media, and SEO." 
                : "Create a new category to organize your products."}
            </SheetDescription>
          </SheetHeader>
          <div className="flex-1 overflow-hidden">
            <CategoryForm 
              initialData={editingCategory}
              parentCategoryId={parentForNew}
              categories={categories}
              onSubmit={handleFormSubmit}
              onCancel={() => setIsSheetOpen(false)}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
