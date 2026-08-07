'use client';

import React from 'react';
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@commercex/ui';
import { FileText, Download } from 'lucide-react';

const MOCK_INVOICES = [
  { id: 'INV-1042', orderId: 'ORD-2023-1042', date: 'Oct 24, 2026', amount: 234.00, status: 'Paid' },
  { id: 'INV-1043', orderId: 'ORD-2023-1043', date: 'Oct 25, 2026', amount: 129.50, status: 'Paid' },
  { id: 'INV-1044', orderId: 'ORD-2023-1044', date: 'Oct 28, 2026', amount: 45.00, status: 'Refunded' },
];

export function InvoicesTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Invoices</h2>
          <p className="text-muted-foreground text-sm">Download tax invoices for your past orders.</p>
        </div>
      </div>

      <div className="border rounded-xl overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Invoice #</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_INVOICES.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  <FileText className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  No invoices found.
                </TableCell>
              </TableRow>
            ) : (
              MOCK_INVOICES.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.id}</TableCell>
                  <TableCell className="text-muted-foreground">{invoice.orderId}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={
                      invoice.status === 'Paid' ? 'default' : 'secondary'
                    }>
                      {invoice.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-2" /> PDF
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
