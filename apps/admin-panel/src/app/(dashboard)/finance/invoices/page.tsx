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
  Badge,
} from "@commercex/ui";
import { 
  FileTextIcon, 
  DownloadIcon, 
  RefreshCcwIcon,
  SearchIcon,
  ArrowUpRightIcon
} from "lucide-react";

export default function InvoicesAndRefundsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Invoices & Refunds" 
          text="Manage generated tax invoices and process refunds against specific orders."
        />
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 h-auto">
          <TabsTrigger value="invoices" className="py-2">Generated Invoices</TabsTrigger>
          <TabsTrigger value="refunds" className="py-2 flex items-center">
            Pending Refunds
            <Badge variant="warning" className="ml-2 h-5 w-5 p-0 flex justify-center items-center rounded-full text-[10px]">3</Badge>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="invoices">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
                <CardTitle className="flex items-center">
                  <FileTextIcon className="mr-2 h-5 w-5 text-muted-foreground" />
                  Tax Invoices
                </CardTitle>
                <div className="flex gap-2">
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input type="text" placeholder="Search INV- number..." className="flex h-9 rounded-md border border-input bg-background pl-9 pr-3 py-1 text-sm w-[250px]" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="grid grid-cols-12 p-3 bg-muted/50 text-sm font-medium text-muted-foreground">
                    <div className="col-span-3">Invoice #</div>
                    <div className="col-span-3">Order Ref</div>
                    <div className="col-span-3">Customer</div>
                    <div className="col-span-2">Date</div>
                    <div className="col-span-1 text-right">Action</div>
                  </div>
                  {[
                    { inv: "INV-2026-1042", order: "#ORD-1092", user: "Alice Smith", date: "Oct 24, 2026" },
                    { inv: "INV-2026-1041", order: "#ORD-1091", user: "Bob Jones", date: "Oct 24, 2026" },
                    { inv: "INV-2026-1040", order: "#ORD-1090", user: "Charlie Davis", date: "Oct 23, 2026" },
                  ].map((inv, i) => (
                    <div key={i} className="grid grid-cols-12 p-4 items-center hover:bg-muted/20">
                      <div className="col-span-3 font-mono text-sm font-medium">{inv.inv}</div>
                      <div className="col-span-3 text-sm text-primary hover:underline cursor-pointer">{inv.order}</div>
                      <div className="col-span-3 text-sm">{inv.user}</div>
                      <div className="col-span-2 text-sm text-muted-foreground">{inv.date}</div>
                      <div className="col-span-1 text-right">
                        <Button variant="ghost" size="icon"><DownloadIcon className="h-4 w-4"/></Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="refunds">
            <Card>
              <CardHeader className="flex flex-row justify-between items-center border-b pb-4">
                <CardTitle className="flex items-center text-warning-foreground">
                  <RefreshCcwIcon className="mr-2 h-5 w-5" />
                  Refund Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  <div className="grid grid-cols-12 p-3 bg-muted/50 text-sm font-medium text-muted-foreground">
                    <div className="col-span-2">Order</div>
                    <div className="col-span-3">Reason</div>
                    <div className="col-span-2">Amount</div>
                    <div className="col-span-2">Gateway</div>
                    <div className="col-span-3 text-right">Action</div>
                  </div>
                  {[
                    { order: "#ORD-1080", reason: "Damaged in transit", amount: "$45.00", gateway: "Stripe" },
                    { order: "#ORD-1072", reason: "Customer requested", amount: "$120.00", gateway: "Razorpay" },
                    { order: "#ORD-1045", reason: "Out of stock", amount: "$24.99", gateway: "PayPal" },
                  ].map((req, i) => (
                    <div key={i} className="grid grid-cols-12 p-4 items-center">
                      <div className="col-span-2 font-medium text-primary hover:underline cursor-pointer">{req.order}</div>
                      <div className="col-span-3 text-sm">{req.reason}</div>
                      <div className="col-span-2 font-medium">{req.amount}</div>
                      <div className="col-span-2"><Badge variant="outline">{req.gateway}</Badge></div>
                      <div className="col-span-3 text-right space-x-2">
                        <Button variant="outline" size="sm">Reject</Button>
                        <Button variant="default" size="sm" className="bg-warning text-warning-foreground hover:bg-warning/90">Process Refund</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
