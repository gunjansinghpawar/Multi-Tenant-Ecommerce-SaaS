'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Scale, Trash2 } from 'lucide-react';
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle } from '@commercex/ui';
import { useCompareStore } from '../../store/use-compare-store';
import { PriceDisplay } from './price-display';

export function CompareDrawer() {
  const { items, removeItem, clearCompare } = useCompareStore();
  const [hasMounted, setHasMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || items.length === 0) {
    return null;
  }

  return (
    <>
      {/* Floating trigger when items exist */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button 
          onClick={() => setIsOpen(true)}
          className="rounded-full shadow-lg h-14 px-6 flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Scale className="h-5 w-5" />
          <span className="font-semibold text-sm">Compare ({items.length})</span>
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] md:max-w-5xl h-[90vh] sm:h-[80vh] flex flex-col p-4 sm:p-6 overflow-hidden">
          <DialogHeader className="mb-4 flex flex-row items-center justify-between flex-shrink-0">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Scale className="h-5 w-5" /> Product Comparison
            </DialogTitle>
            <div className="flex items-center gap-4 pr-6">
              <Button variant="ghost" size="sm" onClick={clearCompare} className="text-muted-foreground hover:text-red-500">
                <Trash2 className="mr-2 h-4 w-4" /> Clear All
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-x-auto overflow-y-auto no-scrollbar pb-6">
            <div className="flex gap-6 min-w-max h-full">
              {items.map((item) => (
                <div key={item.productId} className="w-[250px] sm:w-[280px] shrink-0 flex flex-col relative border rounded-xl p-4 bg-card h-full">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background/80 shadow-sm z-10 hover:bg-background hover:text-red-500"
                    onClick={() => removeItem(item.productId)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  
                  <div className="relative aspect-square w-full rounded-md overflow-hidden bg-muted mb-4 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  {item.brand && <span className="text-xs text-muted-foreground uppercase font-semibold">{item.brand}</span>}
                  <h4 className="font-medium text-sm line-clamp-2 mt-1 min-h-[40px]">{item.name}</h4>
                  <PriceDisplay price={item.price} compareAtPrice={item.compareAtPrice} className="mt-2 text-sm" />
                  
                  <div className="mt-4 flex-1">
                    <div className="text-sm border-t pt-3 flex justify-between">
                      <span className="text-muted-foreground">Availability</span>
                      <span className={item.inStock !== false ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                        {item.inStock !== false ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                  
                  <Button className="w-full mt-4 flex-shrink-0" disabled={item.inStock === false}>
                    Add to Cart
                  </Button>
                </div>
              ))}
              
              {items.length < 4 && (
                <div className="w-[250px] sm:w-[280px] shrink-0 border-2 border-dashed rounded-xl flex flex-col items-center justify-center text-muted-foreground bg-muted/20 h-full">
                  <Scale className="h-8 w-8 mb-2 opacity-50" />
                  <p className="text-sm font-medium">Add another product</p>
                  <p className="text-xs text-center px-4 mt-1">You can compare up to 4 items</p>
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
