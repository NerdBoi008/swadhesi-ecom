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

export type OrderStatus = 
  | 'Pending' 
  | 'Processing' 
  | 'Shipped' 
  | 'Delivered' 
  | 'Cancelled'
  | 'Returned'
  | 'Refunded';

export type PaymentStatus = 
  | 'Pending' 
  | 'Paid' 
  | 'Refunded'
  | 'Partially_Refunded'
  | 'Failed';

export type PaymentMethod = 
  | 'COD' 
  | 'UPI' 
  | 'Net_Banking'
  | 'Credit_Card'
  | 'Debit_Card'
  | 'Wallet' 
  | 'EMI'
  | 'Gift_Card';

export type ShippingCarrier = 
  | 'FedEx'
  | 'UPS'
  | 'USPS'
  | 'DHL'
  | 'BlueDart' 
  | 'Delhivery'
  | 'Custom';

// Prisma Schema
/*   model Order {
    id               String        @id @default(uuid())
    customer_id      String
    status           OrderStatus
    total_amount     Float
    shipping_address Json // Stored as ShippingAddress type
    billing_address  Json? // Optional
    payment_status   PaymentStatus
    payment_method   PaymentMethod
    shipping_cost    Float
    tax_amount       Float
    discount_amount  Float?
    tracking_number  String?
    carrier          ShippingCarrier?
    notes            String?
    created_at       DateTime      @default(now())
    updated_at       DateTime      @updatedAt
    estimated_delivery DateTime?
    items            OrderItem[]
  }
  
  model OrderItem {
    id         String   @id @default(uuid())
    order      Order    @relation(fields: [order_id], references: [id])
    order_id   String
    product_id String
    variant_id String?
    quantity   Int
    price      Float
    discount   Float?
  } */