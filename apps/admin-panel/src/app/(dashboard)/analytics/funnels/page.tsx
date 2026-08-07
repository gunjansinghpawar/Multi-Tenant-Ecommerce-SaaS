"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  Button
} from "@commercex/ui";
import { FilterIcon, CalendarIcon } from "lucide-react";

export default function FunnelsAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Conversion Funnels" 
          text="Visualize the customer journey and identify drop-off points."
        />
        <div className="flex space-x-2">
          <Button variant="outline">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
        </div>
      </div>
      
      <Card className="min-h-[600px]">
        <CardHeader>
          <CardTitle>E-commerce Checkout Funnel</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center pt-10">
          <div className="w-full max-w-3xl space-y-4">
            
            {/* Funnel Step 1 */}
            <div className="relative flex flex-col items-center">
              <div className="w-full bg-blue-500 text-white rounded-md p-4 text-center shadow-sm z-10 relative flex justify-between items-center">
                <span className="font-semibold">View Item (Product Page)</span>
                <span className="font-bold text-xl">100% (24,500)</span>
              </div>
              <div className="w-[85%] h-8 bg-blue-100 border-x border-b border-blue-200"></div>
            </div>

            {/* Funnel Step 2 */}
            <div className="relative flex flex-col items-center">
              <div className="w-[85%] bg-blue-500 text-white rounded-md p-4 text-center shadow-sm z-10 relative flex justify-between items-center">
                <span className="font-semibold">Add to Cart</span>
                <span className="font-bold text-xl">42% (10,290)</span>
              </div>
              <div className="w-[60%] h-8 bg-blue-100 border-x border-b border-blue-200"></div>
            </div>

            {/* Funnel Step 3 */}
            <div className="relative flex flex-col items-center">
              <div className="w-[60%] bg-blue-500 text-white rounded-md p-4 text-center shadow-sm z-10 relative flex justify-between items-center">
                <span className="font-semibold">Initiate Checkout</span>
                <span className="font-bold text-xl">25% (6,125)</span>
              </div>
              <div className="w-[30%] h-8 bg-blue-100 border-x border-b border-blue-200"></div>
            </div>

            {/* Funnel Step 4 */}
            <div className="relative flex flex-col items-center">
              <div className="w-[30%] bg-green-500 text-white rounded-md p-4 text-center shadow-sm z-10 relative flex justify-between items-center">
                <span className="font-semibold">Purchase Successful</span>
                <span className="font-bold text-xl">12% (2,940)</span>
              </div>
            </div>

          </div>
          
          <div className="mt-16 text-center text-muted-foreground max-w-lg">
            <h4 className="font-semibold text-foreground">Biggest Drop-off: Add to Cart ➡️ Checkout (41% drop)</h4>
            <p className="text-sm mt-2">Consider implementing an exit-intent popup or abandoned cart email sequence to recover these users.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
