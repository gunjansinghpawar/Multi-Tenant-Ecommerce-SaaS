"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@commercex/ui";
import { PlusIcon, TagIcon, MoreVerticalIcon } from "lucide-react";

export default function MediaTagsPage() {
  const tags = [
    { name: "campaign-summer23", count: 145, color: "bg-orange-100 text-orange-800" },
    { name: "product-primary", count: 890, color: "bg-blue-100 text-blue-800" },
    { name: "marketing", count: 320, color: "bg-purple-100 text-purple-800" },
    { name: "archived", count: 1540, color: "bg-slate-100 text-slate-800" },
  ];

  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Media Tags" 
        text="Manage tags to categorize and easily retrieve your assets."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          Create Tag
        </Button>
      </PageHeader>
      
      <Card>
        <CardHeader>
          <CardTitle>Global Tags</CardTitle>
          <CardDescription>Tags can be applied to any type of media asset.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tag Name</TableHead>
                  <TableHead>Asset Count</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tags.map((tag, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Badge className={tag.color} variant="outline">{tag.name}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <TagIcon className="h-3 w-3" /> {tag.count} assets
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVerticalIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
