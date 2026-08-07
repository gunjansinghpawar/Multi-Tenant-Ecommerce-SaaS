"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent,
  Button,
} from "@commercex/ui";
import { FolderPlusIcon, FolderIcon, MoreVerticalIcon } from "lucide-react";

export default function MediaFoldersPage() {
  const folders = ["Product Shots 2023", "Spring Campaign", "Logos & Branding", "Social Media Assets", "Blog Images", "Raw Source Files"];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Folders" 
        text="Organize your media assets into logical groups."
      >
        <Button>
          <FolderPlusIcon className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </PageHeader>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {folders.map((folder, i) => (
          <Card key={i} className="hover:bg-accent/50 transition-colors cursor-pointer group border-transparent hover:border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <FolderIcon className="h-8 w-8 text-blue-400 fill-blue-100 dark:fill-blue-900/30" />
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{folder}</h3>
                <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 100) + 5} items</p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100">
                <MoreVerticalIcon className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
