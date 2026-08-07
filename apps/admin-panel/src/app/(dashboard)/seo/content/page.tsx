"use client";

import React from "react";
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
  Badge
} from "@commercex/ui";
import { 
  AlertCircleIcon,
  ImageIcon,
  SparklesIcon,
  CheckCircle2Icon
} from "lucide-react";

export default function ContentSEOPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Content & Image SEO" 
        text="Identify missing metadata across your products and blogs, and find new keywords."
      >
        <Button>
          <SparklesIcon className="mr-2 h-4 w-4" />
          Auto-Generate Missing Tags
        </Button>
      </PageHeader>

      <Tabs defaultValue="issues" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 h-auto">
          <TabsTrigger value="issues" className="py-2 flex items-center">
            SEO Issues
            <Badge variant="destructive" className="ml-2 h-5 w-5 p-0 flex justify-center items-center rounded-full">3</Badge>
          </TabsTrigger>
          <TabsTrigger value="keywords" className="py-2">Keyword Suggestions</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="issues" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <AlertCircleIcon className="mr-2 h-4 w-4 text-warning" />
                    Missing Meta Descriptions
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y border-t">
                    <div className="p-4 flex items-center justify-between bg-muted/20 hover:bg-muted/50">
                      <div>
                        <p className="font-medium text-primary hover:underline cursor-pointer">Leather Wallet (Brown)</p>
                        <p className="text-xs text-muted-foreground">Product</p>
                      </div>
                      <Button variant="outline" size="sm">Fix</Button>
                    </div>
                    <div className="p-4 flex items-center justify-between bg-muted/20 hover:bg-muted/50">
                      <div>
                        <p className="font-medium text-primary hover:underline cursor-pointer">Summer Sale 2026</p>
                        <p className="text-xs text-muted-foreground">Category Page</p>
                      </div>
                      <Button variant="outline" size="sm">Fix</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center">
                    <ImageIcon className="mr-2 h-4 w-4 text-warning" />
                    Missing Image Alt Text
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y border-t">
                    <div className="p-4 flex items-center justify-between bg-muted/20 hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-muted border border-dashed rounded flex items-center justify-center">
                          <ImageIcon className="h-4 w-4 text-muted-foreground/50"/>
                        </div>
                        <div>
                          <p className="font-medium text-primary hover:underline cursor-pointer">hero_banner_v2.jpg</p>
                          <p className="text-xs text-muted-foreground">Used on Homepage</p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">Add Alt</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </TabsContent>

          <TabsContent value="keywords">
            <Card>
              <CardHeader>
                <CardTitle>Keyword Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 mb-6">
                  <input type="text" placeholder="Enter a topic (e.g. 'winter boots')..." className="flex h-9 flex-1 rounded-md border border-input bg-background px-3 py-1 text-sm" />
                  <Button variant="secondary">Get Suggestions</Button>
                </div>

                <div className="border rounded-md divide-y">
                  <div className="grid grid-cols-4 p-3 bg-muted/50 text-sm font-medium text-muted-foreground">
                    <div className="col-span-2">Keyword</div>
                    <div>Search Volume</div>
                    <div>Difficulty</div>
                  </div>
                  {[
                    { kw: "best leather winter boots", vol: "12,500", diff: "Medium", color: "text-warning" },
                    { kw: "waterproof boots for men", vol: "8,400", diff: "Hard", color: "text-destructive" },
                    { kw: "vegan leather boots sale", vol: "1,200", diff: "Easy", color: "text-success" },
                  ].map((item, i) => (
                    <div key={i} className="grid grid-cols-4 p-4 items-center">
                      <div className="col-span-2 font-medium">{item.kw}</div>
                      <div className="text-sm">{item.vol} /mo</div>
                      <div>
                        <Badge variant="outline" className={item.color}>{item.diff}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
