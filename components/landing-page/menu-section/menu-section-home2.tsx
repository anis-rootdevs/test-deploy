import { CustomButton } from "@/components/custom/custom-button";
import { menuItems } from "@/public/sample-data/landing-page-data";
import React from "react";
import MenuItemCard from "./menu-items-card";
import Image from "next/image";

const MenuSectionHome2 = () => {
  return (
    <div className="lg:py-20 py-16 relative">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/menu-items/high-angle-view-breakfast-table.svg"
          alt="Menu background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#101020]/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1320px] mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="font-jost text-2xl md:text-4xl font-semibold text-[#FAF8F5] uppercase mb-3">
            Glimpses of Our Menu
          </h2>
          <p className="text-sm md:text-base font-normal text-[#FAF8F5]">
            A sneak peek at our freshly brewed coffees and handmade treats —
            your favorites, served with love.
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 gap-6 md:gap-x-12 lg:gap-x-16 mb-10 md:mb-14">
          {menuItems.map((item) => (
            <MenuItemCard
              key={item.id}
              image={item.image}
              title={item.name}
              description={item.description}
              price={item.price}
              className="bg-[#FFFFFF26] text-white"
              priceClassName="text-primary"
            />
          ))}
        </div>
        <div className="md:mt-[50px] mt-[36px] text-center">
          <CustomButton
            href="/menu"
            variant="outline"
            className="border-primary text-primary dark:text-primary dark:border-primary dark:hover:border-primary dark:hover:text-black"
          >
            Explore Menu
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default MenuSectionHome2;
