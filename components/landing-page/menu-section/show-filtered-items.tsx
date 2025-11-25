"use client";
import { useMenuFilterStore } from "@/store/useMenuFilterStore";
import VisitHomeSection from "../visit-us-section/visit-home-section";
import MenuItemCard from "./menu-items-card";
import OffersSection from "./offers-section";

const ShowFilteredItems = () => {
  const { filteredItems } = useMenuFilterStore();

  let toppings = filteredItems[0]?.category === "coffee" || false;

  const handleToppingChange = (toppingIds: number[]) => {};

  const handleIceLevelChange = (level: number) => {};

  const handleSugarLevelChange = (level: number) => {};

  return (
    <div>
      <div className="max-w-[1320px] mx-auto py-4 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 py-10">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              image={item.image || ""}
              title={item.name || ""}
              description={item.description || ""}
              price={item.price || ""}
              className="bg-[#FAF8F5] dark:bg-[#181C20]"
            />
          ))}
        </div>
        {/* {toppings && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-5 ">
            <div></div>
            <div>
              <ToppingsSection
                onToppingChange={handleToppingChange}
                onIceLevelChange={handleIceLevelChange}
                onSugarLevelChange={handleSugarLevelChange}
              />
            </div>
          </div>
        )} */}
      </div>
      <VisitHomeSection />
      <OffersSection />
    </div>
  );
};

export default ShowFilteredItems;
