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

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
    id: string;
    name: string;
    price: number; // Original price
    description: string;
    size: string;
    stock: number;
    sale_price?: number; // Now truly optional (undefined if no sale)
    otherImages: string[];
    thumbnailImage: string;
    related_products?: string[];
    category: string;
}

const ProductCard = ({
    id,
    name,
    price,
    description,
    size,
    stock,
    className,
    sale_price, // Will be `number` or `undefined`
    otherImages,
    thumbnailImage,
    related_products,
    category,
    ...divProps
}: ProductCardProps) => {
    const router = useRouter();
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const addToCart = useCartStore(state => state.addToCart);

    const onSelect = useCallback((emblaApi: CarouselApi) => {
        setPrevBtnDisabled(!emblaApi?.canScrollPrev());
        setNextBtnDisabled(!emblaApi?.canScrollNext());
        setCurrent((carouselApi?.selectedScrollSnap() ?? 0) + 1);
    }, [carouselApi]);

    useEffect(() => {
        if (!carouselApi) return;

        onSelect(carouselApi);
        carouselApi
            .on('reInit', onSelect)
            .on('select', onSelect);

        setCount(carouselApi.scrollSnapList().length);
        setCurrent(carouselApi.selectedScrollSnap() + 1);
        setSelectedSize(size)
    }, [carouselApi, onSelect, size]);

    // Calculate discounted price and discount percentage
    const isDiscounted = useMemo(() => {
        // A product is discounted if sale_price is a number, greater than 0,
        // and strictly less than the original price.
        // We now expect sale_price to be `undefined` if there's no sale.
        return typeof sale_price === 'number' && sale_price > 0 && sale_price < price;
    }, [price, sale_price]);

    const displayPrice = useMemo(() => {
        return isDiscounted ? sale_price : price;
    }, [isDiscounted, price, sale_price]);

    const calculatedDiscountPercentage = useMemo(() => {
        if (!isDiscounted) return 0;
        // Ensure calculations use numbers to prevent errors, though they should be numbers now
        const originalPriceNum = price;
        const salePriceNum = sale_price as number; // Type assertion as it's guaranteed to be a number if isDiscounted is true

        if (originalPriceNum > 0) {
            return ((originalPriceNum - salePriceNum) / originalPriceNum) * 100;
        }
        return 0;
    }, [isDiscounted, price, sale_price]);

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
            {/* Discount Badge */}
            {isDiscounted && (
                <div className='bg-green-700 text-white text-sm py-[1px] px-2 absolute top-0 left-0 z-20 font-secondary uppercase tracking-wide rounded-br-xl'>
                    <span>{calculatedDiscountPercentage.toFixed(0)}% off</span>
                </div>
            )}

            <div className='overflow-hidden relative w-full'>
                <Image
                    src={thumbnailImage || '/cdn-imgs/hero_img_5.jpg'}
                    alt={name}
                    height={600}
                    width={400}
                    className='object-cover w-full h-[450px] rounded-sm transition-transform duration-300 group-hover:scale-105'
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
                                                        src={src || '/cdn-imgs/hero_img_5.jpg'}
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

                                        {/* Price Display Logic */}
                                        {isDiscounted ? (
                                            <div className='mt-3'>
                                                <p className='font-secondary text-4xl font-bold'>₹{displayPrice?.toFixed(2)}</p>
                                                <p className='line-through text-muted-foreground'>₹{price.toFixed(2)}</p> {/* Show original price struck out */}
                                                <p className='text-green-600'>{calculatedDiscountPercentage.toFixed(0)}% off</p>
                                            </div>
                                        ) : (
                                            <p className='font-secondary text-3xl font-bold mt-3'>₹{price}</p>
                                        )}

                                        <p className='text-muted-foreground mt-5'>Size: <span className='font-bold text-black'>{size}</span></p>

                                        <div className='flex gap-3 items-center mt-5'>
                                            <p className='text-muted-foreground'>Quantity:</p>
                                            <div className='inline-flex gap-3 items-center border-[1.5px] p-1 px-2 rounded-md'>
                                                <Button
                                                    className='size-5 cursor-pointer text-muted-foreground hover:text-foreground disabled:cursor-not-allowed'
                                                    aria-label="Decrease quantity"
                                                    variant={'link'}
                                                    disabled={quantity <= 1}
                                                    onClick={() => {
                                                        setQuantity(prev => Math.max(1, prev - 1));
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
                                                        setQuantity(prev => prev + 1);
                                                    }}
                                                >
                                                    <PlusIcon />
                                                </Button>
                                            </div>
                                        </div>

                                        {/* Stock warning component */}
                                        <div className='mt-5'>
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
                                                    sale_price: sale_price ?? 0, // Ensure sale_price is always a number
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
                        {isDiscounted ? (
                            <>
                                <span className="text-xs line-through text-gray-500">₹{price}</span>
                                <span className="">₹{sale_price?.toFixed(2)}</span>
                            </>
                        ) : (
                            <span>₹{price}</span>
                        )}
                    </div>
                </div>
            </div>
        );
    };

export default ProductCard;