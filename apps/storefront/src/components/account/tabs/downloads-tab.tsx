'use client';

import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@commercex/ui';
import { DownloadCloud, Download } from 'lucide-react';

const MOCK_DOWNLOADS = [
  { id: '1', name: 'Digital Planner 2026', orderId: 'ORD-2023-1042', size: '12 MB', remaining: 3 },
  { id: '2', name: 'UI Kit Pro', orderId: 'ORD-2023-1011', size: '245 MB', remaining: 'Unlimited' },
];

export function DownloadsTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Downloads</h2>
          <p className="text-muted-foreground text-sm">Access your purchased digital products.</p>
        </div>
      </div>

      <div className="border rounded-xl overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>File Size</TableHead>
              <TableHead>Remaining</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_DOWNLOADS.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  <DownloadCloud className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  No digital products found.
                </TableCell>
              </TableRow>
            ) : (
              MOCK_DOWNLOADS.map((dl) => (
                <TableRow key={dl.id}>
                  <TableCell className="font-medium">{dl.name}</TableCell>
                  <TableCell className="text-muted-foreground">{dl.orderId}</TableCell>
                  <TableCell>{dl.size}</TableCell>
                  <TableCell>{dl.remaining}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm">
                      <Download className="w-4 h-4 mr-2" /> Download
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
