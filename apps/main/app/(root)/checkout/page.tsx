"use client";

import { useState } from "react";
import {
  Customer,
  Address,
  Order,
  PaymentMethod,
  ShippingCarrier,
  OrderStatus,
  PaymentStatus,
  Product,
  ProductVariant,
} from "@repo/types";
import Image from "next/image";
import useCartStore from "@/lib/store/cartStore";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form as FormRoot,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const customerFormSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
});

export const addressFormSchema = z.object({
  recipient_name: z.string().min(2, "Recipient name is required"),
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postal_code: z.string().min(4, "Valid postal code is required"),
  country: z.string().min(2, "Country is required"),
  contact_number: z
    .string()
    .min(10, "Contact number must be at least 10 digits"),
});

export const checkoutFormSchema = z.object({
  customer: customerFormSchema,
  shippingAddress: addressFormSchema,
  billingAddress: addressFormSchema.optional(),
  useSameForBilling: z.boolean().default(true),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

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

const CheckoutPage = () => {
  const [currentStep, setCurrentStep] = useState<
    "information" | "shipping" | "payment"
  >("information");
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
  const [billingAddress, setBillingAddress] = useState<Address | null>(null);
  const [shippingMethod, setShippingMethod] = useState<ShippingCarrier | null>(
    null
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null
  );
  const [orderNotes, setOrderNotes] = useState("");

  const cartItems = useCartStore((state) => state.cart);

  const calculateTotals = () => {
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price_at_purchase * item.quantity,
      0
    );
    const shipping = shippingMethod ? 5.99 : 0; // Example flat rate
    const tax = subtotal * 0.08; // Example tax calculation
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  };

  const { subtotal, shipping, tax, total } = calculateTotals();

  const handlePlaceOrder = () => {
    const newOrder: Order = {
      customer_id: customer?.id || null,
      status: OrderStatus.Pending,
      total_amount: total,
      shipping_address: shippingAddress!,
      billing_address: billingAddress || shippingAddress!,
      payment_status: PaymentStatus.Pending,
      payment_method: paymentMethod!,
      shipping_cost: shipping,
      tax_amount: tax,
      items: cartItems.map((item) => ({
        ...item,
        order_id: "", // Provide a default or appropriate value for order_id
      })),
      id: "",
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Submit order to backend
    console.log("Placing order:", newOrder);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left side - Checkout steps */}
        <div className="md:w-2/3">
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>

            {/* Progress indicator */}
            <div className="flex justify-between mb-8">
              <div
                className={`text-center ${currentStep === "information" ? "font-bold text-primary" : ""}`}
                onClick={() => setCurrentStep("information")}
              >
                <div className="w-8 h-8 mx-auto rounded-full bg-primary text-white flex items-center justify-center mb-1">
                  1
                </div>
                Information
              </div>
              <div
                className={`text-center ${currentStep === "shipping" ? "font-bold text-primary" : ""}`}
                onClick={() => shippingAddress && setCurrentStep("shipping")}
              >
                <div
                  className={`w-8 h-8 mx-auto rounded-full ${shippingAddress ? "bg-primary" : "bg-gray-300"} text-white flex items-center justify-center mb-1`}
                >
                  2
                </div>
                Shipping
              </div>
              <div
                className={`text-center ${currentStep === "payment" ? "font-bold text-primary" : ""}`}
                onClick={() => shippingMethod && setCurrentStep("payment")}
              >
                <div
                  className={`w-8 h-8 mx-auto rounded-full ${shippingMethod ? "bg-primary" : "bg-gray-300"} text-white flex items-center justify-center mb-1`}
                >
                  3
                </div>
                Payment
              </div>
            </div>

            {/* Current step content */}
            {currentStep === "information" && (
              <InformationStep
                customer={customer}
                setCustomer={setCustomer}
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                billingAddress={billingAddress}
                setBillingAddress={setBillingAddress}
                onContinue={() => setCurrentStep("shipping")}
              />
            )}

            {currentStep === "shipping" && (
              <ShippingStep
                shippingMethod={shippingMethod}
                setShippingMethod={setShippingMethod}
                onContinue={() => setCurrentStep("payment")}
                onBack={() => setCurrentStep("information")}
              />
            )}

            {currentStep === "payment" && (
              <PaymentStep
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                orderNotes={orderNotes}
                setOrderNotes={setOrderNotes}
                onPlaceOrder={handlePlaceOrder}
                onBack={() => setCurrentStep("shipping")}
              />
            )}
          </div>
        </div>

        {/* Right side - Order summary */}
        <div className="md:w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-40">
            <h2 className="text-lg font-bold mb-4">Order Summary</h2>

            {/* Cart items */}
            <div className="mb-4 space-y-4">
              {cartItems.map((item) => (
                <div key={item.variant_id} className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
                    {item.product?.thumbnail_image_url && (
                      <Image
                        src={
                          item.product?.thumbnail_image_url ||
                          item?.variant?.image_url ||
                          "/cdn-imgs/not-available.png"
                        }
                        alt={item.product?.name || "Product"}
                        className="w-full h-full object-cover"
                        height={100}
                        width={100}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{item.product?.name}</h3>
                    <p className="text-sm text-gray-600">
                      {Object.entries(item.variant_attributes).map(
                        ([key, value]) => (
                          <span key={key} className="mr-2">
                            {key}: {value}
                          </span>
                        )
                      )}
                    </p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                  <div className="font-medium">
                    ₹{(item.price_at_purchase * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Order notes */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Order Notes
              </label>
              <textarea
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                className="w-full p-2 border rounded text-sm"
                rows={2}
                placeholder="Special instructions, delivery notes, etc."
              />
            </div>

            {/* Order totals */}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>
                  {shipping
                    ? `₹${shipping.toFixed(2)}`
                    : "Calculated at next step"}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InformationStep = ({
  customer,
  setCustomer,
  shippingAddress,
  setShippingAddress,
  billingAddress,
  setBillingAddress,
  onContinue,
}: {
  customer: Customer | null;
  setCustomer: (customer: Customer) => void;
  shippingAddress: Address | null;
  setShippingAddress: (address: Address) => void;
  billingAddress: Address | null;
  setBillingAddress: (address: Address) => void;
  onContinue: () => void;
}) => {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      customer: {
        first_name: customer?.first_name || "",
        last_name: customer?.last_name || "",
        email: customer?.email || "",
        phone: customer?.phone || "",
      },
      shippingAddress: {
        recipient_name: shippingAddress?.recipient_name || "",
        street: shippingAddress?.street || "",
        city: shippingAddress?.city || "",
        state: shippingAddress?.state || "",
        postal_code: shippingAddress?.postal_code || "",
        country: shippingAddress?.country || "",
        contact_number: shippingAddress?.contact_number || "",
      },
      useSameForBilling: true,
      billingAddress: billingAddress || undefined,
    },
  });

  const useSameForBilling = form.watch("useSameForBilling");

  const onSubmit = (data: CheckoutFormValues) => {
    setCustomer(data.customer as Customer);
    setShippingAddress(data.shippingAddress as Address);
    if (data.useSameForBilling) {
      setBillingAddress(data.shippingAddress as Address);
    } else if (data.billingAddress) {
      setBillingAddress(data.billingAddress as Address);
    }
    onContinue();
  };

  return (
    <FormRoot {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-5">
          <h2 className="text-xl font-bold">Contact Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="customer.first_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customer.last_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="customer.email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="customer.phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+91 1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-5">
          <h2 className="text-xl font-bold">Shipping Address</h2>

          <FormField
            control={form.control}
            name="shippingAddress.recipient_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipient Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippingAddress.street"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Street Address</FormLabel>
                <FormControl>
                  <Input placeholder="123 Main St" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="shippingAddress.city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingAddress.state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>State</FormLabel>
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingAddress.postal_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Postal Code</FormLabel>
                  <FormControl>
                    <Input placeholder="123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="shippingAddress.country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="IN">India</SelectItem>
                    <SelectItem value="US">United States</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="shippingAddress.contact_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contact Number</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+91 1234567890" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="useSameForBilling"
          render={({ field }) => (
            <FormItem className="flex flex-row">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Billing address is same as shipping address
                </FormLabel>
              </div>
            </FormItem>
          )}
        />

        {!useSameForBilling && (
          <div className="space-y-5">
            <h2 className="text-xl font-bold">Billing Address</h2>
            <FormField
              control={form.control}
              name="billingAddress.recipient_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recipient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billingAddress.street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="billingAddress.city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingAddress.state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="State" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="billingAddress.postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="billingAddress.country"
              render={({ field }) => (
                <FormItem className="flex gap-3 flex-row">
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a country" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="IN">India</SelectItem>
                      <SelectItem value="US">United States</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="billingAddress.contact_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contact Number</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="+91 1234567890" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button type="submit" className="w-full">
          Continue to Shipping
        </Button>
      </form>
    </FormRoot>
  );
};

const ShippingStep = ({
  shippingMethod,
  setShippingMethod,
  onContinue,
  onBack,
}: {
  shippingMethod: ShippingCarrier | null;
  setShippingMethod: (method: ShippingCarrier) => void;
  onContinue: () => void;
  onBack: () => void;
}) => {
  const shippingOptions = [
    {
      carrier: ShippingCarrier.FedEx,
      name: "FedEx Standard",
      price: 5.99,
      estDelivery: "2-5 business days",
    },
    {
      carrier: ShippingCarrier.UPS,
      name: "UPS Express",
      price: 12.99,
      estDelivery: "1-3 business days",
    },
    {
      carrier: ShippingCarrier.BlueDart,
      name: "BlueDart Premium",
      price: 8.99,
      estDelivery: "3-7 business days",
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Shipping Method</h2>

      <div className="space-y-4 mb-8">
        {shippingOptions.map((option) => (
          <div
            key={option.carrier}
            className={`p-4 border rounded cursor-pointer ${shippingMethod === option.carrier ? "border-primary bg-primary/10" : "hover:border-gray-400"}`}
            onClick={() => setShippingMethod(option.carrier)}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{option.name}</h3>
                <p className="text-sm text-gray-600">{option.estDelivery}</p>
              </div>
              <div className="font-medium">₹{option.price.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded font-medium"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="flex-1 bg-primary text-white py-3 rounded font-medium disabled:bg-gray-400"
          onClick={onContinue}
          disabled={!shippingMethod}
        >
          Continue to Payment
        </button>
      </div>
    </div>
  );
};

const PaymentStep = ({
  paymentMethod,
  setPaymentMethod,
  orderNotes,
  setOrderNotes,
  onPlaceOrder,
  onBack,
}: {
  paymentMethod: PaymentMethod | null;
  setPaymentMethod: (method: PaymentMethod) => void;
  orderNotes: string;
  setOrderNotes: (notes: string) => void;
  onPlaceOrder: () => void;
  onBack: () => void;
}) => {
  const paymentOptions = [
    { method: PaymentMethod.Credit_Card, name: "Credit Card", icon: "💳" },
    { method: PaymentMethod.UPI, name: "UPI", icon: "📱" },
    { method: PaymentMethod.Net_Banking, name: "Net Banking", icon: "🏦" },
    { method: PaymentMethod.COD, name: "Cash on Delivery", icon: "💰" },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Payment Method</h2>

      <div className="space-y-4 mb-8">
        {paymentOptions.map((option) => (
          <div
            key={option.method}
            className={`p-4 border rounded cursor-pointer ${paymentMethod === option.method ? "border-primary bg-primary/10" : "hover:border-gray-400"}`}
            onClick={() => setPaymentMethod(option.method)}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{option.icon}</span>
              <span className="font-medium">{option.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Payment details form - would conditionally render based on selected method */}
      {paymentMethod === PaymentMethod.Credit_Card && (
        <div className="mb-8 p-4 border rounded">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Card Number
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="1234 5678 9012 3456"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="MM/YY"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">CVV</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                placeholder="123"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Name on Card
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              placeholder="John Doe"
            />
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          className="flex-1 bg-gray-200 text-gray-800 py-3 rounded font-medium"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="flex-1 bg-primary text-white py-3 rounded font-medium disabled:bg-gray-400"
          onClick={onPlaceOrder}
          disabled={!paymentMethod}
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;

// 'use client';

// import { useState } from 'react';
// import { Customer, Address, Order, PaymentMethod, ShippingCarrier, OrderStatus, PaymentStatus, Product, ProductVariant, } from '@repo/types';
// import Image from 'next/image';
// import useCartStore from '@/lib/store/cartStore';
// import * as z from "zod"

// export const customerFormSchema = z.object({
//   first_name: z.string().min(2, "First name must be at least 2 characters"),
//   last_name: z.string().min(2, "Last name must be at least 2 characters"),
//   email: z.string().email("Invalid email address"),
//   phone: z.string().min(10, "Phone number must be at least 10 digits"),
// })

// export const addressFormSchema = z.object({
//   recipient_name: z.string().min(2, "Recipient name is required"),
//   street: z.string().min(5, "Street address is required"),
//   city: z.string().min(2, "City is required"),
//   state: z.string().min(2, "State is required"),
//   postal_code: z.string().min(4, "Valid postal code is required"),
//   country: z.string().min(2, "Country is required"),
//   contact_number: z.string().min(10, "Contact number must be at least 10 digits"),
// })

// export const checkoutFormSchema = z.object({
//   customer: customerFormSchema,
//   shippingAddress: addressFormSchema,
//   billingAddress: addressFormSchema.optional(),
//   useSameForBilling: z.boolean().default(true),
// })

// export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>

// export type CartItem = {
//   id: string;
//   product_id: string;
//   variant_id: string;
//   product?: Product;
//   variant?: ProductVariant;
//   quantity: number;
//   price_at_purchase: number;
//   variant_sku: string;
//   variant_attributes: Record<string, string>;
//   thumbnailImage: string;
//   name: string;
//   stock: number;
//   sale_price?: number;
// };

// const CheckoutPage = () => {
//   const [currentStep, setCurrentStep] = useState<'information' | 'shipping' | 'payment'>('information');
//   const [customer, setCustomer] = useState<Customer | null>(null);
//   const [shippingAddress, setShippingAddress] = useState<Address | null>(null);
//   const [billingAddress, setBillingAddress] = useState<Address | null>(null);
//   const [shippingMethod, setShippingMethod] = useState<ShippingCarrier | null>(null);
//   const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
//   const [orderNotes, setOrderNotes] = useState('');

//   const cartItems = useCartStore((state) => state.cart);

//   const calculateTotals = () => {
//     const subtotal = cartItems.reduce((sum, item) => sum + (item.price_at_purchase * item.quantity), 0);
//     const shipping = shippingMethod ? 5.99 : 0; // Example flat rate
//     const tax = subtotal * 0.08; // Example tax calculation
//     const total = subtotal + shipping + tax;

//     return { subtotal, shipping, tax, total };
//   };

//   const { subtotal, shipping, tax, total } = calculateTotals();

//   const handlePlaceOrder = () => {
//     const newOrder: Order = {
//       customer_id: customer?.id || null,
//       status: OrderStatus.Pending,
//       total_amount: total,
//       shipping_address: shippingAddress!,
//       billing_address: billingAddress || shippingAddress!,
//       payment_status: PaymentStatus.Pending,
//       payment_method: paymentMethod!,
//       shipping_cost: shipping,
//       tax_amount: tax,
//       items: cartItems.map(item => ({
//         ...item,
//         order_id: '', // Provide a default or appropriate value for order_id
//       })),
//       id: '',
//       created_at: new Date(),
//       updated_at: new Date(),
//     };

//     // Submit order to backend
//     console.log('Placing order:', newOrder);
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row gap-8">
//         {/* Left side - Checkout steps */}
//         <div className="md:w-2/3">
//           <div className="mb-8">
//             <h1 className="text-2xl font-bold mb-4">Checkout</h1>

//             {/* Progress indicator */}
//             <div className="flex justify-between mb-8">
//               <div
//                 className={`text-center ${currentStep === 'information' ? 'font-bold text-primary' : ''}`}
//                 onClick={() => setCurrentStep('information')}
//               >
//                 <div className="w-8 h-8 mx-auto rounded-full bg-primary text-white flex items-center justify-center mb-1">1</div>
//                 Information
//               </div>
//               <div
//                 className={`text-center ${currentStep === 'shipping' ? 'font-bold text-primary' : ''}`}
//                 onClick={() => shippingAddress && setCurrentStep('shipping')}
//               >
//                 <div className={`w-8 h-8 mx-auto rounded-full ${shippingAddress ? 'bg-primary' : 'bg-gray-300'} text-white flex items-center justify-center mb-1`}>2</div>
//                 Shipping
//               </div>
//               <div
//                 className={`text-center ${currentStep === 'payment' ? 'font-bold text-primary' : ''}`}
//                 onClick={() => shippingMethod && setCurrentStep('payment')}
//               >
//                 <div className={`w-8 h-8 mx-auto rounded-full ${shippingMethod ? 'bg-primary' : 'bg-gray-300'} text-white flex items-center justify-center mb-1`}>3</div>
//                 Payment
//               </div>
//             </div>

//             {/* Current step content */}
//             {currentStep === 'information' && (
//               <InformationStep
//                 customer={customer}
//                 setCustomer={setCustomer}
//                 shippingAddress={shippingAddress}
//                 setShippingAddress={setShippingAddress}
//                 billingAddress={billingAddress}
//                 setBillingAddress={setBillingAddress}
//                 onContinue={() => setCurrentStep('shipping')}
//               />
//             )}

//             {currentStep === 'shipping' && (
//               <ShippingStep
//                 shippingMethod={shippingMethod}
//                 setShippingMethod={setShippingMethod}
//                 onContinue={() => setCurrentStep('payment')}
//                 onBack={() => setCurrentStep('information')}
//               />
//             )}

//             {currentStep === 'payment' && (
//               <PaymentStep
//                 paymentMethod={paymentMethod}
//                 setPaymentMethod={setPaymentMethod}
//                 orderNotes={orderNotes}
//                 setOrderNotes={setOrderNotes}
//                 onPlaceOrder={handlePlaceOrder}
//                 onBack={() => setCurrentStep('shipping')}
//               />
//             )}
//           </div>
//         </div>

//         {/* Right side - Order summary */}
//         <div className="md:w-1/3">
//           <div className="bg-gray-50 p-6 rounded-lg sticky top-40">
//             <h2 className="text-lg font-bold mb-4">Order Summary</h2>

//             {/* Cart items */}
//             <div className="mb-4 space-y-4">
//               {cartItems.map(item => (
//                 <div key={item.variant_id} className="flex gap-4">
//                   <div className="w-16 h-16 bg-gray-200 rounded-md overflow-hidden">
//                     {item.product?.thumbnail_image_url && (
//                       <Image
//                         src={item.product?.thumbnail_image_url || item?.variant?.image_url || '/cdn-imgs/not-available.png'}
//                         alt={item.product?.name || 'Product'}
//                         className="w-full h-full object-cover"
//                         height={100}
//                         width={100}
//                       />
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <h3 className="font-medium">{item.product?.name}</h3>
//                     <p className="text-sm text-gray-600">
//                       {Object.entries(item.variant_attributes).map(([key, value]) => (
//                         <span key={key} className="mr-2">{key}: {value}</span>
//                       ))}
//                     </p>
//                     <p className="text-sm">Qty: {item.quantity}</p>
//                   </div>
//                   <div className="font-medium">
//                     ₹{(item.price_at_purchase * item.quantity).toFixed(2)}
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Order notes */}
//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">Order Notes</label>
//               <textarea
//                 value={orderNotes}
//                 onChange={(e) => setOrderNotes(e.target.value)}
//                 className="w-full p-2 border rounded text-sm"
//                 rows={2}
//                 placeholder="Special instructions, delivery notes, etc."
//               />
//             </div>

//             {/* Order totals */}
//             <div className="border-t pt-4">
//               <div className="flex justify-between mb-2">
//                 <span>Subtotal</span>
//                 <span>₹{subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Shipping</span>
//                 <span>{shipping ? `₹${shipping.toFixed(2)}` : 'Calculated at next step'}</span>
//               </div>
//               <div className="flex justify-between mb-2">
//                 <span>Tax</span>
//                 <span>₹{tax.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
//                 <span>Total</span>
//                 <span>₹{total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const InformationStep = ({
//   customer,
//   setCustomer,
//   shippingAddress,
//   setShippingAddress,
//   billingAddress,
//   setBillingAddress,
//   onContinue
// }: {
//   customer: Customer | null;
//   setCustomer: (customer: Customer) => void;
//   shippingAddress: Address | null;
//   setShippingAddress: (address: Address) => void;
//   billingAddress: Address | null;
//   setBillingAddress: (address: Address) => void;
//   onContinue: () => void;
// }) => {
//   const [useSameForBilling, setUseSameForBilling] = useState(true);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-6">Contact Information</h2>

//       {/* Customer form */}
//       <div className="mb-8">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">First Name*</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               value={customer?.first_name || ''}
//               onChange={(e) => setCustomer({ ...customer!, first_name: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Last Name*</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               value={customer?.last_name || ''}
//               onChange={(e) => setCustomer({ ...customer!, last_name: e.target.value })}
//               required
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Email*</label>
//           <input
//             type="email"
//             className="w-full p-2 border rounded"
//             value={customer?.email || ''}
//             onChange={(e) => setCustomer({ ...customer!, email: e.target.value })}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Phone*</label>
//           <input
//             type="tel"
//             className="w-full p-2 border rounded"
//             value={customer?.phone || ''}
//             onChange={(e) => setCustomer({ ...customer!, phone: e.target.value })}
//             required
//           />
//         </div>
//       </div>

//       <h2 className="text-xl font-bold mb-6">Shipping Address</h2>

//       {/* Shipping address form */}
//       <div className="mb-8">
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Recipient Name*</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={shippingAddress?.recipient_name || ''}
//             onChange={(e) => setShippingAddress({ ...shippingAddress!, recipient_name: e.target.value })}
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Street Address*</label>
//           <input
//             type="text"
//             className="w-full p-2 border rounded"
//             value={shippingAddress?.street || ''}
//             onChange={(e) => setShippingAddress({ ...shippingAddress!, street: e.target.value })}
//             required
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">City*</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               value={shippingAddress?.city || ''}
//               onChange={(e) => setShippingAddress({ ...shippingAddress!, city: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">State*</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               value={shippingAddress?.state || ''}
//               onChange={(e) => setShippingAddress({ ...shippingAddress!, state: e.target.value })}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium mb-1">Postal Code*</label>
//             <input
//               type="text"
//               className="w-full p-2 border rounded"
//               value={shippingAddress?.postal_code || ''}
//               onChange={(e) => setShippingAddress({ ...shippingAddress!, postal_code: e.target.value })}
//               required
//             />
//           </div>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Country*</label>
//           <select
//             className="w-full p-2 border rounded"
//             value={shippingAddress?.country || ''}
//             onChange={(e) => setShippingAddress({ ...shippingAddress!, country: e.target.value })}
//             required
//           >
//             <option value="">Select Country</option>
//             <option value="India">India</option>
//             <option value="United States">United States</option>
//             {/* More countries */}
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Contact Number*</label>
//           <input
//             type="tel"
//             className="w-full p-2 border rounded"
//             value={shippingAddress?.contact_number || ''}
//             onChange={(e) => setShippingAddress({ ...shippingAddress!, contact_number: e.target.value })}
//             required
//           />
//         </div>
//       </div>

//       {/* Billing address */}
//       <div className="mb-6">
//         <label className="flex items-center">
//           <input
//             type="checkbox"
//             className="mr-2"
//             checked={useSameForBilling}
//             onChange={(e) => setUseSameForBilling(e.target.checked)}
//           />
//           Billing address is the same as shipping address
//         </label>
//       </div>

//       {!useSameForBilling && (
//         <div className="mb-8">
//           <h2 className="text-xl font-bold mb-6">Billing Address</h2>
//           {/* Similar form fields as shipping address */}
//         </div>
//       )}

//       <button
//         className="w-full bg-primary text-white py-3 rounded font-medium"
//         onClick={onContinue}
//       >
//         Continue to Shipping
//       </button>
//     </div>
//   );
// };

// const ShippingStep = ({
//   shippingMethod,
//   setShippingMethod,
//   onContinue,
//   onBack
// }: {
//   shippingMethod: ShippingCarrier | null;
//   setShippingMethod: (method: ShippingCarrier) => void;
//   onContinue: () => void;
//   onBack: () => void;
// }) => {
//   const shippingOptions = [
//     { carrier: ShippingCarrier.FedEx, name: 'FedEx Standard', price: 5.99, estDelivery: '2-5 business days' },
//     { carrier: ShippingCarrier.UPS, name: 'UPS Express', price: 12.99, estDelivery: '1-3 business days' },
//     { carrier: ShippingCarrier.BlueDart, name: 'BlueDart Premium', price: 8.99, estDelivery: '3-7 business days' },
//   ];

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-6">Shipping Method</h2>

//       <div className="space-y-4 mb-8">
//         {shippingOptions.map(option => (
//           <div
//             key={option.carrier}
//             className={`p-4 border rounded cursor-pointer ${shippingMethod === option.carrier ? 'border-primary bg-primary/10' : 'hover:border-gray-400'}`}
//             onClick={() => setShippingMethod(option.carrier)}
//           >
//             <div className="flex justify-between items-center">
//               <div>
//                 <h3 className="font-medium">{option.name}</h3>
//                 <p className="text-sm text-gray-600">{option.estDelivery}</p>
//               </div>
//               <div className="font-medium">₹{option.price.toFixed(2)}</div>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="flex gap-4">
//         <button
//           className="flex-1 bg-gray-200 text-gray-800 py-3 rounded font-medium"
//           onClick={onBack}
//         >
//           Back
//         </button>
//         <button
//           className="flex-1 bg-primary text-white py-3 rounded font-medium disabled:bg-gray-400"
//           onClick={onContinue}
//           disabled={!shippingMethod}
//         >
//           Continue to Payment
//         </button>
//       </div>
//     </div>
//   );
// };

// const PaymentStep = ({
//   paymentMethod,
//   setPaymentMethod,
//   orderNotes,
//   setOrderNotes,
//   onPlaceOrder,
//   onBack
// }: {
//   paymentMethod: PaymentMethod | null;
//   setPaymentMethod: (method: PaymentMethod) => void;
//   orderNotes: string;
//   setOrderNotes: (notes: string) => void;
//   onPlaceOrder: () => void;
//   onBack: () => void;
// }) => {
//   const paymentOptions = [
//     { method: PaymentMethod.Credit_Card, name: 'Credit Card', icon: '💳' },
//     { method: PaymentMethod.UPI, name: 'UPI', icon: '📱' },
//     { method: PaymentMethod.Net_Banking, name: 'Net Banking', icon: '🏦' },
//     { method: PaymentMethod.COD, name: 'Cash on Delivery', icon: '💰' },
//   ];

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-6">Payment Method</h2>

//       <div className="space-y-4 mb-8">
//         {paymentOptions.map(option => (
//           <div
//             key={option.method}
//             className={`p-4 border rounded cursor-pointer ${paymentMethod === option.method ? 'border-primary bg-primary/10' : 'hover:border-gray-400'}`}
//             onClick={() => setPaymentMethod(option.method)}
//           >
//             <div className="flex items-center gap-3">
//               <span className="text-xl">{option.icon}</span>
//               <span className="font-medium">{option.name}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Payment details form - would conditionally render based on selected method */}
//       {paymentMethod === PaymentMethod.Credit_Card && (
//         <div className="mb-8 p-4 border rounded">
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Card Number</label>
//             <input type="text" className="w-full p-2 border rounded" placeholder="1234 5678 9012 3456" />
//           </div>
//           <div className="grid grid-cols-2 gap-4 mb-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">Expiry Date</label>
//               <input type="text" className="w-full p-2 border rounded" placeholder="MM/YY" />
//             </div>
//             <div>
//               <label className="block text-sm font-medium mb-1">CVV</label>
//               <input type="text" className="w-full p-2 border rounded" placeholder="123" />
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Name on Card</label>
//             <input type="text" className="w-full p-2 border rounded" placeholder="John Doe" />
//           </div>
//         </div>
//       )}

//       <div className="flex gap-4">
//         <button
//           className="flex-1 bg-gray-200 text-gray-800 py-3 rounded font-medium"
//           onClick={onBack}
//         >
//           Back
//         </button>
//         <button
//           className="flex-1 bg-primary text-white py-3 rounded font-medium disabled:bg-gray-400"
//           onClick={onPlaceOrder}
//           disabled={!paymentMethod}
//         >
//           Place Order
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
