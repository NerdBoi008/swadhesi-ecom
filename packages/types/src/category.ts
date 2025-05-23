import { BaseEntity } from "./core";
import { Product } from "./product";

export interface Category extends BaseEntity {
  name: string;
  parent_id: string | null;
  parent?: Category; // For nested relationships
  children?: Category[]; // For hierarchical data
  products?: Product[]; // For eager loading
  image_url?: string;
  description?: string;
};