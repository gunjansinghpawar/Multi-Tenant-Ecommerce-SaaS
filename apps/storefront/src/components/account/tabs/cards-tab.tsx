'use client';

import React from 'react';
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@commercex/ui';
import { CreditCard, Plus } from 'lucide-react';

const MOCK_CARDS = [
  { id: '1', brand: 'Visa', last4: '4242', expiry: '12/28', name: 'John Doe', isDefault: true },
  { id: '2', brand: 'Mastercard', last4: '8888', expiry: '09/25', name: 'John Doe', isDefault: false },
];

export function CardsTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Saved Payments</h2>
          <p className="text-muted-foreground text-sm">Manage your payment methods and credit cards.</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> Add Card
        </Button>
      </div>

      <div className="border rounded-xl overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Card</TableHead>
              <TableHead>Ending In</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Cardholder Name</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_CARDS.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  <CreditCard className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  No payment methods saved.
                </TableCell>
              </TableRow>
            ) : (
              MOCK_CARDS.map((card) => (
                <TableRow key={card.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-muted-foreground" />
                      <span className="font-medium">{card.brand}</span>
                      {card.isDefault && <Badge variant="secondary" className="ml-2">Default</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>•••• {card.last4}</TableCell>
                  <TableCell>{card.expiry}</TableCell>
                  <TableCell>{card.name}</TableCell>
                  <TableCell className="text-right">
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
