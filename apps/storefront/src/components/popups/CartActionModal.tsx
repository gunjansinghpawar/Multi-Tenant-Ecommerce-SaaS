'use client';

import { usePopupStore } from '@/store/usePopupStore';
import { Button, Dialog, DialogContent } from '@commercex/ui';
import { X, Truck, Tag, Gift } from 'lucide-react';

export function CartActionModal() {
  const { activePopup, popupData, closePopup } = usePopupStore();
  const isOpen = activePopup === 'CART_ACTION';
  
  if (!isOpen || !popupData) return null;
  
  const { cartActionType, title, message } = popupData;

  const renderContent = () => {
    switch (cartActionType) {
      case 'shipping-calculator':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-primary">
              <Truck className="h-8 w-8" />
              <h2 className="text-xl font-bold">{title || "Estimate Shipping"}</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {message || "Enter your destination to get a shipping estimate."}
            </p>
            <div className="space-y-2">
              <input type="text" placeholder="Country" className="w-full p-2 border rounded-md" />
              <input type="text" placeholder="Zip/Postal Code" className="w-full p-2 border rounded-md" />
            </div>
            <Button className="w-full" onClick={closePopup}>Calculate</Button>
          </div>
        );
      case 'coupon':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-primary">
              <Tag className="h-8 w-8" />
              <h2 className="text-xl font-bold">{title || "Apply Coupon"}</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {message || "Enter your coupon code below."}
            </p>
            <input type="text" placeholder="Coupon code" className="w-full p-2 border rounded-md" />
            <Button className="w-full" onClick={closePopup}>Apply</Button>
          </div>
        );
      case 'gift-card':
        return (
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-primary">
              <Gift className="h-8 w-8" />
              <h2 className="text-xl font-bold">{title || "Use Gift Card"}</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {message || "Enter your gift card number and pin."}
            </p>
            <div className="space-y-2">
              <input type="text" placeholder="Card Number" className="w-full p-2 border rounded-md" />
              <input type="password" placeholder="PIN" className="w-full p-2 border rounded-md" />
            </div>
            <Button className="w-full" onClick={closePopup}>Check Balance / Apply</Button>
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
