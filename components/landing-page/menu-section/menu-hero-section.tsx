import Image from "next/image";
import React from "react";

const MenuHeroSection = () => {
  return (
    <div className="relative w-full h-[450px] md:h-[600px] overflow-hidden">
      {/* Full Background Image */}
      <Image
        src="/images/menu-items/mushroom-chaga-coffee-fresh.svg" // corrected ".svgg" to ".svg"
        alt="menu hero"
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h1 className="text-[#FEFEFF] h1-text">Menu List</h1>
      </div>
    </div>
  );
};

export default MenuHeroSection;
