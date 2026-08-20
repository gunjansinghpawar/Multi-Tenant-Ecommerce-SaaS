'use client';

import { usePopupStore } from '@/store/usePopupStore';
import { Button, Dialog, DialogContent } from '@commercex/ui';
import { X, ShoppingBag, Bell, Ruler, Eye } from 'lucide-react';
import { useState } from 'react';

export function ProductActionModal() {
  const { activePopup, popupData, closePopup } = usePopupStore();
  const isOpen = activePopup === 'PRODUCT_ACTION';
  
  if (!isOpen || !popupData) return null;
  
  const { productActionType, productId, title, message } = popupData;

  const renderContent = () => {
    switch (productActionType) {
      case 'quick-add':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-primary">
              <ShoppingBag className="h-8 w-8" />
              <h2 className="text-xl font-bold">{title || "Quick Add"}</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {message || "Select options to add this product to your cart."}
            </p>
            {/* Placeholder for Product Options */}
            <div className="h-32 bg-secondary/50 rounded-lg flex items-center justify-center border border-dashed border-border">
              <span className="text-sm text-muted-foreground">Product Options (Size, Color) for {productId}</span>
            </div>
            <Button className="w-full" onClick={closePopup}>Add to Cart</Button>
          </div>
        );
      case 'size-guide':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-primary">
              <Ruler className="h-8 w-8" />
              <h2 className="text-xl font-bold">{title || "Size Guide"}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-secondary text-secondary-foreground">
                  <tr>
                    <th className="p-3">Size</th>
                    <th className="p-3">Chest (in)</th>
                    <th className="p-3">Waist (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b"><td className="p-3">S</td><td className="p-3">34-36</td><td className="p-3">28-30</td></tr>
                  <tr className="border-b"><td className="p-3">M</td><td className="p-3">38-40</td><td className="p-3">32-34</td></tr>
                  <tr><td className="p-3">L</td><td className="p-3">42-44</td><td className="p-3">36-38</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'stock-alert':
      case 'notify-me':
      case 'back-in-stock':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-primary">
              <Bell className="h-8 w-8" />
              <h2 className="text-xl font-bold">{title || "Notify Me"}</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {message || "Get notified when this item is back in stock."}
            </p>
            <input type="email" placeholder="Enter your email" className="w-full p-2 border rounded-md" />
            <Button className="w-full" onClick={closePopup}>Subscribe</Button>
          </div>
        );
      case 'product-preview':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-primary">
              <Eye className="h-8 w-8" />
              <h2 className="text-xl font-bold">{title || "Product Preview"}</h2>
            </div>
            <div className="h-48 bg-secondary/50 rounded-lg flex items-center justify-center border border-dashed border-border">
              <span className="text-sm text-muted-foreground">3D/AR Preview Area for {productId}</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={closePopup}>
      <DialogContent className="sm:max-w-[425px] p-6">
        <button 
          onClick={closePopup}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
