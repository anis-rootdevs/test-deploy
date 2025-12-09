import { getAdminProfile } from "@/actions/profile/profileActions";
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
      const res = await getAdminProfile();

      if (!res.status) throw new Error("Failed to fetch user data");

      set({ userData: res?.data });
    } catch (error: any) {
      set({ error: error.message || "Unknown error" });
    } finally {
      set({ isLoading: false });
    }
  },

  clearUserData: () => set({ userData: null, error: null }),
}));

export default useUserProfile;
