'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, Button, Accordion, AccordionItem, AccordionTrigger, AccordionContent, Checkbox, Input } from '@commercex/ui';
import { cn } from '@commercex/utils';
import { useUiStore } from '../../store/use-ui-store';

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'sneakers', label: 'Sneakers' },
      { value: 'running', label: 'Running Shoes' },
      { value: 'training', label: 'Training' },
      { value: 'basketball', label: 'Basketball' },
    ],
  },
  {
    id: 'brand',
    name: 'Brand',
    options: [
      { value: 'nike', label: 'Nike' },
      { value: 'adidas', label: 'Adidas' },
      { value: 'puma', label: 'Puma' },
      { value: 'asics', label: 'Asics' },
    ],
  },
  {
    id: 'size',
    name: 'Size',
    options: [
      { value: '7', label: 'US 7' },
      { value: '8', label: 'US 8' },
      { value: '9', label: 'US 9' },
      { value: '10', label: 'US 10' },
      { value: '11', label: 'US 11' },
      { value: '12', label: 'US 12' },
    ],
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'black', label: 'Black', hex: '#000000' },
      { value: 'white', label: 'White', hex: '#FFFFFF' },
      { value: 'red', label: 'Red', hex: '#EF4444' },
      { value: 'blue', label: 'Blue', hex: '#3B82F6' },
      { value: 'green', label: 'Green', hex: '#22C55E' },
    ],
  },
  {
    id: 'material',
    name: 'Material',
    options: [
      { value: 'leather', label: 'Leather' },
      { value: 'mesh', label: 'Mesh' },
      { value: 'suede', label: 'Suede' },
      { value: 'canvas', label: 'Canvas' },
    ],
  },
  {
    id: 'availability',
    name: 'Availability',
    options: [
      { value: 'in-stock', label: 'In Stock' },
      { value: 'out-of-stock', label: 'Out of Stock' },
    ],
  },
  {
    id: 'rating',
    name: 'Rating',
    options: [
      { value: '4-up', label: '4 Stars & Up' },
      { value: '3-up', label: '3 Stars & Up' },
      { value: '2-up', label: '2 Stars & Up' },
      { value: '1-up', label: '1 Star & Up' },
    ],
  }
];

export function FilterSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isFilterDrawerOpen, setFilterDrawerOpen } = useUiStore();
  const [minPrice, setMinPrice] = React.useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = React.useState(searchParams.get('maxPrice') || '');

  const handlePriceApply = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');
    
    if (maxPrice) params.set('maxPrice', maxPrice);
    else params.delete('maxPrice');
    
    params.delete('page');
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(filterId)?.split(',') || [];

    if (checked) {
      if (!currentValues.includes(value)) {
        currentValues.push(value);
      }
    } else {
      const index = currentValues.indexOf(value);
      if (index > -1) {
        currentValues.splice(index, 1);
      }
    }

    if (currentValues.length > 0) {
      params.set(filterId, currentValues.join(','));
    } else {
      params.delete(filterId);
    }
    
    params.delete('page'); // Reset pagination on filter change
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const clearAll = () => {
    router.push('?', { scroll: false });
  };

  const FilterContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4 border-b">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Filter className="h-4 w-4" /> Filters
        </h3>
        {Array.from(searchParams.keys()).length > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="h-8 text-xs underline underline-offset-4 text-muted-foreground hover:text-foreground">
            Clear all
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 no-scrollbar">
        <Accordion type="multiple" defaultValue={['category', 'brand']} className="w-full">
          {filters.map((section) => (
            <AccordionItem value={section.id} key={section.id} className="border-b-0">
              <AccordionTrigger className="hover:no-underline py-3 text-sm font-medium">
                {section.name}
              </AccordionTrigger>
              <AccordionContent className="pb-4">
                <div className="space-y-3 pt-1">
                  {section.id === 'color' ? (
                    <div className="flex flex-wrap gap-2">
                      {section.options.map((option) => {
                        const isActive = searchParams.get(section.id)?.split(',').includes(option.value) || false;
                        return (
                          <button
                            key={option.value}
                            onClick={() => handleFilterChange(section.id, option.value, !isActive)}
                            className={cn(
                              "w-8 h-8 rounded-full border-2 transition-all",
                              isActive ? "border-primary scale-110" : "border-transparent hover:scale-105"
                            )}
                            style={{ backgroundColor: (option as any).hex }}
                            aria-label={option.label}
                            title={option.label}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    section.options.map((option) => {
                      const isActive = searchParams.get(section.id)?.split(',').includes(option.value) || false;
                      return (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`filter-${section.id}-${option.value}`} 
                            checked={isActive}
                            onCheckedChange={(checked) => handleFilterChange(section.id, option.value, checked as boolean)}
                          />
                          <label
                            htmlFor={`filter-${section.id}-${option.value}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {option.label}
                          </label>
                        </div>
                      );
                    })
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
          
          <AccordionItem value="price-range" className="border-b-0">
            <AccordionTrigger className="hover:no-underline py-3 text-sm font-medium">
              Price Range
            </AccordionTrigger>
            <AccordionContent className="pb-4">
              <div className="space-y-4 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      className="pl-7 h-9 text-sm"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <span className="text-muted-foreground">-</span>
                  <div className="flex-1 relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      className="pl-7 h-9 text-sm"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
                <Button size="sm" className="w-full h-9" onClick={handlePriceApply}>
                  Apply
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      
      {isMobile && (
        <div className="pt-4 border-t mt-auto">
          <Button className="w-full" onClick={() => setFilterDrawerOpen(false)}>
            Show Results
          </Button>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={isFilterDrawerOpen} onOpenChange={setFilterDrawerOpen}>
        <SheetContent side="left" className="w-[85vw] sm:w-[350px] p-6 flex flex-col">
          <SheetHeader className="hidden">
            <SheetTitle>Filters</SheetTitle>
          </SheetHeader>
          {FilterContent}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="hidden lg:block w-64 shrink-0 pr-8 sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar">
      {FilterContent}
    </div>
  );
}
