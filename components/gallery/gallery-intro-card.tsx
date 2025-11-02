// components/gallery/gallery-intro-card.tsx
import { MoveRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const GalleryIntroCard = () => {
  return (
    <div className="relative flex flex-col justify-between  p-6 md:p-8 h-[449px] overflow-hidden group cursor-pointer ">
      {/* Background Image */}

      <Image
        src="/images/gallery/midsection-man-pouring-milk-coffee.svg"
        alt="gallery image"
        fill
        className="object-cover transition-all duration-500"
      />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-[#101020]/89 group-hover:bg-transparent transition-all duration-500" />

      {/* Content Layer (Text) */}
      <div className="absolute inset-0 flex flex-col justify-between space-y-4 z-10 opacity-100 group-hover:opacity-0 transition-all duration-500 ml-[25px] mt-2">
        <h2 className="font-semibold font-jost text-[32px] lg:text-[36px] uppercase leading-[60px] text-[#FAF8F5]">
          CAPTURED <br /> MOMENTS FROM <br /> OUR LOVELY <br /> COFFEE LOVERS
        </h2>
      </div>

      {/* Button */}
      <button className="absolute bottom-6 flex items-center gap-2 left-7 text-left font-jost text-sm font-normal md:text-base text-primary hover:underline underline-offset-4 opacity-100 transition-all duration-500 z-20">
        View full gallery{" "}
        <span>
          <MoveRight className="text-primary w-5 h-5" />
        </span>
      </button>
    </div>
  );
};

export default GalleryIntroCard;
