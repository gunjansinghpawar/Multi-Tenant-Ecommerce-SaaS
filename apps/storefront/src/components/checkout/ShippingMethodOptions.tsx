'use client';

import React, { useState } from 'react';
import { Button } from '@commercex/ui';
import { useCheckoutStore, ShippingMethod } from '../../store/use-checkout-store';
import { Truck, Zap, Clock } from 'lucide-react';

const SHIPPING_METHODS: ShippingMethod[] = [
  { id: 'standard', name: 'Standard Shipping', price: 5.99, estimatedDelivery: '3-5 business days' },
  { id: 'express', name: 'Express Shipping', price: 14.99, estimatedDelivery: '1-2 business days' },
  { id: 'overnight', name: 'Overnight Delivery', price: 29.99, estimatedDelivery: 'Next business day' },
];

export function ShippingMethodOptions() {
  const { shippingMethod, setShippingMethod, setStep, billingSameAsShipping } = useCheckoutStore();
  const [selected, setSelected] = useState<string>(shippingMethod?.id || SHIPPING_METHODS[0].id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const method = SHIPPING_METHODS.find(m => m.id === selected);
    if (method) {
      setShippingMethod(method);
      setStep(billingSameAsShipping ? 'payment-method' : 'billing-address');
    }
  };

  const getIcon = (id: string) => {
    switch(id) {
      case 'express': return <Zap className="h-5 w-5 text-amber-500" />;
      case 'overnight': return <Clock className="h-5 w-5 text-red-500" />;
      default: return <Truck className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        {SHIPPING_METHODS.map((method) => (
          <div 
            key={method.id}
            className={`border rounded-lg p-4 cursor-pointer transition-colors flex items-start gap-4 ${
              selected === method.id ? 'border-primary bg-primary/5' : 'hover:border-foreground/30'
            }`}
            onClick={() => setSelected(method.id)}
          >
            <div className="mt-0.5">
              <input 
                type="radio" 
                name="shippingMethod" 
                checked={selected === method.id}
                onChange={() => setSelected(method.id)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  {getIcon(method.id)}
                  <span className="font-medium">{method.name}</span>
                </div>
                <span className="font-semibold">${method.price.toFixed(2)}</span>
              </div>
              <p className="text-sm text-muted-foreground">{method.estimatedDelivery}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4 pt-4">
        <Button type="button" variant="outline" onClick={() => setStep('shipping-address')}>Back</Button>
        <Button type="submit">Continue</Button>
      </div>
    </form>
  );
}
