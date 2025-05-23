import { getAllCategories } from "@repo/db"; 
import { Category } from "@repo/db/types"; 
import { create } from "zustand";

type ProductStore = {
  categories: Category[];
  loading: boolean; // Indicates if categories are currently being fetched
  error: string | null; // Stores any error message during fetch
  /**
   * Fetches categories from the backend.
   * @param force - If true, fetches even if categories already exist in the store. Defaults to false.
   */
  fetchCategories: (force?: boolean) => Promise<void>; // Action to fetch categories
};

// Create the Zustand store
const useCategoryDataStore = create<ProductStore>(
  (set, get) => ({
    // Initial state
    categories: [],
    loading: false, // Start not loading
    error: null, // Start with no error

    // Action to fetch categories from the backend
    fetchCategories: async (force = false) => { // Add force parameter
      // Prevent fetching if already loading
      if (get().loading) {
         console.log("Skipping fetch: Already loading.");
         return;
      }

      // Prevent fetching if categories exist *unless* force is true
      if (!force && get().categories.length > 0) {
         console.log("Skipping fetch: Categories exist and force is false.");
         return;
      }

      // Set loading state to true and clear any previous errors
      set({ loading: true, error: null });
      console.log(`Fetching categories... (force=${force})`); // Log start

      try {
        // Call the API function to get categories
        const response = await getAllCategories();
        console.log("Fetched categories response:", response); // Log the raw response

        // Check if the response is valid (adjust based on your API structure)
        if (response && Array.isArray(response)) {
          // Update the store with fetched categories and set loading to false
          set({ categories: response, loading: false });
          console.log("Categories updated in store.");
        } else {
            // Handle cases where the response might be unexpected but not an error
            console.warn("Received unexpected response format:", response);
            set({ loading: false, error: "Received unexpected data format." });
        }

      } catch (error) {
        // Log the error
        console.error("Failed to fetch categories:", error);

        // Determine the error message
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";

        // Update the store with the error message and set loading to false
        set({ error: errorMessage, loading: false });

        // Reject the promise so components calling this function can also handle the error
        return Promise.reject(new Error(errorMessage));
      }
    }
  }),
)

export default useCategoryDataStore;

