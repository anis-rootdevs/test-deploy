import Image from "next/image";
import React from "react";
interface MHeroSection {
  imageSrc: string;
  title: string;
}

const MenuHeroSection = ({ imageSrc, title }: MHeroSection) => {
  return (
    <div className="relative w-full h-[450px] md:h-[500px] overflow-hidden">
      {/* Full Background Image */}
      <Image
        src={imageSrc || "/images/menu-items/mushroom-chaga-coffee-fresh.svg"} // corrected ".svgg" to ".svg"
        alt={title}
        fill
        className="object-cover"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
        <h1 className="text-[#FEFEFF] h1-text capitalize">{title}</h1>
      </div>
    </div>
  );
};

export default MenuHeroSection;
