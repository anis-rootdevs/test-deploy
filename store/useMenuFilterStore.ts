// store/useMenuFilterStore.ts
import { create } from "zustand";

// API Response Types
interface Product {
  _id: string;
  name: string;
  shortDesc: string;
  price: number;
  createdAt: string;
  image: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  products: Product[];
}

interface ApiResponse {
  status: boolean;
  message: string;
  data: Category[];
}

// Store State Types
interface MenuFilterState {
  // Data
  categories: Category[];
  allProducts: Product[];
  filteredProducts: Product[];

  // UI State
  activeCategory: string;
  isLoading: boolean;
  error: string | null;

  // Actions
  initializeMenu: (apiData: ApiResponse) => void;
  handleCategoryChange: (categorySlug: string) => void;
  getCategoryBySlug: (slug: string) => Category | undefined;
}

export const useMenuFilterStore = create<MenuFilterState>((set, get) => ({
  // Initial State
  categories: [],
  allProducts: [],
  filteredProducts: [],
  activeCategory: "all",
  isLoading: true,
  error: null,

  // Initialize menu with server data
  initializeMenu: (apiData: ApiResponse) => {
    if (!apiData.status || !apiData.data) {
      set({
        error: apiData.message || "Failed to load menu",
        isLoading: false,
      });
      return;
    }

    const categories = apiData.data;
    const allProducts = categories.flatMap((cat) => cat.products);

    set({
      categories,
      allProducts,
      filteredProducts: allProducts,
      isLoading: false,
      error: null,
      activeCategory: "all",
    });
  },

  // Handle category change - NO DELAY, EVERYTHING UPDATES AT ONCE
  handleCategoryChange: (categorySlug: string) => {
    const { categories, allProducts } = get();

    if (categorySlug === "all") {
      set({
        activeCategory: "all",
        filteredProducts: allProducts,
        isLoading: false,
      });
    } else {
      const category = categories.find((cat) => cat.slug === categorySlug);
      console.log("category", category);
      const products = category ? category.products : [];
      console.log("products", category);

      set({
        activeCategory: categorySlug,
        filteredProducts: products,
        isLoading: false,
      });
    }
  },

  // Helper to get category by slug
  getCategoryBySlug: (slug: string) => {
    return get().categories.find((cat) => cat.slug === slug);
  },
}));
