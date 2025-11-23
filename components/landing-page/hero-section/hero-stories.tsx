"use client";

import { CustomButton } from "@/components/custom/custom-button";
import { routes } from "@/config/routes";
import { HeroProps } from "@/lib/types";
import { motion } from "framer-motion";

const HeroStories = ({ tagline, heading, shortDesc, image }: HeroProps) => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[880px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={image || ""}
          alt="stories together"
          className="w-full h-full object-cover object-center"
        />
        {/* Optional dark overlay for contrast */}
        <div className="absolute inset-0 bg-[#000000]/40" />
      </div>

      {/* Content Container */}
      <div className="relative md:mt-44 max-w-[1320px] mx-auto px-4 md:px-6 z-10">
        <div className="flex flex-col justify-start md:justify-center items-center h-full pt-12 md:pt-0">
          <div className="text-center space-y-6">
            {/* Subtitle */}
            <motion.p
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-primary font-jost font-normal text-lg md:text-[24px] leading-[35px]"
            >
              {tagline || ""}
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
              className="h1-text text-[#FAF8F5] uppercase leading-tight"
            >
              {heading || ""}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="font-jost text-[#FAF8F5] text-base md:text-[24px] md:leading-[35px] font-normal"
            >
              {shortDesc || ""}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
              className="flex items-center justify-center md:gap-6 gap-4 pt-4"
            >
              <CustomButton variant="filled" href={routes.publicRoutes.menu}>
                Explore Menu
              </CustomButton>
              <CustomButton
                variant="outline"
                href={routes.publicRoutes.reserveTable}
                className="border-primary text-primary"
              >
                Reserve Table
              </CustomButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroStories;
