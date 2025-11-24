"use client";

import { Outlets } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import CafeInfoCard from "./cafe-info-card";
interface LocationCardComponentsProps {
  cafeData: Outlets;
  imagePosition?: "left" | "right";
}

const LocationCardComponents = ({
  cafeData,
  imagePosition = "right",
}: LocationCardComponentsProps) => {
  const handleReserve = () => {
    // console.log("Reserve button clicked for:", cafeData.name);
    // Add your reservation logic here
  };

  const isImageRight = imagePosition === "right";
  return (
    <div className="px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Info Card */}
        <div
          className={cn(
            "w-full max-w-[536px]",
            isImageRight
              ? "order-2 lg:order-1 lg:ml-auto"
              : "order-2 lg:order-2 lg:mr-auto"
          )}
        >
          <CafeInfoCard
            title={cafeData.name || ""}
            address={cafeData.location || ""}
            phone={`${cafeData.dialCode || ""} ${cafeData.phone || ""}`}
            openingHours={[]}
            onReserveClick={handleReserve}
          />
        </div>

        {/* Image */}
        <div
          className={cn(
            "w-full h-[261px] md:h-[400px] lg:h-[632px] overflow-hidden",
            isImageRight ? "order-1 lg:order-2" : "order-1 lg:order-1"
          )}
        >
          <div className="relative aspect-[948/632]">
            <Image
              src={cafeData.image || ""}
              alt={cafeData.name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCardComponents;
