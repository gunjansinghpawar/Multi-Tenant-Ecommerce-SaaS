'use client';

import React from 'react';
import { Truck, Store, MapPin } from 'lucide-react';
import { Button } from '@commercex/ui';

export function PdpDelivery() {
  return (
    <div className="bg-muted/30 rounded-lg p-5 border border-border/50 flex flex-col gap-4">
      
      {/* Shipping */}
      <div className="flex gap-4">
        <Truck className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-sm">Free Delivery</h4>
          <p className="text-xs text-muted-foreground mt-1">Enter your Postal code for Delivery Availability</p>
          <div className="mt-2 flex items-center gap-2">
            <button className="text-xs font-semibold underline underline-offset-2">Enter Postal Code</button>
          </div>
        </div>
      </div>

      <hr className="border-border/50" />

      {/* Pickup */}
      <div className="flex gap-4">
        <Store className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-sm">Return Delivery</h4>
          <p className="text-xs text-muted-foreground mt-1">Free 30 Days Delivery Returns. <button className="underline font-medium">Details</button></p>
        </div>
      </div>

      <hr className="border-border/50" />

      {/* Store Availability */}
      <div className="flex gap-4">
        <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
        <div>
          <h4 className="font-medium text-sm">In-Store Pickup</h4>
          <p className="text-xs text-muted-foreground mt-1">Available at select locations.</p>
          <button className="text-xs font-semibold underline underline-offset-2 mt-2">Check availability</button>
        </div>
      </div>

    </div>
  );
}
