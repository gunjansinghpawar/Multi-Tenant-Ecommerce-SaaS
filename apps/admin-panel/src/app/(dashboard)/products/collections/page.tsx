"use client";

import React from "react";
import { PageHeader, Card, CardContent, Button } from "@commercex/ui";
import { PlusIcon } from "lucide-react";

export default function CollectionsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Collections" 
        text="Group products manually or by automated rules (e.g., Summer Sale)."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Create Collection
        </Button>
      </PageHeader>
      <Card>
        <CardContent className="p-12 text-center text-muted-foreground">
          Collections list will appear here.
        </CardContent>
      </Card>
    </div>
  );
}
