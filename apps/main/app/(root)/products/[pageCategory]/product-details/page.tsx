'use client'

import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BadgeIndianRupeeIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon, ShareIcon, ShoppingCartIcon, SunIcon, WashingMachineIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import useDataStore from '@/lib/store/dataStore';
import useCartStore from '@/lib/store/cartStore';
import BreadCrumbLinkCustom from '@/components/common/BreadCrumbLinkCustom';
import CustomButton from '@/components/common/CustomButton';
import { CleaningIcon } from '@/public/icons/cleaning-icon';
import { IronIcon } from '@/public/icons/iron-icon';
import { faqQuestions } from '@/lib/constant';
import { Product, ProductVariant } from '@repo/types';


const ProductDetailsPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname().split('/')[2] || ''; // Ensure pathname is always a string

  const { products: productsApi, fetchProducts } = useDataStore();
  const addToCart = useCartStore(state => state.addToCart);

  // Get productId or search query from URL
  const productId = useMemo(() =>
    searchParams.get('productId') || searchParams.get('search'),
    [searchParams]
  );

  // State for the current product, selected size, image index, and variant
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProductData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Only fetch if productsApi is not already populated
        if (!productsApi || productsApi.length === 0) {
          await fetchProducts();
        }
  
        // Find product only after productsApi is potentially fetched and available
        // Using a local variable for products to ensure we use the latest state after fetch
        const currentProducts = productsApi && productsApi.length > 0 ? productsApi : useDataStore.getState().products;
  
        const foundProduct = currentProducts?.find(p => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        console.error("Failed to fetch product data:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
  
    // Only run this effect when productId changes, or productsApi state potentially changes if it's empty
    // We explicitly check for productsApi.length to avoid unnecessary re-runs if productsApi is already populated
    if (productId) {
      loadProductData();
    }
  
  }, [productId, productsApi, fetchProducts]);

  // Update selected variant when product or selectedSize changes
  useEffect(() => {
    if (product?.variants && selectedSize) {
      setSelectedVariant(product.variants.find(v => v.size === selectedSize) ?? null);
    } else {
      setSelectedVariant(null);
    }
  }, [product, selectedSize]);

  // Set initial selected size to the first available variant's size
  useEffect(() => {
    if (product?.variants && product.variants.length > 0 && !selectedSize) {
      setSelectedSize(product?.variants?.[0]?.size ?? null);
    }
  }, [product, selectedSize]);

  // Memoize the array of product images
  const images = useMemo(() =>
    product ? [product.thumbnail_image_url, ...product.images_url] : [],
    [product]
  );

  // Handlers for image carousel
  const handleNextImg = useCallback(() => {
    setCurrentImageIndex(prev =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  const handlePreviousImg = useCallback(() => {
    setCurrentImageIndex(prev =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, [images.length]);

  // Memoized discount calculation
  const { isDiscounted, calculatedDiscountPercentage } = useMemo(() => {
    const price = Number(selectedVariant?.price);
    const sale_price = Number(selectedVariant?.sale_price); // This can be null
  
    // A product is discounted if sale_price is a a number,
    // and strictly less than the original price.
    const discounted = (sale_price ?? 0) < (price ?? 0);
  
    let discountPercentage = 0;
    if (discounted && price && price > 0) {
      discountPercentage = ((price - sale_price!) / price) * 100; // Use non-null assertion since typeof sale_price is 'number' here
    }
  
    return { isDiscounted: discounted, calculatedDiscountPercentage: Math.round(discountPercentage) };
  }, [selectedVariant]);

  

  // Skeleton Loader Component
  const ProductDetailsSkeleton = () => (
    <main className='container-x-padding space-y-5'>
      <Breadcrumb className='mt-5'>
        <BreadcrumbList>
          <Skeleton className="h-4 w-[200px]" />
        </BreadcrumbList>
      </Breadcrumb>
      <div className='flex gap-10 flex-col lg:flex-row'>
        <div className='w-full lg:w-1/2 space-y-4'>
          <Skeleton className="h-[600px] w-full" />
          <div className='flex gap-3'>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-[150px] w-[100px]" />
            ))}
          </div>
        </div>
        <div className='w-full space-y-3 flex-1'>
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-8 w-[150px]" />
          <Separator />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-10 w-20 rounded-md" />
            ))}
          </div>
          <div className='flex gap-4 mt-5'>
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
          <div className='mt-10'>
            <Skeleton className="h-6 w-40 mb-3" />
            <div className="flex gap-4">
              <Skeleton className="h-20 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (error) {
    return (
      <main className='container-x-padding space-y-5 mt-10 text-center'>
        <h2 className="text-2xl font-bold text-red-600">Error Loading Product</h2>
        <p className="text-muted-foreground">{error}</p>
        <Button onClick={() => router.back()}>Go Back</Button>
      </main>
    );
  }

  // If no product is found after loading, display a "not found" message
  if (!product) {
    return (
      <main className='container-x-padding space-y-5 mt-10 text-center'>
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p className="text-muted-foreground">The product you are looking for does not exist or has been removed.</p>
        <Button onClick={() => router.push('/products')}>Browse Products</Button>
      </main>
    );
  }


  // Helper component for related product card to reduce repetition
  const RelatedProductCard = ({ prod }: { prod: Product }) => {
    const variant = prod.variants?.[0]; // Assuming we show details of the first variant

    return (
      <Card className="h-full flex border border-primary rounded-md p-0">
        <CardContent className="p-2 flex flex-col md:flex-row gap-3 items-center justify-between flex-grow">
          <div className='flex gap-4 items-center'>
            <div className='relative size-15 min-w-[60px] min-h-[60px]'>
              <Image
                src={prod.thumbnail_image_url || '/cdn-imgs/not-available.png'}
                alt={prod.name ?? 'Related product'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
                className='rounded-md object-cover'
              />
            </div>

            <div>
              <p className='font-bold truncate max-w-[150px]' title={prod.name}>{prod.name}</p>
              {prod.variants && prod.variants.length > 0 && (
                <p className='text-sm text-muted-foreground truncate max-w-[150px]'>{prod.variants.map((v) => v.size).join(" | ")}</p>
              )}
              {variant?.sale_price && variant.sale_price < variant.price ? (
                <p className='font-semibold'>
                  ₹ {variant.sale_price.toFixed(2)} {' '}
                  <span className='font-normal text-sm text-muted-foreground line-through'>
                    ₹ {variant.price.toFixed(2)}
                  </span>
                </p>
              ) : (
                <p className='font-semibold'>₹ {variant?.price.toFixed(2)}</p>
              )}
            </div>
          </div>

          <Button
            className='cursor-pointer flex-shrink-0'
            onClick={() => {
              if (variant) {
                addToCart({
                  id: prod.id,
                  quantity: 1,
                  size: variant.size,
                  price: variant.price,
                  name: prod.name,
                  thumbnailImage: prod.thumbnail_image_url || '/cdn-imgs/not-available.png',
                  stock: variant.stock,
                  sale_price: variant.sale_price ?? 0,
                });
              }
            }}
          >
            <PlusIcon className="mr-2 h-4 w-4" />
            Add
          </Button>
        </CardContent>
      </Card>
    );
  };


  return (
    <main className='container-x-padding space-y-5'>
      <Breadcrumb className='mt-5'>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadCrumbLinkCustom href="/">Home</BreadCrumbLinkCustom>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadCrumbLinkCustom href={`/products/${pathname}`}>
              {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
            </BreadCrumbLinkCustom>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Products Information section */}
      <section className='flex gap-10 flex-col lg:flex-row'>
        {/* Product Images */}
        <aside className='w-full lg:w-1/2'>
          <div className='flex gap-2'>
            <div className='flex-1 relative h-[500px] lg:h-[700px] rounded-md overflow-hidden'>
              <Image
                src={images[currentImageIndex] || '/cdn-imgs/not-available.png'}
                alt={`Product image ${currentImageIndex + 1} for ${product.name}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
                className='object-cover transition-transform duration-300 ease-in-out hover:scale-105' // Added hover effect
                priority // Priority for LCP image
              />
            </div>
            <div className='flex flex-col justify-between'>
              <Button variant='outline' className='cursor-pointer p-2 size-10' aria-label="Share product">
                <ShareIcon size={20} />
              </Button>
              <div className='flex flex-col gap-3'>
                <Button
                  variant='outline'
                  className='cursor-pointer p-2 size-10'
                  onClick={handleNextImg}
                  disabled={images.length <= 1}
                  aria-label="Next image"
                >
                  <ChevronRightIcon size={20} />
                </Button>
                <Button
                  variant='outline'
                  className='cursor-pointer p-2 size-10'
                  onClick={handlePreviousImg}
                  disabled={images.length <= 1}
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon size={20} />
                </Button>
              </div>
            </div>
          </div>

          {images.length > 1 && (
            <div className='flex gap-3 mt-3 overflow-x-auto pb-2'> {/* Added overflow-x-auto for small screens */}
              {images.map((imgSrc, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    'border-2 overflow-hidden rounded-md p-1 flex-shrink-0', // flex-shrink-0 to prevent shrinking
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  )}
                  aria-label={`Select image thumbnail ${index + 1}`}
                >
                  <Image
                    src={imgSrc || '/cdn-imgs/not-available.png'}
                    alt={`Thumbnail ${index + 1} for ${product.name}`}
                    width={100}
                    height={150}
                    className='object-cover h-[100px] w-[70px] rounded-sm' // Adjusted thumbnail size for better consistency
                  />
                </button>
              ))}
            </div>
          )}
        </aside>

        {/* Products details */}
        <aside className='w-full lg:w-1/2 space-y-3 flex-1'>
          <p className='font-semibold text-muted-foreground text-sm'>
            {product.category?.name
              ? product.category.name.charAt(0).toUpperCase() + product.category.name.slice(1)
              : 'Unknown Category'}
          </p>
          <h1 className='font-semibold font-secondary tracking-wide text-4xl sm:text-5xl'>
            {product.name}
          </h1>

          {/* Product Price */}
          <div>
            {(product.variants?.length ?? 0) > 0 && selectedVariant ? (
              <div className="flex gap-4 items-center font-secondary tracking-wide">
                {isDiscounted && (
                  <span className="line-through text-gray-500 text-xl sm:text-2xl">₹{selectedVariant.price}</span>
                )}
                <span className="font-semibold text-3xl sm:text-4xl text-primary">₹{selectedVariant.sale_price ? selectedVariant.sale_price : selectedVariant.price?.toFixed(2)}</span>
                {isDiscounted && (
                  <span className="text-green-700 font-bold text-lg sm:text-xl">
                    {calculatedDiscountPercentage}% off
                  </span>
                )}
              </div>
            ) : (
              <span className="font-semibold text-3xl font-secondary tracking-wide">
                ₹{selectedVariant?.price ?? '0.00'}
              </span>
            )}
          </div>

          <Separator />

          <div>
            <p className='font-bold text-lg'>Description:</p>
            <p className='mt-1 text-muted-foreground leading-relaxed'>{product.description}</p>
          </div>

          {/* Size selection */}
          <div>
            <div className='flex justify-between items-center mb-2'>
              <p className='font-bold text-lg'>Size: <span className='font-normal text-base text-muted-foreground'>{selectedSize || 'Select a size'}</span></p>
              <Button variant='link' className='cursor-pointer text-sm p-0 h-auto'>
                View Size Chart
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.variants?.map((v) => (
                <button
                  key={v.size}
                  className={cn(
                    'px-5 py-2 border rounded-md font-semibold transition-colors text-sm',
                    v.size === selectedSize
                      ? 'border-2 border-primary font-extrabold bg-primary/10 text-primary'
                      : 'hover:bg-muted bg-background text-foreground'
                  )}
                  onClick={() => setSelectedSize(v.size)}
                  aria-pressed={v.size === selectedSize}
                >
                  {v.size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock warning message */}
          {selectedVariant?.stock !== undefined && (
            <div className='mt-5'>
              {selectedVariant.stock <= 5 && selectedVariant.stock > 0 && ( // Show warning only if stock is low but not zero
                <div className="space-y-1">
                  {selectedVariant.stock < 3 ? (
                    <p className="text-red-600 animate-pulse font-medium text-base">
                      ⚠️ Almost gone! Only <span className="font-bold">{selectedVariant.stock}</span> left - don&apos;t miss out!
                    </p>
                  ) : (
                    <p className="text-amber-600 font-medium text-base">
                      🔥 Selling fast! Just <span className="font-bold">{selectedVariant.stock}</span> remaining - shop now
                    </p>
                  )}

                  {selectedVariant.stock < 3 && (
                    <div className="w-full bg-red-50 p-2 rounded-md border border-red-200">
                      <p className="text-red-800 text-sm font-medium">
                        This item typically sells out within hours when stock gets this low.
                      </p>
                    </div>
                  )}
                </div>
              )}
              {selectedVariant.stock === 0 && ( // Explicitly handle out of stock
                <p className="text-red-600 font-bold text-lg">
                  🚫 Out of Stock!
                </p>
              )}
            </div>
          )}

          {/* Buy/Checkout buttons */}
          <div className='flex gap-4 mt-5 flex-col sm:flex-row'>
            <CustomButton
              className='flex-1 cursor-pointer flex gap-3 items-center justify-center group py-3 text-lg h-10'
              disabled={!selectedVariant || selectedVariant.stock === 0} // Disable if no variant selected or out of stock
              onClick={() => {
                if (selectedVariant) {
                  addToCart({
                    id: product.id,
                    quantity: 1,
                    size: selectedSize!,
                    price: selectedVariant.price,
                    sale_price: selectedVariant.sale_price ?? 0, // Default to 0 if null or undefined
                    name: product.name,
                    thumbnailImage: product.thumbnail_image_url || '/cdn-imgs/not-available.png',
                    stock: selectedVariant.stock,
                  });
                }
              }}
            >
              Add To Cart
              <ShoppingCartIcon className='size-5 transition-all duration-300 group-hover:translate-x-1'/>
            </CustomButton>

            <Button
              variant='outline'
              className='flex-1 cursor-pointer py-3 text-lg h-10'
              disabled={!selectedVariant || selectedVariant.stock === 0} // Disable if no variant selected or out of stock
              onClick={() => {
                // Add to cart before navigating to checkout if not already in cart
                if (selectedVariant) {
                  addToCart({
                    id: product.id,
                    quantity: 1,
                    size: selectedSize!,
                    price: selectedVariant.price,
                    sale_price: selectedVariant.sale_price ?? 0,
                    name: product.name,
                    thumbnailImage: product.thumbnail_image_url || '/cdn-imgs/not-available.png',
                    stock: selectedVariant.stock,
                  });
                }
                router.push('/checkout');
              }}
            >
              Buy Now
            </Button>
          </div>

          {/* Related Products */}
          {product.related_products && product.related_products.length > 0 && (
            <div className='mt-10'>
              <p className='mb-3 font-bold text-xl'>You Might Also Like</p>
              <Carousel
                opts={{
                  align: "start",
                }}
                className=""
              >
                <CarouselContent className="-ml-1">
                  {product.related_products.map((prodId) => {
                    const prod = productsApi?.find(p => p.id === prodId);
                    if (!prod) return null; // Handle case where related product is not found

                    return (
                      <CarouselItem key={prodId} className="pl-1 basis-full sm:basis-1/2 lg:basis-1/3"> {/* Responsive sizing */}
                        <RelatedProductCard prod={prod} />
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
                <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden sm:inline-flex" />
                <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden sm:inline-flex" />
              </Carousel>
            </div>
          )}


          {/* T&C sections */}
          <div className='space-y-5 mt-7'>
            <Separator />
            {/* Offer coupon */}
            <div className='flex gap-5 items-center bg-gradient-to-br from-green-50 to-yellow-50 p-5 rounded-lg shadow-sm'>
              <div className='size-12 min-w-[48px] flex items-center justify-center text-primary'>
                <BadgeIndianRupeeIcon className='size-full' />
              </div>
              <div className='w-full'>
                <p className='font-bold text-xl tracking-wide font-secondary text-gray-800'>Exclusive Rewards</p>
                <p className='text-sm text-gray-600'>Want first dibs on sales and secret offers? Subscribe now for 10% off and join our inner circle of trendsetters!</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Product Care section */}
      <div className={`border rounded-lg p-6 bg-gray-50 mt-10`}>
        <h3 className="font-bold text-2xl mb-4 text-gray-800">Care Instructions</h3>
        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-4'> {/* Grid for better layout */}
          <li className="flex items-center gap-3">
            <WashingMachineIcon className="text-gray-600 size-6" />
            <span className="text-base text-gray-700">Hand Wash Cold</span>
          </li>
          <li className="flex items-center gap-3">
            <SunIcon className="text-gray-600 size-6" />
            <span className="text-base text-gray-700">Hang to Dry</span>
          </li>
          <li className="flex items-center gap-3">
            <CleaningIcon className="text-gray-600 size-6" />
            <span className="text-base text-gray-700">Do Not Bleach</span>
          </li>
          <li className="flex items-center gap-3">
            <IronIcon className="text-gray-600 size-6" />
            <span className="text-base text-gray-700">Do Not Iron</span>
          </li>
        </ul>
        <p className="mt-6 text-sm text-gray-600 leading-relaxed border-t pt-4 border-gray-200">
          Following these instructions will help maintain the quality and comfort of your product longer, ensuring its longevity and appearance.
        </p>
      </div>

      {/* FAQ section */}
      <section className='container-x-padding flex flex-col justify-center items-center py-10'>
        <h2 className='text-4xl mt-6 font-secondary text-center text-gray-800'>Frequently Asked Questions</h2>
        <p className='text-md mt-2 text-muted-foreground text-center max-w-prose'>Below are some of the common questions our customers frequently ask regarding our products and services.</p>
        <div className='w-full max-w-3xl mt-8'> {/* Max-width for better readability */}
          <Accordion type="single" collapsible className='w-full'>
            {faqQuestions.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className='border-b border-gray-200'>
                <AccordionTrigger className='text-lg font-medium text-gray-700 hover:no-underline hover:text-primary transition-colors'>{item.question}</AccordionTrigger>
                <AccordionContent className='text-base text-gray-600 pb-4 leading-relaxed'>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

    </main>
  );
};

export default ProductDetailsPage;