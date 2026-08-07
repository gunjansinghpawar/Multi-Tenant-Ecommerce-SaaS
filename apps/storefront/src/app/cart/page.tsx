'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash2, Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@commercex/ui';
import { useCartStore } from '../../store/use-cart-store';
import { QuantitySelector } from '../../components/cart/quantity-selector';
import { FreeShippingBar } from '../../components/cart/free-shipping-bar';
import { ShippingCalculator } from '../../components/cart/shipping-calculator';
import { ProductCarousel } from '../../components/home/product-carousel';

export default function CartPage() {
  const { items, savedItems, cartTotal, removeItem, updateQuantity, moveToSaved, moveToCart, discountCode } = useCartStore();

  const discountAmount = discountCode ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal - discountAmount;

  if (items.length === 0 && savedItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md">
          Looks like you haven't added anything to your cart yet. Explore our collections to find something you'll love.
        </p>
        <Link href="/collections/all">
          <Button size="lg">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Cart Items */}
        <div className="flex-1 space-y-8">
          
          <FreeShippingBar threshold={150} />

          {/* Active Items */}
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-4 sm:p-6 border rounded-2xl bg-card">
                <div className="relative h-32 w-32 sm:h-40 sm:w-40 rounded-xl overflow-hidden bg-muted shrink-0 border mx-auto sm:mx-0">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div>
                      <Link href={`/products/${item.productId}`} className="hover:underline">
                        <h3 className="font-semibold text-lg">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${item.price.toFixed(2)}
                      </p>
                      {item.variant && Object.entries(item.variant).map(([key, value]) => (
                        <p key={key} className="text-sm text-muted-foreground mt-0.5">
                          {key}: {value}
                        </p>
                      ))}
                    </div>
                    <p className="font-bold text-lg hidden sm:block">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                    <QuantitySelector 
                      quantity={item.quantity} 
                      onChange={(q) => updateQuantity(item.id, q)} 
                      allowRemove={true}
                    />
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => moveToSaved(item.id)} className="text-muted-foreground">
                        <Heart className="h-4 w-4 mr-2" /> Save for Later
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Saved for Later */}
          {savedItems.length > 0 && (
            <div className="pt-12 border-t mt-12">
              <h2 className="text-2xl font-bold mb-6">Saved for Later ({savedItems.length})</h2>
              <div className="space-y-6">
                {savedItems.map((item) => (
                  <div key={`saved-${item.id}`} className="flex flex-col sm:flex-row gap-6 p-4 border rounded-2xl bg-muted/30 opacity-75 hover:opacity-100 transition-opacity">
                    <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-background shrink-0 border mx-auto sm:mx-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col sm:flex-row justify-between items-center sm:items-start gap-4">
                      <div className="text-center sm:text-left">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="font-semibold mt-1">${item.price.toFixed(2)}</p>
                      </div>
                      <Button onClick={() => moveToCart(item.id)} variant="secondary">
                        Move to Cart
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary Sidebar */}
        {items.length > 0 && (
          <aside className="w-full lg:w-[380px] shrink-0">
            <div className="sticky top-24 border rounded-2xl p-6 bg-card shadow-sm space-y-6">
              <h2 className="text-xl font-bold">Order Summary</h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                {discountCode && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount ({discountCode})</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Shipping</span>
                  <span>Calculated below</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Estimated Tax</span>
                  <span>Calculated below</span>
                </div>
              </div>

              <ShippingCalculator />

              <div className="border-t pt-4 flex justify-between font-bold text-xl">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>

              <Link href="/checkout" className="block w-full">
                <Button size="lg" className="w-full text-base py-6">
                  Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <div className="flex items-center justify-center pt-2">
                <Link href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Continue Shopping
                </Link>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Cross Sells */}
      <div className="mt-24 border-t pt-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-tight">You May Also Like</h2>
          <p className="text-muted-foreground mt-2">Customers who bought these items also bought</p>
        </div>
        <ProductCarousel 
          title=""
          products={[
            {
              id: 'p1',
              name: 'Premium Wireless Headphones',
              price: 299.99,
              images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop'],
              href: '/product/p1'
            },
            {
              id: 'p2',
              name: 'Minimalist Smartwatch',
              price: 199.99,
              images: ['https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop'],
              href: '/product/p2'
            },
            {
              id: 'p3',
              name: 'Ergonomic Office Chair',
              price: 450.00,
              images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?w=500&auto=format&fit=crop'],
              href: '/product/p3'
            },
            {
              id: 'p4',
              name: 'Mechanical Keyboard',
              price: 159.50,
              images: ['https://images.unsplash.com/photo-1595225476474-87563907a212?w=500&auto=format&fit=crop'],
              href: '/product/p4'
            }
          ]}
        />
      </div>
    </div>
  );
}
