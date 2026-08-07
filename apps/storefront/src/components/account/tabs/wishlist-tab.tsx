'use client';

import React from 'react';
import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@commercex/ui';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import Image from 'next/image';

const MOCK_WISHLIST = [
  { 
    id: '1', 
    productId: 'prod_123', 
    name: 'Minimalist Smartwatch Series 7', 
    price: 499.00, 
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=200&auto=format&fit=crop',
    inStock: true,
    addedOn: 'Oct 24, 2026'
  },
  { 
    id: '2', 
    productId: 'prod_124', 
    name: 'Ergonomic Office Chair', 
    price: 299.99, 
    image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=200&auto=format&fit=crop',
    inStock: false,
    addedOn: 'Oct 20, 2026'
  },
];

export function WishlistTab() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Wishlist</h2>
          <p className="text-muted-foreground text-sm">Products you have saved for later.</p>
        </div>
      </div>

      <div className="border rounded-xl overflow-x-auto bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[400px]">Product</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock Status</TableHead>
              <TableHead>Date Added</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_WISHLIST.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-12 text-muted-foreground">
                  <Heart className="w-8 h-8 mx-auto mb-3 opacity-50" />
                  Your wishlist is empty.
                </TableCell>
              </TableRow>
            ) : (
              MOCK_WISHLIST.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded bg-muted overflow-hidden shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <span className="font-medium line-clamp-2">{item.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold">${item.price.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={item.inStock ? 'default' : 'secondary'}>
                      {item.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{item.addedOn}</TableCell>
                  <TableCell className="text-right whitespace-nowrap">
                    <Button size="sm" className="mr-2" disabled={!item.inStock}>
                      <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
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
