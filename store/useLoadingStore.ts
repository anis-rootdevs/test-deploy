import { create } from "zustand";

interface LoadingState {
  loadingMap: Record<string, boolean>;
  setLoading: (id: string, value: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  loadingMap: {},
  setLoading: (id, value) =>
    set((state) => ({ loadingMap: { ...state.loadingMap, [id]: value } })),
}));
