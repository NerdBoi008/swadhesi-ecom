import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  signOut,
  fetchAuthSession,
  deleteUser as amplifyDeleteUser,
} from "aws-amplify/auth"; // Keep client-side Amplify imports
import {
  Customer,
  Address,
  AddressType,
  BaseEntity,
  NotificationPreferences,
} from "@repo/types"; // Assuming @repo/types is correct

// Import your server actions (which now expect a Headers object)
import {
  fetchUserProfile as serverFetchUserProfile,
  updateUserProfile as serverUpdateUserProfile,
  addAddress as serverAddAddress,
  updateAddress as serverUpdateAddress,
  deleteAddress as serverDeleteAddress,
  deleteUser as serverDeleteUser,
  updateNotificationPreferences as serverUpdateNotificationPreferences,
} from "@repo/db"; // Ensure this path is correct for your server actions

interface UserProfileStoreState {
  isAuthenticated: boolean;
  user: (Customer & BaseEntity) | null;
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
  updateUserProfile: (
    data: Partial<Customer>
  ) => Promise<{ success: boolean; message?: string; errors?: any }>;
  addAddress: (
    data: Omit<Address, "id" | "customer_id">
  ) => Promise<{ success: boolean; message?: string; errors?: any }>;
  updateAddress: (
    id: string,
    data: Partial<Address>
  ) => Promise<{ success: boolean; message?: string; errors?: any }>;
  deleteAddress: (
    id: string
  ) => Promise<{ success: boolean; message?: string }>;
  deleteUser: () => Promise<{ success: boolean; message?: string }>;

  updateNotificationPreferences: (
    preferences: Omit<NotificationPreferences, "id">
  ) => Promise<{ success: boolean; message?: string; errors?: any }>;
}

const useUserProfileStore = create<UserProfileStoreState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      addresses: null,
      isLoading: true,
      error: null,

      // --- Authentication Status Actions ---
      setAuthStatus: (status: boolean) => set({ isAuthenticated: status }),
      setUser: (user: Customer | null) =>
        set({ user, isAuthenticated: !!user, isLoading: false }),

      clearUser: async () => {
        set({ isLoading: true, error: null });
        try {
          // Call client-side signOut to clear Amplify's session
          await signOut();
          set({
            user: null,
            addresses: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
          });
        } catch (err: any) {
          console.error("Error signing out:", err);
          set({ error: err.message || "Failed to sign out", isLoading: false });
          set({ user: null, addresses: null, isAuthenticated: false });
        }
      },

      // This action now performs client-side Amplify check and then calls server action with token
      checkAuthStatus: async () => {
        set({ isLoading: true, error: null });
        try {
          // First, check client-side Amplify auth status and get the token
          const session = await fetchAuthSession();
          const idToken = session.tokens?.idToken?.toString();

          if (!idToken) {
            // If no ID token, the user is not authenticated client-side
            console.log("No active Amplify session found.");
            set({
              user: null,
              addresses: null,
              isAuthenticated: false,
              isLoading: false,
              error: null,
            });
            return;
          }

          // Now, fetch the user profile from your backend using the server action
          // The server action will validate this token.
          const result = await serverFetchUserProfile(idToken); // Pass headers to server action

          if (result.success && result.user) {
            set({
              user: {
                ...result.user,
                phone:
                  result.user.phone === null ? undefined : result.user.phone,
                status:
                  typeof result.user.status === "string"
                    ? (result.user.status as Customer["status"])
                    : result.user.status,
                last_login:
                  result.user.last_login === null
                    ? undefined
                    : result.user.last_login,
                total_spent:
                  result.user.total_spent === null ||
                  result.user.total_spent === undefined
                    ? undefined
                    : typeof result.user.total_spent === "object" &&
                        "toNumber" in result.user.total_spent
                      ? result.user.total_spent
                      : Number(result.user.total_spent),
                order_count:
                  result.user.order_count === null
                    ? undefined
                    : result.user.order_count,
                notes:
                  result.user.notes === null ? undefined : result.user.notes,
                notification_preferences: result.notificationPreferences || {
                  id: "",
                  customer_id: "",
                  email: false,
                  sms: false,
                  marketing: false,
                  order_updates: false,
                  promotions: false,
                  newsletters: false,
                  feedback_requests: false,
                  account_notifications: false,
                },
                orders: result.user.orders || [],
              },
              addresses: (result.addresses || []).map((addr) => ({
                ...addr,
                customer_id: addr.customer_id === null ? "" : addr.customer_id,
                is_default:
                  addr.is_default === null ? undefined : addr.is_default,
                type:
                  addr.type === null
                    ? undefined
                    : addr.type === "shipping"
                      ? AddressType.Shipping
                      : addr.type === "billing"
                        ? AddressType.Billing
                        : AddressType.Both,
              })),
              isAuthenticated: true,
              error: null,
            });
          } else {
            // If server action reports failure (e.g., token invalid or user not found in DB)
            console.log(
              "Failed to fetch user profile via server action:",
              result.message
            );
            set({
              user: null,
              addresses: null,
              isAuthenticated: false,
              error: result.message || null,
            });
          }
        } catch (err: any) {
          console.error("Error in checkAuthStatus (client-side):", err);
          // Catch errors during fetchAuthSession or server action call
          set({
            user: null,
            addresses: null,
            isAuthenticated: false,
            isLoading: false,
            error: err.message || "Failed to check auth status.",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      // --- User Profile & Address Actions ---

      // All profile/address related actions now get the token and pass headers to server actions
      fetchUserProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const session = await fetchAuthSession();
          const idToken = session.tokens?.idToken?.toString();

          if (!idToken) {
            set({
              user: null,
              addresses: null,
              isAuthenticated: false,
              isLoading: false,
              error: "No authenticated user session found.",
            });
            return {
              success: false,
              message: "No authenticated user session found.",
            };
          }

          const result = await serverFetchUserProfile(idToken); // Pass headers

          if (!result.success || !result.user) {
            throw new Error(result.message || "Failed to fetch user profile.");
          }

          set({
            user: {
              ...result.user,
              phone: result.user.phone === null ? undefined : result.user.phone,
              status:
                typeof result.user.status === "string"
                  ? (result.user.status as Customer["status"])
                  : result.user.status,
              last_login:
                result.user.last_login === null
                  ? undefined
                  : result.user.last_login,
              total_spent:
                result.user.total_spent === null ||
                result.user.total_spent === undefined
                  ? undefined
                  : typeof result.user.total_spent === "object" &&
                      "toNumber" in result.user.total_spent
                    ? result.user.total_spent
                    : Number(result.user.total_spent),
              order_count:
                result.user.order_count === null
                  ? undefined
                  : result.user.order_count,
              notes: result.user.notes === null ? undefined : result.user.notes,
              notification_preferences: result.notificationPreferences || {
                id: "",
                customer_id: "",
                email: false,
                sms: false,
                marketing: false,
                order_updates: false,
                promotions: false,
                newsletters: false,
                feedback_requests: false,
                account_notifications: false,
              },
              orders: result.user.orders || [],
            },
            addresses: (result.addresses || []).map((addr) => ({
              ...addr,
              customer_id: addr.customer_id === null ? "" : addr.customer_id,
              is_default:
                addr.is_default === null ? undefined : addr.is_default,
              type:
                addr.type === null
                  ? undefined
                  : addr.type === "shipping"
                    ? AddressType.Shipping
                    : addr.type === "billing"
                      ? AddressType.Billing
                      : AddressType.Both,
            })),
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
          return { success: true };
        } catch (err: any) {
          console.error("Error fetching user profile:", err);
          set({
            error: err.message || "Failed to load user profile",
            isLoading: false,
          });
          return {
            success: false,
            message: err.message || "Failed to load user profile.",
          };
        }
      },

      updateUserProfile: async (data: Partial<Customer>) => {
        set({ isLoading: true, error: null });
        try {
          const session = await fetchAuthSession();
          const idToken = session.tokens?.idToken?.toString();
          if (!idToken) throw new Error("Authentication required.");

          const result = await serverUpdateUserProfile(idToken, data); // Pass headers and data

          if (!result.success || !result.user) {
            throw new Error(result.message || "Failed to update profile.");
          }

          // Re-fetch the full profile to ensure the store is in sync
          const refetchResult = await get().fetchUserProfile();
          if (!refetchResult.success) {
            console.warn(
              "Failed to refetch profile after update, state might be stale.",
              refetchResult.message
            );
            return {
              success: true,
              message:
                result.message + " (Data might be stale due to refetch error)",
            };
          }

          return { success: true, message: result.message };
        } catch (err: any) {
          console.error("Error updating user profile:", err);
          set({
            error: err.message || "Failed to update profile",
            isLoading: false,
          });
          return {
            success: false,
            message: err.message || "Failed to update profile.",
            errors: err.errors,
          };
        } finally {
          set({ isLoading: false });
        }
      },

      addAddress: async (data: Omit<Address, "id" | "customer_id">) => {
        set({ isLoading: true, error: null });
        try {
          const session = await fetchAuthSession();
          const idToken = session.tokens?.idToken?.toString();
          if (!idToken) throw new Error("Authentication required.");

          const transformedData = {
            ...data,
            type:
              data.type === AddressType.Shipping
                ? ("Shipping" as const)
                : data.type === AddressType.Billing
                  ? ("Billing" as const)
                  : data.type === AddressType.Both
                    ? ("Both" as const)
                    : undefined,
          };
          const result = await serverAddAddress(idToken, transformedData); // Pass headers and data

          if (!result.success || !result.address) {
            throw new Error(result.message || "Failed to add address.");
          }

          const refetchResult = await get().fetchUserProfile();
          if (!refetchResult.success) {
            console.warn(
              "Failed to refetch profile after adding address, state might be stale.",
              refetchResult.message
            );
            return {
              success: true,
              message:
                result.message + " (Data might be stale due to refetch error)",
            };
          }

          return { success: true, message: result.message };
        } catch (err: any) {
          console.error("Error adding address:", err);
          set({
            error: err.message || "Failed to add address",
            isLoading: false,
          });
          return {
            success: false,
            message: err.message || "Failed to add address.",
            errors: err.errors,
          };
        } finally {
          set({ isLoading: false });
        }
      },

      updateAddress: async (id: string, data: Partial<Address>) => {
        set({ isLoading: true, error: null });
        try {
          const session = await fetchAuthSession();
          const idToken = session.tokens?.idToken?.toString();
          if (!idToken) throw new Error("Authentication required.");

          const transformedData = {
            ...data,
            type:
              data.type === AddressType.Shipping
                ? ("Shipping" as const)
                : data.type === AddressType.Billing
                  ? ("Billing" as const)
                  : data.type === AddressType.Both
                    ? ("Both" as const)
                    : undefined,
          };
          const result = await serverUpdateAddress(
            idToken,
            id,
            transformedData
          ); // Pass headers, id, and data

          if (!result.success || !result.address) {
            throw new Error(result.message || "Failed to update address.");
          }

          const refetchResult = await get().fetchUserProfile();
          if (!refetchResult.success) {
            console.warn(
              "Failed to refetch profile after updating address, state might be stale.",
              refetchResult.message
            );
            return {
              success: true,
              message:
                result.message + " (Data might be stale due to refetch error)",
            };
          }

          return { success: true, message: result.message };
        } catch (err: any) {
          console.error("Error updating address:", err);
          set({
            error: err.message || "Failed to update address",
            isLoading: false,
          });
          return {
            success: false,
            message: err.message || "Failed to update address.",
            errors: err.errors,
          };
        } finally {
          set({ isLoading: false });
        }
      },

      deleteAddress: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
          const session = await fetchAuthSession();
          const idToken = session.tokens?.idToken?.toString();
          if (!idToken) throw new Error("Authentication required.");

          const result = await serverDeleteAddress(idToken, id); // Pass headers and id

          if (!result.success) {
            throw new Error(result.message || "Failed to delete address.");
          }

          const refetchResult = await get().fetchUserProfile();
          if (!refetchResult.success) {
            console.warn(
              "Failed to refetch profile after deleting address, state might be stale.",
              refetchResult.message
            );
            return {
              success: true,
              message:
                result.message + " (Data might be stale due to refetch error)",
            };
          }

          return { success: true, message: result.message };
        } catch (err: any) {
          console.error("Error deleting address:", err);
          set({
            error: err.message || "Failed to delete address",
            isLoading: false,
          });
          return {
            success: false,
            message: err.message || "Failed to delete address.",
          };
        } finally {
          set({ isLoading: false });
        }
      },
      deleteUser: async () => {
        set({ isLoading: true, error: null });
        try {
          // Get current session token
          const session = await fetchAuthSession();
          const idToken = session.tokens?.idToken?.toString();
          if (!idToken) {
            throw new Error("Authentication required.");
          }

          // Delete the user's database record first
          const result = await serverDeleteUser(idToken);
          if (!result.success) {
            throw new Error(result.message || "Failed to delete user record.");
          }

          // Delete Cognito user
          await amplifyDeleteUser();

          // Clear local state
          set({
            user: null,
            addresses: null,
            isAuthenticated: false,
            error: null,
            isLoading: false,
          });

          // Clear any persisted data
          localStorage.removeItem("user-profile-storage");

          return {
            success: true,
            message: "Account successfully deleted.",
          };
        } catch (error: any) {
          console.error("Error deleting user:", error);
          set({
            error: error.message || "Failed to delete account",
            isLoading: false,
          });
          return {
            success: false,
            message: error.message || "Failed to delete account.",
          };
        } finally {
          set({ isLoading: false });
        }
      },
      updateNotificationPreferences: async (preferences) => {
        set({ isLoading: true, error: null });
        try {
          const session = await fetchAuthSession();
          const idToken = session.tokens?.idToken?.toString();
          if (!idToken) throw new Error("Authentication required.");

          // Update the profile with notification preferences
          const result = await serverUpdateNotificationPreferences(idToken, preferences);

          if (!result.success) {
            throw new Error(
              result.message || "Failed to update notification preferences."
            );
          }

          // Re-fetch the full profile to ensure the store is in sync
          const refetchResult = await get().fetchUserProfile();
          if (!refetchResult.success) {
            console.warn(
              "Failed to refetch profile after updating preferences, state might be stale.",
              refetchResult.message
            );
          }

          return {
            success: true,
            message: "Notification preferences updated successfully",
          };
        } catch (err: any) {
          console.error("Error updating notification preferences:", err);
          set({
            error: err.message || "Failed to update notification preferences",
            isLoading: false,
          });
          return {
            success: false,
            message: err.message || "Failed to update notification preferences",
            errors: err.errors,
          };
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "user-profile-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        // Continue to avoid persisting full profile data for security and freshness
      }),
    }
  )
);

export default useUserProfileStore;
