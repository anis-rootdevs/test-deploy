"use client";
import { menuItems } from "@/public/sample-data/landing-page-data";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface MenuItem {
  id?: number;
  name?: string;
  category?: string;
  description?: string;
  price?: number;
  image?: string;
}

interface MenuFilterContextType {
  activeCategory: string;
  filteredItems: MenuItem[];
  isLoading: boolean;
  handleCategoryChange: (category: string) => void;
}

const MenuFilterContext = createContext<MenuFilterContextType | undefined>(
  undefined
);

export const MenuFilterProvider = ({ children }: { children: ReactNode }) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleCategoryChange = (category: string) => {
    setIsLoading(true);
    setActiveCategory(category.toLowerCase());

    // Simulate loading delay (remove setTimeout in production if data is instant)
    setTimeout(() => {
      if (category.toLowerCase() === "all") {
        setFilteredItems(menuItems);
      } else {
        const filtered = menuItems.filter(
          (item) => item.category.toLowerCase() === category.toLowerCase()
        );
        setFilteredItems(filtered);
      }
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    // Initial load
    setIsLoading(true);
    setTimeout(() => {
      setFilteredItems(menuItems);
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <MenuFilterContext.Provider
      value={{ activeCategory, filteredItems, isLoading, handleCategoryChange }}
    >
      {children}
    </MenuFilterContext.Provider>
  );
};

export const useMenuFilter = () => {
  const context = useContext(MenuFilterContext);
  if (!context) {
    throw new Error("useMenuFilter must be used within MenuFilterProvider");
  }
  return context;
};
