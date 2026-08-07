import React from 'react';
import Image from 'next/image';
import { Order } from '../../lib/mock-orders';
import { MapPin } from 'lucide-react';

interface OrderSummaryProps {
  order: Order;
}

export function OrderSummary({ order }: OrderSummaryProps) {
  return (
    <div className="bg-card border rounded-xl p-6 space-y-6">
      <h3 className="text-lg font-bold">Order Summary</h3>
      
      <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
        {order.items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative h-16 w-16 bg-muted rounded-md overflow-hidden shrink-0">
              <Image 
                src={item.image} 
                alt={item.name} 
                fill 
                className="object-cover"
              />
            </div>
            <div className="flex-1 text-sm">
              <h4 className="font-medium line-clamp-2">{item.name}</h4>
              <p className="text-muted-foreground">Qty: {item.quantity}</p>
            </div>
            <div className="text-sm font-medium">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${order.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>${order.tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t pt-4 flex justify-between items-center">
        <span className="text-lg font-bold">Total</span>
        <span className="text-2xl font-bold">${order.total.toFixed(2)}</span>
      </div>
      
      <div className="border-t pt-4">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <MapPin className="h-4 w-4" /> Shipping Address
        </h4>
        <address className="not-italic text-sm text-muted-foreground leading-relaxed bg-muted/20 p-3 rounded-lg border">
          <span className="block font-medium text-foreground">{order.shippingAddress.name}</span>
          {order.shippingAddress.street}<br />
          {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
          {order.shippingAddress.country}
        </address>
      </div>
    </div>
  );
}
