"use client";

import {
  EllipsisVerticalIcon,
  LogInIcon,
  LogOutIcon,
  MailIcon,
  MenuIcon,
  PhoneIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserRoundIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Separator } from "../ui/separator";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { supportEmail, supportPhone } from "@/lib/constant";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import useCartStore from "@/lib/store/cartStore";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDataStore from "@/lib/store/dataStore";
import { CartItemCard } from "./CartItemCard";
import useUserProfileStore from "@/lib/store/user-profile-store";
import { cn } from "@/lib/utils";
import { signOut } from "aws-amplify/auth";
import { toast } from "sonner";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Tops", href: "/products/tops" },
  { name: "Dresses", href: "/products/dresses" },
  { name: "Products", href: "/products/all" },
  { name: "Contact", href: "/contact" },
  { name: "About Us", href: "/about" },
];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const { products: productsApi, fetchProducts } = useDataStore();
  const { cart, removeFromCart, updateQuantity } = useCartStore();
  const checkAuthStatus = useUserProfileStore((state) => state.checkAuthStatus);
  const isAuthenticated = useUserProfileStore((state) => state.isAuthenticated);
  const user = useUserProfileStore((state) => state.user);

  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Add loading state at the top of the component
  const [isSigningOut, setIsSigningOut] = useState(false);

  // --- Effect to fetch base data ---
  useEffect(() => {
    if (!productsApi || productsApi.length === 0) {
      fetchProducts();
    }
    // Check authentication status on initial load
    if (!isAuthenticated) {
      checkAuthStatus();
    }
  }, [productsApi, fetchProducts, checkAuthStatus, isAuthenticated]);

  const products = useMemo(() => {
    if (!productsApi) {
      return [];
    }
    return productsApi;
  }, [productsApi]);

  // Derive the current category from the pathname for product detail pages, converted to lowercase
  const currentCategoryFromPath = useMemo(() => {
    const parts = pathname.split("/");
    // Check if it's a product details page pattern: /products/[category]/product-details
    if (
      parts.length >= 4 &&
      parts[1] === "products" &&
      parts[3] === "product-details"
    ) {
      return `/products/${(parts[2] ?? "").toLowerCase()}`; // Convert extracted category to lowercase
    }
    return null; // Not a product details page with a category in the URL
  }, [pathname]);

  // Update the handleSignOut function
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);

      // Sign out from Cognito
      await signOut();

      // Reset auth state using your store
      useUserProfileStore.getState().setAuthStatus(false);
      useUserProfileStore.getState().setUser(null);

      // Clear any other relevant stores (cart, etc)
      useCartStore.getState().clearCart();

      // Show success message
      toast.success("Signed out successfully");

      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out", {
        description:
          error instanceof Error ? error.message : "Please try again",
      });
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <nav className="bg-background sticky top-0 z-50 text-black">
      <div className="container-x-padding flex items-center justify-between p-4">
        <div className="flex gap-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger>
              <MenuIcon className="bolck sm:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="overflow-y-scroll">
              <SheetHeader>
                <SheetTitle className="flex justify-center">
                  <Image
                    src={"/cdn-imgs/swadhesi-logo.svg"}
                    alt={"Logo"}
                    width={100}
                    height={60}
                    className="w-fit h-10"
                  />
                </SheetTitle>

                <SheetDescription className="hidden">
                  This is navigation sheet
                </SheetDescription>
              </SheetHeader>
              <div className="px-5">
                <Separator />
                <p className="text-sm font-bold my-3">Navigation menu</p>

                <div className="space-y-3 px-2">
                  {navLinks.map((link) => {
                    // Convert link.href and pathname/currentCategoryFromPath to lowercase for comparison
                    const linkHrefLower = link.href.toLowerCase();
                    const pathnameLower = pathname.toLowerCase();
                    const currentCategoryFromPathLower = currentCategoryFromPath
                      ? currentCategoryFromPath.toLowerCase()
                      : null;

                    const isActive =
                      linkHrefLower === "/"
                        ? pathnameLower === "/"
                        : pathnameLower.startsWith(linkHrefLower) ||
                          currentCategoryFromPathLower === linkHrefLower;

                    return (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={() => setIsSheetOpen(false)}
                        className={`block
                          relative
                          font-semibold
                          transition-all
                          duration-150
                          hover:text-primary
                          hover:font-bold
                          focus:text-primary
                          focus:font-bold
                          [&.active]:text-primary
                          [&.active]:font-bold
                          [&.active]:after:content-['']
                          [&.active]:after:absolute
                          [&.active]:after:bottom-[-5px]
                          [&.active]:after:left-0
                          [&.active]:after:w-full
                          [&.active]:after:h-[2px]
                          [&.active]:after:bg-primary
                          [&.active]:scale-105
                          [&.active]:drop-shadow-xs
                          after:content-['']
                          after:absolute
                          after:bottom-[-5px]
                          after:left-0
                          after:w-0
                          after:h-[2px]
                          after:bg-primary
                          after:transition-all
                          after:duration-150
                          hover:after:w-full
                          ${isActive ? "active" : ""}
                        `}
                      >
                        {link.name}
                      </Link>
                    );
                  })}
                </div>

                <Separator className="mt-5" />
                <p className="text-sm font-bold my-3">Quick Contact</p>
                <div className="space-y-2">
                  <Link
                    href={`mailto:${supportEmail}`}
                    className="flex items-center"
                  >
                    <MailIcon className="inline mr-3 size-4.5" />
                    <p className="text-sm">{supportEmail}</p>
                  </Link>
                  <Link
                    href={`mailto:${supportPhone}`}
                    className="flex items-center"
                  >
                    <PhoneIcon className="inline mr-3 size-4.5" />
                    <p className="text-sm">{supportPhone}</p>
                  </Link>
                </div>
              </div>
              <SheetFooter>
                <div className="bg-gray-100 rounded-md flex justify-between">
                  <div className="flex gap-2 items-center p-3">
                    <UserRoundIcon />
                    {isAuthenticated ? (
                      <div>
                        <p className="font-bold text-sm">{user?.name}</p>
                        <p className="text-xs">{user?.email}</p>
                      </div>
                    ) : (
                      <p className="text-xs text-muted-foreground">
                        Not signed in
                      </p>
                    )}
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <EllipsisVerticalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel className="font-bold">
                        My Account
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {isAuthenticated ? (
                        <>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => {
                              router.push("/profile");
                            }}
                          >
                            <UserRoundIcon />
                            Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={handleSignOut}
                          >
                            {isSigningOut ? (
                              <span className="animate-spin">
                                <LogOutIcon className="inline" />
                              </span>
                            ) : (
                              <span className="inline">
                                <LogOutIcon className="inline" />
                              </span>
                            )}
                            Log Out
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <DropdownMenuItem
                          onClick={() => {
                            router.push("/login");
                          }}
                        >
                          <LogInIcon />
                          Log In
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          <SearchIcon />
        </div>

        <Image
          src={"/cdn-imgs/swadhesi-logo.svg"}
          alt={"Logo"}
          width={100}
          height={60}
          className="w-fit h-10"
        />
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
              <div className="relative flex items-center group cursor-pointer">
                <ShoppingBagIcon className="" />
                {cart.length > 0 && (
                  <span
                    className={`absolute -top-2 -right-2 flex items-center justify-center
                    min-w-[20px] h-5 px-1 text-xs font-medium rounded-full
                    bg-primary text-white transform scale-100 group-hover:scale-110
                    transition-transform ${cart.length > 9 ? "px-0.5" : ""}`}
                  >
                    {cart.length > 9 ? "9+" : cart.length}
                  </span>
                )}
              </div>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className="flex gap-1.5 items-center">
                  <p>Cart</p>
                  <span
                    className={`inline-flex items-center justify-center
                    min-w-[20px] h-5 px-1 text-xs font-medium rounded-full
                    bg-primary text-white transform scale-100 group-hover:scale-110
                    transition-transform ${cart.length > 9 ? "px-0.5" : ""}`}
                  >
                    {cart.length > 9 ? "9+" : cart.length}
                  </span>
                </DrawerTitle>
                <DrawerDescription>
                  Your perfect outfit is one click away
                </DrawerDescription>
              </DrawerHeader>

              <Separator />

              <div className="px-5 lg:px-10 py-3 overflow-y-scroll grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
                {cart.length > 0 ? (
                  cart.map((cartItem) => {
                    const originalProduct = products.find((product) =>
                      cartItem.id.search(product.id)
                    );

                    if (!originalProduct) {
                      console.warn(
                        `Product with ID ${cartItem.id} not found in productsApi for cart item.`
                      );
                      return (
                        <Card
                          key={`missing-${cartItem.id}`}
                          className="border-red-500 opacity-70"
                        >
                          <CardHeader>
                            <CardTitle className="text-red-600">
                              Item Unavailable
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p>
                              Details for &quot;{cartItem.name}&quot; could not
                              be loaded.
                            </p>
                          </CardContent>
                          <CardFooter>
                            <Button
                              variant="outline"
                              className="text-red-500"
                              onClick={() => removeFromCart(cartItem.id)}
                            >
                              Remove Item
                            </Button>
                          </CardFooter>
                        </Card>
                      );
                    }

                    return (
                      <CartItemCard
                        key={cartItem.id}
                        cartItem={cartItem}
                        originalProduct={originalProduct}
                        updateQuantity={updateQuantity}
                        removeFromCart={removeFromCart}
                      />
                    );
                  })
                ) : (
                  <div className="text-center py-10 col-span-3">
                    <p className="text-muted-foreground">Your cart is empty.</p>
                    <Button
                      onClick={() => {
                        router.push("/products/all");
                        setIsDrawerOpen(false);
                      }}
                      className="mt-4"
                    >
                      Continue Shopping
                    </Button>
                  </div>
                )}
              </div>

              <DrawerFooter className="flex flex-row-reverse gap-3">
                <Button className="grow" onClick={() => {router.push('/checkout')}}>
                  Check out
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" className="grow">
                    Cancel
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>

          {/* Avatar section */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {/* <Avatar className='hidden sm:block cursor-pointer'>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> */}
              <div
                className={cn(
                  isAuthenticated ? "bg-green-700/20" : "bg-red-500/20",
                  "relative border rounded-md p-1 cursor-pointer hover:bg-gray-100 transition-colors hidden sm:block"
                )}
              >
                <UserRoundIcon className="" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="font-semibold">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />

              {isAuthenticated ? (
                <>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      router.push("/profile");
                    }}
                  >
                    <UserRoundIcon />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={handleSignOut}
                  >
                    {isSigningOut ? (
                      <span className="animate-spin">
                        <LogOutIcon className="inline" />
                      </span>
                    ) : (
                      <span className="inline">
                        <LogOutIcon className="inline" />
                      </span>
                    )}
                    Log Out
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem
                  onClick={() => {
                    router.push("/login");
                  }}
                >
                  <LogInIcon />
                  Log In
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Separator decorative />
      <div className="hidden sm:flex items-center justify-center gap-4 p-4 ">
        {navLinks.map((link) => {
          // Convert link.href and pathname/currentCategoryFromPath to lowercase for comparison
          const linkHrefLower = link.href.toLowerCase();
          const pathnameLower = pathname.toLowerCase();
          const currentCategoryFromPathLower = currentCategoryFromPath
            ? currentCategoryFromPath.toLowerCase()
            : null;

          const isActive =
            linkHrefLower === "/"
              ? pathnameLower === "/"
              : pathnameLower.startsWith(linkHrefLower) ||
                currentCategoryFromPathLower === linkHrefLower;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`
                relative
                font-semibold
                transition-all
                duration-150
                hover:text-primary
                hover:font-bold
                focus:text-primary
                focus:font-bold
                [&.active]:text-primary
                [&.active]:font-bold
                [&.active]:after:content-['']
                [&.active]:after:absolute
                [&.active]:after:bottom-[-16px]
                [&.active]:after:left-0
                [&.active]:after:w-full
                [&.active]:after:h-[2px]
                [&.active]:after:bg-primary
                [&.active]:scale-105
                [&.active]:drop-shadow-xs
                after:content-['']
                after:absolute
                after:bottom-[-16px]
                after:left-0
                after:w-0
                after:h-[2px]
                after:bg-primary
                after:transition-all
                after:duration-150
                hover:after:w-full
                ${isActive ? "active" : ""}
              `}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
      <Separator decorative />
    </nav>
  );
};

export default Navbar;
