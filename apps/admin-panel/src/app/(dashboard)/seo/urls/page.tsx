"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Badge,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@commercex/ui";
import { 
  PlusIcon,
  ArrowRightIcon,
  TrashIcon,
  AlertOctagonIcon
} from "lucide-react";

export default function URLManagementPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="URL Management" 
          text="Manage 301/302 redirects and monitor broken 404 links across your site."
        />
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Redirect
        </Button>
      </div>

      <Tabs defaultValue="redirects" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 h-auto">
          <TabsTrigger value="redirects" className="py-2">URL Redirects</TabsTrigger>
          <TabsTrigger value="broken" className="py-2 flex items-center">
            Broken Links (404)
            <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex justify-center items-center rounded-full">12</Badge>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="redirects">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
                <CardTitle>Active Redirects</CardTitle>
                <div className="flex gap-2">
                  <input type="text" placeholder="Search paths..." className="flex h-9 rounded-md border border-input bg-background px-3 py-1 text-sm" />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="grid grid-cols-12 p-3 bg-muted/50 text-sm font-medium text-muted-foreground">
                    <div className="col-span-5">From Path</div>
                    <div className="col-span-1 text-center">Type</div>
                    <div className="col-span-5">To Target</div>
                    <div className="col-span-1 text-right">Actions</div>
                  </div>
                  {[
                    { from: "/old-about-us", type: "301", to: "/about" },
                    { from: "/collections/winter-25", type: "302", to: "/collections/clearance" },
                    { from: "/products/discontinued-shoe", type: "301", to: "/collections/shoes" },
                  ].map((rule, i) => (
                    <div key={i} className="grid grid-cols-12 p-4 items-center hover:bg-muted/30">
                      <div className="col-span-5 font-mono text-sm">{rule.from}</div>
                      <div className="col-span-1 text-center">
                        <Badge variant="outline" className={rule.type === '301' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}>
                          {rule.type}
                        </Badge>
                      </div>
                      <div className="col-span-5 font-mono text-sm text-primary flex items-center">
                        <ArrowRightIcon className="h-4 w-4 mx-2 text-muted-foreground" />
                        {rule.to}
                      </div>
                      <div className="col-span-1 text-right">
                        <Button variant="ghost" size="icon" className="text-destructive"><TrashIcon className="h-4 w-4"/></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="broken">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
                <CardTitle className="flex items-center text-destructive">
                  <AlertOctagonIcon className="mr-2 h-5 w-5" />
                  404 Not Found Log
                </CardTitle>
                <Button variant="outline" size="sm">Clear Log</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="grid grid-cols-12 p-3 bg-muted/50 text-sm font-medium text-muted-foreground">
                    <div className="col-span-6">Missing URL path</div>
                    <div className="col-span-2 text-center">Hits</div>
                    <div className="col-span-2 text-center">Last Hit</div>
                    <div className="col-span-2 text-right">Action</div>
                  </div>
                  {[
                    { path: "/wp-admin", hits: 420, date: "10 mins ago" },
                    { path: "/products/typo-in-slug", hits: 15, date: "2 hours ago" },
                    { path: "/images/old_logo.png", hits: 8, date: "1 day ago" },
                  ].map((log, i) => (
                    <div key={i} className="grid grid-cols-12 p-4 items-center">
                      <div className="col-span-6 font-mono text-sm text-destructive">{log.path}</div>
                      <div className="col-span-2 text-center font-medium">{log.hits}</div>
                      <div className="col-span-2 text-center text-sm text-muted-foreground">{log.date}</div>
                      <div className="col-span-2 text-right">
                        <Button variant="secondary" size="sm" onClick={() => setIsSheetOpen(true)}>Create Redirect</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add Redirect Rule</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium">From Path</label>
              <input type="text" placeholder="/old-path" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm font-mono" />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Redirect Type</label>
              <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm">
                <option value="301">301 (Permanent)</option>
                <option value="302">302 (Temporary)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium">Target URL / Path</label>
              <input type="text" placeholder="/new-path or https://ext.com" className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm font-mono" />
            </div>
            <Button className="w-full mt-4" onClick={() => setIsSheetOpen(false)}>Save Redirect</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
