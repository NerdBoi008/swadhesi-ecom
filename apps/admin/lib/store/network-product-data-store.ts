import { Product } from "@repo/db/types";
import { create } from "zustand";

type ProductStore = {
  products: Product[];
  featuredProducts: Product[];
  loading: boolean;
  error: string | null;
  selectedCategory: string | null;
  
  /**
   * Fetches all products from the backend
   * @param force - If true, fetches even if products already exist in the store
   */
  fetchAllProducts: (force?: boolean) => Promise<void>;
  
  /**
   * Fetches products by category
   * @param categoryId - The category ID to filter by
   * @param force - If true, fetches even if products for this category already exist
   */
  fetchProductsByCategory: (categoryId: string, force?: boolean) => Promise<void>;
  
  /**
   * Fetches featured products
   */
  fetchFeaturedProducts: () => Promise<void>;
  
  /**
   * Clears the current product selection
   */
  clearProducts: () => void;
};

const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  featuredProducts: [],
  loading: false,
  error: null,
  selectedCategory: null,

  fetchAllProducts: async (force = false) => {
    if (get().loading) {
      console.log("Skipping fetch: Already loading products");
      return;
    }

    if (!force && get().products.length > 0 && get().selectedCategory === null) {
      console.log("Skipping fetch: Products already exist and force is false");
      return;
    }

    set({ loading: true, error: null });
    console.log(`Fetching all products... (force=${force})`);

    try {
      const response = await getAllProducts();
      console.log("Fetched products response:", response);

      if (response && Array.isArray(response)) {
        set({ 
          products: response,
          selectedCategory: null,
          loading: false 
        });
        console.log("All products updated in store");
      } else {
        console.warn("Received unexpected products response format:", response);
        set({ loading: false, error: "Received unexpected data format" });
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: errorMessage, loading: false });
      return Promise.reject(new Error(errorMessage));
    }
  },

  fetchProductsByCategory: async (categoryId, force = false) => {
    if (get().loading) {
      console.log("Skipping fetch: Already loading products");
      return;
    }

    if (!force && 
        get().products.length > 0 && 
        get().selectedCategory === categoryId) {
      console.log("Skipping fetch: Products for this category already exist");
      return;
    }

    set({ loading: true, error: null });
    console.log(`Fetching products for category ${categoryId}... (force=${force})`);

    try {
      const response = await getProductsByCategory(categoryId);
      console.log("Fetched products by category response:", response);

      if (response && Array.isArray(response)) {
        set({ 
          products: response,
          selectedCategory: categoryId,
          loading: false 
        });
        console.log(`Products for category ${categoryId} updated in store`);
      } else {
        console.warn("Received unexpected products response format:", response);
        set({ loading: false, error: "Received unexpected data format" });
      }
    } catch (error) {
      console.error(`Failed to fetch products for category ${categoryId}:`, error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: errorMessage, loading: false });
      return Promise.reject(new Error(errorMessage));
    }
  },

  fetchFeaturedProducts: async () => {
    if (get().loading) {
      console.log("Skipping fetch: Already loading featured products");
      return;
    }

    if (get().featuredProducts.length > 0) {
      console.log("Skipping fetch: Featured products already exist");
      return;
    }

    set({ loading: true, error: null });
    console.log("Fetching featured products...");

    try {
      const response = await getAllProducts({ featured: true });
      console.log("Fetched featured products response:", response);

      if (response && Array.isArray(response)) {
        set({ 
          featuredProducts: response,
          loading: false 
        });
        console.log("Featured products updated in store");
      } else {
        console.warn("Received unexpected featured products response format:", response);
        set({ loading: false, error: "Received unexpected data format" });
      }
    } catch (error) {
      console.error("Failed to fetch featured products:", error);
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      set({ error: errorMessage, loading: false });
      return Promise.reject(new Error(errorMessage));
    }
  },

  clearProducts: () => {
    set({ 
      products: [],
      selectedCategory: null 
    });
    console.log("Cleared products from store");
  }
}));

export default useProductStore;