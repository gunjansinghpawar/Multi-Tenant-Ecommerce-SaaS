'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCartStore } from '../../store/use-cart-store';
import { useCheckoutStore } from '../../store/use-checkout-store';
import { Button, Input } from '@commercex/ui';
import { MinusCircle, Tag, Gift } from 'lucide-react';

export function CheckoutSummary() {
  const { items, cartTotal } = useCartStore();
  const { 
    shippingMethod, 
    couponCode, couponDiscount, applyCoupon, removeCoupon,
    giftCardCode, giftCardBalance, applyGiftCard, removeGiftCard
  } = useCheckoutStore();

  const [couponInput, setCouponInput] = useState('');
  const [giftCardInput, setGiftCardInput] = useState('');

  const subtotal = cartTotal;
  const shippingCost = shippingMethod?.price || 0;
  const tax = subtotal * 0.08; // 8% dummy tax
  
  // Calculate total
  let total = subtotal + shippingCost + tax;
  if (couponDiscount) {
    total = Math.max(0, total - couponDiscount);
  }
  if (giftCardBalance) {
    total = Math.max(0, total - giftCardBalance);
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput.trim());
      setCouponInput('');
    }
  };

  const handleApplyGiftCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (giftCardInput.trim()) {
      applyGiftCard(giftCardInput.trim());
      setGiftCardInput('');
    }
  };

  return (
    <div className="bg-muted/10 p-6 rounded-xl border space-y-6 sticky top-24">
      <h2 className="text-xl font-bold tracking-tight">Order Summary</h2>

      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
        {items.map((item) => (
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

      <div className="border-t pt-4 space-y-4">
        {/* Coupon Form */}
        {!couponCode ? (
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Discount code" 
                className="pl-9"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
            </div>
            <Button type="submit" variant="secondary" disabled={!couponInput}>Apply</Button>
          </form>
        ) : (
          <div className="flex items-center justify-between bg-primary/5 text-primary px-3 py-2 rounded-md text-sm">
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span className="font-medium">{couponCode}</span>
            </div>
            <button onClick={removeCoupon} className="hover:text-primary/70 transition-colors">
              <MinusCircle className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Gift Card Form */}
        {!giftCardCode ? (
          <form onSubmit={handleApplyGiftCard} className="flex gap-2">
            <div className="relative flex-1">
              <Gift className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Gift card" 
                className="pl-9"
                value={giftCardInput}
                onChange={(e) => setGiftCardInput(e.target.value)}
              />
            </div>
            <Button type="submit" variant="secondary" disabled={!giftCardInput}>Apply</Button>
          </form>
        ) : (
          <div className="flex items-center justify-between bg-primary/5 text-primary px-3 py-2 rounded-md text-sm">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4" />
              <span className="font-medium">{giftCardCode}</span>
            </div>
            <button onClick={removeGiftCard} className="hover:text-primary/70 transition-colors">
              <MinusCircle className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="border-t pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>
            {shippingMethod ? `$${shippingCost.toFixed(2)}` : 'Calculated at next step'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        {couponDiscount > 0 && (
          <div className="flex justify-between text-primary">
            <span>Discount ({couponCode})</span>
            <span>-${couponDiscount.toFixed(2)}</span>
          </div>
        )}
        
        {giftCardBalance > 0 && (
          <div className="flex justify-between text-primary">
            <span>Gift Card ({giftCardCode})</span>
            <span>-${giftCardBalance.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="border-t pt-4 flex justify-between items-end">
        <div>
          <span className="text-lg font-bold">Total</span>
          <p className="text-xs text-muted-foreground">Including ${tax.toFixed(2)} in taxes</p>
        </div>
        <span className="text-2xl font-bold">${total.toFixed(2)}</span>
      </div>
    </div>
  );
}
