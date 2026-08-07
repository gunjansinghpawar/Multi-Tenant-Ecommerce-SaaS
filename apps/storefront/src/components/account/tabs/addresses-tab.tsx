'use client';

import React, { useState } from 'react';
import { Button, Badge, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@commercex/ui';
import { MapPin, Plus } from 'lucide-react';
import { AccountAddressForm } from '../forms/AccountAddressForm';

const MOCK_ADDRESSES = [
  { id: '1', label: 'Home', name: 'John Doe', address: '123 Main St, Apt 4B, New York, NY 10001, USA', phone: '+1 (555) 123-4567', isDefault: true },
  { id: '2', label: 'Work', name: 'John Doe', address: '456 Market St, Suite 200, San Francisco, CA 94105, USA', phone: '+1 (555) 987-6543', isDefault: false },
];

export function AddressesTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Addresses</h2>
          <p className="text-muted-foreground text-sm">Manage your shipping and billing addresses.</p>
        </div>
        
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" /> Add Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Address</DialogTitle>
            </DialogHeader>
            <AccountAddressForm 
              onCancel={() => setIsModalOpen(false)} 
              onSubmitSuccess={() => setIsModalOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-xl overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Label</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[40%]">Address</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ADDRESSES.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  <MapPin className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  No addresses saved.
                </TableCell>
              </TableRow>
            ) : (
              MOCK_ADDRESSES.map((addr) => (
                <TableRow key={addr.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{addr.label}</span>
                      {addr.isDefault && <Badge variant="secondary">Default</Badge>}
                    </div>
                  </TableCell>
                  <TableCell>{addr.name}</TableCell>
                  <TableCell className="text-muted-foreground">{addr.address}</TableCell>
                  <TableCell>{addr.phone}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="mr-2">Edit</Button>
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
