import { create } from "zustand";

interface UserProfileState {
  userData: any;
  isLoading: boolean;
  error: string | null;
  fetchUserData: (token: string) => Promise<void>;
  clearUserData: () => void;
}

const useUserProfile = create<UserProfileState>((set) => ({
  userData: null,
  isLoading: false,
  error: null,

  fetchUserData: async (token: string) => {
    if (!token) return;
    set({ isLoading: true, error: null });

    try {
      const res = await fetch("/api/admin/auth/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      if (!res.ok) throw new Error("Failed to fetch user data");
      const data = await res.json();

      set({ userData: data });
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      set({ error: error.message || "Unknown error" });
    } finally {
      set({ isLoading: false });
    }
  },

  clearUserData: () => set({ userData: null, error: null }),
}));

export default useUserProfile;
