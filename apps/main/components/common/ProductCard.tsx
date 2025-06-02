import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import CustomButton from "./CustomButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { buildUrl } from "@/lib/utils";
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
import useCartStore from "@/lib/store/cartStore";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Product, ProductVariant } from "@repo/types";

interface ProductCardProps extends React.HTMLAttributes<HTMLDivElement> {
  product: Product;
  selectedVariant: ProductVariant;
}

const ProductCard = ({
  product,
  selectedVariant,
  className,
  ...divProps
}: ProductCardProps) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const addToCart = useCartStore((state) => state.addToCart);

  const onSelect = useCallback(
    (emblaApi: CarouselApi) => {
      setPrevBtnDisabled(!emblaApi?.canScrollPrev());
      setNextBtnDisabled(!emblaApi?.canScrollNext());
      setCurrent((carouselApi?.selectedScrollSnap() ?? 0) + 1);
    },
    [carouselApi]
  );

  useEffect(() => {
    if (!carouselApi) return;

    onSelect(carouselApi);
    carouselApi.on("reInit", onSelect).on("select", onSelect);

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);
  }, [carouselApi, onSelect]);

  const isDiscounted = useMemo(() => {
    const sale_price = Number(selectedVariant.sale_price);
    const price = Number(selectedVariant.price);
    return (
      typeof sale_price === "number" && sale_price > 0 && sale_price < price
    );
  }, [selectedVariant.price, selectedVariant.sale_price]);

  const calculatedDiscountPercentage = useMemo(() => {
    if (!isDiscounted) return 0;
    const originalPriceNum = Number(selectedVariant.price);
    const salePriceNum = Number(selectedVariant.sale_price);

    if (originalPriceNum > 0) {
      return ((originalPriceNum - salePriceNum) / originalPriceNum) * 100;
    }
    return 0;
  }, [isDiscounted, selectedVariant.price, selectedVariant.sale_price]);

  const handleCardNavigation = () => {
    if (!isDialogOpen) {
      router.push(
        buildUrl(`products/${product.category?.name}/product-details`, {
          productId: product.id,
        })
      );
    }
  };

  const images: string[] = useMemo(() => {
    return [product.thumbnail_image_url, ...(product.images_url || [])];
  }, [product.thumbnail_image_url, product.images_url]);

  useEffect(() => {
    if (!carouselApi) return;

    onSelect(carouselApi);
    carouselApi.on("reInit", onSelect).on("select", onSelect);

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);
  }, [carouselApi, onSelect, selectedVariant.size]);

  const handleQuickShopClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsDialogOpen(true);
  };

  return (
    <div
      className={`group ${className} flex flex-col w-full flex-1 max-w-96 cursor-pointer justify-start items-center relative`}
      {...divProps}
      onClick={handleCardNavigation}
    >
      {/* Discount Badge */}
      {isDiscounted && (
        <div className="bg-green-700 text-white text-sm py-[1px] px-2 absolute top-0 left-0 z-20 font-secondary uppercase tracking-wide rounded-br-xl">
          <span>{calculatedDiscountPercentage.toFixed(0)}% off</span>
        </div>
      )}

      <div className="overflow-hidden relative w-full">
        <Image
          src={product.thumbnail_image_url || "/cdn-imgs/hero_img_5.jpg"}
          alt={product.name}
          height={600}
          width={400}
          className="object-cover w-full h-[450px] rounded-sm transition-transform duration-300 group-hover:scale-105"
        />

        {/* Quick Shop Dialog */}
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <AlertDialogTrigger asChild>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <CustomButton
                    className="absolute invisible group-hover:visible bottom-0 right-0 m-4 flex items-center justify-center gap-2"
                    aria-label="Quick shop"
                    onClick={handleQuickShopClick}
                  >
                    <ShoppingBasketIcon className="size-4.5" />
                  </CustomButton>
                </TooltipTrigger>
                <TooltipContent side="left">
                  <p>Quick shop</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </AlertDialogTrigger>

          <AlertDialogContent className="min-w-[60%]">
            <AlertDialogHeader>
              <AlertDialogTitle>Quick Shop Your Product</AlertDialogTitle>
              <AlertDialogDescription className="hidden">
                This dialog let&apos;s you quick shop
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="flex gap-5 items-start">
              <div className="flex-1">
                <Carousel setApi={setCarouselApi}>
                  <CarouselContent>
                    {images.map((src, index) => (
                      <CarouselItem key={index} className="">
                        <Image
                          src={src || "/cdn-imgs/hero_img_5.jpg"}
                          alt={product.name}
                          height={600}
                          width={400}
                          className="min-h-96 w-full object-cover aspect-auto"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="mt-4 flex justify-between">
                  <div>
                    <p className="tracking-wide font-secondary text-muted-foreground select-none">
                      Image {current} of {count}
                    </p>
                  </div>
                  <div>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        if (!carouselApi) return;
                        carouselApi.scrollPrev();
                      }}
                      disabled={prevBtnDisabled}
                      className="rounded-full"
                    >
                      <ArrowLeftIcon />
                    </Button>
                    <Button
                      variant={"outline"}
                      onClick={() => {
                        if (!carouselApi) return;
                        carouselApi.scrollNext();
                      }}
                      disabled={nextBtnDisabled}
                      className="rounded-full"
                    >
                      <ArrowRightIcon />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex-1 h-full flex flex-col justify-between">
                <div>
                  <h1 className="font-secondary tracking-wider text-5xl font-bold">
                    {product.name}
                  </h1>
                  <p className="text-muted-foreground">{product.description}</p>

                  {/* Price Display Logic */}
                  {isDiscounted ? (
                    <div className="mt-3">
                      <p className="font-secondary text-4xl font-bold text-primary">
                        ₹{selectedVariant.sale_price}
                      </p>
                      <p className="line-through text-muted-foreground">
                        ₹{selectedVariant.price}
                      </p>
                      <p className="text-green-600">
                        {calculatedDiscountPercentage.toFixed(0)}% off
                      </p>
                    </div>
                  ) : (
                    <p className="font-secondary text-3xl font-bold mt-3">
                      ₹{selectedVariant.price}
                    </p>
                  )}

                  <p className="text-muted-foreground mt-5">
                    Size:{" "}
                    <span className="font-bold text-black">
                      {selectedVariant.size}
                    </span>
                  </p>
                  <div className="flex gap-3 items-center mt-5">
                    <p className="text-muted-foreground">Quantity:</p>
                    <div className="inline-flex gap-3 items-center border-[1.5px] p-1 px-2 rounded-md">
                      <Button
                        className="size-5 cursor-pointer text-muted-foreground hover:text-foreground disabled:cursor-not-allowed"
                        aria-label="Decrease quantity"
                        variant={"link"}
                        disabled={quantity <= 1}
                        onClick={() => {
                          setQuantity((prev) => Math.max(1, prev - 1));
                        }}
                      >
                        <MinusIcon />
                      </Button>
                      <p className="w-6 text-center font-medium">{quantity}</p>
                      <Button
                        className="size-5 cursor-pointer text-muted-foreground hover:text-foreground"
                        aria-label="Increase quantity"
                        variant={"link"}
                        onClick={() => {
                          setQuantity((prev) => prev + 1);
                        }}
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </div>

                  {/* Stock warning component */}
                  <div className="mt-5">
                    {selectedVariant.stock === 0 ? (
                      <p className="text-red-600 font-bold">🚫 Out of stock!</p>
                    ) : (
                      selectedVariant.stock < 10 && (
                        <div className="space-y-1">
                          {selectedVariant.stock < 5 ? (
                            <p className="text-red-600 animate-pulse">
                              ⚠️ Almost gone! Only{" "}
                              <span className="font-bold">
                                {selectedVariant.stock}
                              </span>{" "}
                              left - don&apos;t miss out!
                            </p>
                          ) : (
                            <p className="text-amber-600">
                              🔥 Selling fast! Just{" "}
                              <span className="font-bold">
                                {selectedVariant.stock}
                              </span>{" "}
                              remaining - shop now
                            </p>
                          )}
                        </div>
                      )
                    )}
                  </div>

                  {/* View Details Link */}
                  <div className="mt-5">
                    <Link
                      href={buildUrl(
                        `products/${product.category?.name}/product-details`,
                        {
                          productId: product.id,
                        }
                      )}
                      className="text-muted-foreground text-sm hover:text-primary hover:underline mt-5"
                    >
                      View details
                    </Link>
                  </div>
                </div>

                {/* Add to Cart Action */}
                <div className="flex gap-3 justify-end">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      addToCart({
                        product_id: product.id,
                        variant_id: selectedVariant.id,
                        product: product,
                        variant: selectedVariant,
                        quantity: quantity,
                        price_at_purchase: selectedVariant.price,
                        variant_sku: selectedVariant.sku,
                        variant_attributes: {
                          size: selectedVariant.size,
                        },
                        thumbnailImage: product.thumbnail_image_url,
                        name: product.name,
                        stock: selectedVariant.stock,
                        sale_price: selectedVariant.sale_price ?? undefined,
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

      {/* Product Card Footer */}
      <div className="flex flex-col justify-center items-center font-semibold text-xs sm:text-sm md:text-base mt-2">
        <h3 className="text-wrap text-center">{product.name}</h3>
        <div className="flex items-center sm:gap-2 flex-col sm:flex-row">
          {isDiscounted ? (
            <>
              <span className="text-xs line-through text-gray-500">
                ₹{selectedVariant.price}
              </span>
              <span className="text-primary font-semibold">
                ₹{selectedVariant.sale_price}
              </span>
            </>
          ) : (
            <span>₹{selectedVariant.price}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
