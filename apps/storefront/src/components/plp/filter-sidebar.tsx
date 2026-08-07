'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, X } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, Button, Accordion, AccordionItem, AccordionTrigger, AccordionContent, Checkbox } from '@commercex/ui';
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
    id: 'price',
    name: 'Price Range',
    options: [
      { value: '0-50', label: 'Under $50' },
      { value: '50-100', label: '$50 - $100' },
      { value: '100-200', label: '$100 - $200' },
      { value: '200+', label: 'Over $200' },
    ],
  }
];

export function FilterSidebar({ isMobile = false }: { isMobile?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isFilterDrawerOpen, setFilterDrawerOpen } = useUiStore();

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
                  {section.options.map((option) => {
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
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
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
