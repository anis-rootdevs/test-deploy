import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
interface ChefCardProps {
  image: string;
  name: string;
  tagline: string;
  className?: string;
  imageClassName?: string;
  borderColor?: string;
}

const ChefCard = ({
  image,
  name,
  tagline,
  className = "",
  imageClassName = "",
  borderColor = "border-primary",
}: ChefCardProps) => {
  return (
    <div
      className={`relative bg-transparent border-none  shadow-none overflow-visible ${className}`}
    >
      <div className="w-full">
        <div className="relative">
          <div className="absolute -left-3 -top-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="179"
              height="197"
              viewBox="0 0 179 197"
              fill="none"
            >
              <path d="M178.5 0.5H0.5V196.5" stroke="#E6B17E" />
            </svg>
          </div>

          {/* Main Content */}
          <div className="relative overflow-hidden ">
            {/* Image Section */}
            <div className="relative h-[400px] md:h-[430px]  overflow-hidden">
              <Image
                src={image}
                alt={name}
                width={100}
                height={100}
                className={`object-cover h-full w-full ${imageClassName}`}
              />
            </div>

            {/* Text Section */}
            <div className="pt-4 text-start space-y-2">
              <h3 className="font-jost uppercase  text-sm md:text-base font-semibold">
                {name}
              </h3>
              <p className="font-jost italic text-sm md:text-base uppercase font-normal">
                {tagline}
              </p>
            </div>
          </div>
          <div className="absolute -right-3 -bottom-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="179"
              height="197"
              viewBox="0 0 179 197"
              fill="none"
            >
              <path d="M0 196L178 196L178 0" stroke="#E6B17E" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefCard;
