import { Product } from "@/types";
import { create } from "zustand";

interface DataStoreState {
    products: Product[] | null;
    fetchProducts: () => void;
    getProductById: (id: string) => Product | null;
}

const useDataStore = create<DataStoreState>((set, get) => ({
    products: null,

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
            set({ products });

        } catch (error) {
            console.error('Error fetching products', error);
        }
    },
    getProductById: (id: string) => {
        return get().products?.find((product) => product.id === id) || null;
    }
}));

export default useDataStore;