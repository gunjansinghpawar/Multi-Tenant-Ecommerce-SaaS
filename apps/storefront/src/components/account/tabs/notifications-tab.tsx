'use client';

import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@commercex/ui';
import { Bell, Package, Tag, Info } from 'lucide-react';

const MOCK_NOTIFICATIONS = [
  { id: '1', type: 'order', message: 'Your order #ORD-2023-1042 has been delivered.', date: 'Oct 24, 2026', read: false },
  { id: '2', type: 'promo', message: 'Flash Sale! Get 20% off all digital products today only.', date: 'Oct 20, 2026', read: true },
  { id: '3', type: 'system', message: 'Please update your password to keep your account secure.', date: 'Oct 15, 2026', read: true },
];

export function NotificationsTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Notifications</h2>
          <p className="text-muted-foreground text-sm">Stay updated on your orders and account activity.</p>
        </div>
        <Button variant="outline">Mark all as read</Button>
      </div>

      <div className="border rounded-xl overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_NOTIFICATIONS.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  <Bell className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  You're all caught up!
                </TableCell>
              </TableRow>
            ) : (
              MOCK_NOTIFICATIONS.map((notif) => (
                <TableRow key={notif.id} className={notif.read ? 'opacity-75' : 'bg-muted/30 font-medium'}>
                  <TableCell>
                    {notif.type === 'order' && <Package className="w-5 h-5 text-blue-500" />}
                    {notif.type === 'promo' && <Tag className="w-5 h-5 text-green-500" />}
                    {notif.type === 'system' && <Info className="w-5 h-5 text-amber-500" />}
                  </TableCell>
                  <TableCell>{notif.message}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{notif.date}</TableCell>
                  <TableCell className="text-right">
                    {!notif.read && <Button variant="ghost" size="sm" className="mr-2">Mark Read</Button>}
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">Delete</Button>
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
