import CustomSeparator from "@/components/custom/custom-separator";
import { menuItems } from "@/public/sample-data/landing-page-data";
import React from "react";
import MenuItemCard from "./menu-items-card";

const SweetsSection = () => {
  return (
    <div className="max-w-[1320px] mx-auto w-full px-4">
      <CustomSeparator title="Sweets" />

      <div className="my-12">
        <div className="grid lg:gap-x-[134px] gap-y-5 md:grid-cols-2 md:gap-x-[40px] grid-cols-1">
          {menuItems.map((item) => (
            <div key={item.id}>
              <MenuItemCard
                image={item.image}
                title={item.name}
                description={item.description}
                price={item.price}
                className="bg-[#FAF8F5] dark:bg-[#181C20]"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SweetsSection;
