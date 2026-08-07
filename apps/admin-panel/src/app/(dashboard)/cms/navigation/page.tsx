"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge
} from "@commercex/ui";
import { 
  PlusIcon,
  GripVerticalIcon,
  TrashIcon,
  ChevronDownIcon
} from "lucide-react";

export default function NavigationPage() {
  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Navigation Menus" 
          text="Manage your storefront header, footer, and sidebar links."
        />
        <Button>Save Menu</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Available Menus</CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-1">
                <Button variant="secondary" className="w-full justify-start font-medium bg-primary/10 text-primary hover:bg-primary/20">Main Header Menu</Button>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">Footer Links</Button>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground">Mobile Sidebar</Button>
                <Button variant="ghost" className="w-full justify-start text-muted-foreground mt-4 border border-dashed"><PlusIcon className="mr-2 h-4 w-4"/> Create Menu</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Add Items</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="border rounded-md p-3 flex justify-between items-center cursor-pointer hover:border-primary">
                <span className="text-sm font-medium">Pages</span>
                <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="border rounded-md p-3 flex justify-between items-center cursor-pointer hover:border-primary">
                <span className="text-sm font-medium">Products & Categories</span>
                <ChevronDownIcon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="border rounded-md p-3 flex justify-between items-center cursor-pointer hover:border-primary">
                <span className="text-sm font-medium">Custom Link</span>
                <PlusIcon className="h-4 w-4 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="min-h-[500px]">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                Main Header Menu
                <Badge variant="outline">Currently Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-2">
              
              <div className="border rounded-md bg-card shadow-sm flex items-center justify-between p-3 cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-3">
                  <GripVerticalIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Home</span>
                  <span className="text-xs text-muted-foreground border px-1.5 py-0.5 rounded bg-muted/50">Page: /</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10"><TrashIcon className="h-4 w-4"/></Button>
                </div>
              </div>

              <div className="border rounded-md bg-card shadow-sm flex items-center justify-between p-3 cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-3">
                  <GripVerticalIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Shop</span>
                  <span className="text-xs text-muted-foreground border px-1.5 py-0.5 rounded bg-muted/50">Category: All Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10"><TrashIcon className="h-4 w-4"/></Button>
                </div>
              </div>

              {/* Nested Item Mockup */}
              <div className="ml-8 border rounded-md bg-card shadow-sm flex items-center justify-between p-3 border-l-primary border-l-4 cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-3">
                  <GripVerticalIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Men's Clothing</span>
                  <span className="text-xs text-muted-foreground border px-1.5 py-0.5 rounded bg-muted/50">Category: Mens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10"><TrashIcon className="h-4 w-4"/></Button>
                </div>
              </div>
              
              <div className="ml-8 border rounded-md bg-card shadow-sm flex items-center justify-between p-3 border-l-primary border-l-4 cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-3">
                  <GripVerticalIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Women's Clothing</span>
                  <span className="text-xs text-muted-foreground border px-1.5 py-0.5 rounded bg-muted/50">Category: Womens</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10"><TrashIcon className="h-4 w-4"/></Button>
                </div>
              </div>

              <div className="border rounded-md bg-card shadow-sm flex items-center justify-between p-3 cursor-grab active:cursor-grabbing">
                <div className="flex items-center gap-3">
                  <GripVerticalIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">About Us</span>
                  <span className="text-xs text-muted-foreground border px-1.5 py-0.5 rounded bg-muted/50">Page: /about</span>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">Edit</Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10"><TrashIcon className="h-4 w-4"/></Button>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
