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
import { DownloadIcon, FilterIcon, CalendarIcon } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

type ShippingRow = {
  provider: string;
  shipments: number;
  totalCost: string;
  avgCostPerShipment: string;
  avgDeliveryDays: string;
};

const data: ShippingRow[] = [
  { provider: "Delhivery", shipments: 450, totalCost: "$2,250.00", avgCostPerShipment: "$5.00", avgDeliveryDays: "3.2" },
  { provider: "Blue Dart", shipments: 120, totalCost: "$960.00", avgCostPerShipment: "$8.00", avgDeliveryDays: "1.8" },
  { provider: "India Post", shipments: 85, totalCost: "$255.00", avgCostPerShipment: "$3.00", avgDeliveryDays: "5.5" },
];

const columns: ColumnDef<ShippingRow>[] = [
  { accessorKey: "provider", header: "Shipping Provider" },
  { accessorKey: "shipments", header: "Total Shipments" },
  { accessorKey: "totalCost", header: "Total Shipping Cost" },
  { accessorKey: "avgCostPerShipment", header: "Avg Cost/Shipment" },
  { accessorKey: "avgDeliveryDays", header: "Avg Delivery Time (Days)" },
];

export default function ShippingReportPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <PageHeader 
          heading="Shipping & Fulfillment Report" 
          text="Analyze logistics costs, provider usage, and delivery speeds."
        />
        <div className="flex space-x-2">
          <Button variant="outline"><CalendarIcon className="mr-2 h-4 w-4" /> This Month</Button>
          <Button><DownloadIcon className="mr-2 h-4 w-4" /> Export CSV</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Shipments</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">655</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm text-muted-foreground">Total Shipping Spend</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">$3,465.00</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <DataTable columns={columns} data={data} searchKey="provider" />
        </CardContent>
      </Card>
    </div>
  );
}
