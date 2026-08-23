"use client";

import React from "react";
import { 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@commercex/ui";
import { 
  SaveIcon,
  MonitorIcon,
  HistoryIcon,
  GlobeIcon,
  SettingsIcon,
  CalendarClockIcon,
  MoreVerticalIcon,
  AlignLeftIcon,
  ImageIcon,
  TypeIcon,
  LayoutTemplateIcon,
  CodeIcon,
  UndoIcon,
  RedoIcon,
  PlusIcon
} from "lucide-react";
import Link from "next/link";

export default function CMSEditorPage({ params }: { params: { id: string } }) {
  const pageId = params.id || "home";
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Editor Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-4 border rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <Link href="/cms/pages">
            <Button variant="ghost" size="sm" className="px-2">&larr; Back</Button>
          </Link>
          <div className="h-6 w-px bg-border mx-1"></div>
          <div>
            <h1 className="text-lg font-bold flex items-center gap-2">
              Editing: Homepage
              <Badge variant="outline" className="font-normal text-xs bg-amber-50 text-amber-700 border-amber-200">Unsaved Changes</Badge>
            </h1>
            <p className="text-xs text-muted-foreground">Draft saved 2 mins ago by You</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm"><MonitorIcon className="h-4 w-4 mr-2"/> Preview</Button>
          <Button variant="outline" size="sm"><CalendarClockIcon className="h-4 w-4 mr-2"/> Schedule</Button>
          <div className="h-6 w-px bg-border mx-1"></div>
          <Button size="sm"><GlobeIcon className="h-4 w-4 mr-2"/> Publish Changes</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Main Editor Canvas Column */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Mock Editor Toolbar */}
          <div className="bg-muted/40 border rounded-md p-2 flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8"><UndoIcon className="h-4 w-4"/></Button>
            <Button variant="ghost" size="icon" className="h-8 w-8"><RedoIcon className="h-4 w-4"/></Button>
            <div className="h-5 w-px bg-border mx-2"></div>
            <Button variant="ghost" size="sm" className="h-8"><TypeIcon className="h-4 w-4 mr-2"/> Heading</Button>
            <Button variant="ghost" size="sm" className="h-8"><AlignLeftIcon className="h-4 w-4 mr-2"/> Text</Button>
            <Button variant="ghost" size="sm" className="h-8"><ImageIcon className="h-4 w-4 mr-2"/> Media</Button>
            <Button variant="ghost" size="sm" className="h-8"><LayoutTemplateIcon className="h-4 w-4 mr-2"/> Block</Button>
            <Button variant="ghost" size="sm" className="h-8"><CodeIcon className="h-4 w-4 mr-2"/> Embed</Button>
          </div>

          {/* Canvas Area */}
          <Card className="min-h-[700px] border-2 border-dashed bg-muted/10 relative overflow-hidden">
            <div className="absolute inset-0 p-8 space-y-6">
              
              {/* Block Mockup 1 */}
              <div className="border border-blue-200 bg-white dark:bg-black rounded-lg p-6 relative group hover:ring-2 ring-primary">
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background border rounded-md shadow-sm">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><SettingsIcon className="h-3 w-3"/></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><MoreVerticalIcon className="h-3 w-3"/></Button>
                </div>
                <Badge variant="secondary" className="absolute -top-3 -left-3 bg-blue-100 text-blue-800 z-10">Hero Banner Slider</Badge>
                
                <div className="bg-muted/30 h-48 rounded-md flex items-center justify-center border border-dashed mt-4">
                  <p className="text-muted-foreground flex flex-col items-center gap-2">
                    <ImageIcon className="h-8 w-8 opacity-50" />
                    Hero Image Configuration
                  </p>
                </div>
              </div>

              {/* Block Mockup 2 */}
              <div className="border border-purple-200 bg-white dark:bg-black rounded-lg p-6 relative group hover:ring-2 ring-primary">
                <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-background border rounded-md shadow-sm">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><SettingsIcon className="h-3 w-3"/></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive"><MoreVerticalIcon className="h-3 w-3"/></Button>
                </div>
                <Badge variant="secondary" className="absolute -top-3 -left-3 bg-purple-100 text-purple-800 z-10">Featured Collection Grid</Badge>
                
                <div className="mt-4">
                  <h3 className="text-lg font-bold mb-4 text-center">New Arrivals</h3>
                  <div className="grid grid-cols-4 gap-4">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="bg-muted/30 aspect-square rounded-md border border-dashed"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Add New Block Zone */}
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-primary/5 transition-colors text-primary/70">
                <PlusIcon className="h-8 w-8 mb-2" />
                <p className="font-medium">Add Section or Block</p>
              </div>

            </div>
          </Card>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          <Tabs defaultValue="settings" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="settings">Page Settings</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-6 mt-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex justify-between items-center">
                    SEO & Metadata
                    <Badge variant="success">95 / 100</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Page Title</label>
                    <input type="text" defaultValue="Premium Storefront | Home" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium">Meta Description</label>
                    <textarea defaultValue="Shop the latest premium collections..." className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm" />
                    <p className="text-[10px] text-muted-foreground text-right">43 / 160 chars</p>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-medium">URL Slug</label>
                    <div className="flex gap-2 items-center">
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1.5 rounded-md border">/</span>
                      <input type="text" disabled className="flex h-9 w-full rounded-md border border-input bg-muted/50 px-3 py-1 text-sm shadow-sm opacity-50" />
                    </div>
                  </div>
                  <Button variant="outline" className="w-full"><ImageIcon className="mr-2 h-4 w-4"/> Set Social Image</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center"><HistoryIcon className="mr-2 h-4 w-4"/> Version History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative border-l ml-3 space-y-6">
                    {[
                      { status: "Draft Saved", time: "Today, 2:34 PM", user: "You", current: true },
                      { status: "Published", time: "Oct 20, 10:15 AM", user: "Alice Smith", current: false },
                      { status: "Restored Version", time: "Sep 15, 4:00 PM", user: "Admin", current: false },
                      { status: "Published", time: "Aug 01, 9:00 AM", user: "Bob Jones", current: false },
                    ].map((ver, idx) => (
                      <div key={idx} className="pl-6 relative">
                        <div className="absolute -left-[9px] top-1">
                          <div className={`h-4 w-4 rounded-full border-2 bg-background ${ver.current ? 'border-primary' : 'border-muted-foreground'}`}></div>
                        </div>
                        <p className={`font-medium text-sm ${ver.current ? 'text-primary' : ''}`}>{ver.status}</p>
                        <p className="text-xs text-muted-foreground mt-1">{ver.time} • {ver.user}</p>
                        {!ver.current && (
                          <Button variant="link" className="px-0 h-auto text-xs mt-1">Restore this version</Button>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
