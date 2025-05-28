export type CartItem = {
    id: string;
    quantity: number;
    size: string;
    price: number;
    name: string;
    thumbnailImage: string;
    stock: number;
    sale_price: number;
};

export type Cart = {
    cart: Set<CartItem>;
};
