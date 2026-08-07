"use client";

import React from "react";
import { 
  PageHeader, 
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Form,
  RHFInput,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@commercex/ui";
import { useForm } from "react-hook-form";
import { 
  CodeIcon, 
  FileCodeIcon,
  GlobeIcon
} from "lucide-react";

export default function SEOSettingsPage() {
  const form = useForm({
    defaultValues: {
      titleTemplate: "%s | Premium Storefront",
      siteName: "Premium Storefront",
      robotsTxt: "User-agent: *\nDisallow: /admin/\nDisallow: /checkout/\n\nSitemap: https://store.com/sitemap.xml",
      schemaType: "Organization"
    }
  });

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Global SEO Settings" 
          text="Manage site-wide metadata, sitemaps, robots.txt, and JSON-LD Schema."
        />
        <Button>Save Settings</Button>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full md:w-[400px] grid-cols-2 h-auto">
          <TabsTrigger value="general" className="py-2">General SEO</TabsTrigger>
          <TabsTrigger value="technical" className="py-2">Technical SEO</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <Form {...form}>
            <form className="space-y-6">
              
              <TabsContent value="general" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GlobeIcon className="h-5 w-5 text-muted-foreground" />
                      Site Defaults
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <RHFInput name="siteName" label="Website Name" />
                    <RHFInput 
                      name="titleTemplate" 
                      label="Title Tag Template" 
                      description="Use %s to represent the specific page title. (e.g. %s | MyStore)" 
                    />
                    
                    <div className="p-4 bg-muted/20 border rounded-md">
                      <p className="text-sm font-medium mb-2">Live Preview (Google Search)</p>
                      <div className="bg-white dark:bg-black p-4 rounded-md shadow-sm border">
                        <p className="text-sm text-blue-800 dark:text-blue-400 font-medium text-lg hover:underline cursor-pointer">Summer Collection | Premium Storefront</p>
                        <p className="text-xs text-green-700 dark:text-green-400 mt-1">https://store.com › collections › summer</p>
                        <p className="text-sm text-muted-foreground mt-1">Shop the latest premium summer collection. Featuring lightweight materials perfect for the hot weather.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CodeIcon className="h-5 w-5 text-muted-foreground" />
                      Global JSON-LD Schema
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">Injects structured data into the &lt;head&gt; of every page to help search engines understand your business.</p>
                    <RHFInput name="schemaType" label="Organization Type" />
                    <Button variant="outline">Generate Default Schema</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="technical" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileCodeIcon className="h-5 w-5 text-muted-foreground" />
                      Robots.txt & Sitemaps
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="text-sm font-medium mb-1">XML Sitemap</h4>
                      <p className="text-sm text-muted-foreground mb-3">Your sitemap is automatically generated and updated when you publish new content.</p>
                      <div className="flex items-center gap-3">
                        <code className="text-sm bg-muted px-3 py-2 rounded-md border flex-1">https://store.com/sitemap.xml</code>
                        <Button variant="secondary">Regenerate</Button>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-sm font-medium">Robots.txt Editor</h4>
                          <p className="text-sm text-muted-foreground">Control which pages search engine bots are allowed to crawl.</p>
                        </div>
                        <Button variant="outline" size="sm">Reset to Default</Button>
                      </div>
                      <textarea 
                        {...form.register("robotsTxt")}
                        className="flex min-h-[150px] w-full rounded-md border border-input bg-muted/30 px-3 py-2 text-sm font-mono shadow-sm" 
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Canonical URLs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between p-4 border rounded-md bg-muted/10">
                      <div>
                        <p className="font-medium">Force Trailing Slashes</p>
                        <p className="text-sm text-muted-foreground">Redirects all URLs to their trailing slash equivalent.</p>
                      </div>
                      <div className="w-10 h-5 bg-primary rounded-full relative cursor-pointer">
                        <div className="w-4 h-4 bg-white rounded-full absolute right-0.5 top-0.5 shadow-sm"></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

            </form>
          </Form>
        </div>
      </Tabs>
    </div>
  );
}
