"use client";

import React from "react";
import { PageHeader, Card, CardContent } from "@commercex/ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@commercex/ui";

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Reviews & Q&A" 
        text="Moderate customer reviews and answer product questions."
      />
      <Tabs defaultValue="reviews" className="w-full">
        <TabsList>
          <TabsTrigger value="reviews">Product Reviews</TabsTrigger>
          <TabsTrigger value="questions">Customer Questions</TabsTrigger>
        </TabsList>
        <TabsContent value="reviews" className="mt-4">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              Reviews moderation list will appear here.
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="questions" className="mt-4">
          <Card>
            <CardContent className="p-12 text-center text-muted-foreground">
              Customer Q&A list will appear here.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
