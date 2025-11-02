"use client";

import Image from "next/image";
import CafeInfoCard from "./cafe-info-card";
import { cn } from "@/lib/utils";
interface LocationCardComponentsProps {
  cafeData: {
    title: string;
    address: string;
    phone: string;
    image: string;
    openingHours: Array<{ days: string; hours: string }>;
  };
  imagePosition?: "left" | "right";
}

const LocationCardComponents = ({
  cafeData,
  imagePosition = "right",
}: LocationCardComponentsProps) => {
  const handleReserve = () => {
    console.log("Reserve button clicked for:", cafeData.title);
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
            title={cafeData.title}
            address={cafeData.address}
            phone={cafeData.phone}
            openingHours={cafeData.openingHours}
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
          <div className="relative w-full h-full">
            <Image
              src={cafeData.image}
              alt={cafeData.title}
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
