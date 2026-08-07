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
  LayoutTemplateIcon,
  CodeIcon,
  ImagePlayIcon,
  QuoteIcon,
  MoreVerticalIcon
} from "lucide-react";

export default function CMSComponentsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Reusable Blocks & Sections" 
        text="Design global components that can be dragged and dropped into any page."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Block
        </Button>
      </PageHeader>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Component 1 */}
        <Card className="hover:border-primary transition-colors group">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div className="flex flex-col gap-1">
              <Badge className="w-fit mb-1 bg-blue-100 text-blue-800 hover:bg-blue-200" variant="secondary">Dynamic Section</Badge>
              <CardTitle className="text-base flex items-center">
                <ImagePlayIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                Hero Banner Slider
              </CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2 opacity-0 group-hover:opacity-100"><MoreVerticalIcon className="h-4 w-4"/></Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">A full-width slider capable of holding images, videos, and CTA buttons. Automatically rotates every 5s.</p>
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-xs text-muted-foreground">Used on 3 pages</span>
              <Button variant="outline" size="sm">Edit Block</Button>
            </div>
          </CardContent>
        </Card>

        {/* Component 2 */}
        <Card className="hover:border-primary transition-colors group">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div className="flex flex-col gap-1">
              <Badge className="w-fit mb-1 bg-purple-100 text-purple-800 hover:bg-purple-200" variant="secondary">Reusable Block</Badge>
              <CardTitle className="text-base flex items-center">
                <QuoteIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                Testimonial Carousel
              </CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2 opacity-0 group-hover:opacity-100"><MoreVerticalIcon className="h-4 w-4"/></Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Pulls 5-star reviews from the database and displays them in a sliding carousel.</p>
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-xs text-muted-foreground">Used on 12 pages</span>
              <Button variant="outline" size="sm">Edit Block</Button>
            </div>
          </CardContent>
        </Card>

        {/* Component 3 */}
        <Card className="hover:border-primary transition-colors group">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div className="flex flex-col gap-1">
              <Badge className="w-fit mb-1 bg-blue-100 text-blue-800 hover:bg-blue-200" variant="secondary">Dynamic Section</Badge>
              <CardTitle className="text-base flex items-center">
                <LayoutTemplateIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                Featured Collection Grid
              </CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2 opacity-0 group-hover:opacity-100"><MoreVerticalIcon className="h-4 w-4"/></Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">Displays top 4 products from a specified collection category. Updates dynamically based on inventory.</p>
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-xs text-muted-foreground">Used on 1 page</span>
              <Button variant="outline" size="sm">Edit Block</Button>
            </div>
          </CardContent>
        </Card>

        {/* Component 4 */}
        <Card className="hover:border-primary transition-colors group">
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div className="flex flex-col gap-1">
              <Badge className="w-fit mb-1 bg-slate-100 text-slate-800 hover:bg-slate-200" variant="secondary">Custom HTML</Badge>
              <CardTitle className="text-base flex items-center">
                <CodeIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                Newsletter Opt-in
              </CardTitle>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-2 -mr-2 opacity-0 group-hover:opacity-100"><MoreVerticalIcon className="h-4 w-4"/></Button>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">An inline form capturing email addresses for Klaviyo integration. Includes standard GDPR checkbox.</p>
            <div className="flex justify-between items-center border-t pt-4">
              <span className="text-xs text-muted-foreground">Used on 8 pages</span>
              <Button variant="outline" size="sm">Edit Block</Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
