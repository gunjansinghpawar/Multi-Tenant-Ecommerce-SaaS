"use client";

import React from "react";
import { 
  PageHeader, 
  Card, CardContent, CardHeader, CardTitle, CardDescription,
  Button,
  Tabs, TabsContent, TabsList, TabsTrigger,
  Input, Label, Textarea,
  Switch
} from "@commercex/ui";
import { 
  Save, 
  Sparkles, 
  Image as ImageIcon, 
  Video, 
  Box, 
  Tag, 
  Globe, 
  Calendar,
  Gift,
  Link as LinkIcon,
  Archive
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function EditProductPage() {
  const params = useParams();
  const productId = params.id as string;

  return (
    <div className="space-y-6">
      <PageHeader 
        heading={`Edit Product`} 
        text={`Updating details for product ${productId}.`}
        actions={
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/products">Cancel</Link>
            </Button>
            <Button variant="secondary">
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        }
      />

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap mb-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="media">Media & Downloads</TabsTrigger>
          <TabsTrigger value="variants">Variants (SKU/Barcode)</TabsTrigger>
          <TabsTrigger value="inventory">Inventory & Warehouse</TabsTrigger>
          <TabsTrigger value="sales">Subscriptions & Bundles</TabsTrigger>
          <TabsTrigger value="marketing">SEO & Related</TabsTrigger>
          <TabsTrigger value="publishing">Publishing & Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Name, description, and pricing for this product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input defaultValue="Premium SaaS Template" placeholder="e.g. Vintage Leather Jacket" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Description</Label>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-primary">
                    <Sparkles className="mr-1 h-3 w-3" />
                    AI Generate
                  </Button>
                </div>
                <Textarea rows={6} defaultValue="A premium UI kit designed for modern SaaS applications." placeholder="Describe the product..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input type="number" defaultValue="49.00" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Compare at Price</Label>
                  <Input type="number" defaultValue="99.00" placeholder="0.00" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Media Assets</CardTitle>
              <CardDescription>Upload images, videos, and 360-degree views.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="aspect-square bg-muted rounded-md border flex items-center justify-center relative overflow-hidden">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="aspect-square bg-muted rounded-md border flex items-center justify-center border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                  <PlusIcon className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Digital Downloads</CardTitle>
              <CardDescription>Attach files if this is a digital product.</CardDescription>
            </CardHeader>
            <CardContent>
               <div className="flex items-center gap-4">
                 <Switch id="is-digital" defaultChecked />
                 <Label htmlFor="is-digital">This is a digital product</Label>
               </div>
               <div className="mt-4 p-4 border rounded-md flex items-center justify-between">
                  <span className="text-sm font-medium">template-v2.zip</span>
                  <span className="text-xs text-muted-foreground">12.5 MB</span>
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="variants" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Options & Variants</CardTitle>
              <CardDescription>Manage sizes, colors, SKUs, and Barcodes.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center gap-4 pb-4 border-b">
                 <Switch id="has-variants" />
                 <Label htmlFor="has-variants">This product has options, like size or color</Label>
               </div>
               <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <Label>Master SKU</Label>
                  <Input defaultValue={`SKU-${productId}`} placeholder="e.g. VINT-JKT-01" />
                </div>
                <div className="space-y-2">
                  <Label>Barcode (ISBN, UPC, GTIN, etc.)</Label>
                  <Input placeholder="0123456789012" />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory & Warehouses</CardTitle>
              <CardDescription>Track stock levels across different locations.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between border rounded-md p-4">
                 <div>
                   <p className="font-medium">Primary Warehouse (New York)</p>
                   <p className="text-sm text-muted-foreground">Main fulfillment center</p>
                 </div>
                 <div className="flex items-center gap-2">
                   <Label>Available:</Label>
                   <Input type="number" defaultValue="999" className="w-24" />
                 </div>
               </div>
               <div className="flex items-center justify-between border rounded-md p-4">
                 <div>
                   <p className="font-medium">Secondary Warehouse (London)</p>
                   <p className="text-sm text-muted-foreground">EU distribution</p>
                 </div>
                 <div className="flex items-center gap-2">
                   <Label>Available:</Label>
                   <Input type="number" defaultValue="0" className="w-24" />
                 </div>
               </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Sales Models</CardTitle>
              <CardDescription>Configure subscriptions, bundles, and gifting options.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Switch id="is-subscription" />
                  <Label htmlFor="is-subscription" className="font-medium">Enable Subscriptions</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-14">Allow customers to subscribe to this product on a recurring basis.</p>
              </div>
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-4">
                  <Switch id="is-bundle" />
                  <Label htmlFor="is-bundle" className="font-medium">Sell as Bundle</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-14">Combine this product with others for a discounted price.</p>
              </div>
              <div className="space-y-4 border-t pt-4">
                <div className="flex items-center gap-4">
                  <Switch id="is-gift" />
                  <Label htmlFor="is-gift" className="font-medium">Gift Product</Label>
                </div>
                <p className="text-sm text-muted-foreground pl-14">Allow customers to purchase this as a gift with a custom message.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Search Engine Optimization</CardTitle>
              <CardDescription>Improve discoverability on Google.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Page Title</Label>
                <Input defaultValue="Premium SaaS Template | UI Kit" placeholder="SEO Title" />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Textarea defaultValue="A premium UI kit designed for modern SaaS applications. Buy now." placeholder="Brief description for search results" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cross-sells & Upsells</CardTitle>
              <CardDescription>Recommend related products to increase AOV.</CardDescription>
            </CardHeader>
            <CardContent>
               <Button variant="outline" className="w-full border-dashed">
                 <LinkIcon className="mr-2 h-4 w-4" /> Link Related Products
               </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publishing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Publishing & Approvals</CardTitle>
              <CardDescription>Control when and where this product is visible.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <Label>Status</Label>
                <div className="flex gap-4">
                  <Button variant="default">Active</Button>
                  <Button variant="outline">Draft</Button>
                  <Button variant="outline">Requires Approval</Button>
                </div>
              </div>
              <div className="space-y-4 border-t pt-4">
                <Label>Scheduled Publishing</Label>
                <div className="flex items-center gap-4">
                  <Input type="date" />
                  <Input type="time" />
                </div>
              </div>
              <div className="space-y-4 border-t pt-4">
                <Label>Version History & Audit Log</Label>
                <div className="p-4 border rounded-md">
                  <p className="text-sm font-medium">Last updated by Admin</p>
                  <p className="text-xs text-muted-foreground">Today at 14:30 PM</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}

const PlusIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
)
