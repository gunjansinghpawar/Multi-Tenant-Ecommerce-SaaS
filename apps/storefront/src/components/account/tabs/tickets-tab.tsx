'use client';

import React from 'react';
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@commercex/ui';
import { LifeBuoy, Plus } from 'lucide-react';

const MOCK_TICKETS = [
  { id: 'TIC-9812', subject: 'Order not received', department: 'Shipping', updated: '2 hours ago', status: 'Open' },
  { id: 'TIC-9755', subject: 'Return request', department: 'Returns', updated: '1 day ago', status: 'In Progress' },
  { id: 'TIC-9210', subject: 'Product question', department: 'Sales', updated: '1 week ago', status: 'Closed' },
];

export function TicketsTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Support Tickets</h2>
          <p className="text-muted-foreground text-sm">View and manage your customer support inquiries.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> New Ticket
        </Button>
      </div>

      <div className="border rounded-xl overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ticket ID</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_TICKETS.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  <LifeBuoy className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  No support tickets found.
                </TableCell>
              </TableRow>
            ) : (
              MOCK_TICKETS.map((ticket) => (
                <TableRow key={ticket.id}>
                  <TableCell className="font-medium">{ticket.id}</TableCell>
                  <TableCell>{ticket.subject}</TableCell>
                  <TableCell className="text-muted-foreground">{ticket.department}</TableCell>
                  <TableCell>{ticket.updated}</TableCell>
                  <TableCell>
                    <Badge variant={
                      ticket.status === 'Open' ? 'default' :
                      ticket.status === 'In Progress' ? 'secondary' : 'outline'
                    }>
                      {ticket.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">View</Button>
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
