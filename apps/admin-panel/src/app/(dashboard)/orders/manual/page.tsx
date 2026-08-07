"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Form,
  RHFInput,
  RHFSelect
} from "@commercex/ui";
import { SearchIcon, PlusIcon, TagIcon, CreditCardIcon, SaveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const manualOrderSchema = z.object({
  customerId: z.string().optional(),
  customerEmail: z.string().email().optional().or(z.literal("")),
  customerName: z.string().min(2).optional().or(z.literal("")),
  discountCode: z.string().optional(),
  paymentMethod: z.string().min(1, "Payment method is required"),
});

export default function ManualOrderPage() {
  const [items, setItems] = useState<{name: string, price: number, qty: number}[]>([]);

  const form = useForm<z.infer<typeof manualOrderSchema>>({
    resolver: zodResolver(manualOrderSchema),
    defaultValues: { paymentMethod: "manual" },
  });

  const onSubmit = (values: z.infer<typeof manualOrderSchema>) => {
    console.log("Saving manual order:", values, items);
  };

  const subtotal = items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.08; // Fake 8% tax
  const total = subtotal + tax;

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Create Order" 
          text="Manually draft an order for a customer or wholesale client."
        />
        <div className="flex space-x-2">
          <Button variant="outline">
            <SaveIcon className="mr-2 h-4 w-4" />
            Save as Draft
          </Button>
          <Button onClick={form.handleSubmit(onSubmit)}>
            Create Order
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form className="grid gap-6 md:grid-cols-3">
          
          <div className="md:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Search products..."
                    />
                  </div>
                  <Button variant="secondary" type="button">Browse</Button>
                </div>

                {items.length === 0 ? (
                  <div className="text-center py-8 text-sm text-muted-foreground border border-dashed rounded-md">
                    No products added yet.
                  </div>
                ) : (
                  <div className="border rounded-md divide-y">
                    {items.map((item, idx) => (
                      <div key={idx} className="p-3 flex items-center justify-between">
                        <span className="font-medium">{item.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">${item.price.toFixed(2)} x {item.qty}</span>
                          <span className="font-medium">${(item.price * item.qty).toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <RHFSelect 
                  name="paymentMethod" 
                  label="Payment Method" 
                  options={[
                    { label: "Manual Collection (Cash/Transfer)", value: "manual" },
                    { label: "Send Invoice Email", value: "invoice" },
                    { label: "Credit Card (Terminal)", value: "card" },
                  ]}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Customer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    className="flex h-10 w-full rounded-md border border-input bg-background pl-9 pr-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    placeholder="Search existing customers..."
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or add new</span></div>
                </div>
                <RHFInput name="customerName" label="Full Name" />
                <RHFInput name="customerEmail" label="Email Address" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm items-center">
                  <span className="text-muted-foreground">Discount</span>
                  <div className="flex items-center text-primary cursor-pointer text-xs font-medium">
                    <TagIcon className="h-3 w-3 mr-1" /> Add discount
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="pt-4 border-t flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </form>
      </Form>
    </div>
  );
}
