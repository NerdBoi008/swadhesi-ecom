import { ProductSizes } from "./product";

export type CartItem = {
    id: string;
    quantity: number;
    size: ProductSizes;
    price: number;
    name: string;
    thumbnailImage: string;
    stock: number;
    discount: number;
};

export type Cart = {
    cart: Set<CartItem>;
};
