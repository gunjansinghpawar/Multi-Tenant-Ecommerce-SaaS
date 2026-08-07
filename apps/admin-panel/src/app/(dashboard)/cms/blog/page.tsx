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
  PlusIcon,
  PenToolIcon,
  MoreHorizontalIcon
} from "lucide-react";

export default function BlogPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Blog & Authors" 
        text="Publish articles, manage your blog categories, and maintain author profiles."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Write Article
        </Button>
      </PageHeader>

      <Tabs defaultValue="articles" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 h-auto">
          <TabsTrigger value="articles" className="py-2">Articles</TabsTrigger>
          <TabsTrigger value="authors" className="py-2">Authors</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="articles">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center pb-2">
                <CardTitle>All Articles</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="grid grid-cols-6 p-3 bg-muted/50 text-sm font-medium text-muted-foreground">
                    <div className="col-span-3">Title</div>
                    <div>Author</div>
                    <div>Status</div>
                    <div className="text-right">Published</div>
                  </div>
                  {[
                    { title: "Top 10 Winter Coats for 2026", author: "Alice Smith", status: "Published", date: "Oct 24, 2026" },
                    { title: "How to Style Your New Leather Boots", author: "Bob Jones", status: "Published", date: "Oct 15, 2026" },
                    { title: "Black Friday Sale Announcements", author: "Admin", status: "Scheduled", date: "Nov 01, 2026" },
                    { title: "Behind the Scenes: Our Factory", author: "Charlie Brown", status: "Draft", date: "-" },
                  ].map((article, i) => (
                    <div key={i} className="grid grid-cols-6 p-4 items-center hover:bg-muted/30 cursor-pointer transition-colors">
                      <div className="col-span-3 font-medium text-primary hover:underline">{article.title}</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <div className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs mr-2">
                          {article.author.charAt(0)}
                        </div>
                        {article.author}
                      </div>
                      <div>
                        <Badge variant={article.status === 'Published' ? 'success' : article.status === 'Scheduled' ? 'warning' : 'secondary' as any}>
                          {article.status}
                        </Badge>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">{article.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="authors">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Alice Smith", role: "Editor in Chief", articles: 45, initials: "AS" },
                { name: "Bob Jones", role: "Contributing Writer", articles: 12, initials: "BJ" },
                { name: "Charlie Brown", role: "Guest Blogger", articles: 3, initials: "CB" },
              ].map((author, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">
                        {author.initials}
                      </div>
                      <div>
                        <CardTitle className="text-base">{author.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{author.role}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon"><MoreHorizontalIcon className="h-4 w-4"/></Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center text-sm border-t pt-4">
                      <span className="text-muted-foreground flex items-center"><PenToolIcon className="mr-2 h-4 w-4"/> Articles Published</span>
                      <span className="font-bold">{author.articles}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Card className="border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors min-h-[160px]">
                <PlusIcon className="h-8 w-8 text-muted-foreground mb-2" />
                <p className="font-medium text-muted-foreground">Add New Author</p>
              </Card>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
