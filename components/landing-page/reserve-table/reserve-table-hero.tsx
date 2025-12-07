"use client";

import OpeningsHours from "@/components/custom/openings-hours";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import Image from "next/image";
interface OpeningHour {
  days: string;
  time: string;
  openingHours?: string[];
}

interface ReserveTableHeroProps {
  bgType?: "gradient" | "image";
  bgImage?: string;
  overlay?: boolean;
  title?: string;
  subtitle?: string;
  description?: string;
  openingHours?: OpeningHour[];
  textColor?: string;
}

const ReserveTableHero = ({
  bgType = "gradient",
  bgImage = "",
  overlay = true,
  title = "RESERVE YOUR COMFORT CORNER",
  subtitle = "Reserve Table",
  description = "Every table is ready to welcome you with warmth and comfort.",
  openingHours = [],
  textColor = "#FAF8F5",
}: ReserveTableHeroProps) => {
  return (
    <div className="max-w-[1320px] mx-auto w-full py-10">
      <div
        className={cn(
          "relative grid grid-cols-1 md:grid-cols-2 px-8 py-10 h-[435px] overflow-hidden rounded-lg"
        )}
      >
        {/* ✅ Background Layer */}
        {bgType === "gradient" ? (
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#1B2A41_0%,#101020_100%)]" />
        ) : (
          <div className="absolute inset-0">
            <Image
              src={bgImage}
              alt="Reserve table background"
              fill
              priority
              className="object-cover"
            />
            {overlay && (
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,42,65,0.80)_0%,rgba(16,16,32,0.00)_100%)]" />
            )}
          </div>
        )}

        {/* ✅ Content Layer */}
        <div className="relative  flex flex-col justify-center h-full">
          <div className="max-w-2xl">
            {/* Subtitle */}
            <p className="text-[#E2E2E2] font-jost text-lg md:text-[24px]">
              {subtitle}
            </p>
            <div className="w-[75px] mt-2 mb-3">
              <Separator className="bg-primary h-[2px]" />
            </div>

            {/* Main Heading */}
            <h2 className="text-[#FAF8F5] font-jost text-[32px] md:text-[36px] font-semibold uppercase mb-3 md:mb-4">
              {title}
            </h2>

            {/* Description */}
            <p className="text-[#E2E2E2] font-jost text-sm md:text-base font-normal mb-6 md:mb-10">
              {description}
            </p>

            <OpeningsHours
              data={openingHours}
              textClass={`text-[${textColor}]`}
            />
          </div>
        </div>

        {/* Right Column (optional image / illustration) */}
        <div className="relative z-10 hidden md:block" />
      </div>
    </div>
  );
};

export default ReserveTableHero;
