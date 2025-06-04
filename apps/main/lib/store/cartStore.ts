import { Address, OrderItem, OrderStatus, PaymentStatus, Product, ProductVariant } from "@repo/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Order,  PaymentMethod, ShippingCarrier } from "@repo/types";

type StoreOrder = Omit<Order, 'id' | 'created_at' | 'updated_at' | 'items'> & {
  items: Omit<OrderItem, 'id' | 'order_id'>[];
}

export type CartItem = {
  id: string; 
  product_id: string;
  variant_id: string;
  product?: Product; 
  variant?: ProductVariant; 
  quantity: number;
  price_at_purchase: number;
  variant_sku: string;
  variant_attributes: Record<string, string>;
  thumbnailImage: string; 
  name: string; 
  stock: number;
  sale_price?: number;
};


type CartStore = {
  cart: CartItem[];
  // Cart actions
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateVariant: (id: string, variantId: string, variantData: Partial<ProductVariant>) => void;
  clearCart: () => void;
  
  // Checkout state
  shippingAddress: Address | null;
  billingAddress: Address | null;
  paymentMethod: PaymentMethod | null;
  shippingMethod: ShippingCarrier | null;
  orderNotes: string;
  
  // Checkout actions
  setShippingAddress: (address: Address) => void;
  setBillingAddress: (address: Address) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setShippingMethod: (method: ShippingCarrier) => void;
  setOrderNotes: (notes: string) => void;
  
  // Order conversion
  prepareOrder: (customerId: string | null) => StoreOrder;
  calculateTotals: () => {
    subtotal: number;
    tax: number;
    shipping: number;
    discount: number;
    total: number;
  };
};

const useCartStore = create(
  persist<CartStore>(
    (set, get) => ({
      cart: [],
      shippingAddress: null,
      billingAddress: null,
      paymentMethod: null,
      shippingMethod: null,
      orderNotes: '',

      // Add item to cart (with duplicate check)
      addToCart: (item) =>
        set((state) => {
          // Check if same variant already exists in cart
          const existingItem = state.cart.find(
            (i) => i.variant_id === item.variant_id
          );
          
          if (existingItem) {
            // Update quantity if exists
            return {
              cart: state.cart.map((i) =>
                i.variant_id === item.variant_id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          
          // Add new item with generated ID
          return {
            cart: [
              ...state.cart,
              {
                ...item,
                // id: item.product_id,
                id: item.product_id + item.variant_id, // Unique ID based on product and variant
              },
            ],
          };
        }),

      // Remove item from cart
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((i) => i.id !== id),
        })),

      // Update item quantity
      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity < 1) {
            return {
              cart: state.cart.filter((i) => i.id !== id),
            };
          }
          return {
            cart: state.cart.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          };
        }),

      // Update variant (size/color changes)
      updateVariant: (id, variantId, variantData) =>
        set((state) => ({
          cart: state.cart.map((i) =>
            i.id === id
              ? {
                  ...i,
                  variant_id: variantId,
                  price_at_purchase: variantData.price ?? i.price_at_purchase,
                  variant_sku: variantData.sku ?? i.variant_sku,
                  variant_attributes: variantData.attribute_values 
                    ? Object.fromEntries(
                        variantData.attribute_values.map((av) => [av.attribute_id, av.value])
                      )
                    : i.variant_attributes,
                  variant: variantData 
                    ? { 
                        ...i.variant,
                        ...variantData,
                        product_id: variantData.product_id ?? i.variant?.product_id ?? '',
                      } as ProductVariant
                    : i.variant,
                }
              : i
          ),
        })),

      // Clear entire cart
      clearCart: () => set({ cart: [] }),

      // Checkout setters
      setShippingAddress: (address) => set({ shippingAddress: address }),
      setBillingAddress: (address) => set({ billingAddress: address }),
      setPaymentMethod: (method) => set({ paymentMethod: method }),
      setShippingMethod: (method) => set({ shippingMethod: method }),
      setOrderNotes: (notes) => set({ orderNotes: notes }),

      // Calculate order totals
      calculateTotals: () => {
        const { cart, shippingMethod } = get();
        const subtotal = cart.reduce(
          (sum, item) => sum + (item.price_at_purchase * item.quantity),
          0
        );
        
        // Example calculations - adjust based on your business logic
        const shipping = shippingMethod ? 5.99 : 0; // Flat rate example
        const tax = subtotal * 0.08; // 8% tax example
        const discount = 0; // Would apply coupon logic here
        const total = subtotal + shipping + tax - discount;
        
        return { subtotal, shipping, tax, discount, total };
      },

      // Convert cart to order
      prepareOrder: (customerId) => {
        const {
          cart,
          shippingAddress,
          billingAddress,
          paymentMethod,
          shippingMethod,
          orderNotes,
        } = get();
        
        const { subtotal, shipping, tax, discount, total } = get().calculateTotals();
        
        if (!shippingAddress) {
          throw new Error("Shipping address is required");
        }
        if (!paymentMethod) {
          throw new Error("Payment method is required");
        }
        if (!shippingMethod) {
          throw new Error("Shipping method is required");
        }

        const orderItems: Omit<OrderItem, "order_id">[] = cart.map((item) => ({
          product_id: item.product_id,
          variant_id: item.variant_id,
          quantity: item.quantity,
          price_at_purchase: item.price_at_purchase,
          variant_sku: item.variant_sku,
          variant_attributes: item.variant_attributes,
          product: item.product,
          variant: item.variant,
        }));

        const order: StoreOrder = {
          customer_id: customerId,
          status: OrderStatus.Pending,
          total_amount: total,
          shipping_address: shippingAddress,
          billing_address: billingAddress || shippingAddress,
          payment_status: PaymentStatus.Pending,
          payment_method: paymentMethod,
          shipping_cost: shipping,
          tax_amount: tax,
          discount_amount: discount,
          items: orderItems,
          carrier: shippingMethod,
          notes: orderNotes,
        };

        return order;
      },
    }),
    {
      name: 'cart-storage',
      // Optional: Only persist certain parts of the state
      partialize: (state) => ({
        cart: state.cart,
        shippingAddress: state.shippingAddress,
        billingAddress: state.billingAddress,
      }) as CartStore,
    }
  )
);

export default useCartStore;