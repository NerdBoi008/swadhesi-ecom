"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import BreadCrumbLinkCustom from "@/components/common/BreadCrumbLinkCustom";
import { Product } from "@repo/types";
import useDataStore from "@/lib/store/dataStore";
import ProductCard from "@/components/common/ProductCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PriceFilter } from "@/components/common/PriceFilter";
import { StockFilter, StockStatus } from "@/components/common/StockFilter";
import { SizeFilter } from "@/components/common/SizeFilter";
import { Button } from "@/components/ui/button";
import { ListFilterPlusIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsDisplayPageProps {
  pageHeading: string;
}

const pageHeadings = {
  all: "All Products",
  dresses: "Dresses",
  tops: "Tops",
};

const ProductsDisplayPage = ({ pageHeading }: ProductsDisplayPageProps) => {
  const { products: productsApi, fetchProducts } = useDataStore();
  const [baseProducts, setBaseProducts] = useState<Product[] | null>(null);

  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);

  // --- State for Filter Criteria ---
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity); // Initialize high, will be updated based on baseProducts
  const [stockStatus, setStockStatus] = useState<StockStatus>("all");
  const [sortBy, setSortBy] = useState<string>("featured");

  // --- State for the final list to display ---
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState<
    Product[] | null
  >(null);
  const [filterResetKey, setFilterResetKey] = useState<number>(0);

  // --- EFFECT 1: Fetch products, determine base products, and set initial price bounds ---
  useEffect(() => {
    if (!productsApi || productsApi.length === 0) {
      fetchProducts();
      // Do NOT set baseProducts or price bounds here yet.
      // Let the component display a loading state until productsApi is available.
      return;
    }
  
    const currentBaseProducts =
      pageHeading === "all"
        ? productsApi
        : productsApi.filter(
            (p) => p.category?.name?.toLowerCase() === pageHeading.toLowerCase()
          );
    setBaseProducts(currentBaseProducts);
  
    // Calculate initial price bounds based on currentBaseProducts
    if (currentBaseProducts.length > 0) {
      const prices = currentBaseProducts
        .map((p) => parseFloat(p.variants?.[0]?.price as any))
        .filter((price): price is number => !isNaN(price));
  
      if (prices.length > 0) {
        // Only set min/maxPrice if they haven't been manually set by a filter yet.
        // This is crucial to avoid overwriting user's price selection on subsequent renders.
        // A simple way is to check if maxPrice is still at its initial Infinity value
        // or if filterResetKey implies a fresh start.
        // For simplicity, let's ensure it's only set initially, not on every re-run
        // if it's already been set.
        if (maxPrice === Infinity) { // Only set these if they are still at their initial values
            setMinPrice(0);
            setMaxPrice(Math.max(...prices));
        }
      } else {
        setMinPrice(0);
        setMaxPrice(0);
      }
    } else {
      setMinPrice(0);
      setMaxPrice(0);
    }
  
    // No filter resets here.
  }, [productsApi, fetchProducts, pageHeading, maxPrice]); // Dependencies

  // --- useMemo: Calculate price bounds for the PriceFilter component (based on baseProducts) ---
  const priceBounds = useMemo(() => {
    if (!baseProducts || baseProducts.length === 0) {
      return { min: 0, max: 0 };
    }
    const prices = baseProducts
      .map((p) => parseFloat(p.variants?.[0]?.price as any)) // Parse price to number here
      .filter((price): price is number => !isNaN(price));
    const bounds = {
      min: 0, // Always show 0 as the lowest possible price in UI slider
      max: prices.length > 0 ? Math.max(...prices) : 0, // Ensure max is 0 if no prices
    };
    return bounds;
  }, [baseProducts]); // Depends only on baseProducts

  // --- Callbacks for Filter Components ---
  const handleClearFilters = useCallback(() => {
    setSelectedSizes([]);
    setStockStatus("all");
    setSortBy("featured");

    // Reset price to the actual bounds derived from current base products
    const bounds = priceBounds;
    setMinPrice(bounds.min);
    setMaxPrice(bounds.max);

    setFilterResetKey((prevKey) => prevKey + 1); // Force remount of filter components
  }, [priceBounds]);

  const handleSizeChange = useCallback((sizes: string[]) => {
    setSelectedSizes(sizes);
  }, []);

  const handlePriceRangeChange = useCallback((min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  }, []);

  const handleStockStatusChange = useCallback((status: StockStatus) => {
    setStockStatus(status);
  }, []);

  const handleSortByChange = useCallback((value: string) => {
    setSortBy(value);
  }, []);

  // --- EFFECT 2: Central Effect for Filtering and Sorting ---
  useEffect(() => {
    // If baseProducts is still null, it means data hasn't loaded yet.
    // In this case, we don't want to show "No products found", but rather a loading state.
    if (baseProducts === null) {
      setFilteredAndSortedProducts(null); // Keep it null to indicate loading/no data yet
      return;
    }
  
    let currentProcessedProducts: Product[] = [...baseProducts];
  
    // --- APPLY FILTERS ---
    // ... (Your existing filter logic) ...
  
    // 1. Apply size filter
    if (selectedSizes.length > 0) {
      currentProcessedProducts = currentProcessedProducts.filter(
        (p) =>
          Array.isArray(p.variants) &&
          selectedSizes.some((size) =>
            p.variants?.some((variant) => variant.size?.includes(size))
          )
      );
    }
  
    // 2. Apply price filter
    const effectiveMaxPrice = maxPrice === Infinity ? Number.MAX_SAFE_INTEGER : maxPrice;
    currentProcessedProducts = currentProcessedProducts.filter((p) => {
      if (!p.variants || p.variants.length === 0) {
        return false;
      }
      const price = parseFloat(p.variants?.[0]?.price as any ?? "0");
      if (isNaN(price)) {
        return false;
      }
      const isWithinRange = price >= minPrice && price <= effectiveMaxPrice;
      return isWithinRange;
    });
  
    // 3. Apply stock filter
    if (stockStatus !== "all") {
      currentProcessedProducts = currentProcessedProducts.filter((p) => {
        const stock = p.variants?.[0]?.stock;
        if (typeof stock !== "number") {
          return false;
        }
        return stockStatus === "inStock" ? stock > 0 : stock <= 0;
      });
    }
  
    // --- APPLY SORTING ---
    currentProcessedProducts.sort((a, b) => {
      const priceA = parseFloat(a.variants?.[0]?.price as any) ?? 0;
      const priceB = parseFloat(b.variants?.[0]?.price as any) ?? 0;
      const nameA = a.name?.toLowerCase() ?? "";
      const nameB = b.name?.toLowerCase() ?? "";
      const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
      const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
  
      switch (sortBy) {
        case "name-a-z":
          return nameA.localeCompare(nameB);
        case "name-z-a":
          return nameB.localeCompare(nameA);
        case "price-h-l":
          return priceB - priceA;
        case "price-l-h":
          return priceA - priceB;
        case "date-o-n":
          return dateA - dateB;
        case "date-n-o":
          return dateB - dateA;
        case "featured":
        default:
          return 0;
      }
    });
  
    setFilteredAndSortedProducts(currentProcessedProducts);
  }, [baseProducts, selectedSizes, minPrice, maxPrice, stockStatus, sortBy]);

  return (
    <main className="flex-1 pt-8 container-x-padding space-y-5">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadCrumbLinkCustom href="/">Home</BreadCrumbLinkCustom>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {pageHeadings[pageHeading as keyof typeof pageHeadings]}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h1 className="text-center text-5xl font-secondary">
        {pageHeadings[pageHeading as keyof typeof pageHeadings]}
      </h1>

      {/* Main section */}
      <section className="flex gap-5">
        {/* filter section */}
        <aside className="w-80 sticky top-[140px] h-[calc(100vh-140px)] overflow-y-auto hidden md:block">
          <div className="flex justify-between items-center">
            <p className="text-lg font-semibold">Filter:</p>
            <Button
              variant={"link"}
              size={"sm"}
              onClick={handleClearFilters}
              className="cursor-pointer"
            >
              Clear All
            </Button>
          </div>
          <Accordion type="multiple">
            <AccordionItem value="item-1">
              <AccordionTrigger>Size</AccordionTrigger>
              <AccordionContent>
                <SizeFilter
                  key={`size-${filterResetKey}`}
                  onSizeChange={handleSizeChange}
                  currentSelectedSizes={selectedSizes} // Pass current state
                />
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Price</AccordionTrigger>
              <AccordionContent>
                {/* Ensure baseProducts is ready before rendering PriceFilter */}
                {baseProducts && (
                  <PriceFilter
                    key={`price-${filterResetKey}`}
                    minPriceBound={priceBounds.min}
                    maxPriceBound={priceBounds.max}
                    currentMinPrice={minPrice} // Pass current state values
                    currentMaxPrice={maxPrice} // Pass current state values
                    onPriceRangeChange={handlePriceRangeChange}
                  />
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Availability</AccordionTrigger>
              <AccordionContent>
                {/* Ensure baseProducts is ready before rendering StockFilter */}
                {baseProducts && (
                  <StockFilter
                    key={`stock-${filterResetKey}`}
                    originalProducts={baseProducts}
                    onStockStatusChange={handleStockStatusChange}
                    currentStockStatus={stockStatus} // Pass current state value
                  />
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </aside>

        {/* Products display section */}
        <aside className="w-full">
          <header className="flex items-center pb-5 justify-between md:justify-end">
            <Sheet
              open={isSheetOpen}
              onOpenChange={(open) => setIsSheetOpen(open)}
            >
              <SheetTrigger asChild>
                <Button
                  variant={"outline"}
                  className="font-bold cursor-pointer md:hidden"
                >
                  <ListFilterPlusIcon />
                  Filter
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-5">
                <SheetHeader className="hidden">
                  <SheetTitle>Filter</SheetTitle>
                  <SheetDescription>Filter for products.</SheetDescription>
                </SheetHeader>

                <h1 className="font-semibold text-lg">Filter</h1>
                <Accordion type="multiple">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Size</AccordionTrigger>
                    <AccordionContent>
                      <SizeFilter
                        key={`size-${filterResetKey}`}
                        onSizeChange={handleSizeChange}
                        currentSelectedSizes={selectedSizes}
                      />
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>Price</AccordionTrigger>
                    <AccordionContent>
                      {baseProducts && (
                        <PriceFilter
                          key={`price-${filterResetKey}`}
                          minPriceBound={priceBounds.min}
                          maxPriceBound={priceBounds.max}
                          currentMinPrice={minPrice}
                          currentMaxPrice={maxPrice}
                          onPriceRangeChange={handlePriceRangeChange}
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Availability</AccordionTrigger>
                    <AccordionContent>
                      {baseProducts && (
                        <StockFilter
                          key={`stock-${filterResetKey}`}
                          originalProducts={baseProducts}
                          onStockStatusChange={handleStockStatusChange}
                          currentStockStatus={stockStatus}
                        />
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <SheetFooter>
                  <Button
                    variant={"default"}
                    size={"sm"}
                    className="cursor-pointer"
                    onClick={() => {
                      handleClearFilters();
                      setIsSheetOpen(false);
                    }}
                  >
                    Clear All
                  </Button>
                </SheetFooter>
              </SheetContent>
            </Sheet>

            <div className="flex gap-3 items-center">
              <div className="flex gap-3 items-center">
                <span className="text-sm font-semibold">Sort By :</span>
                <Select
                  value={sortBy}
                  onValueChange={handleSortByChange}
                >
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
              <span className="text-muted-foreground">|</span>
              <p className="text-sm font-semibold">
                {filteredAndSortedProducts
                  ? filteredAndSortedProducts.length
                  : 0}{" "}
                Products
              </p>
            </div>
          </header>

          {/* Products grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center gap-y-6 gap-x-3">
            {filteredAndSortedProducts ? (
              filteredAndSortedProducts.length > 0 ? (
                filteredAndSortedProducts.map(
                  ({
                    id,
                    name,
                    variants,
                    description,
                    category,
                    related_products,
                    thumbnail_image_url,
                    images_url,
                  }: Product) => {
                    const firstVariant = variants?.[0];

                    // Parse price and sale_price to numbers before passing them
                    const parsedPrice = parseFloat(firstVariant?.price as any);
                    const parsedSalePrice =
                      firstVariant?.sale_price !== null &&
                      firstVariant?.sale_price !== undefined
                        ? parseFloat(firstVariant.sale_price as any)
                        : undefined;

                    const priceForCard = !isNaN(parsedPrice) ? parsedPrice : 0;

                    const salePriceForCard =
                      typeof parsedSalePrice === "number" &&
                      !isNaN(parsedSalePrice) &&
                      parsedSalePrice > 0
                        ? parsedSalePrice
                        : undefined;
                    return (
                      <ProductCard
                        key={id}
                        className="w-full"
                        id={id}
                        name={name}
                        price={priceForCard}
                        sale_price={salePriceForCard}
                        stock={firstVariant?.stock ?? 0}
                        size={firstVariant?.size || ""}
                        thumbnailImage={thumbnail_image_url}
                        otherImages={images_url}
                        description={description}
                        category={category?.name || "Uncategorized"}
                        related_products={related_products}
                      />
                    );
                  }
                )
              ) : (
                <div className="col-span-full text-center py-10">
                  <p className="text-xl font-semibold text-gray-700">
                    No products found matching your filters.
                  </p>
                  <Button variant="link" onClick={handleClearFilters}>
                    Clear all filters
                  </Button>
                </div>
              )
            ) : (
              // Loading state (skeleton)
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="border-2 h-44 lg:h-60 2xl:h-96 animate-pulse bg-gray-100 w-full m-8"
                />
              ))
            )}
          </div>
        </aside>
      </section>
    </main>
  );
};

export default ProductsDisplayPage;