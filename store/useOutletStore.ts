import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OutletStore {
  selectedOutletId: string | null;
  setSelectedOutletId: (id: string | null) => void;
  clearSelectedOutletId: () => void;

  _hasHydrated: boolean;
  setHasHydrated: (value: boolean) => void;
}

export const useOutletStore = create<OutletStore>()(
  persist(
    (set) => ({
      selectedOutletId: null,
      setSelectedOutletId: (id) => set({ selectedOutletId: id }),
      clearSelectedOutletId: () => set({ selectedOutletId: null }),

      // hydration state
      _hasHydrated: false,
      setHasHydrated: (value) => set({ _hasHydrated: value }),
    }),
    {
      name: "outlet-store",

      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
    }
  )
);
