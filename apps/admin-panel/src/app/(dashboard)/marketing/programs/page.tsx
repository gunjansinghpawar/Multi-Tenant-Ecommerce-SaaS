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
  TabsContent
} from "@commercex/ui";
import { 
  GiftIcon, 
  LinkIcon, 
  SettingsIcon,
  UsersIcon,
  StarIcon,
  PlusIcon
} from "lucide-react";

export default function MarketingProgramsPage() {
  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Referrals & Loyalty" 
          text="Manage programs that turn your best customers into advocates."
        />
        <Button>
          <SettingsIcon className="mr-2 h-4 w-4" />
          Program Settings
        </Button>
      </div>

      <Tabs defaultValue="referral" className="w-full">
        <TabsList className="grid w-full md:w-[600px] grid-cols-3 h-auto">
          <TabsTrigger value="referral" className="py-2">Referral Program</TabsTrigger>
          <TabsTrigger value="loyalty" className="py-2">Loyalty Points</TabsTrigger>
          <TabsTrigger value="affiliate" className="py-2">Affiliates</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          
          <TabsContent value="referral" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Give $20, Get $20</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium text-primary">Current Offer</p>
                  <Button variant="link" className="px-0 h-auto">Edit rules</Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Successful Referrals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">1,204</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Revenue Generated</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">$24,500</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Top Referrers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md divide-y">
                  {[
                    { name: "Alice Smith", referrals: 42, earned: "$840" },
                    { name: "Bob Jones", referrals: 15, earned: "$300" },
                    { name: "Charlie Brown", referrals: 8, earned: "$160" },
                  ].map((user, i) => (
                    <div key={i} className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center font-medium text-primary">
                          {user.name.charAt(0)}
                        </div>
                        <p className="font-medium hover:underline cursor-pointer">{user.name}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{user.referrals} <span className="text-sm font-normal text-muted-foreground">referrals</span></p>
                        <p className="text-sm text-success font-medium">{user.earned} earned</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="loyalty" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader className="pb-3 border-b mb-3">
                  <CardTitle>Tiers & Rules</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium text-amber-600">Bronze Tier</p>
                      <p className="text-sm text-muted-foreground">0 - 500 points (1 point per $1)</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-md bg-muted/10">
                    <div>
                      <p className="font-medium text-slate-400">Silver Tier</p>
                      <p className="text-sm text-muted-foreground">500 - 2000 points (1.5 points per $1)</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                  <div className="flex justify-between items-center p-3 border border-yellow-400/50 rounded-md bg-yellow-500/5">
                    <div>
                      <p className="font-medium text-yellow-600">Gold Tier</p>
                      <p className="text-sm text-muted-foreground">2000+ points (2 points per $1 + Free Shipping)</p>
                    </div>
                    <Button variant="outline" size="sm">Edit</Button>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Points Outstanding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold flex items-center">
                      <StarIcon className="h-6 w-6 text-yellow-500 mr-2" />
                      1.2M
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Liability value: $12,000</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Members Enrolled</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold flex items-center">
                      <UsersIcon className="h-6 w-6 text-primary mr-2" />
                      8,450
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="affiliate" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Affiliate Partners</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">Manage influencers and partners promoting your store.</p>
                </div>
                <Button><PlusIcon className="h-4 w-4 mr-2"/> Invite Partner</Button>
              </CardHeader>
              <CardContent>
                <div className="border rounded-md divide-y">
                  <div className="grid grid-cols-5 p-3 bg-muted/50 text-sm font-medium text-muted-foreground">
                    <div className="col-span-2">Partner Name</div>
                    <div>Code / Link</div>
                    <div>Conversions</div>
                    <div className="text-right">Payout Due</div>
                  </div>
                  {[
                    { name: "TechReviewer_101", code: "TECH10", conv: 125, due: "$1,250.00" },
                    { name: "Jane Fashion Blog", code: "JANE15", conv: 84, due: "$420.00" },
                  ].map((aff, i) => (
                    <div key={i} className="grid grid-cols-5 p-4 items-center">
                      <div className="col-span-2 font-medium">{aff.name}</div>
                      <div>
                        <code className="text-xs bg-muted p-1 rounded border flex items-center w-fit">
                          <LinkIcon className="h-3 w-3 mr-1" />
                          {aff.code}
                        </code>
                      </div>
                      <div>{aff.conv}</div>
                      <div className="text-right font-medium text-success">{aff.due}</div>
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
