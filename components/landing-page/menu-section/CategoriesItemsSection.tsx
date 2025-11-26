"use client";
import { useMenuFilterStore } from "@/store/useMenuFilterStore";

const CategoriesItemsSection = () => {
  const { activeCategory, categories, handleCategoryChange } =
    useMenuFilterStore();

  const categoryList = ["all", ...categories.map((cat) => cat.slug)];

  // Simple click handler - just update the store
  const handleClick = (slug: string) => {
    handleCategoryChange(slug);
  };

  // Get display name for category
  const getCategoryDisplayName = (slug: string) => {
    if (slug === "all") return "All";
    const category = categories.find((cat) => cat.slug === slug);
    return category?.name || slug;
  };

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

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categoryList.map((slug) => (
            <button
              key={slug}
              onClick={() => handleClick(slug)}
              className={`
                px-6 py-2.5 rounded font-medium text-sm md:text-base duration-300 capitalize cursor-pointer
                ${
                  activeCategory === slug
                    ? "bg-primary text-[#1B2A41]"
                    : "font-medium font-jost border border-[#E2E2E2] hover:border-primary text-base hover:text-primary"
                }
              `}
            >
              {getCategoryDisplayName(slug)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesItemsSection;
