"use client";
import CategoriesButton from "@/components/custom/categories-button";
import { useMenuFilterStore } from "@/store/useMenuFilterStore";

const CategoriesItemsSection = () => {
  const { activeCategory, handleCategoryChange } = useMenuFilterStore();
  const categories = ["all", "sweets", "coffee", "snacks", "drinks"];

  return (
    <div className="max-w-[1320px] mx-auto pt-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-jost uppercase font-semibold text-center mb-2.5">
          Our Menu
        </h1>
        <p className="md:text-base text-sm font-normal font-jost md:mb-10 mb-7 text-center">
          Brewed with care, baked with love — discover the flavors that make
          every visit cozy.
        </p>

        <CategoriesButton
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          className="mb-12"
        />

        {/* {isLoading ? (
          <p className="text-center text-gray-500 mb-6">Loading...</p>
        ) : (
          <p className="text-center text-gray-600 mb-6">
            Showing:{" "}
            <span className="font-semibold text-[#D4A574] capitalize">
              {activeCategory}
            </span>{" "}
            ({filteredItems.length} items)
          </p>
        )} */}
      </div>
    </div>
  );
};

export default CategoriesItemsSection;
