import { Category, Product } from "@repo/types";
import { create } from "zustand";

interface DataStoreState {
    products: Product[] | null;
    categories: Category[] | null;
    fetchProducts: () => void;
    fetchCetegory: () => void;
    getProductById: (id: string) => Product | null;
}

const useDataStore = create<DataStoreState>((set, get) => ({
    products: null,
    categories: null,

    fetchProducts: async () => {
        // Check if categories are already loaded
        if (get().products) {
            return;
        }

        try {
            const response = await fetch('/api/products');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const products = await response.json();
            console.error('Fetched products', products);
            set({ products });

        } catch (error) {
            console.error('Error fetching products', error);
        }
    },
    
    getProductById: (id: string) => {
        return get().products?.find((product) => product.id === id) || null;
    },

    fetchCetegory: async () => {
        // Check if categories are already loaded
        if (get().categories) {
            return;
        }
        try {
            const response = await fetch('/api/categories');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const categories = await response.json();
            set({ categories });

        } catch (error) {
            console.error('Error fetching categories', error);
        }
    }
}));

export default useDataStore;