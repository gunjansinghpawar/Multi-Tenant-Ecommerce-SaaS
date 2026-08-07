'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@commercex/ui';
import { CheckCircle2, FileText, ShoppingBag } from 'lucide-react';
import { useCheckoutStore } from '../../../store/use-checkout-store';
import { useCartStore } from '../../../store/use-cart-store';

export default function CheckoutSuccessPage() {
  const { resetCheckout, guestEmail } = useCheckoutStore();
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Clear the cart and reset checkout state when reaching success
    clearCart();
    // We delay resetCheckout so we can still read email if we want, but for now we'll just clear it when they leave
    return () => resetCheckout();
  }, [clearCart, resetCheckout]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="bg-card border rounded-2xl shadow-sm p-8 max-w-md w-full text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="h-10 w-10 text-green-500" />
        </div>
        
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Order Successful!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order number is <strong>#ORD-{Math.floor(100000 + Math.random() * 900000)}</strong>.
            We'll email your order details to {guestEmail || 'your email'}.
          </p>
        </div>

        <div className="pt-4 flex flex-col gap-3">
          <Button variant="outline" className="w-full flex items-center justify-center gap-2">
            <FileText className="h-4 w-4" /> Download Invoice
          </Button>
          <Link href="/" className="w-full">
            <Button className="w-full flex items-center justify-center gap-2">
              <ShoppingBag className="h-4 w-4" /> Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
