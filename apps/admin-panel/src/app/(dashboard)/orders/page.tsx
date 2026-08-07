"use client";

import React, { useState } from "react";
import { 
  PageHeader, 
  Button,
  DataTable,
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Form,
  RHFInput,
  RHFSelect,
  Checkbox
} from "@commercex/ui";
import { PlusIcon, DownloadIcon, PrinterIcon, MoreHorizontalIcon, ArchiveIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { EntityRowActions, EntityBulkActions } from "../../../components/ui/entity-actions";

type Order = {
  id: string;
  customer: string;
  total: string;
  status: "Pending" | "Processing" | "Shipped" | "Delivered";
  paymentStatus: "Paid" | "Unpaid" | "Refunded";
  date: string;
};

const data: Order[] = [
  { id: "ORD-001", customer: "Alice Smith", total: "$120.00", status: "Pending", paymentStatus: "Paid", date: "2023-10-01" },
  { id: "ORD-002", customer: "Bob Jones", total: "$45.50", status: "Processing", paymentStatus: "Unpaid", date: "2023-10-02" },
  { id: "ORD-003", customer: "Charlie Brown", total: "$89.99", status: "Shipped", paymentStatus: "Paid", date: "2023-10-02" },
  { id: "ORD-004", customer: "Diana Prince", total: "$210.00", status: "Delivered", paymentStatus: "Paid", date: "2023-10-03" },
  { id: "ORD-005", customer: "Evan Wright", total: "$55.00", status: "Pending", paymentStatus: "Refunded", date: "2023-10-04" },
];

const columns: ColumnDef<Order>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  { 
    accessorKey: "id", 
    header: "Order ID",
    cell: ({ row }) => (
      <Link href={`/orders/${row.getValue("id")}`} className="font-medium text-primary hover:underline">
        {row.getValue("id")}
      </Link>
    )
  },
  { accessorKey: "customer", header: "Customer" },
  { accessorKey: "total", header: "Total" },
  { 
    accessorKey: "paymentStatus", 
    header: "Payment",
    cell: ({ row }) => {
      const status = row.original.paymentStatus;
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
          status === 'Paid' ? 'bg-green-100 text-green-800' :
          status === 'Refunded' ? 'bg-gray-100 text-gray-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </div>
      );
    }
  },
  { 
    accessorKey: "status", 
    header: "Fulfillment",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div className={`px-2 py-1 rounded-full text-xs font-medium w-fit ${
          status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          status === 'Processing' ? 'bg-blue-100 text-blue-800' :
          status === 'Shipped' ? 'bg-indigo-100 text-indigo-800' :
          'bg-green-100 text-green-800'
        }`}>
          {status}
        </div>
      );
    }
  },
  { accessorKey: "date", header: "Date" },
  {
    id: "actions",
    cell: ({ row }) => (
      <EntityRowActions id={row.original.id} entityName="Order" />
    )
  }
];

export default function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <PageHeader 
        heading="All Orders" 
        text="Manage, fulfill, and track your store's orders."
      >
        <div className="flex space-x-2">
          <Button variant="outline">
            <ArchiveIcon className="mr-2 h-4 w-4" />
            Bulk Process
          </Button>
          <Button variant="outline">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline">
            <PrinterIcon className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Link href="/orders/manual">
            <Button>
              <PlusIcon className="mr-2 h-4 w-4" />
              Create Order
            </Button>
          </Link>
        </div>
      </PageHeader>
      <div className="bg-white dark:bg-slate-900 border rounded-lg p-6 shadow-sm">
        <EntityBulkActions selectedCount={1} />
        <DataTable columns={columns} data={data} searchKey="customer" />
      </div>
    </div>
  );
}
