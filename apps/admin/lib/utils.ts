import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function to generate a simple SKU from a product name
 * 
 * @param name - name of product
 * @returns SKU (string type)
 */
export const generateSkuFromName = (name: string) : string => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .substring(0, 20) // Limit length
    .toUpperCase(); // Convert to uppercase for typical SKUs
};
