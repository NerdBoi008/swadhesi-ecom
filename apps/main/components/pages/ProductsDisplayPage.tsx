'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import BreadCrumbLinkCustom from '@/components/common/BreadCrumbLinkCustom'
import { PageRoutes, Product, ProductSizes } from '@/types'
import useDataStore from '@/lib/store/dataStore'
import ProductCard from '@/components/common/ProductCard'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { PriceFilter } from '@/components/common/PriceFilter'
import { StockFilter, StockStatus } from '@/components/common/StockFilter'
import { SizeFilter } from '@/components/common/SizeFilter'
import { Button } from '@/components/ui/button'
import { ListFilterPlusIcon } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ProductsDisplayPageProps {
    pageHeading: PageRoutes;
}

const pageHeadings: Record<PageRoutes, string> = {
    all: "All Products",
    dresses: "Dresses",
    tops: "Tops",
};

const ProductsDisplayPage = ({ 
    pageHeading
}: ProductsDisplayPageProps) => {

  const { products: productsApi, fetchProducts } = useDataStore();
  const [originalProducts, setoriginalProducts] = useState<Product[] | null>(null);

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  // --- State for Filter Criteria ---
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  // Initialize maxPrice high, it will adjust when products load
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [stockStatus, setStockStatus] = useState<StockStatus>('all');
  // --- State for the final list to display ---
  const [filteredProducts, setFilteredProducts] = useState(originalProducts);
  // --- State for Resetting Child Components ---
  const [filterResetKey, setFilterResetKey] = useState<number>(0);


  // --- Effect to fetch and set base data & initial filter values ---
  useEffect(() => {
    if (!productsApi && fetchProducts) {
      fetchProducts();
    }

    if (productsApi) {
      // setoriginalProducts(productsApi);
      setoriginalProducts((pageHeading === 'all') ? productsApi : productsApi.filter(p => p.category === pageHeading));

      // Calculate initial price bonds only when products load/change
      if (productsApi.length > 0) {
        const prices = productsApi.map(p => p.price);
        const initialMin = 0; // Or can be changed to Math.min(...prices) if > 0 needed
        const initialMax = Math.max(...prices);
        
        setMinPrice(initialMin);
        setMaxPrice(initialMax);

        setFilteredProducts(productsApi);
      } else {
        setMinPrice(0);
        setMaxPrice(0);
        setFilteredProducts([]);
      }
      // Reset other filters to default when data reloads? Optional.
      // setSelectedSizes([]);
      // setStockStatus('all');
    }
    
  }, [productsApi, fetchProducts, pageHeading]);

  // --- Calculate price bounds for the PriceFilter component ---
  const priceBounds = useMemo(() => {
    if (!originalProducts || originalProducts.length === 0) {
      return { min: 0, max: 0 };
    }
    const prices = originalProducts.map(p => p.price);
    return {
      min: 0,
      max: Math.max(...prices)
    }
  }, [originalProducts]);

  const handleClearFilters = useCallback(() => {
    setSelectedSizes([]);
    setStockStatus('all');

    // Reset price to the actual bounds derived from current original products
    const bounds = priceBounds; // Use the memoized bounds
    setMinPrice(bounds.min);
    setMaxPrice(bounds.max);

    // Increment the key to force remount of filter components
    setFilterResetKey(prevKey => prevKey + 1);

  }, [priceBounds]);
  
  // --- Callback for SizeFilter ---
  // Memoized to prevent issues in SizeFilter's useEffect
  const handleSizeChange = useCallback((sizes: string[]) => {
    setSelectedSizes(sizes);
  }, []);
  
  // --- Callback for PriceFilter ---
  // Memoized to prevent issues in PriceFilter's useEffect
  const handlePriceRangeChange = useCallback((min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  }, []);

  // Callback for StockFilter
  const handleStockStatusChange = useCallback((status: StockStatus) => {
    setStockStatus(status);
  }, []);
  

  // --- Central Effect for Filtering ---
  // This runs whenever the original list or any filter criteria changes
  useEffect(() => {
    if (!originalProducts) {
      setFilteredProducts(null); // Set to null if original data isn't ready
      return;
    }

    let currentFiltered: Product[] = [...originalProducts]; // Start with the full original list

    // Apply size filter
    if (selectedSizes.length > 0) {
      currentFiltered = currentFiltered.filter(p =>
        Array.isArray(p.sizes) && selectedSizes.some(size => p.sizes.includes(size as ProductSizes))
      );
    }

    // Apply price filter
    // Ensure maxPrice is treated correctly (it might be Infinity initially)
    const effectiveMaxPrice = maxPrice === Infinity ? Number.MAX_SAFE_INTEGER : maxPrice;
    currentFiltered = currentFiltered.filter(p =>
      p.price >= minPrice && p.price <= effectiveMaxPrice
    );

    // Apply stock filter
    if (stockStatus === 'inStock') {
      currentFiltered = currentFiltered.filter(p => typeof p.stock === 'number' && p.stock > 0);
    } else if (stockStatus === 'outOfStock') {
      currentFiltered = currentFiltered.filter(p => typeof p.stock === 'number' && p.stock <= 0);
    }

    setFilteredProducts(currentFiltered); // Update the final display list
    
  }, [originalProducts, selectedSizes, minPrice, maxPrice, stockStatus]);

  return (
    <main className='flex-1 pt-8 container-x-padding space-y-5'>
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadCrumbLinkCustom href="/">Home</BreadCrumbLinkCustom>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{pageHeadings[pageHeading]}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className='text-center text-5xl font-secondary'>{pageHeadings[pageHeading]}</h1>

      {/* Main section */}
      <section className='flex gap-5'>
        {/* filter section */}
        <aside className='w-80 sticky top-[140px] h-[calc(100vh-140px)] overflow-y-auto hidden md:block'>
          <div className='flex justify-between items-center'>
            <p className='text-lg font-semibold'>Filter:</p>
            <Button
              variant={'link'} size={'sm'}
              onClick={handleClearFilters}
              className='cursor-pointer'
            >
              Clear All
            </Button>
          </div>
          <Accordion type='multiple'>
            <AccordionItem value="item-1">
              <AccordionTrigger>Size</AccordionTrigger>
              <AccordionContent>
                <SizeFilter
                  key={`size-${filterResetKey}`}
                  onSizeChange={handleSizeChange}
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                {filteredProducts && (
                  <PriceFilter
                    key={`price-${filterResetKey}`}
                    minPriceBound={priceBounds.min || 0}
                    maxPriceBound={priceBounds.max || 0}
                    onPriceRangeChange={handlePriceRangeChange}
                  />
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Availability</AccordionTrigger>
              <AccordionContent>
                {originalProducts && (
                  <StockFilter
                    key={`stock-${filterResetKey}`}
                    originalProducts={originalProducts}
                    onStockStatusChange={handleStockStatusChange}
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

        </aside>

        {/* Products display section */}
        <aside className='w-full'>
          <header className='flex items-center pb-5 justify-between md:justify-end'>
            <Sheet open={isSheetOpen} onOpenChange={(open) => setIsSheetOpen(open)}>
              <SheetTrigger asChild>
                <Button
                  variant={'outline'}
                  className='font-bold cursor-pointer md:hidden'
                >
                  <ListFilterPlusIcon />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='p-5'>

                <SheetHeader className='hidden'>
                  <SheetTitle>Filter</SheetTitle>
                  <SheetDescription>
                    Filter for products.
                  </SheetDescription>
                </SheetHeader>

                <h1 className='font-semibold text-lg'>Filter</h1>
                <Accordion type='multiple'>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Size</AccordionTrigger>
                    <AccordionContent>
                      <SizeFilter
                        key={`size-${filterResetKey}`}
                        onSizeChange={handleSizeChange}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent>
                      {filteredProducts && (
                        <PriceFilter
                          key={`price-${filterResetKey}`}
                          minPriceBound={priceBounds.min || 0}
                          maxPriceBound={priceBounds.max || 0}
                          onPriceRangeChange={handlePriceRangeChange}
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Availability</AccordionTrigger>
                    <AccordionContent>
                      {originalProducts && (
                        <StockFilter
                          key={`stock-${filterResetKey}`}
                          originalProducts={originalProducts}
                          onStockStatusChange={handleStockStatusChange}
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <SheetFooter>
                  <Button
                    variant={'default'} size={'sm'}
                    className='cursor-pointer'
                    onClick={() => {
                      handleClearFilters();
                      setIsSheetOpen(!isSheetOpen);
                    }}
                  >
                    Clear All
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <div className='flex gap-3 items-center'>
              <div className='flex gap-3 items-center'>
                <span className='text-sm font-semibold'>Sort By :</span>
                <Select defaultValue='featured'>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="name-a-z">Name [A-Z]</SelectItem>
                    <SelectItem value="name-z-a">Name [Z-A]</SelectItem>
                    <SelectItem value="price-h-l">Price [High-Low]</SelectItem>
                    <SelectItem value="price-l-h">Price [Low-High]</SelectItem>
                    <SelectItem value="date-o-n">Date [Old-New]</SelectItem>
                    <SelectItem value="date-n-o">Date [New-Old]</SelectItem>
                  </SelectContent>
                </Select>
              </div> 
              <span className='text-muted-foreground'>|</span>
              <p className='text-sm font-semibold'>{filteredProducts ? filteredProducts.length : 0} Products</p>
            </div>
          </header>

          {/* Products grid */}
          <div className='grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-y-6 gap-x-3'>
            {filteredProducts ? (
              filteredProducts.map(({ id, name, price, discount, stock, sizes, thumbnailImage, otherImages, description, category, recommendedProducts }: Product) => (
                <ProductCard
                  key={id}
                  className="w-full"
                  id={id}
                  name={name}
                  price={price}
                  discount={discount}
                  stock={stock}
                  sizes={sizes}
                  thumbnailImage={thumbnailImage}
                  otherImages={otherImages}
                  description={description}
                  category={category}
                  recommendedProducts={recommendedProducts}
                />
              ))
            ) : (
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="border-2 h-44 lg:h-60 2xl:h-96 animate-pulse bg-gray-100 w-full m-8" />
              ))
            )}
          </div>
        </aside>
      </section>
    </main>
  )
}

export default ProductsDisplayPage