"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  Button,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@commercex/ui";
import { StoreIcon, RefreshCwIcon } from "lucide-react";

export default function MetaCommercePage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="Meta Commerce" 
        text="Manage your product catalog sync for Facebook and Instagram Shops."
      >
        <Button>
          <RefreshCwIcon className="mr-2 h-4 w-4" /> Force Sync Now
        </Button>
      </PageHeader>
      
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Catalog Status</CardTitle>
              <CardDescription>Meta Commerce Manager details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Catalog ID</span>
                <span className="font-mono text-sm">908123476</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Total Products</span>
                <span className="font-medium">1,204</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Sync Schedule</span>
                <span className="font-medium">Every 12 hours</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge className="bg-emerald-100 text-emerald-800">Healthy</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Recent Sync Jobs</CardTitle>
              <CardDescription>History of product catalog uploads.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Products Synced</TableHead>
                      <TableHead>Errors</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="text-sm">Today, 04:00 AM</TableCell>
                      <TableCell className="text-sm">1,204</TableCell>
                      <TableCell className="text-sm text-muted-foreground">0</TableCell>
                      <TableCell><Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Success</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm">Yesterday, 04:00 AM</TableCell>
                      <TableCell className="text-sm">1,200</TableCell>
                      <TableCell className="text-sm text-destructive">2 warnings</TableCell>
                      <TableCell><Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Success</Badge></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="text-sm">Oct 23, 04:00 AM</TableCell>
                      <TableCell className="text-sm">1,190</TableCell>
                      <TableCell className="text-sm text-muted-foreground">0</TableCell>
                      <TableCell><Badge className="bg-emerald-100 text-emerald-800 border-emerald-200">Success</Badge></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
