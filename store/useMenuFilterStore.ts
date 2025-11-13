import { menuItems } from "@/public/sample-data/landing-page-data";
import { create } from "zustand";

interface MenuItem {
  id?: number;
  name?: string;
  category?: string;
  description?: string;
  price?: number;
  image?: string;
}

interface MenuFilterState {
  activeCategory: string;
  filteredItems: MenuItem[];
  isLoading: boolean;
  handleCategoryChange: (category: string) => void;
  initializeMenu: () => void;
}

export const useMenuFilterStore = create<MenuFilterState>((set) => {
  const init = () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ filteredItems: menuItems, isLoading: false });
    }, 500);
  };

  // Auto-run once
  init();

  return {
    activeCategory: "all",
    filteredItems: [],
    isLoading: true,

    handleCategoryChange: (category) => {
      set({ isLoading: true, activeCategory: category.toLowerCase() });
      setTimeout(() => {
        if (category.toLowerCase() === "all") {
          set({ filteredItems: menuItems, isLoading: false });
        } else {
          const filtered = menuItems.filter(
            (item) => item.category.toLowerCase() === category.toLowerCase()
          );
          set({ filteredItems: filtered, isLoading: false });
        }
      }, 500);
    },
    initializeMenu: init,
  };
});
