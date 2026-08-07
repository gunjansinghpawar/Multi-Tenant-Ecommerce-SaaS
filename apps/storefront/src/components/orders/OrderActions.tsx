'use client';

import React, { useState } from 'react';
import { Button } from '@commercex/ui';
import { Order } from '../../lib/mock-orders';
import { useCartStore } from '../../store/use-cart-store';
import { useRouter } from 'next/navigation';
import { Download, RotateCcw, XCircle, FileWarning, HelpCircle, Repeat } from 'lucide-react';

interface OrderActionsProps {
  order: Order;
}

export function OrderActions({ order }: OrderActionsProps) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleReorder = () => {
    order.items.forEach(item => {
      addItem({
        id: crypto.randomUUID(),
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      });
    });
    router.push('/cart');
  };

  const handleDownloadInvoice = () => {
    // In a real app, this would fetch a PDF. We simulate by triggering print.
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  const canCancel = order.status === 'Pending' || order.status === 'Processing';
  const canReturn = order.status === 'Delivered';

  return (
    <div className="bg-card border rounded-xl p-6 space-y-4">
      <h3 className="text-lg font-bold mb-4">Available Actions</h3>
      
      {toastMessage && (
        <div className="bg-primary text-primary-foreground text-sm px-4 py-2 rounded-md mb-4 animate-in fade-in slide-in-from-top-2">
          {toastMessage}
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Button onClick={handleReorder} className="w-full justify-start gap-2" variant="default">
          <Repeat className="h-4 w-4" /> Reorder Items
        </Button>
        <Button onClick={handleDownloadInvoice} className="w-full justify-start gap-2" variant="outline">
          <Download className="h-4 w-4" /> Download Invoice
        </Button>
        
        {canCancel && (
          <Button onClick={() => showToast('Order cancellation requested.')} className="w-full justify-start gap-2 text-destructive hover:text-destructive hover:bg-destructive/10" variant="outline">
            <XCircle className="h-4 w-4" /> Cancel Order
          </Button>
        )}
        
        {canReturn && (
          <>
            <Button onClick={() => showToast('Return process initiated.')} className="w-full justify-start gap-2" variant="outline">
              <RotateCcw className="h-4 w-4" /> Return Items
            </Button>
            <Button onClick={() => showToast('Exchange process initiated.')} className="w-full justify-start gap-2" variant="outline">
              <FileWarning className="h-4 w-4" /> Exchange Items
            </Button>
          </>
        )}
        
        <Button onClick={() => router.push('/support')} className="w-full justify-start gap-2" variant="secondary">
          <HelpCircle className="h-4 w-4" /> Contact Support
        </Button>
      </div>
    </div>
  );
}
