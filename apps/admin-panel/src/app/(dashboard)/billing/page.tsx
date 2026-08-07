import React from "react";
import { PageHeader, Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "@commercex/ui";
import { CreditCardIcon, CheckCircle2Icon } from "lucide-react";

export default function AdminBillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Billing & Plans" 
        text="Manage your subscription, payment methods, and billing history."
      />

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the Pro plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center pb-4 border-b">
              <div>
                <p className="text-2xl font-bold">$49.00<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
                <p className="text-sm text-muted-foreground">Renews on Nov 1, 2023</p>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                <CreditCardIcon className="h-5 w-5" />
              </div>
            </div>
            
            <ul className="space-y-2 pt-2">
              <li className="flex items-center text-sm"><CheckCircle2Icon className="h-4 w-4 mr-2 text-primary" /> Unlimited Products</li>
              <li className="flex items-center text-sm"><CheckCircle2Icon className="h-4 w-4 mr-2 text-primary" /> 5 Staff Accounts</li>
              <li className="flex items-center text-sm"><CheckCircle2Icon className="h-4 w-4 mr-2 text-primary" /> Advanced Analytics</li>
            </ul>

            <div className="pt-4 flex space-x-3">
              <Button>Upgrade Plan</Button>
              <Button variant="outline">Cancel Subscription</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your primary payment method.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="bg-muted p-2 rounded">
                  <CreditCardIcon className="h-6 w-6 text-foreground" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/2024</p>
                </div>
              </div>
              <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium">Default</span>
            </div>
            <Button variant="outline" className="w-full">Add Payment Method</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
