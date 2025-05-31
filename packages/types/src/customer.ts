import { BaseEntity } from "./core";
import { Order } from "./order";

export interface Customer extends BaseEntity {
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  phone?: string;
  addresses?: Address[];
  orders?: Order[];
  is_guest: boolean;
  status?: CustomerStatus;
  last_login?: Date;
  total_spent?: number;
  order_count?: number;
  notes?: string;
  notification_preferences: NotificationPreferences;
}

export enum CustomerStatus {
  Active,
  Inactive,
  Banned,
  Suspended
}

export interface NotificationPreferences {
  id: string;
  customer_id: string;
  email: boolean;
  sms: boolean;
  marketing: boolean;
  order_updates: boolean;
  promotions: boolean;
  newsletters: boolean;
  feedback_requests: boolean;
  account_notifications: boolean;
}

export interface Address {
  id: string;
  customer_id: string;
  recipient_name: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  contact_number: string;
  is_default?: boolean;
  type?: AddressType;
}

export enum AddressType {
  Shipping = 'shipping',
  Billing = 'billing',
  Both = 'both'
}