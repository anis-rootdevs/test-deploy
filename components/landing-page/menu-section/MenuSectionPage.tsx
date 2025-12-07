"use client";
import { useMenuFilterStore } from "@/store/useMenuFilterStore";
import CategoriesItemsSection from "./CategoriesItemsSection";
import MenuHeroSection from "./MenuHeroSection";
import ShowFilteredItems from "./ShowFilteredItems";

import { OfferShowcase, ReservationShowcase } from "@/lib/types";
import { useEffect } from "react";
import BookReserveHome from "../book-reserve-section/book-reserve-home";
import {
  CategorySectionSkeleton,
  MenuItemsGridSkeleton,
} from "./menu-items-card-loader";
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

interface MenuSectionPageProps {
  initialMenuData: ApiResponse;
  reservationShowcase: ReservationShowcase;
  offerShowcase: OfferShowcase;
  bannerImage: string;
}

const MenuSectionPage = ({
  initialMenuData,
  reservationShowcase,
  offerShowcase,
  bannerImage,
}: MenuSectionPageProps) => {
  const { activeCategory, isLoading, error, initializeMenu } =
    useMenuFilterStore();

  // Initialize store with server data
  useEffect(() => {
    initializeMenu(initialMenuData);
  }, [initialMenuData, initializeMenu]);

  const isAllCategory = activeCategory === "all";

  return (
    <>
      <MenuHeroSection
        imageSrc={
          bannerImage || "/images/menu-items/mushroom-chaga-coffee-fresh.svg"
        }
        title="Menu List"
      />

      <CategoriesItemsSection />

      {/* Error State */}
      {error && (
        <div className="max-w-[1320px] mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
            <p className="font-medium">Error loading menu</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Loading State */}

      {isLoading && !error && (
        <>
          {isAllCategory ? (
            <div>
              <CategorySectionSkeleton />
              <CategorySectionSkeleton />
              <CategorySectionSkeleton />
            </div>
          ) : (
            <MenuItemsGridSkeleton count={6} />
          )}
        </>
      )}

      {/* Content - Always show filtered items now */}
      {!isLoading && !error && (
        <ShowFilteredItems offerShowcase={offerShowcase} />
      )}

      <BookReserveHome reservationShowcase={reservationShowcase} />
    </>
  );
};

export default MenuSectionPage;
