import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'; // For persisting auth state
import { getCurrentUser, signOut } from 'aws-amplify/auth'; // Import Amplify auth methods for client-side checks

// Define the shape of your user object (adjust based on what you store in your DB)
interface UserProfile {
  id: string; // Your Prisma Customer ID
  cognitoId: string; // Cognito User ID (sub)
  email: string;
  firstName: string;
  lastName: string;
  // Add other relevant user fields here, e.g., roles, permissions
}

interface AuthStoreState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setAuthStatus: (status: boolean) => void;
  setUser: (user: UserProfile | null) => void;
  clearUser: () => Promise<void>; // Async because signOut is async
  checkAuthStatus: () => Promise<void>; // Async to check current session
}

// Create the Zustand store
const useAuthStore = create<AuthStoreState>()(
  persist( // Use persist middleware to keep state across page refreshes
    (set, get) => ({
      isAuthenticated: false,
      user: null,
      isLoading: true, // Start as true, will be set to false after initial check
      error: null,

      setAuthStatus: (status: boolean) => set({ isAuthenticated: status }),
      setUser: (user: UserProfile | null) => set({ user, isAuthenticated: !!user, isLoading: false }),
      
      clearUser: async () => {
        set({ isLoading: true, error: null });
        try {
          await signOut(); // Call Amplify signOut
          set({ user: null, isAuthenticated: false, error: null, isLoading: false });
        } catch (err: any) {
          console.error("Error signing out:", err);
          set({ error: err.message || "Failed to sign out", isLoading: false });
          // Even on error, clear local state if sign-out might have partially succeeded
          set({ user: null, isAuthenticated: false });
        }
      },

      checkAuthStatus: async () => {
        set({ isLoading: true, error: null });
        try {
          // getCurrentUser will throw if no active session
          const cognitoUser = await getCurrentUser();
          console.log("Current Cognito User:", cognitoUser); // For debugging

          // Now, fetch your user profile from your backend using the cognitoUser.userId (sub)
          // You'll need an API endpoint for this, e.g., /api/profile
          const response = await fetch(`/api/profile?cognitoId=${cognitoUser.userId}`);
          if (!response.ok) {
            // Handle cases where user might be in Cognito but not in your DB yet (e.g., initial setup)
            throw new Error(`Failed to fetch user profile: ${response.statusText}`);
          }
          const userProfileFromDB: UserProfile = await response.json(); // Assuming your API returns UserProfile
          
          set({ user: userProfileFromDB, isAuthenticated: true, isLoading: false, error: null });

        } catch (err: any) {
          console.log("No active user session or failed to fetch profile:", err);
          set({ user: null, isAuthenticated: false, isLoading: false, error: null });
        }
      },
    }),
    {
      name: 'auth-storage', // unique name for localStorage key
      storage: createJSONStorage(() => localStorage), // (optional) by default, it uses localStorage
      // only store isAuthenticated and user.id (or a minimal user object)
      // sensitive data like full user profiles should be fetched securely
      // from API after auth check.
      partialize: (state) => ({ 
        isAuthenticated: state.isAuthenticated,
        // user: state.user ? { id: state.user.id, email: state.user.email } : null,
        // Consider if you even want to persist 'user' beyond 'isAuthenticated' for security/freshness.
        // Often, you just persist 'isAuthenticated' and re-fetch user details.
      }),
      // Reviver function if you need to transform data when it's read from storage
      // reviver: (key, value) => {
      //   if (key === 'isAuthenticated' && typeof value === 'boolean') {
      //     return value;
      //   }
      //   return value;
      // }
    }
  )
);

export default useAuthStore;