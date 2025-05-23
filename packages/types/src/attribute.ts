import { BaseEntity } from "./core";
import { ProductVariant } from "./product";

export interface Attribute extends BaseEntity {
  name: string;
  values?: AttributeValue[];
  display_order?: number; // For UI sorting
}

export interface AttributeValue extends BaseEntity {
  attribute_id: string;
  attribute?: Attribute;
  value: string;
  display_order?: number;
  variants?: ProductVariant[]; // Variants using this value
}

// Join table type (if needed in frontend)
export interface VariantAttributeValue {
  variant_id: string;
  attribute_value_id: string;
  variant?: ProductVariant;
  attribute_value?: AttributeValue;
}