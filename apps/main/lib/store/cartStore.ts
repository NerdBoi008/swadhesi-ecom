import { CartItem } from "@repo/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type CartStore = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateSize: (id: string, size: string) => void;
  clearCart: () => void;
}

const useCartStore = create(
    persist<CartStore>(
      (set) => ({
        cart: [],
  
        //   Add a product to the cart
        addToCart: (item) =>
          set((state) => {
            const existingItem = state.cart.find((i) => i.id === item.id);
            if (existingItem) {
                // If the product already exists, update the quantity
                return {
                    cart: state.cart.map((i) =>
                      i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
                    ),
                };
            } else {
                // If the product doesn't exist, add it to the cart
                return { cart: [...state.cart, item] };
            }
          }),
  
        // Remove a product from the cart
        removeFromCart: (id) =>
          set((state) => ({
            cart: state.cart.filter((i) => i.id !== id),
          })),
  
        // Update the quantity of a product in the cart
        updateQuantity: (id, quantity) =>
          set((state) => {
            if (quantity < 1) {
              // If quantity is less than 1, remove the product from the cart
              return {
                cart: state.cart.filter((i) => i.id !== id),
              };
            } else {
              // Otherwise, update the quantity
              return {
                cart: state.cart.map((i) =>
                  i.id === id ? { ...i, quantity } : i
                ),
              };
            }
          }),
        
        // Update the size of a product in the cart
        updateSize: (id, size) =>
          set((state) => {
            const originalSize = state.cart.find((i) => i.id === id)?.size;
            if (size !== originalSize) {
              return {
                cart: state.cart.map((i) =>
                  i.id === id ? { ...i, size } : i
                ),
              };
            }
            return state; // Return the current state if no update is needed
          }),
  
        // Clear the entire cart
        clearCart: () => set({ cart: [] }),
      }),
      {
        name: 'cart-storage', // Unique name for localStorage
      }
    )
);

export default useCartStore;