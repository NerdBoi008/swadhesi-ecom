import { BaseEntity } from "./core";
import { Customer, Address } from "./customer";
import { Product, ProductVariant } from "./product";

export interface Order extends BaseEntity {
  customer_id: string | null;
  customer?: Customer;
  status: OrderStatus;
  total_amount: number;
  shipping_address: Address | string; // Can be object or serialized
  billing_address?: Address | string;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  shipping_cost: number;
  tax_amount: number;
  discount_amount?: number;
  tracking_number?: string;
  carrier?: ShippingCarrier;
  notes?: string;
  estimated_delivery?: Date;
  items: OrderItem[];
  coupon_code?: string;
}

interface OrderItem {
  id?: string;
  order_id: string;
  product_id: string;
  variant_id: string;
  product?: Product; 
  variant?: ProductVariant;
  quantity: number;
  price_at_purchase: number;
  variant_sku: string;
  variant_attributes: Record<string, string>; // { Size: '4T', Color: 'Blue' }
  refunded_quantity?: number;
  refund_amount?: number;
}

export enum OrderStatus {
  Pending,
  Processing,
  Shipped,
  Delivered,
  Cancelled,
  Returned,
  Refunded,
}

export enum PaymentStatus {
  Pending,
  Paid,
  Refunded,
  Partially_Refunded,
  Failed,
}

export enum PaymentMethod {
  COD,
  UPI,
  Net_Banking,
  Credit_Card,
  Debit_Card,
  Wallet,
  EMI,
  Gift_Card,
}

export enum ShippingCarrier {
  FedEx,
  UPS,
  USPS,
  DHL,
  BlueDart,
  Delhivery,
  Custom,
  Porter,
  Other,
}