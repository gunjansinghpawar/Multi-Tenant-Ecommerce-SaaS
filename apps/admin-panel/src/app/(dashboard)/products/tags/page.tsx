"use client";

import React from "react";
import { PageHeader, Card, CardContent, Button } from "@commercex/ui";
import { PlusIcon } from "lucide-react";

export default function TagsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Tags" 
        text="Manage product tags used for filtering and search."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Tag
        </Button>
      </PageHeader>
      <Card>
        <CardContent className="p-12 text-center text-muted-foreground">
          Tags list will appear here.
        </CardContent>
      </Card>
    </div>
  );
}
