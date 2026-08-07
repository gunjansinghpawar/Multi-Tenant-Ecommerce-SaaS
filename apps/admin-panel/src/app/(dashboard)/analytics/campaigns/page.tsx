"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  DataTable,
  Button
} from "@commercex/ui";
import { MegaphoneIcon, CalendarIcon, TargetIcon, BadgeDollarSignIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type CampaignData = {
  utm_campaign: string;
  source: string;
  clicks: number;
  spend: string;
  revenue: string;
  roas: string;
};

const data: CampaignData[] = [
  { utm_campaign: "summer_sale_2026", source: "facebook_ads", clicks: 4500, spend: "$1,200", revenue: "$5,400", roas: "4.5x" },
  { utm_campaign: "retargeting_abandoned", source: "google_display", clicks: 1200, spend: "$300", revenue: "$2,100", roas: "7.0x" },
  { utm_campaign: "influencer_jenny_k", source: "instagram", clicks: 3200, spend: "$800", revenue: "$1,100", roas: "1.37x" },
  { utm_campaign: "newsletter_aug_w1", source: "email", clicks: 850, spend: "$0", revenue: "$850", roas: "∞" },
];

const columns: ColumnDef<CampaignData>[] = [
  { accessorKey: "utm_campaign", header: "Campaign Name (UTM)" },
  { accessorKey: "source", header: "Source" },
  { accessorKey: "clicks", header: "Clicks / Visits" },
  { accessorKey: "spend", header: "Ad Spend" },
  { accessorKey: "revenue", header: "Revenue Generated" },
  { 
    accessorKey: "roas", 
    header: "ROAS",
    cell: ({ row }) => {
      const roasStr = row.original.roas;
      const val = parseFloat(roasStr);
      let colorClass = "text-muted-foreground";
      if (roasStr === "∞" || val >= 3) colorClass = "text-green-600 dark:text-green-400 font-semibold";
      else if (val < 2) colorClass = "text-red-600 dark:text-red-400 font-semibold";
      
      return <span className={colorClass}>{roasStr}</span>;
    }
  },
];

export default function CampaignsAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Campaign Analytics" 
          text="Track marketing campaign performance, UTM parameters, and ROAS."
        />
        <Button variant="outline">
          <CalendarIcon className="mr-2 h-4 w-4" />
          Last 30 Days
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Ad Spend</CardTitle>
            <MegaphoneIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,300.00</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Campaign Revenue</CardTitle>
            <BadgeDollarSignIcon className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$9,450.00</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Overall ROAS</CardTitle>
            <TargetIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">4.1x</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>UTM Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} searchKey="utm_campaign" />
        </CardContent>
      </Card>
    </div>
  );
}
