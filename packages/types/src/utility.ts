// For API responses
export type ApiResponse<T> = {
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
  error?: string;
};

// For paginated lists
export type Paginated<T> = {
  items: T[];
  total: number;
  page: number;
  limit: number;
};

// For filter/sort options
export interface ProductFilterOptions {
  category_id?: string;
  price_min?: number;
  price_max?: number;
  in_stock?: boolean;
  attributes?: Record<string, string[]>; // { Color: ['Red', 'Blue'] }
  sort_by?: 'price' | 'newest' | 'popular';
  sort_order?: 'asc' | 'desc';
  search_query?: string;
}