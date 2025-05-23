import { BaseEntity } from "./core";
import { Order } from "./order";

// export interface Customer extends BaseEntity {
//   first_name: string;
//   last_name: string;
//   email: string;
//   password_hash: string;
//   phone?: string;
//   addresses?: Address[];
//   orders?: Order[];
//   is_guest: boolean;
// }

export interface Customer extends BaseEntity {
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  password_hash: string;
  phone?: string;
  addresses?: Address[];
  orders?: Order[];
  is_guest: boolean;
  status?: 'active' | 'inactive' | 'banned';
  last_login?: Date;
  total_spent?: number;
  order_count?: number;
  notes?: string;
}

export interface Address {
  id?: string;
  customer_id?: number | null;
  recipient_name: string;
  street: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  contact_number: string;
  is_default?: boolean;
  type?: 'shipping' | 'billing';
}