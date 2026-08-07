'use client';

import React from 'react';
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@commercex/ui';
import { Package, Search } from 'lucide-react';
import Link from 'next/link';

// Mock Orders
const MOCK_ORDERS = [
  { id: 'ORD-2023-1042', date: 'Oct 24, 2026', total: 234.00, status: 'Delivered', items: 3 },
  { id: 'ORD-2023-1043', date: 'Oct 25, 2026', total: 129.50, status: 'Processing', items: 1 },
  { id: 'ORD-2023-1044', date: 'Oct 28, 2026', total: 45.00, status: 'Cancelled', items: 2 },
];

export function OrdersTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Order History</h2>
          <p className="text-muted-foreground text-sm">View and manage your recent purchases.</p>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="w-full pl-9 pr-4 py-2 rounded-lg border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      <div className="border rounded-xl overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ORDERS.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  <Package className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  No orders found.
                </TableCell>
              </TableRow>
            ) : (
              MOCK_ORDERS.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items} item(s)</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={
                      order.status === 'Delivered' ? 'default' :
                      order.status === 'Processing' ? 'secondary' : 'destructive'
                    }>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/account/orders/${order.id.replace('ORD-', '')}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
