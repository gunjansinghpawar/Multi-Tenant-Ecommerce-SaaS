"use client";

import React from "react";
import { PageHeader, Card, CardContent, Button } from "@commercex/ui";
import { PlusIcon } from "lucide-react";

export default function BrandsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Brands" 
        text="Manage product brands and manufacturers."
      >
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Add Brand
        </Button>
      </PageHeader>
      <Card>
        <CardContent className="p-12 text-center text-muted-foreground">
          Brands list will appear here.
        </CardContent>
      </Card>
    </div>
  );
}
