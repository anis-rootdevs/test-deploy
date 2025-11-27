"use client";
import { useMenuFilterStore } from "@/store/useMenuFilterStore";
import VisitHomeSection from "../visit-us-section/visit-home-section";
import MenuItemCard from "./MenuItemCard";
import OffersSection from "./offers-section";

const ShowFilteredItems = () => {
  const { filteredProducts, activeCategory } = useMenuFilterStore();

  return (
    <div>
      <div className="max-w-[1320px] mx-auto py-4 px-4">
        {/* Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No items found in this category
            </p>
          </div>
        ) : (
          <>
            {/* Product Grid */}
            {activeCategory === "all" && <OffersSection />}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
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
          </>
        )}
      </div>

      <VisitHomeSection />
    </div>
  );
};

export default ShowFilteredItems;
