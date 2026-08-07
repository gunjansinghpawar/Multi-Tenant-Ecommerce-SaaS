'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, X, Trash2, ArrowRight, Tag } from 'lucide-react';
import { Button, Sheet, SheetContent, SheetHeader, SheetTitle, Input } from '@commercex/ui';
import { useCartStore } from '../../store/use-cart-store';
import { QuantitySelector } from './quantity-selector';
import { FreeShippingBar } from './free-shipping-bar';
import { cn } from '@commercex/utils';
import { useRouter } from 'next/navigation';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, cartTotal, removeItem, updateQuantity, discountCode, setDiscountCode } = useCartStore();
  const router = useRouter();
  
  const [couponInput, setCouponInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    
    setIsApplyingCoupon(true);
    setTimeout(() => {
      setDiscountCode(couponInput.toUpperCase());
      setIsApplyingCoupon(false);
      setShowCouponInput(false);
      setCouponInput('');
    }, 800);
  };

  const handleCheckout = () => {
    setIsOpen(false);
    router.push('/checkout');
  };

  const handleViewCart = () => {
    setIsOpen(false);
    router.push('/cart');
  };

  // Calculate discount (Mock logic: 10% off if code exists)
  const discountAmount = discountCode ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discountAmount;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-md p-0 flex flex-col bg-background/95 backdrop-blur-xl">
        <SheetHeader className="px-6 py-4 border-b">
          <SheetTitle className="flex items-center text-xl">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Your Cart ({items.length})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
            <Button onClick={() => setIsOpen(false)} className="px-8">
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <FreeShippingBar threshold={150} />

              <div className="space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-24 w-20 rounded-md overflow-hidden bg-muted shrink-0 border">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <QuantitySelector 
                          quantity={item.quantity} 
                          onChange={(q) => updateQuantity(item.id, q)}
                          size="sm"
                          allowRemove={true}
                        />
                        <p className="font-semibold text-sm">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Summary */}
            <div className="border-t bg-muted/20 p-6 space-y-4">
              
              {/* Coupon Section */}
              <div className="space-y-2">
                {discountCode ? (
                  <div className="flex items-center justify-between text-sm bg-green-500/10 text-green-700 dark:text-green-400 p-2 rounded-md border border-green-500/20">
                    <span className="flex items-center font-medium"><Tag className="h-3 w-3 mr-2" /> Code applied: {discountCode}</span>
                    <button onClick={() => setDiscountCode(null)} className="hover:underline">Remove</button>
                  </div>
                ) : (
                  <>
                    {!showCouponInput ? (
                      <button onClick={() => setShowCouponInput(true)} className="text-sm font-medium text-primary hover:underline flex items-center">
                        <Tag className="h-3 w-3 mr-2" /> Add a discount code
                      </button>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <Input 
                          placeholder="Enter code" 
                          value={couponInput} 
                          onChange={(e) => setCouponInput(e.target.value)} 
                          className="h-9 text-sm"
                        />
                        <Button type="submit" size="sm" className="h-9" disabled={isApplyingCoupon}>
                          Apply
                        </Button>
                      </form>
                    )}
                  </>
                )}
              </div>

              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {discountCode && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2 text-foreground">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <Button size="lg" className="w-full text-base" onClick={handleCheckout}>
                  Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="w-full text-base" onClick={handleViewCart}>
                  View Full Cart
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
