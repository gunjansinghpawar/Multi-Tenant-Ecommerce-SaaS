"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@commercex/ui";
import { 
  FileTextIcon, 
  EyeIcon, 
  ImagePlusIcon,
  MousePointerClickIcon
} from "lucide-react";

export default function CMSDashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Content Dashboard" 
        text="Overview of your published pages, blog articles, and recent content updates."
      >
        <Button>
          <FileTextIcon className="mr-2 h-4 w-4" />
          Create New Page
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Pages</CardTitle>
            <FileTextIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">3 in draft status</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views (30d)</CardTitle>
            <EyeIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142.5k</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Assets</CardTitle>
            <ImagePlusIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">842</div>
            <p className="text-xs text-muted-foreground">Using 1.2 GB storage</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Landing Page</CardTitle>
            <MousePointerClickIcon className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold truncate">/black-friday-2026</div>
            <p className="text-xs text-muted-foreground">12.4% conversion rate</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Content Views Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center border border-dashed rounded-md bg-muted/20">
              <span className="text-muted-foreground">Traffic Analytics Chart Placeholder</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Updates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Homepage", type: "Page", status: "Published", user: "Alice S.", time: "2 hours ago" },
                { name: "Summer Collection 2026", type: "Landing Page", status: "Draft", user: "Bob J.", time: "5 hours ago" },
                { name: "Return Policy", type: "Page", status: "Published", user: "Admin", time: "1 day ago" },
                { name: "Top 10 Winter Coats", type: "Article", status: "Scheduled", user: "Content Team", time: "2 days ago" },
              ].map((item, i) => (
                <div className="flex items-center justify-between" key={i}>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none hover:underline cursor-pointer text-primary">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.type} • Updated by {item.user} {item.time}</p>
                  </div>
                  <div className={`font-medium text-xs px-2 py-1 rounded-full ${
                    item.status === 'Published' ? 'bg-success/20 text-success' : 
                    item.status === 'Draft' ? 'bg-secondary text-secondary-foreground' : 
                    'bg-warning/20 text-warning-foreground'
                  }`}>
                    {item.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
