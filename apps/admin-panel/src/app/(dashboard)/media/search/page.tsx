"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent,
  Input,
  Button,
} from "@commercex/ui";
import { SearchIcon, FilterIcon, ImageIcon, FileTextIcon, VideoIcon } from "lucide-react";

export default function MediaSearchPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Global Asset Search" 
        text="Find any file in your entire media library by name, tag, or metadata."
      />
      
      <Card>
        <CardContent className="p-6">
          <div className="flex gap-2 mb-8">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search for 'summer campaign' or 'logo'..." className="pl-9 bg-muted/50" />
            </div>
            <Button variant="outline">
              <FilterIcon className="mr-2 h-4 w-4" /> Filters
            </Button>
            <Button>Search</Button>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-muted-foreground">Suggested Searches</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-3 rounded-md border hover:bg-accent cursor-pointer">
                <ImageIcon className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">Recently uploaded images</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md border hover:bg-accent cursor-pointer">
                <FileTextIcon className="h-4 w-4 text-orange-500" />
                <span className="text-sm">PDF manuals</span>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-md border hover:bg-accent cursor-pointer">
                <VideoIcon className="h-4 w-4 text-blue-500" />
                <span className="text-sm">Product demo videos</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
