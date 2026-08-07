"use client";

import React from "react";
import { Badge, Button, DataTable } from "@commercex/ui";
import { ArrowUpRightIcon, MoreHorizontal, ArrowUpDown } from "lucide-react";
import type { Order } from "@commercex/services";
import { ColumnDef } from "@tanstack/react-table";

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const columns: ColumnDef<Order>[] = [
    {
      accessorKey: "customer",
      header: "Customer",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              {row.getValue<string>("customer").charAt(0)}
            </div>
            {row.getValue("customer")}
          </div>
        );
      },
    },
    {
      accessorKey: "id",
      header: "Order ID",
      cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("id")}</span>,
    },
    {
      accessorKey: "amount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Amount
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))
        return <div className="ml-4 font-medium">{formatCurrency(amount)}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue<string>("status");
        return (
          <Badge variant={
            status === "Fulfilled" ? "default" :
            status === "Processing" ? "secondary" : "destructive"
          }>
            {status}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowUpRightIcon className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
            </Button>
          </div>
        )
      },
    },
  ];

  return <DataTable columns={columns} data={orders} searchKey="customer" />;
}
