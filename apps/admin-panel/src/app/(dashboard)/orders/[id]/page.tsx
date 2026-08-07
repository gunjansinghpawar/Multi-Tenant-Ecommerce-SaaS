"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@commercex/ui";
import { 
  MoreHorizontalIcon, 
  PrinterIcon, 
  FileTextIcon, 
  PackageIcon, 
  MailIcon, 
  CreditCardIcon, 
  ArrowRightLeftIcon, 
  UndoIcon, 
  SplitIcon, 
  CombineIcon, 
  XCircleIcon,
  MessageSquareIcon,
  CheckCircleIcon
} from "lucide-react";

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const orderId = params.id || "ORD-001";
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold tracking-tight">{orderId}</h1>
            <Badge variant="success">Paid</Badge>
            <Badge variant="warning">Unfulfilled</Badge>
          </div>
          <p className="text-muted-foreground text-sm">October 24, 2026 at 2:34 PM</p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline">
            <MailIcon className="mr-2 h-4 w-4" />
            Resend Receipt
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MoreHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem><UndoIcon className="mr-2 h-4 w-4" /> Refund</DropdownMenuItem>
              <DropdownMenuItem><ArrowRightLeftIcon className="mr-2 h-4 w-4" /> Exchange</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><SplitIcon className="mr-2 h-4 w-4" /> Split Order</DropdownMenuItem>
              <DropdownMenuItem><CombineIcon className="mr-2 h-4 w-4" /> Merge Order</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive"><XCircleIcon className="mr-2 h-4 w-4" /> Cancel Order</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Items & Fulfillment */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between bg-muted/30 pb-4 border-b">
              <CardTitle className="text-lg">Unfulfilled (2)</CardTitle>
              <Button size="sm">
                <PackageIcon className="mr-2 h-4 w-4" />
                Fulfill Items
              </Button>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {[
                { name: "Wireless Earbuds Pro", sku: "WEP-001", price: "$120.00", qty: 1 },
                { name: "Cotton T-Shirt (M)", sku: "TSH-M-WHT", price: "$25.00", qty: 2 },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 bg-muted rounded-md border flex items-center justify-center">
                      <PackageIcon className="h-6 w-6 text-muted-foreground/50" />
                    </div>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{item.price} x {item.qty}</p>
                    <p className="text-sm text-muted-foreground font-medium mt-1">
                      ${(parseFloat(item.price.replace('$', '')) * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Payment Status */}
          <Card>
            <CardHeader className="border-b bg-muted/30 pb-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCardIcon className="h-5 w-5 text-muted-foreground" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal (3 items)</span>
                  <span>$170.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping (Standard)</span>
                  <span>$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (8%)</span>
                  <span>$13.60</span>
                </div>
                <div className="pt-3 border-t flex justify-between font-bold text-base">
                  <span>Total</span>
                  <span>$188.60</span>
                </div>
                <div className="pt-3 border-t flex justify-between font-medium text-success">
                  <span>Paid by customer (Visa ending in 4242)</span>
                  <span>$188.60</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l ml-3 space-y-6">
                {[
                  { title: "Order placed", time: "Today, 2:34 PM", icon: CheckCircleIcon, color: "text-success" },
                  { title: "Payment processed on Visa ending in 4242", time: "Today, 2:35 PM", icon: CreditCardIcon, color: "text-primary" },
                  { title: "Order confirmation email sent to alice@example.com", time: "Today, 2:35 PM", icon: MailIcon, color: "text-muted-foreground" },
                ].map((event, idx) => (
                  <div key={idx} className="pl-6 relative">
                    <div className="absolute -left-[13px] top-1 bg-background">
                      <event.icon className={`h-6 w-6 bg-background rounded-full ${event.color}`} />
                    </div>
                    <p className="font-medium text-sm">{event.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{event.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-6">
          
          {/* Customer */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex justify-between items-center">
                Customer
                <Button variant="link" size="sm" className="h-auto p-0">Edit</Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-sm">
              <div>
                <p className="font-medium text-primary hover:underline cursor-pointer">Alice Smith</p>
                <p className="text-muted-foreground">5 orders</p>
              </div>
              
              <div className="space-y-1">
                <p className="font-medium mb-2">Contact Info</p>
                <p className="text-primary hover:underline cursor-pointer">alice@example.com</p>
                <p>+1 (555) 123-4567</p>
              </div>

              <div className="space-y-1">
                <p className="font-medium mb-2">Shipping Address</p>
                <p>Alice Smith</p>
                <p>123 Main Street</p>
                <p>Apt 4B</p>
                <p>New York, NY 10001</p>
                <p>United States</p>
              </div>
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <FileTextIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                View Invoice
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <PrinterIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                Print Packing Slip
              </Button>
              <Button variant="outline" className="w-full justify-start" disabled>
                <PackageIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                Buy Shipping Label
              </Button>
            </CardContent>
          </Card>

          {/* Notes / Internal Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Internal Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md border border-yellow-200 dark:border-yellow-900/50">
                  <div className="flex items-start gap-2 text-sm text-yellow-800 dark:text-yellow-200">
                    <MessageSquareIcon className="h-4 w-4 mt-0.5 shrink-0" />
                    <p>Customer requested expedited shipping if possible. Please pack ASAP.</p>
                  </div>
                  <p className="text-xs text-yellow-700/70 dark:text-yellow-400/50 mt-2 text-right">Added by John D. - Today, 3:00 PM</p>
                </div>
                
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Add a note..."
                  />
                  <Button variant="secondary">Add</Button>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
