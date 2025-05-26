import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Product, CartItem, ProductSizes } from '@/types';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { buildUrl } from '@/lib/utils';

interface CartItemCardProps {
  cartItem: CartItem;
  originalProduct: Product; // Pass the found product directly
  updateQuantity: (id: string, quantity: number) => void;
  updateSize: (id: string, size: ProductSizes) => void;
  removeFromCart: (id: string) => void;
}

export const CartItemCard = ({
  cartItem,
  originalProduct,
  updateQuantity,
  updateSize,
  removeFromCart,
}: CartItemCardProps) => {
  const router = useRouter();
  const { id, name, quantity, size, price, discount, thumbnailImage } = cartItem;
  const availableSizes = originalProduct.sizes || []; // Ensure sizes array exists

  const calculatedPrice = (price * (1 - (discount || 0))).toFixed(2);
  const originalPrice = price.toFixed(2);

  // --- Image Source Logic ---
  const imageSrc = thumbnailImage || originalProduct.thumbnailImage || '/cdn-imgs/not-available.png';

  const handleNavigation = () => {
    router.push(buildUrl('/products/all/product-details', { productId: id }));
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className='flex gap-5'>
        <div className="aspect-square">
          <Image
            // src={imageSrc}
            src={'/cdn-imgs/not-available.png'}
            alt={name}
            height={120}
            width={120}
            className="rounded-md object-cover hover:cursor-pointer"
            onClick={handleNavigation}
          />
        </div>
        <div className='flex flex-col justify-between flex-1 min-w-fit'>
          <div className='space-y-3'>
            {/* Size Selector */}
            <div className='flex gap-3 items-center flex-wrap'>
              <p className='text-muted-foreground text-sm'>Size:</p>
              <Select
                defaultValue={size}
                onValueChange={(size) => updateSize(id, size as ProductSizes)}
                disabled={availableSizes.length <= 1} 
              >
                <SelectTrigger className="w-full max-w-[150px] h-9 text-sm"> {/* Adjusted width/height */}
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  {availableSizes.map((s) => (
                    <SelectItem key={s} value={s} className="text-sm">
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity Selector */}
            <div className='flex gap-3 items-center'>
              <p className='text-muted-foreground text-sm'>Quantity:</p>
              <div className='flex gap-3 items-center border-[1.5px] p-1 px-2 rounded-md'>
                <Button
                  className='size-5 cursor-pointer text-muted-foreground hover:text-foreground disabled:cursor-not-allowed'
                  aria-label="Decrease quantity"
                  variant={'link'}
                  disabled={quantity <= 1}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    updateQuantity(id, quantity - 1);
                  }}
                  >
                  <MinusIcon />
                </Button>
                <p className="w-6 text-center font-medium">{quantity}</p>
                <Button
                  className='size-5 cursor-pointer text-muted-foreground hover:text-foreground'
                  aria-label="Increase quantity"
                  variant={'link'}
                  onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                    e.stopPropagation();
                    updateQuantity(id, quantity + 1);
                  }}
                >
                  <PlusIcon />
                </Button>
              </div>
            </div>
          </div>

          {/* Price */}
          <p className='mt-3 font-semibold'>
            ₹ {calculatedPrice}
            {discount && discount > 0 && ( // Show original price only if there's a discount
                 <span className='ml-2 line-through text-muted-foreground text-sm font-normal'>
                    ₹{originalPrice}
                 </span>
             )}
          </p>
        </div>
      </CardContent>
      <CardFooter>
        <div className='flex gap-3 w-full'>
          <Button
            variant={'outline'}
            className='text-red-500 hover:bg-red-50 flex-1 border-red-300 hover:border-red-500' // Added hover/border styles
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              removeFromCart(id);
            }}
          >
            Remove
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};