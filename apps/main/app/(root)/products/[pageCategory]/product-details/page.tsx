'use client'

import useDataStore from '@/lib/store/dataStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useMemo, useState } from 'react'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import BreadCrumbLinkCustom from '@/components/common/BreadCrumbLinkCustom';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { BadgeIndianRupeeIcon, ChevronLeftIcon, ChevronRightIcon, PlusIcon, ShareIcon, ShoppingCartIcon, SunIcon, WashingMachineIcon } from 'lucide-react';
import CustomButton from '@/components/common/CustomButton';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqQuestions } from '@/lib/constant';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { CleaningIcon } from '@/public/icons/cleaning-icon';
import { IronIcon } from '@/public/icons/iron-icon';
import useCartStore from '@/lib/store/cartStore';
import { ProductSizes } from '@/types';

const ProductDetailsPage = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname().split('/')[2];
  const { products: productsApi, fetchProducts } = useDataStore();
  const addToCart  = useCartStore(state => state.addToCart);
  const router = useRouter();
  
  // Get productId or search query from URL
  const productId = useMemo(() => 
    searchParams.get('productId') || searchParams.get('search'),
    [searchParams]
  );

  // --- Effect to fetch base data ---
  useEffect(() => {
    if (!productsApi && fetchProducts) {
      fetchProducts();
    }
  }, [productsApi, fetchProducts]);

  // Find the current product
  const product = useMemo(() => 
    productsApi?.find(p => p.id === productId),
    [productsApi, productId]
  );

  // Calculate discounted price once
  const discountedPrice = useMemo(() => 
    (product?.price ?? 0) * (1 - (product?.discount || 0)),
    [product]
  );

  // --- Product state ---
  const [selectedSize, setSelectedSize] = useState<ProductSizes | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (product?.sizes?.length && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedSize]);

  const images = useMemo(() => 
    product ? [product.thumbnailImage, ...product.otherImages] : [],
    [product]
  );

  const handleNextImg = () => {
    setCurrentImageIndex(prev => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePreviousImg = () => {
    setCurrentImageIndex(prev => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  if (!product) {
    return (
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
          </div>
        </div>
      </main>
    );
  }

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
              {pathname?.charAt(0).toUpperCase() + pathname?.slice(1)}
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
            <div className='flex-1 relative h-[500px] lg:h-[700px]'>
              <Image
                src={'/cdn-imgs/not-available.png'}
                // src={images[currentImageIndex] || '/cdn-imgs/not-available.png'}
                alt={`Product image ${currentImageIndex + 1}`}
                fill
                className='object-cover'
                priority
              />
            </div>
            <div className='flex flex-col justify-between'>
              <Button variant='outline' className='cursor-pointer'>
                <ShareIcon size={20} />
              </Button>
              <div className='flex flex-col gap-3'>
                <Button
                  variant='outline'
                  className='cursor-pointer'
                  onClick={handleNextImg}
                  disabled={images.length <= 1}
                >
                  <ChevronRightIcon size={20} />
                </Button>
                <Button
                  variant='outline'
                  className='cursor-pointer'
                  onClick={handlePreviousImg}
                  disabled={images.length <= 1}
                >
                  <ChevronLeftIcon size={20} />
                </Button>
              </div>
            </div>
          </div>

          {images.length > 1 && (
            <div className='flex gap-3 mt-3'>
              {images.map((imgSrc, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    'border-2  overflow-hidden rounded-md p-1',
                    index === currentImageIndex ? 'border-primary' : 'border-transparent'
                  )}
                >
                  <Image
                    // src={imgSrc || '/cdn-imgs/not-available.png'}
                    src={'/cdn-imgs/not-available.png'}
                    alt={`Thumbnail ${index + 1}`}
                    width={100}
                    height={150}
                    className='object-cover h-[150px] rounded-md'
                  />
                </button>
              ))}
            </div>
          )}
        </aside>
        
        {/* Products details */}
        <aside className='w-full lg:w-1/2 space-y-3 flex-1'>
          <p className='font-semibold text-muted-foreground'>
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </p>
          <h1 className='font-semibold font-secondary tracking-wide text-5xl'>
            {product.name}
          </h1>
          
          <div>
            {product.discount ? (
              <div className="flex gap-4 items-center font-secondary tracking-wide">
                <span className="line-through text-gray-500">₹{product.price.toFixed(2)}</span>
                <span className="font-semibold text-3xl">₹{discountedPrice.toFixed(2)}</span>
                <span className="text-green-700 font-bold">
                  {(product.discount * 100).toFixed(0)}% off
                </span>
              </div>
            ) : (
              <span className="font-semibold text-3xl font-secondary tracking-wide">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>
          
          <Separator />
          
          <div>
            <p className='font-bold'>Description:</p>
            <p className='mt-1 text-muted-foreground'>{product.description}</p>
          </div>

          {/* Size selection */}
          <div>
            <div className='flex justify-between'>
              <p className='font-bold'>Size: <span className='font-normal'>{selectedSize}</span></p>
              <Button variant='link' className='cursor-pointer'>
                View Size Chart
              </Button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  className={cn(
                    'px-5 py-2 border rounded-md font-semibold transition-colors',
                    size === selectedSize 
                      ? 'border-2 border-primary font-extrabold bg-primary/10' 
                      : 'hover:bg-muted'
                  )}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Stock warning message */}
          <div className='mt-5'>
            {product.stock < 10 && (
              <div className="space-y-1">
                {product.stock < 5 ? (
                  <p className="text-red-600 animate-pulse">
                    ⚠️ Almost gone! Only <span className="font-bold">{product.stock}</span> left - don&apos;t miss out!
                  </p>
                ) : (
                  <p className="text-amber-600">
                    🔥 Selling fast! Just <span className="font-bold">{product.stock}</span> remaining - shop now
                  </p>
                )}
                
                {product.stock < 3 && (
                  <div className="w-full bg-red-50 p-2 rounded-md">
                    <p className="text-red-800 text-sm font-medium">
                      This item typically sells out within hours when stock gets this low
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Buy/Checkout buttons */}
          <div className='flex gap-4 mt-5'>
            <CustomButton
              className='flex-1 cursor-pointer flex gap-3 items-center justify-center group'
              disabled={!selectedSize}
              onClick={() => {
                addToCart({
                  id: product.id,
                  quantity: 1,
                  size: selectedSize!,
                  price: product.price,
                  name: product.name,
                  thumbnailImage: product.thumbnailImage,
                  stock: product.stock,
                  discount: product.discount
                });
              }}
            >
              Add To Cart
              <ShoppingCartIcon className='size-5 hidden group-hover:block'/>
            </CustomButton>

            <Button
              variant='outline'
              className='flex-1 cursor-pointer'
              disabled={!selectedSize}
              onClick={() => {
                router.push('/checkout');
              }}
            >
              Checkout Now
            </Button>
          </div>

          {/* Related Products */}
          <div className='mt-10'>
            <p className='mb-3 font-bold '>Related Products</p>
            <Carousel
              opts={{
                align: "start",
                // loop: true, // Optional: uncomment if you want infinite looping
              }}
              className=""
            >
              <CarouselContent className="-ml-1"> {/* Negative margin helps align items */}
                {product?.recommendedProducts.map((prodId) => {
                  const prod = productsApi?.find(p => p.id === prodId);
                  if (!prod) return null; // Handle case where product is not found

                  const discountedPrice = (prod.price ?? 0) * (1 - (prod.discount || 0));

                  return (
                    <CarouselItem key={prodId} className="">
                      <div className="p-1 h-full">
                        <Card className="h-full flex border border-primary rounded-md p-0"> 
                          <CardContent className="p-2 flex flex-col md:flex-row gap-3 items-center justify-between flex-grow">
                            <div className='flex gap-4'>
                              <div className='relative size-15'> 
                                <Image
                                  src={'/cdn-imgs/not-available.png'}
                                  // src={prod?.thumbnailImage ?? '/cdn-imgs/not-available.png'}
                                  alt={prod?.name ?? 'Related product'}
                                  layout="fill" // Use fill layout
                                  objectFit="contain" // Or "cover", depending on desired look
                                  className='rounded-md' // Optional styling
                                />
                              </div>

                              <div>
                                <p className='font-bold truncate' title={prod?.name}>{prod?.name}</p>
                                {prod?.sizes && prod.sizes.length > 0 && (
                                  <p className='text-sm text-muted-foreground truncate'>{prod?.sizes.join(' | ')}</p>
                                )}
                                {prod?.discount ? (
                                  <p className='font-semibold'>
                                    ₹ {discountedPrice.toFixed(2)} {' '}
                                    <span className='font-normal text-sm text-muted-foreground line-through'>
                                      ₹ {prod?.price.toFixed(2)}
                                    </span>
                                  </p>
                                ) : (
                                  <p className='font-semibold'>₹ {prod?.price.toFixed(2)}</p>
                                )}
                              </div>
                            </div>

                            <Button
                              className='cursor-pointer'
                              onClick={() => {
                                addToCart({
                                  id: prod.id,
                                  quantity: 1,
                                  size: prod.sizes[0],
                                  price: prod.price,
                                  name: prod.name,
                                  thumbnailImage: prod.thumbnailImage,
                                  stock: prod.stock,
                                  discount: prod.discount
                                });
                              }}
                            >
                              <PlusIcon className="mr-2 h-4 w-4" />
                              Add
                            </Button>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 hidden sm:inline-flex" /> {/* Position outside content, hide on small screens */}
              <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 hidden sm:inline-flex" /> {/* Position outside content, hide on small screens */}
            </Carousel>
          </div>

          {/* T&C sections */}
          <div className='space-y-5 mt-7'>
            <Separator />
            {/* Offer coupe */}
            <div className='flex gap-5 items-center from-green-100 to-yellow-100 bg-linear-to-br p-5'>
              <div className='size-10'>
                <BadgeIndianRupeeIcon className='size-full'/>
              </div>
              <div className='w-full'>
                <p className='font-bold text-xl tracking-wide font-secondary'>Rewards</p>
                <p>Want first dibs on sales and secret offers? Subscribe now for 10% off and join our inner circle of trendsetters!</p>
              </div>
            </div>
          </div>
        </aside>
      </section>

      {/* Product Care section */}
      <div className={`border rounded-lg p-4`}>
        <h3 className="font-bold text-lg mb-3">Care Instructions</h3>
        <ul className='space-y-3'>
          <li className="flex items-start gap-3">
            <WashingMachineIcon/>
            <span className="text-sm">Hand Wash Cold</span>
          </li>
          <li className="flex items-start gap-3">
            <SunIcon/>
            <span className="text-sm">Hang to Dry</span>
          </li>
          <li className="flex items-start gap-3">
            <CleaningIcon/>
            <span className="text-sm">Do Not Bleach</span>
          </li>
          <li className="flex items-start gap-3">
            <IronIcon/>
            <span className="text-sm">Do Not Iron</span>
          </li>
          
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          Following these instructions will help maintain the quality and comfort of your product longer.
        </p>
      </div>

      {/* FAQ section */}
      <section className='container-x-padding flex flex-col justify-center items-center'>
        <h1 className='text-4xl mt-6 font-secondary'>FAQs</h1>
        <p className='text-sm mt-2 text-muted-foreground'>Below are some of the common questions</p>
        <div className='w-full sm:w-sm md:w-md lg:w-lg xl:w-xl 2xl:w-2xl'>
          <Accordion type="single" collapsible className=''>
            {faqQuestions.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} >
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
      
    </main>
  );
};

export default ProductDetailsPage;