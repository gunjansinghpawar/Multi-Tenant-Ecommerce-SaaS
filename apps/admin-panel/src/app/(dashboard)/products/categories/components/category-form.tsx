"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  RHFInput, 
  RHFSelect, 
  Button, 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger,
  RHFSwitch,
  RHFTextarea
} from "@commercex/ui";
import { UploadCloud, Image as ImageIcon } from "lucide-react";
import type { CategoryNodeData } from "./category-tree";

const categorySchema = z.object({
  name: z.string().min(2, "Name is required"),
  slug: z.string().min(2, "Slug is required"),
  description: z.string().optional(),
  parentId: z.string().optional(),
  isActive: z.boolean().default(true),
  
  // Media
  bannerUrl: z.string().optional(),
  iconUrl: z.string().optional(),
  
  // SEO
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  initialData?: CategoryNodeData | null;
  parentCategoryId?: string | null;
  categories: CategoryNodeData[];
  onSubmit: (values: CategoryFormValues) => void;
  onCancel: () => void;
}

export function CategoryForm({ initialData, parentCategoryId, categories, onSubmit, onCancel }: CategoryFormProps) {
  const [activeTab, setActiveTab] = useState("general");

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: "",
      parentId: parentCategoryId || initialData?.id || "root", // Mock logic
      isActive: initialData ? initialData.isActive : true,
      metaTitle: "",
      metaDescription: "",
    },
  });

  // Flatten categories for the Select dropdown
  const flattenCategories = (nodes: CategoryNodeData[], prefix = ""): { label: string; value: string }[] => {
    let result: { label: string; value: string }[] = [];
    nodes.forEach(node => {
      // Don't allow a category to be its own parent
      if (initialData && node.id === initialData.id) return;
      
      result.push({ label: `${prefix}${node.name}`, value: node.id });
      if (node.children) {
        result = result.concat(flattenCategories(node.children, prefix + "— "));
      }
    });
    return result;
  };

  const categoryOptions = [
    { label: "None (Top Level)", value: "root" },
    ...flattenCategories(categories)
  ];

  const handleFormSubmit = (values: CategoryFormValues) => {
    onSubmit(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto py-4 space-y-4 px-1">
            <TabsContent value="general" className="space-y-4 m-0">
              <RHFInput 
                name="name" 
                label="Category Name" 
                inputProps={{ placeholder: "e.g. Summer Collection" }} 
              />
              <RHFInput 
                name="slug" 
                label="URL Slug" 
                description="The category's web address."
                inputProps={{ placeholder: "summer-collection" }} 
              />
              <RHFSelect 
                name="parentId" 
                label="Parent Category" 
                options={categoryOptions}
                description="Nest this category under an existing one."
              />
              <RHFTextarea 
                name="description" 
                label="Description" 
                textareaProps={{ placeholder: "Describe this category...", rows: 4 }} 
              />
              <div className="p-4 border rounded-lg bg-muted/20">
                <RHFSwitch 
                  name="isActive" 
                  label="Active Status" 
                  description="Hide or show this category on your storefront."
                />
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-6 m-0">
              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Category Banner</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-input px-6 py-10 hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="text-center">
                    <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground/50" aria-hidden="true" />
                    <div className="mt-4 flex text-sm leading-6 text-muted-foreground justify-center">
                      <span className="relative rounded-md bg-transparent font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80">
                        Upload a file
                      </span>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium leading-none">Category Icon</label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md bg-secondary border flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-muted-foreground/50" />
                  </div>
                  <Button type="button" variant="outline" size="sm">
                    Choose Icon
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="seo" className="space-y-4 m-0">
              <div className="rounded-md border p-4 bg-muted/20 space-y-2">
                <h4 className="text-sm font-medium text-foreground">Search Engine Preview</h4>
                <div className="space-y-1">
                  <p className="text-sm text-blue-600 dark:text-blue-400 line-clamp-1">
                    {form.watch("metaTitle") || form.watch("name") || "Category Title"}
                  </p>
                  <p className="text-xs text-emerald-700 dark:text-emerald-500">
                    https://yourstore.com/collections/{form.watch("slug") || "category-slug"}
                  </p>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {form.watch("metaDescription") || form.watch("description") || "This is how your category will appear in search engine results. Write a compelling description to improve click-through rates."}
                  </p>
                </div>
              </div>

              <RHFInput 
                name="metaTitle" 
                label="Meta Title" 
                inputProps={{ placeholder: "Optimal length is 50-60 characters", maxLength: 60 }} 
              />
              <RHFTextarea 
                name="metaDescription" 
                label="Meta Description" 
                textareaProps={{ placeholder: "Optimal length is 150-160 characters", rows: 3, maxLength: 160 }} 
              />
            </TabsContent>
          </div>
        </Tabs>

        <div className="pt-6 mt-auto border-t flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Save Changes" : "Create Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
