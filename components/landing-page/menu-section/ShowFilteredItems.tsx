"use client";
import CustomSeparator from "@/components/custom/custom-separator";
import { useMenuFilterStore } from "@/store/useMenuFilterStore";
import MenuItemCard from "./MenuItemCard";
import OffersSection from "./OffersSection";

const ShowFilteredItems = () => {
  const { filteredProducts, activeCategory, categories } = useMenuFilterStore();

  const isAllCategory = activeCategory === "all";
  return (
    <div>
      <div className="max-w-[1320px] mx-auto py-1 px-4">
        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No items found in this category
            </p>
          </div>
        ) : (
          <>
            {isAllCategory ? (
              <>
                <OffersSection />
                {categories.map((category) => (
                  <div key={category._id}>
                    {/* Category Separator */}
                    <CustomSeparator title={category.name} />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-5">
                      {category.products.map((product) => (
                        <MenuItemCard
                          key={product._id}
                          image={product.image}
                          title={product.name}
                          description={product.shortDesc}
                          price={`$${product.price.toFixed(2)}`}
                          className="bg-[#FAF8F5] dark:bg-[#181C20]"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              // Show single category filtered products
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pb-5">
                {filteredProducts.map((product) => (
                  <MenuItemCard
                    key={product._id}
                    image={product.image}
                    title={product.name}
                    description={product.shortDesc}
                    price={`$${product.price.toFixed(2)}`}
                    className="bg-[#FAF8F5] dark:bg-[#181C20]"
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShowFilteredItems;
