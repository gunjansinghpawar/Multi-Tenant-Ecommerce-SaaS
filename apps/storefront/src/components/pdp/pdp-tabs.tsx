'use client';

import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger, Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@commercex/ui';

interface PdpTabsProps {
  description: string;
  specifications: Record<string, string>;
  faqs: { q: string; a: string }[];
}

export function PdpTabs({ description, specifications, faqs }: PdpTabsProps) {
  
  const DescriptionContent = (
    <div className="prose prose-sm sm:prose-base dark:prose-invert max-w-none text-muted-foreground pt-4">
      <p>{description}</p>
      <p>Our products are engineered with the finest materials to ensure longevity and superior performance. Whether you are using it casually or professionally, this item promises to deliver on every front.</p>
    </div>
  );

  const SpecsContent = (
    <div className="pt-4">
      <div className="border rounded-md overflow-hidden">
        <table className="w-full text-sm text-left">
          <tbody>
            {Object.entries(specifications).map(([key, value], idx) => (
              <tr key={key} className={idx % 2 === 0 ? "bg-muted/30" : "bg-background"}>
                <th className="px-4 py-3 font-medium text-foreground w-1/3 border-r">{key}</th>
                <td className="px-4 py-3 text-muted-foreground">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const FaqContent = (
    <div className="pt-4 space-y-4">
      {faqs.map((faq, idx) => (
        <div key={idx}>
          <h4 className="font-medium text-foreground">{faq.q}</h4>
          <p className="text-sm text-muted-foreground mt-1">{faq.a}</p>
        </div>
      ))}
    </div>
  );

  const ReviewsContent = (
    <div className="pt-4 flex flex-col items-center justify-center py-12 text-center">
      <h3 className="text-xl font-medium mb-2">No reviews yet</h3>
      <p className="text-muted-foreground mb-4">Be the first to share your thoughts on this product.</p>
      <button className="text-primary font-medium hover:underline underline-offset-4">Write a Review</button>
    </div>
  );

  return (
    <div className="w-full">
      {/* Desktop Tabs */}
      <div className="hidden md:block">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-12 bg-transparent p-0">
            <TabsTrigger value="description" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6 data-[state=active]:shadow-none">Description</TabsTrigger>
            <TabsTrigger value="specifications" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6 data-[state=active]:shadow-none">Specifications</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6 data-[state=active]:shadow-none">Reviews</TabsTrigger>
            <TabsTrigger value="faqs" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none h-full px-6 data-[state=active]:shadow-none">FAQs</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="min-h-[200px]">{DescriptionContent}</TabsContent>
          <TabsContent value="specifications" className="min-h-[200px]">{SpecsContent}</TabsContent>
          <TabsContent value="reviews" className="min-h-[200px]">{ReviewsContent}</TabsContent>
          <TabsContent value="faqs" className="min-h-[200px]">{FaqContent}</TabsContent>
        </Tabs>
      </div>

      {/* Mobile Accordions */}
      <div className="block md:hidden">
        <Accordion type="single" collapsible defaultValue="description" className="w-full">
          <AccordionItem value="description">
            <AccordionTrigger className="text-base font-medium">Description</AccordionTrigger>
            <AccordionContent>{DescriptionContent}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="specifications">
            <AccordionTrigger className="text-base font-medium">Specifications</AccordionTrigger>
            <AccordionContent>{SpecsContent}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="reviews">
            <AccordionTrigger className="text-base font-medium">Reviews</AccordionTrigger>
            <AccordionContent>{ReviewsContent}</AccordionContent>
          </AccordionItem>
          <AccordionItem value="faqs">
            <AccordionTrigger className="text-base font-medium">FAQs</AccordionTrigger>
            <AccordionContent>{FaqContent}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
