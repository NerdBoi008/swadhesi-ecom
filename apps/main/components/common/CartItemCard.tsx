import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product, CartItem } from '@repo/types';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { buildUrl } from '@/lib/utils';

interface CartItemCardProps {
  cartItem: CartItem;
  originalProduct: Product; // Pass the found product directly
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
}

export const CartItemCard = ({
  cartItem,
  originalProduct,
  updateQuantity,
  removeFromCart,
}: CartItemCardProps) => {
  const router = useRouter();
  const { id, name, quantity, size, price, sale_price, thumbnailImage } = cartItem;
  
  // --- Image Source Logic ---
  const imageSrc = thumbnailImage || originalProduct.thumbnail_image_url || '/cdn-imgs/not-available.png';

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
            src={imageSrc}
            alt={name}
            height={120}
            width={120}
            className="rounded-md object-cover hover:cursor-pointer"
            onClick={handleNavigation}
          />
        </div>
        <div className='flex flex-col justify-between flex-1 min-w-fit'>
          <div className='space-y-3'>
            <div className='flex gap-3 items-center flex-wrap'>
              <p className='text-muted-foreground text-sm'>Size: <span>{size}</span></p>
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
            ₹ {price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}

            {sale_price && sale_price > 0 && ( // Show original price only if there's a discount
                 <span className='ml-2 line-through text-muted-foreground text-sm font-normal'>
                    ₹{sale_price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
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