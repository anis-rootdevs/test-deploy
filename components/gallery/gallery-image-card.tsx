// components/gallery/gallery-image-card.tsx
"use client";

import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";

export interface GalleryImageCardProps {
  src: string;
  quote?: string;
  author?: string;
  className?: string; // to control grid sizing/height from parent
}

const GalleryImageCard = ({
  src,
  quote,
  author,
  className,
}: GalleryImageCardProps) => {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden group cursor-pointer",
        className
      )}
    >
      {/* Image */}
      <Image
        src={src}
        alt={quote ?? "gallery image"}
        fill
        className="object-cover"
      />

      {/* Dark overlay on hover */}
      <div className="absolute inset-0 w-full h-full bg-[#10102080] opacity-0 group-hover:opacity-60 backdrop-blur-[2px] group-hover:backdrop-blur-[4px] transition-all duration-500" />

      {/* Text overlay */}
      {(quote || author) && (
        <div
          className="absolute left-0 right-0 w-full h-full flex flex-col justify-end p-4 z-20
                        translate-y-[30%] group-hover:translate-y-0 transition-all duration-500"
        >
          <h3 className="text-[#FAF8F5] text-base  font-medium ">{quote}</h3>
          <p className="text-[#FAF8F5] text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
            {author}
          </p>
        </div>
      )}
    </div>
  );
};

export default GalleryImageCard;
