import { AttributeValue, Attribute } from "./attribute";
import { Category } from "./category";
import { BaseEntity } from "./core";
import { ProductVariantStatus } from '../../db/generated/prisma/index';

export interface Product extends BaseEntity {
  name: string;
  description: string;
  category_id: string;
  category?: Category; // Joined data
  thumbnail_image_url: string;
  images_url: string[];
  variants?: ProductVariant[]; // All available variants
  attributes?: ProductAttribute[]; // All possible attributes
  brand_id?: string;
  meta_title?: string;
  meta_description?: string;
  slug?: string;
  related_products?: string[];
}

export interface ProductVariant extends BaseEntity {
  product_id: string;
  product?: Product; // Parent reference
  sku: string;
  price: number;
  sale_price: number | null;
  stock: number;
  status: ProductVariantStatus;
  size: string;
  image_url?: string | null;
  barcode?: string;
  attribute_values?: AttributeValue[]; // Specific combination
}

export interface ProductAttribute {
  product_id: string;
  attribute_id: string;
  attribute: Attribute;
  values: AttributeValue[];
}

// Specialized type for size handling
// export interface ProductSize {
//   id?: string;
//   label: string; // e.g., "4T", "5T", "Small"
//   system: 'US' | 'EU' | 'UK' | 'Age'; // Size system
//   equivalent?: { // Size conversions
//     us?: string;
//     eu?: string;
//     uk?: string;
//   };
//   description?: string; // e.g., "Fits 4-5 year olds"
// }