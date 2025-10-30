import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";
import MenuItemCard from "./menu-items-card";
import { menuItems } from "@/public/sample-data/landing-page-data";
import CustomSeparator from "@/components/custom/custom-separator";

const OffersSection = () => {
  return (
    <div className="max-w-[1320px] mx-auto w-full px-4 py-10">
      <CustomSeparator title="Offers" />
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6 ">
        <div className="relative overflow-hidden rounded-lg">
          <Image
            src="/images/menu-items/table-ice-cream-parlor-banner.svg" // replace with your image path
            alt="Limited time offer desserts"
            width={100}
            height={100}
            className="object-cover h-full w-full"
          />

          {/* Overlay container */}
          <div className="absolute inset-0 bg-black/40 text-white flex flex-col justify-between p-6">
            {/* Top Left Heading */}
            <h2 className="text-2xl md:text-[28px] font-semibold  uppercase  max-w-sm">
              HALF THE PRICE, FULL OF FLAVOR — LIMITED TIME OFFER!
            </h2>

            {/* Bottom Left Text */}
            <p className="text-sm md:text-[15px] opacity-90 font-normal uppercase font-jost">
              ** Enjoy this offer on some of our limited items.
              <br /> ** Till 25 October, 25.
            </p>
          </div>
        </div>
        <div>
          <div className="grid lg:gap-x-[80px] md:gap-x-[40px] grid-cols-1">
            {menuItems.slice(0, 4).map((item, index, arr) => (
              <div key={item.id}>
                <MenuItemCard
                  image={item.image}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                  className="bg-[#FAF8F5] dark:bg-[#181C20]"
                />

                {/* Add line except for the last item */}
                {index !== arr.length - 1 && (
                  <div className="h-[1px] bg-[#E2E2E2] dark:bg-[#222831] my-3 w-full" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersSection;
