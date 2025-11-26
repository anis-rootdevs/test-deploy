"use client";
import { useMenuFilterStore } from "@/store/useMenuFilterStore";
import BookReserveHome from "../book-reserve-section/book-reserve-home";
import CategoriesItemsSection from "./categories-items-section";
import CoffeeSection from "./coffee-section";
import DrinksSection from "./drinks-section";
import MenuHeroSection from "./menu-hero-section";
import OffersSection from "./offers-section";
import ShowFilteredItems from "./show-filtered-items";
import SweetsSection from "./sweets-section";

import { useEffect } from "react";
import {
  CategorySectionSkeleton,
  MenuItemsGridSkeleton,
} from "./menu-items-card-loader";

const MenuSectionPage = () => {
  const { activeCategory, isLoading, initializeMenu } = useMenuFilterStore();
  useEffect(() => {
    initializeMenu();
  }, [initializeMenu]);

  const isAllCategory = activeCategory.toLowerCase() === "all";

  return (
    <>
      <MenuHeroSection
        imageSrc="/images/menu-items/mushroom-chaga-coffee-fresh.svg"
        title="Menu List"
      />
      <CategoriesItemsSection />

      {/* Show loading skeletons or actual content */}
      {isLoading ? (
        <>
          {isAllCategory ? (
            // Show multiple section skeletons when "All" is loading
            <div>
              <CategorySectionSkeleton />
              <CategorySectionSkeleton />
              <CategorySectionSkeleton />
            </div>
          ) : (
            // Show grid skeleton when specific category is loading
            <MenuItemsGridSkeleton count={6} />
          )}
        </>
      ) : (
        <>
          {/* Show category sections only when "all" is selected */}
          {isAllCategory ? (
            <div>
              <OffersSection />
              <SweetsSection />
              <CoffeeSection />
              <DrinksSection />
            </div>
          ) : (
            <div>
              <ShowFilteredItems />
            </div>
          )}
        </>
      )}

      <BookReserveHome />
    </>
  );
};

export default MenuSectionPage;
