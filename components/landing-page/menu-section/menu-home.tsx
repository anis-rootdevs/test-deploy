import React from "react";
import MenuItemCard from "./menu-items-card";
import { CustomButton } from "@/components/custom/custom-button";

const menuItems = [
  {
    id: 1,
    name: "Caramel Latte",
    price: 6.99,
    description: "Espresso, steamed milk, caramel syrup, whipped cream",
    image: "/images/menu-items/caramel-lattle.svg",
  },
  {
    id: 2,
    name: "Croissant",
    price: 3.5,
    description: "Buttery, flaky, baked fresh daily",
    image: "/images/menu-items/croissant-menu.svg",
  },
  {
    id: 3,
    name: "The Aroma Bliss Platter",
    price: 9.9,
    description:
      "Croissant, chocolate muffin, buttery cookies, signature latte",
    image: "/images/menu-items/coffee-ice.svg",
  },
  {
    id: 4,
    name: "Cold Brew",
    price: 2.25,
    description: "Smooth, refreshing, and lightly sweetened",
    image: "/images/menu-items/iced-coffee.svg",
  },
  {
    id: 5,
    name: "Cold Brew",
    price: 5.5,
    description: "Smooth, refreshing, and lightly sweetened",
    image: "/images/menu-items/coffee-toast.svg",
  },
  {
    id: 6,
    name: "Morning Boost",
    price: 4.5,
    description: "Smooth, refreshing, and lightly sweetened",
    image: "/images/menu-items/morning-bost.svg",
  },
];

const MenuHome = () => {
  return (
    <div className="lg:py-20 py-16 bg-[#FAF8F5] dark:bg-[#181C20]">
      <div className="max-w-[1320px] mx-auto ">
        <div className="text-center mb-[36px] md:mb-[50px]">
          <h2 className="font-jost text-base md:text-[20px] font-medium capitalize mb-[9px]">
            Glimpses of Our Menu
          </h2>
          <p className="md:text-base text-sm font-normal font-jost">
            A sneak peek at our freshly brewed coffees and handmade treats —
            your favorites, served with love.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:gap-x-[134px] md:gap-5 gap-6 grid-cols-1 px-4">
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
