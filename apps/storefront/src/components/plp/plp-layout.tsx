'use client';

import React, { useState } from 'react';
import { LayoutGrid, List, SlidersHorizontal, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@commercex/ui';
import { cn } from '@commercex/utils';
import { useRouter, useSearchParams } from 'next/navigation';
import { useUiStore } from '../../store/use-ui-store';
import { FilterSidebar } from './filter-sidebar';
import { ProductCard, ProductCardProps } from '../product/product-card';

interface PlpLayoutProps {
  title: string;
  description?: string;
  totalResults: number;
  products: ProductCardProps[];
  currentPage?: number;
  totalPages?: number;
}

const sortOptions = [
  { label: 'Featured', value: 'featured' },
  { label: 'Best Selling', value: 'best-selling' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest Arrivals', value: 'date-desc' },
];

export function PlpLayout({ title, description, totalResults, products, currentPage = 1, totalPages = 1 }: PlpLayoutProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setFilterDrawerOpen } = useUiStore();
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const currentSort = searchParams.get('sort') || 'featured';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === 'featured') {
      params.delete('sort');
    } else {
      params.set('sort', value);
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Page Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{title}</h1>
        {description && (
          <p className="text-muted-foreground max-w-3xl text-lg">{description}</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Sidebar */}
        <FilterSidebar />
        
        {/* Mobile Filter Drawer */}
        <FilterSidebar isMobile />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b">
            
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="lg:hidden flex items-center gap-2"
                onClick={() => setFilterDrawerOpen(true)}
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <span className="text-sm text-muted-foreground font-medium">
                {totalResults} Products
              </span>
            </div>

            <div className="flex items-center gap-4 justify-between sm:justify-end">
              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-9 font-medium pr-2 pl-3 bg-muted/50">
                      {sortOptions.find(o => o.value === currentSort)?.label || 'Featured'}
                      <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuRadioGroup value={currentSort} onValueChange={handleSortChange}>
                      {sortOptions.map((option) => (
                        <DropdownMenuRadioItem key={option.value} value={option.value}>
                          {option.label}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* View Toggles */}
              <div className="hidden sm:flex items-center gap-1 bg-muted/50 p-1 rounded-md border">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("h-7 w-7 rounded-sm", view === 'grid' && "bg-background shadow-sm")}
                  onClick={() => setView('grid')}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn("h-7 w-7 rounded-sm", view === 'list' && "bg-background shadow-sm")}
                  onClick={() => setView('list')}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Grid/List */}
          <div className={cn(
            "grid gap-4 md:gap-6",
            view === 'grid' 
              ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1 md:grid-cols-2"
          )}>
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                {...product} 
                className={cn(view === 'list' && "flex-row h-48 max-w-2xl")}
              />
            ))}
            
            {products.length === 0 && (
              <div className="col-span-full py-24 text-center">
                <h3 className="text-xl font-medium mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const page = i + 1;
                  // Simple logic: show first, last, and current +/- 1
                  if (page === 1 || page === totalPages || (page >= currentPage - 1 && page <= currentPage + 1)) {
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className="w-9 h-9"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </Button>
                    );
                  }
                  if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-2 text-muted-foreground">...</span>;
                  }
                  return null;
                })}
              </div>

              <Button 
                variant="outline" 
                size="icon" 
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
