"use client";

import React from "react";
import { 
  PageHeader, 
  Card, 
  CardContent, 
  DataTable,
  Button
} from "@commercex/ui";
import { DownloadIcon, FilterIcon, CalendarIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type MarketingRow = {
  date: string;
  campaign: string;
  channel: string;
  spend: string;
  sessions: number;
  orders: number;
  revenue: string;
};

const data: MarketingRow[] = [
  { date: "2026-07-28", campaign: "Summer Sale 26", channel: "Facebook", spend: "$450.00", sessions: 1250, orders: 45, revenue: "$4,200.00" },
  { date: "2026-07-28", campaign: "Retargeting Abandoned", channel: "Google Ads", spend: "$120.00", sessions: 340, orders: 12, revenue: "$1,150.00" },
  { date: "2026-07-27", campaign: "Email Newsletter W3", channel: "Email", spend: "$0.00", sessions: 890, orders: 25, revenue: "$2,400.00" },
];

const columns: ColumnDef<MarketingRow>[] = [
  { accessorKey: "date", header: "Date" },
  { accessorKey: "campaign", header: "Campaign" },
  { accessorKey: "channel", header: "Channel" },
  { accessorKey: "spend", header: "Ad Spend" },
  { accessorKey: "sessions", header: "Sessions" },
  { accessorKey: "orders", header: "Attributed Orders" },
  { accessorKey: "revenue", header: "Attributed Revenue" },
];

export default function MarketingReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Marketing ROI Ledger" 
          text="Daily ledger of marketing spend vs attributed revenue."
        />
        <div className="flex space-x-2">
          <Button variant="outline"><CalendarIcon className="mr-2 h-4 w-4" /> Last 7 Days</Button>
          <Button><DownloadIcon className="mr-2 h-4 w-4" /> Export CSV</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="campaign" />
        </CardContent>
      </Card>
    </div>
  );
}
