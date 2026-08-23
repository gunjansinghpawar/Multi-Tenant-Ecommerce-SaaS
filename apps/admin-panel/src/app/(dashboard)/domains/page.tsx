"use client";

import React, { useState } from "react";
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
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Form,
  RHFInput
} from "@commercex/ui";
import { 
  GlobeIcon, 
  PlusIcon,
  ShieldCheckIcon,
  CloudLightningIcon,
  ExternalLinkIcon,
  CheckCircle2Icon,
  AlertTriangleIcon,
  MoreVerticalIcon,
  ActivityIcon
} from "lucide-react";
import { useForm } from "react-hook-form";

export default function DomainsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const form = useForm({
    defaultValues: {
      domain: "",
    }
  });

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Domains" 
          text="Manage your primary domain, international subdomains, and DNS settings."
        />
        <Button onClick={() => setIsSheetOpen(true)}>
          <PlusIcon className="mr-2 h-4 w-4" />
          Connect Domain
        </Button>
      </div>

      <Tabs defaultValue="management" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 h-auto">
          <TabsTrigger value="management" className="py-2">Domain Management</TabsTrigger>
          <TabsTrigger value="dns" className="py-2">DNS & Security</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="management" className="space-y-6">
            
            {/* Primary Domain */}
            <Card className="border-primary border-2 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <Badge variant="default" className="bg-primary/20 text-primary border-primary">Primary Domain</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <GlobeIcon className="h-6 w-6 text-primary" />
                  store.com
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">This is the main URL that customers see when they visit your store.</p>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <span className="flex items-center text-success"><CheckCircle2Icon className="h-4 w-4 mr-1"/> Connected</span>
                  <span className="flex items-center text-success"><ShieldCheckIcon className="h-4 w-4 mr-1"/> SSL Active</span>
                </div>
                <div className="pt-4 border-t flex gap-2">
                  <Button variant="outline" size="sm">Change Primary</Button>
                  <Button variant="secondary" size="sm">Manage Settings</Button>
                </div>
              </CardContent>
            </Card>

            {/* Multiple / International Domains */}
            <Card>
              <CardHeader className="border-b pb-4">
                <CardTitle>Multiple & International Domains</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {[
                    { domain: "www.store.com", status: "Redirects to primary", icon: GlobeIcon, region: "Global" },
                    { domain: "fr.store.com", status: "Connected", icon: GlobeIcon, region: "France (EUR)" },
                    { domain: "store.co.uk", status: "Connected", icon: GlobeIcon, region: "United Kingdom (GBP)" },
                  ].map((d, i) => (
                    <div key={i} className="flex items-center justify-between p-4 hover:bg-muted/30">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-muted rounded-md flex items-center justify-center">
                          <d.icon className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium flex items-center gap-2">
                            {d.domain}
                            <Badge variant="outline" className="text-[10px]">{d.region}</Badge>
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">{d.status}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon"><MoreVerticalIcon className="h-4 w-4"/></Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preview URLs */}
            <Card>
              <CardHeader>
                <CardTitle>Theme Preview URLs</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Share these temporary links with your team to review unpublished theme changes.</p>
                <div className="p-4 border rounded-md bg-muted/20 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">Winter Sale Draft Theme</p>
                    <code className="text-xs bg-muted px-2 py-1 rounded mt-1 inline-block text-primary">https://store.com/?preview_theme_id=987654</code>
                  </div>
                  <Button variant="outline" size="sm"><ExternalLinkIcon className="h-4 w-4 mr-2"/> Copy Link</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dns" className="space-y-6">
            
            {/* DNS Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ActivityIcon className="mr-2 h-5 w-5" />
                  DNS Verification
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-md flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle2Icon className="h-4 w-4 text-success" />
                        <span className="font-medium text-sm">A Record</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Points to <code className="bg-muted px-1 rounded">192.168.1.100</code></p>
                    </div>
                    <Badge variant="success">Verified</Badge>
                  </div>

                  <div className="p-4 border rounded-md flex items-start justify-between bg-warning/5 border-warning/30">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangleIcon className="h-4 w-4 text-warning" />
                        <span className="font-medium text-sm">CNAME Record</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Expected: <code className="bg-muted px-1 rounded">shops.merchant.com</code></p>
                    </div>
                    <Button variant="outline" size="sm" className="border-warning text-warning hover:bg-warning hover:text-white">Verify Again</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Cloudflare */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-success">
                    <ShieldCheckIcon className="mr-2 h-5 w-5" />
                    SSL Certificates
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Free TLS/SSL certificates are automatically provisioned and renewed for all connected domains.</p>
                  <div className="space-y-2 text-sm font-medium">
                    <div className="flex justify-between items-center border-b pb-2">
                      <span>store.com</span>
                      <span className="text-success">Active</span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-2">
                      <span>fr.store.com</span>
                      <span className="text-success">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-[#F38020]">
                    <CloudLightningIcon className="mr-2 h-5 w-5" />
                    Cloudflare Proxy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">Your domains are protected by Cloudflare's enterprise-grade DDoS protection and CDN caching.</p>
                  <div className="flex items-center justify-between p-3 bg-muted/20 border rounded-md">
                    <span className="text-sm font-medium">Under Attack Mode</span>
                    <div className="w-10 h-5 bg-muted rounded-full relative cursor-pointer border">
                      <div className="w-4 h-4 bg-muted-foreground rounded-full absolute left-0.5 top-0.5"></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

          </TabsContent>
        </div>
      </Tabs>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Connect Existing Domain</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-4">
            <p className="text-sm text-muted-foreground mb-4">Enter the domain you want to connect. You will need to update your DNS records at your domain provider (e.g., GoDaddy, Namecheap).</p>
            <Form {...form}>
              <form className="space-y-4">
                <RHFInput name="domain" label="Domain Name" inputProps={{ placeholder: "e.g. mystore.com" }} />
                <Button className="w-full mt-4" onClick={(e) => { e.preventDefault(); setIsSheetOpen(false); }}>Next Step</Button>
              </form>
            </Form>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
