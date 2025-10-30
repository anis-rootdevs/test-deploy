"use client";
import OffersSection from "./offers-section";
import VisitHomeSection from "../visit-us-section/visit-home-section";
import MenuItemCard from "./menu-items-card";
import { useMenuFilter } from "@/contexts/menu-filter-context";
import ToppingsSection from "./toppings-section";

const ShowFilteredItems = () => {
  const { filteredItems } = useMenuFilter();
  let toppings = filteredItems[0]?.category === "coffee" || false;
  console.log("toppings", toppings);

  const handleToppingChange = (toppingIds: number[]) => {
    console.log("Selected toppings:", toppingIds);
  };

  const handleIceLevelChange = (level: number) => {
    console.log("Ice level:", level);
  };

  const handleSugarLevelChange = (level: number) => {
    console.log("Sugar level:", level);
  };
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
        {toppings && (
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
        )}
      </div>
      <VisitHomeSection />
      <OffersSection />
    </div>
  );
};

export default ShowFilteredItems;
