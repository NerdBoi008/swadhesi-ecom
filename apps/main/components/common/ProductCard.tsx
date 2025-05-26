import { Product, ProductSizes } from '@/types'
import Image from 'next/image'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, MinusIcon, PlusIcon, ShoppingBasketIcon, } from 'lucide-react';
import CustomButton from './CustomButton';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useRouter } from 'next/navigation';
import { buildUrl, cn } from '@/lib/utils';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useCartStore from '@/lib/store/cartStore';
import { Button } from '../ui/button';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    type CarouselApi,
} from "@/components/ui/carousel";
import Link from 'next/link';
  

interface ProductCardProps extends Product, Omit<React.ComponentPropsWithoutRef<'div'>, 'id'> {

}

const ProductCard = ({
  id,
  name,
  price,
  description,
  sizes,
  stock,
  className,
  discount,
  otherImages,
  thumbnailImage,
  recommendedProducts,
  category,
  ...divProps
}: ProductCardProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState<ProductSizes>(sizes[0] as ProductSizes);
  const [quantity, setQuantity] = useState<number>(1);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  
  const [carouselApi, setCarouselApi] = useState<CarouselApi>()
  const addToCart = useCartStore(state => state.addToCart);

  const onSelect = useCallback((emblaApi: CarouselApi) => {
    setPrevBtnDisabled(!emblaApi?.canScrollPrev());
    setNextBtnDisabled(!emblaApi?.canScrollNext());
    setCurrent((carouselApi?.selectedScrollSnap() ?? 0) + 1);
  }, [carouselApi])

  useEffect(() => {
    if (!carouselApi) return;
  
    onSelect(carouselApi);
    carouselApi
      .on('reInit', onSelect)
      .on('select', onSelect)
      
    setCount(carouselApi.scrollSnapList().length);
      
    setCurrent(carouselApi.selectedScrollSnap() + 1);
        
  }, [carouselApi, onSelect])

  const discountedPrice = useMemo(() => {
    return price * (1 - (discount || 0));
  }, [price, discount]);
  
  const handleCardNavigation = () => {
    if (!isDialogOpen) {
      router.push(buildUrl(`products/${category}/product-details`, { productId: id }));
    }
  };

  const handleQuickShopClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  const images: string[] = useMemo(() => {
    return [thumbnailImage, ...otherImages]
  }, [otherImages, thumbnailImage]);
  
  return (
    <div
      className={`group ${className} flex flex-col w-full flex-1 max-w-96 cursor-pointer justify-start items-center relative`}
      {...divProps}
      onClick={handleCardNavigation}
    >
      {(discount > 0) && (
        <div className='bg-green-700 text-white text-sm py-[1px] px-2 absolute top-0 left-0 z-20 font-secondary uppercase tracking-wide rounded-br-xl'>
          <span>{(discount * 100).toFixed(0)}% off</span>
        </div>
      )}
        
      <div className='overflow-hidden relative w-full'>
        <Image
          // src={thumbnailImage || '/cdn-imgs/hero_img_5.jpg'}
          src={'/cdn-imgs/hero_img_5.jpg'}
          alt={name}
          height={600}
          width={400}
          className='object-cover w-full transition-transform duration-300 group-hover:scale-105'
        />

        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CustomButton
                    className='absolute invisible group-hover:visible bottom-0 right-0 m-4 flex items-center justify-center gap-2'
                    aria-label="Quick shop"
                    onClick={handleQuickShopClick}
                  >
                    <ShoppingBasketIcon className="size-4.5" />
                  </CustomButton>
                </TooltipTrigger>
                <TooltipContent side='left'>
                  <p>Quick shop</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </AlertDialogTrigger>
                    
          <AlertDialogContent className='min-w-[60%]'>
            <AlertDialogHeader>
              <AlertDialogTitle>Quick Shop Your Product</AlertDialogTitle>
              <AlertDialogDescription className='hidden'>
                This dialog let&apos;s you quick shop
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className='flex gap-5 items-start'>
              <div className='flex-1'>
                <Carousel setApi={setCarouselApi}>
                  <CarouselContent>
                    {images.map((src, index) => (
                      <CarouselItem key={index} className=''>
                        <Image
                          // src={thumbnailImage || '/cdn-imgs/hero_img_5.jpg'}
                          src={'/cdn-imgs/hero_img_5.jpg'}
                          alt={name}
                          height={600}
                          width={400}
                          className='min-h-96 w-full object-cover aspect-auto'
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className='mt-4 flex justify-between'>
                  <div>
                    <p className='tracking-wide font-secondary text-muted-foreground select-none'>Image {current} of {count}</p>
                  </div>
                  <div>
                    <Button
                      variant={'outline'}
                      onClick={() => {
                        if (!carouselApi) return;
                        carouselApi.scrollPrev();
                      }}
                      disabled={prevBtnDisabled}
                      className='rounded-full'
                    >
                      <ArrowLeftIcon />
                    </Button>
                    <Button
                      variant={'outline'}
                      onClick={() => {
                        if (!carouselApi) return;
                        carouselApi.scrollNext();
                      }}
                      disabled={nextBtnDisabled}
                      className='rounded-full'
                    >
                      <ArrowRightIcon />
                    </Button>
                  </div>
                </div>
              </div>

              <div className='flex-1 h-full flex flex-col justify-between'>
                <div>
                  <h1 className='font-secondary tracking-wider text-5xl font-bold'>{name}</h1>
                  <p className='text-muted-foreground'>{description}</p>

                                    
                  {discount ? (
                    <div className='mt-3'>
                      <p className='font-secondary text-4xl font-bold'>₹{discountedPrice.toFixed(2)}</p>
                      <p className='line-through text-muted-foreground'>₹{price.toFixed(2)}</p>
                      <p className='text-green-600'>{(discount * 100).toFixed(0)}% off</p>
                    </div>
                  ) : (
                    <p className='font-secondary text-3xl font-bold mt-3'>₹{price.toFixed(2)}</p>
                  )}

                  <p className='text-muted-foreground mt-5'>Size: <span className='font-bold text-black'>{selectedSize}</span></p>
                  <div className="flex gap-2 flex-wrap mt-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={cn(
                          'px-4 py-1 border rounded-md font-semibold transition-colors',
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

                  <div className='flex gap-3 items-center mt-5'>
                    <p className='text-muted-foreground'>Quantity:</p>
                    <div className='inline-flex gap-3 items-center border-[1.5px] p-1 px-2 rounded-md'>
                      <Button
                        className='size-5 cursor-pointer text-muted-foreground hover:text-foreground disabled:cursor-not-allowed'
                        aria-label="Decrease quantity"
                        variant={'link'}
                        disabled={quantity <= 1}
                        onClick={() => {
                          setQuantity(quantity - 1);
                        }}
                      >
                        <MinusIcon />
                      </Button>
                      <p className="w-6 text-center font-medium">{quantity}</p>
                      <Button
                        className='size-5 cursor-pointer text-muted-foreground hover:text-foreground'
                        aria-label="Increase quantity"
                        variant={'link'}
                        onClick={() => {
                          setQuantity(quantity + 1);
                        }}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </div>

                  {/* Stock warning component */}
                  <div className='mt-5'>
                    {/* Check if stock is 0 */}
                    {stock === 0 ? (
                      <p className="text-red-600 font-bold">
                        🚫 Out of stock!
                      </p>
                    ) : (
                      stock < 10 && (
                        <div className="space-y-1">
                          {stock < 5 ? (
                            <p className="text-red-600 animate-pulse">
                              ⚠️ Almost gone! Only <span className="font-bold">{stock}</span> left - don&apos;t miss out!
                            </p>
                          ) : (
                            <p className="text-amber-600">
                              🔥 Selling fast! Just <span className="font-bold">{stock}</span> remaining - shop now
                            </p>
                          )}

                          {stock < 3 && (
                            <div className="w-full bg-red-50 p-2 rounded-md">
                              <p className="text-red-800 text-sm font-medium">
                                This item typically sells out within hours when stock gets this low
                              </p>
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  <div className='mt-5'>
                    <Link
                      href={buildUrl(`products/${category}/product-details`, { productId: id })}
                      className='text-muted-foreground text-sm hover:text-primary hover:underline mt-5'
                    >
                      View details
                    </Link>
                  </div>
                </div>

                <div className='flex gap-3 justify-end'>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      addToCart({
                        id: id,
                        quantity: quantity,
                        size: selectedSize,
                        price: price,
                        name: name,
                        thumbnailImage: thumbnailImage,
                        stock: stock,
                        discount: discount,
                      });
                    }}
                  >
                    Add to Cart
                  </AlertDialogAction>
                </div>
              </div>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      </div>
          
      <div className="flex flex-col justify-center items-center font-semibold text-xs sm:text-sm md:text-base mt-2">
        <h3 className="text-wrap text-center">{name}</h3>
        <div className="flex items-center sm:gap-2 flex-col sm:flex-row">
          {discount ? (
            <>
              <span className="text-xs line-through text-gray-500">{price.toFixed(2)}</span>
              <span className="">₹ {discountedPrice.toFixed(2)}</span>
              {/* <span className="text-green-700 font-bold">{(discount * 100).toFixed(0)}% off</span> */}
            </>
          ) : (
            <span>₹{price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard;