'use client'

import useDataStore from "@/lib/store/dataStore";
import { Product } from "@repo/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductCard from "@/components/common/ProductCard";
import CustomButton from "@/components/common/CustomButton";
import { ArrowUpRightIcon, BicepsFlexedIcon, CloudyIcon, TreesIcon, } from "lucide-react";
import Link from "next/link";
import { TestimonialsSection } from "@/components/common/TestimonialsSection";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { instagramHandle, instagramImgSrcs } from "@/lib/constant";
import { CoronaVirusIcon } from "@/public/icons/corona-virus-icon";

const subscriptionformSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const phrases = [
  "Designed with love, made for memories. Dress them in joy!",
  "Every little outfit tells a story—let's make it a beautiful one!",
  "Little clothes, big love! Fashion that keeps up with their endless energy.",
];
  
export default function Home() {

  const { products: productsApi, fetchProducts } = useDataStore();
  const [products, setProducts] = useState<Product[] | null>();

  const form = useForm<z.infer<typeof subscriptionformSchema>>({
    resolver: zodResolver(subscriptionformSchema),
    defaultValues: {
      email: "",
    },
  })
 
  // 2. Define a submit handler.
  function subscriptionformOnSubmit(values: z.infer<typeof subscriptionformSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  
  // Duplicate the phrases to create the seamless loop effect
  const duplicatedPhrases = [...phrases, ...phrases];

  useEffect(() => {
    if (!productsApi) fetchProducts();

    if (productsApi) setProducts(productsApi);
    
  }, [productsApi, fetchProducts]);

  const latestProducts = [...(products ?? [])].sort((a, b) => {
    const dateA = new Date(a.created_at).getTime();
    const dateB = new Date(b.created_at).getTime();
    return dateB - dateA; // Descending order (latest first)
  }).slice(0, 3);

  return (
    <main className="relative flex flex-1 flex-col space-y-6">
      {/* Hero Section */}      
      <section className="flex gap-6 justify-between container-x-padding pt-3 flex-col-reverse md:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center sm:flex-col sm:items-start gap-4">
          <div>
            {/* Desktop Text */}
            <p className="hidden md:block text-wrap text-2xl lg:text-4xl align-baseline">
              <span className="text-5xl lg:text-6xl font-bold text-[#E07A5F]">Discover</span> timeless pieces{" "}
              <span className="text-4xl lg:text-5xl font-bold text-[#2a9d8f]">crafted</span> for comfort and{" "}
              <span className="text-4xl lg:text-5xl font-bold text-[#e63946]">style</span>.
            </p>
            <p className="hidden md:block text-muted-foreground mt-3 text-sm">Limited edition designs now available.</p>

            {/* Mobile Text */}
            <p className="block md:hidden text-2xl align-baseline">
              <span className="text-4xl font-bold text-[#E07A5F]">Discover</span> comfort &{" "}
              <span className="text-4xl font-bold text-[#e63946]">style</span>.
            </p>
            <p className="block md:hidden text-muted-foreground mt-2 text-xs">New designs are here.</p>
          </div>
          {/* <Button>SHOP THE COLLECTION</Button> */}
          <CustomButton>
            SHOP THE COLLECTION
          </CustomButton>
        </div>
        
        <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full items-end sm:items-center">
          {/* First Image - Left */}
          <div className="relative h-0 pb-[125%]"> {/* 4:5 aspect ratio */}
            <Image
              src="/cdn-imgs/hero_img_6.jpg"
              alt="hero-img"
              fill
              className="object-cover"
            />
          </div>

          {/* Second Image - Center (Taller) */}
          <div className="relative h-0 pb-[140%] col-span-1 row-span-1"> {/* 5:7 aspect ratio */}
            <Image
              src="/cdn-imgs/hero_img_5.jpg"
              alt="hero-img"
              fill
              className="object-cover hover:grayscale transition-all duration-300"
            />
          </div>

          {/* Third Image - Right (Grayscale) */}
          <div className="relative h-0 pb-[130%]"> {/* ~3:4 aspect ratio */}
            <Image
              src="/cdn-imgs/hero_img_7.jpg"
              alt="hero-img"
              fill
              className="object-cover object-[50%_0%] grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Scroll Headings */}
      <section className={"w-full overflow-hidden p-4 cursor-default group mt-7"} aria-hidden="true">
        <div className={"flex w-max animate-infinite-scroll group-hover:paused gap-6"}>
          {duplicatedPhrases.map((phrase, index) => (
            <div key={index}>
              <p className={`text-4xl text-nowrap tracking-wide font-bold flex-shrink-0 font-secondary`}>
                {phrase}
                <span className="text-4xl flex-shrink-0 px-10">👕</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="container-x-padding flex flex-col items-center justify-center gap-4 mt-6">
        {/* Products Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold font-secondary">New Arrivals</h2>
          <p className="text-sm text-muted-foreground">Little outfits, big adventures!</p>
        </div>
        
        {/* New Arrived Products */}
        <div className="grid grid-cols-2 md:flex items-center justify-center justify-items-center gap-4 w-full">
          {latestProducts ? (
              latestProducts.map(({ id, name, variants, description, category, related_products, thumbnail_image_url, images_url, created_at, updated_at }: Product) => {
                const firstVariant = variants?.[0];

                // Parse price and sale_price to numbers before passing them
                const parsedPrice = parseFloat(firstVariant?.price as any); // Use parseFloat and handle potential non-numeric input
                const parsedSalePrice = firstVariant?.sale_price !== null && firstVariant?.sale_price !== undefined
                    ? parseFloat(firstVariant.sale_price as any) // Parse if it exists and isn't null/undefined
                    : undefined; // Pass undefined if no sale price

                // Fallback to 0 if parsedPrice is NaN or null
                const priceForCard = !isNaN(parsedPrice) ? parsedPrice : 0;

                // Only pass salePriceForCard if it's a valid number and greater than 0
                const salePriceForCard = (typeof parsedSalePrice === 'number' && !isNaN(parsedSalePrice) && parsedSalePrice > 0)
                    ? parsedSalePrice
                    : undefined;

                return (
                    <ProductCard
                        key={id}
                        className="w-full"
                        id={id}
                        name={name}
                        price={priceForCard}
                        sale_price={salePriceForCard} // Pass undefined if no sale
                        stock={firstVariant?.stock ?? 0}
                        size={firstVariant?.size || ""}
                        thumbnailImage={thumbnail_image_url}
                        otherImages={images_url}
                        description={description}
                        category={category?.name || "Uncategorized"} // Provide a fallback for category name
                        related_products={related_products}
                    />
                );
            })
          ) : (
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="border-2 h-[440px] animate-pulse bg-gray-100 w-full max-w-96"/>
            ))
          )}
        </div>
      </section>

      {/* Discover section */}
      <section className="flex flex-col md:flex-row h-[750px] mt-8">
        <div className="relative flex-1">
          <Image
            src={"/cdn-imgs/hero_img_7.jpg"}
            alt={"cdn-content-img"}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex-1 max-w-96 text-center flex items-center gap-4 flex-col justify-center p-4">
          <h1 className="text-3xl font-semibold">Heading</h1>
          <p>Content of this paragraph. which you should ask client to put.</p>
          <CustomButton
            className="w-auto mx-auto mt-4 flex gap-2 group font-bold"
            onClick={() => {

            }}
          >
            View All Products
            <ArrowUpRightIcon className="hidden group-hover:block size-5"/>
          </CustomButton>
        </div>
        <div className="relative flex-1">
          <Image
            src={"/cdn-imgs/hero_img_7.jpg"}
            alt={"cdn-content-img"}
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Browse Section */}
      <section className="grid grid-cols-2 md:grid-cols-3  gap-4 md:gap-8 container-x-padding my-4 md:flex-row ">
        {[
          {
            Image: "/cdn-imgs/hero_img_7.jpg",
            title: "Heading",
            slogan: "Content of this paragraph. which you should ask client to put.",
          },
          {
            Image: "/cdn-imgs/hero_img_7.jpg",
            title: "Heading",
            slogan: "Content of this paragraph. which you should ask client to put.",
          },
          {
            Image: "/cdn-imgs/hero_img_7.jpg",
            title: "Heading",
            slogan: "Content of this paragraph. which you should ask client to put.",
          }
        ].map((item, index) => (
           <div key={index} className="flex items-center justify-center flex-col flex-1">
            <div className="relative w-full h-[300px] md:h-[450px]">
              <Image
                src={item.Image}
                alt={"cdn-content-img"}
                fill
                className="object-cover"
              />
            </div>
            <h1 className="font-semibold text-xl mt-3">{item.title}</h1>
            <p className="text-sm px-5">Content of this paragraph. which you should ask client to put.</p>
            <Link href={"/"} className="hover:underline hover:font-semibold">Discover now</Link>
          </div>
        ))}
      </section>

      {/* Video section */}
      <section>

      </section>

      {/* Testimonials section */}
      <TestimonialsSection />

      {/* Tale section */}
      <section className="flex flex-col md:flex-row gap-4 md:gap-8 container-x-padding items-center justify-center">
        <div className="md:flex-1 relative h-[500px] flex items-center justify-center w-full">
          <Image
            src={"/cdn-imgs/hero_img_7.jpg"}
            alt={"Image-1"}
            width={350}
            height={600}
            className="border rounded-sm absolute top-3 right-[10px] md:right-[10%]"
          />
          <Image
            src={"/cdn-imgs/not-available.png"}
            alt={"Image-1"}
            width={350}
            height={600}
            className="border rounded-sm absolute left-[10px]  md:left-[10%]"
          />
        </div>
        <div className="flex-1 space-y-5 text-center">
          <h1 className="text-4xl font-semibold">Heading</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus quam necessitatibus dolorem natus? Quos, vel perspiciatis impedit atque accusamus sit provident ab esse quisquam blanditiis repellat dolores asperiores. Nihil, numquam?</p>
          <CustomButton>Explore now</CustomButton>
        </div>
      </section>

      {/*  */}
      <section>
        
      </section>

      {/* Product characteristics section */}
      <section className="container-x-padding grid grid-cols-2 md:grid-cols-4 gap-5 font-secondary text-xl font-bold tracking-wide uppercase select-none text-primary">
        <div className="flex flex-col gap-3 items-center">
          <CloudyIcon className="size-10"/>
          <p>Softer</p>
        </div>

        <div className="flex flex-col gap-3 items-center">
          <BicepsFlexedIcon className="size-10"/>
          <p>Sustainable</p>
        </div>

        <div className="flex flex-col gap-3 items-center">
          <TreesIcon className="size-10"/>
          <p>Natural</p>
        </div>

        <div className="flex flex-col gap-3 items-center">
          <CoronaVirusIcon className="size-10"/>
          <p>Anti-Microbial</p>
        </div>
      </section>
      
      {/* Discount Contact section */}
      <section className="relative flex justify-center">
        <Image
          src={"/cdn-imgs/hero_img_7.jpg"}
          alt={"background-image"} 
          fill
          className="object-cover absolute -z-30"
        />
        <section className="py-12 px-4 sm:px-6 lg:px-8 z-40 bg-[#023047c4] w-full text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#bc6c25] mb-4">
              NEVER MISS A DROP
            </h2>
            <p className="text-xl mb-8">
              Get <span className="font-bold">10% Discount</span> on your first order when you<br />
              subscribe to our newsletter for exclusive early access to new collections!
            </p>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(subscriptionformOnSubmit)} className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="hidden">Email</FormLabel>
                      <FormControl>
                        <Input placeholder="youremail@company.com" {...field} className="flex-1 px-4 py-3 rounded-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#bc6c25]"/>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CustomButton className="h-9">
                  Subscribe Now
                </CustomButton>
              </form>
            </Form>

            <p className="mt-4 text-sm">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </section>
      </section>

      {/* Socials connect section */}
      <section className="text-center container-x-padding">

        <p>Connect with us</p>
        <Link 
          href="#"
          className="text-3xl font-bold after:content-[''] after:ml-1 group"
        >
          <span className="group-hover:after:content-['_↗']">@{instagramHandle}</span>
        </Link>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 mt-6">
          {instagramImgSrcs.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={'social image'}
              height={200}
              width={200}
              className="size-full object-cover"
            />
          ))}
        </div>
      </section>
    </main>
  )
}