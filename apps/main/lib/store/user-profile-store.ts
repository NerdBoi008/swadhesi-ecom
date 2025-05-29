// src/store/useUserProfileStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { Customer, Address, AddressType } from "@repo/types";

// Import your new Server Actions
import {
    fetchUserProfile as serverFetchUserProfile,
    updateUserProfile as serverUpdateUserProfile,
    addAddress as serverAddAddress,
    updateAddress as serverUpdateAddress,
    deleteAddress as serverDeleteAddress
} from "@repo/db"; 

interface UserProfileStoreState {
  isAuthenticated: boolean;
  user: Customer | null;
  addresses: Address[] | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setAuthStatus: (status: boolean) => void;
  setUser: (user: Customer | null) => void;
  clearUser: () => Promise<void>;
  checkAuthStatus: () => Promise<void>; // To check if user is authenticated via Amplify

  // Actions for profile data
  fetchUserProfile: () => Promise<{ success: boolean; message?: string }>;
  updateUserProfile: (data: Partial<Customer>) => Promise<{ success: boolean; message?: string; errors?: any }>;
  addAddress: (data: Omit<Address, 'id' | 'customer_id'>) => Promise<{ success: boolean; message?: string; errors?: any }>;
  updateAddress: (id: string, data: Partial<Address>) => Promise<{ success: boolean; message?: string; errors?: any }>;
  deleteAddress: (id: string) => Promise<{ success: boolean; message?: string }>;
}

const useUserProfileStore = create<UserProfileStoreState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      addresses: null,
      isLoading: true,
      error: null,

      // --- Authentication Status Actions (No change needed here) ---
      setAuthStatus: (status: boolean) => set({ isAuthenticated: status }),
      setUser: (user: Customer | null) => set({ user, isAuthenticated: !!user, isLoading: false }),

      clearUser: async () => {
        set({ isLoading: true, error: null });
        try {
          await signOut();
          set({ user: null, addresses: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (err: any) {
          console.error("Error signing out:", err);
          set({ error: err.message || "Failed to sign out", isLoading: false });
          set({ user: null, addresses: null, isAuthenticated: false });
        }
      },

      checkAuthStatus: async () => {
        set({ isLoading: true, error: null });
        try {
          const cognitoUser = await getCurrentUser();
          console.log("Current Cognito User for Profile Store:", cognitoUser);

          // If user is authenticated via Cognito, then fetch their full profile from your backend
          const result = await get().fetchUserProfile();
          if (!result.success) {
            throw new Error(result.message || "Failed to fetch user profile after auth check.");
          }

        } catch (err: any) {
          console.log("No active user session or failed to fetch profile:", err);
          set({ user: null, addresses: null, isAuthenticated: false, isLoading: false, error: null });
        }
      },

      // --- User Profile & Address Actions ---

      // fetchUserProfile remains the same as it's the source of truth
      fetchUserProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const authUser = await getCurrentUser();
          if (!authUser) {
            set({ user: null, addresses: null, isAuthenticated: false, isLoading: false, error: "No authenticated user." });
            return { success: false, message: "No authenticated user." };
          }

          const result = await serverFetchUserProfile(); // Call the server action directly

          if (!result.success || !result.user) {
            throw new Error(result.message || "Failed to fetch user profile.");
          }

          set({
            user: {
              ...result.user,
              phone: result.user.phone === null ? undefined : result.user.phone,
              status: typeof result.user.status === "string" ? result.user.status.toLowerCase() as Customer["status"] : result.user.status,
              last_login: result.user.last_login === null ? undefined : result.user.last_login,
              total_spent: result.user.total_spent === null || result.user.total_spent === undefined
                ? undefined
                : typeof result.user.total_spent === "object" && "toNumber" in result.user.total_spent
                  ? result.user.total_spent.toNumber()
                  : Number(result.user.total_spent),
              order_count: result.user.order_count === null ? undefined : result.user.order_count,
              notes: result.user.notes === null ? undefined : result.user.notes,
            },
            addresses: (result.addresses || []).map(addr => ({
              ...addr,
              customer_id: addr.customer_id === null ? undefined : addr.customer_id,
              is_default: addr.is_default === null ? undefined : addr.is_default,
              type: addr.type === null ? undefined : 
                addr.type === 'Shipping' ? AddressType.Shipping :
                addr.type === 'Billing' ? AddressType.Billing :
                AddressType.Both,
            })),
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return { success: true };

        } catch (err: any) {
          console.error("Error fetching user profile:", err);
          set({ error: err.message || "Failed to load user profile", isLoading: false });
          return { success: false, message: err.message || "Failed to load user profile." };
        }
      },

      // updateUserProfile will trigger a refetch of the entire profile
      updateUserProfile: async (data: Partial<Customer>) => {
        set({ isLoading: true, error: null });
        try {
          const result = await serverUpdateUserProfile(data);

          if (!result.success || !result.user) {
            throw new Error(result.message || "Failed to update profile.");
          }

          // **CRUCIAL: Trigger a refetch after successful update**
          const refetchResult = await get().fetchUserProfile();
          if (!refetchResult.success) {
              console.warn("Failed to refetch profile after update, state might be stale.", refetchResult.message);
              // Decide if you want to throw here or just return success
              return { success: true, message: result.message + " (Data might be stale due to refetch error)" };
          }

          return { success: true, message: result.message };

        } catch (err: any) {
          console.error("Error updating user profile:", err);
          set({ error: err.message || "Failed to update profile", isLoading: false });
          return { success: false, message: err.message || "Failed to update profile.", errors: err.errors };
        } finally {
            // Ensure isLoading is reset even if refetch failed
            set({ isLoading: false });
        }
      },

      // addAddress will trigger a refetch of the entire profile
      addAddress: async (data: Omit<Address, 'id' | 'customer_id'>) => {
        set({ isLoading: true, error: null });
        try {
          const transformedData = {
            ...data,
            type: data.type === AddressType.Shipping ? 'Shipping' as const :
                  data.type === AddressType.Billing ? 'Billing' as const :
                  data.type === AddressType.Both ? 'Both' as const : undefined
          };
          const result = await serverAddAddress(transformedData);

          if (!result.success || !result.address) {
            throw new Error(result.message || "Failed to add address.");
          }

          // **CRUCIAL: Trigger a refetch after successful add**
          const refetchResult = await get().fetchUserProfile();
          if (!refetchResult.success) {
              console.warn("Failed to refetch profile after adding address, state might be stale.", refetchResult.message);
              return { success: true, message: result.message + " (Data might be stale due to refetch error)" };
          }

          return { success: true, message: result.message };

        } catch (err: any) {
          console.error("Error adding address:", err);
          set({ error: err.message || "Failed to add address", isLoading: false });
          return { success: false, message: err.message || "Failed to add address.", errors: err.errors };
        } finally {
            set({ isLoading: false });
        }
      },

      // updateAddress will trigger a refetch of the entire profile
      updateAddress: async (id: string, data: Partial<Address>) => {
        set({ isLoading: true, error: null });
        try {
          const transformedData = {
            ...data,
            type: data.type === AddressType.Shipping ? 'Shipping' as const :
                  data.type === AddressType.Billing ? 'Billing' as const :
                  data.type === AddressType.Both ? 'Both' as const : undefined
          };
          const result = await serverUpdateAddress(id, transformedData);

          if (!result.success || !result.address) {
            throw new Error(result.message || "Failed to update address.");
          }

          // **CRUCIAL: Trigger a refetch after successful update**
          const refetchResult = await get().fetchUserProfile();
          if (!refetchResult.success) {
              console.warn("Failed to refetch profile after updating address, state might be stale.", refetchResult.message);
              return { success: true, message: result.message + " (Data might be stale due to refetch error)" };
          }

          return { success: true, message: result.message };

        } catch (err: any) {
          console.error("Error updating address:", err);
          set({ error: err.message || "Failed to update address", isLoading: false });
          return { success: false, message: err.message || "Failed to update address.", errors: err.errors };
        } finally {
            set({ isLoading: false });
        }
      },

      // deleteAddress will trigger a refetch of the entire profile
      deleteAddress: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const result = await serverDeleteAddress(id);

          if (!result.success) {
            throw new Error(result.message || "Failed to delete address.");
          }

          // **CRUCIAL: Trigger a refetch after successful delete**
          const refetchResult = await get().fetchUserProfile();
          if (!refetchResult.success) {
              console.warn("Failed to refetch profile after deleting address, state might be stale.", refetchResult.message);
              return { success: true, message: result.message + " (Data might be stale due to refetch error)" };
          }

          return { success: true, message: result.message };

        } catch (err: any) {
          console.error("Error deleting address:", err);
          set({ error: err.message || "Failed to delete address", isLoading: false });
          return { success: false, message: err.message || "Failed to delete address." };
        } finally {
            set({ isLoading: false });
        }
      },
    }),
    {
      name: 'user-profile-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        // No change here: continue to avoid persisting full profile data
      }),
    }
  )
);

export default useUserProfileStore;