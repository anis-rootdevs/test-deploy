import React from "react";
import MenuItemCard from "./menu-items-card";
import { CustomButton } from "@/components/custom/custom-button";
import { menuItems } from "@/public/sample-data/landing-page-data";

const MenuHome = () => {
  return (
    <div className="lg:py-20 py-16 bg-[#FAF8F5] dark:bg-[#181C20]">
      <div className="max-w-[1320px] mx-auto ">
        <div className="text-center mb-[36px] md:mb-[50px] px-4">
          <h2 className="font-jost text-[24px] md:text-[36px] font-semibold capitalize mb-[9px]">
            Glimpses of Our Menu
          </h2>
          <p className="md:text-base text-sm font-normal font-jost">
            A sneak peek at our freshly brewed coffees and handmade treats —
            your favorites, served with love.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:gap-x-[134px] md:gap-x-[100px] gap-6 grid-cols-1 px-4">
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              image={item.image}
              title={item.name}
              description={item.description}
              price={item.price}
              className="bg-[#FEFEFF] dark:bg-[#0F141B]"
            />
          ))}
        </div>
        <div className="md:mt-[50px] mt-[36px] text-center">
          <CustomButton
            href={`/menu`}
            variant="outline"
            className="border-[#1B2A41] text-[#1B2A41] dark:text-[#FEFEFF] dark:border-[#FEFEFF] dark:hover:border-primary dark:hover:text-black"
          >
            Explore Menu
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default MenuHome;
