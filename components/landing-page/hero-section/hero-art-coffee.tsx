"use client";

import { CustomButton } from "@/components/custom/custom-button";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const HeroArtCoffee = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[700px] lg:h-[880px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 aspect-[1393/464] mt-[320px]">
        <Image
          src="/images/hero-section/art-of-coffee.svg"
          alt="aroma coffee"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Container */}
      <div className="relative max-w-[1320px] mx-auto px-4 md:px-6 mt-10">
        <div className="flex flex-col justify-start md:justify-center items-center h-full pt-12 md:pt-0">
          <div className="text-center space-y-6">
            {/* Subtitle */}
            <motion.p
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-primary font-jost font-normal text-lg md:text-[24px]"
            >
              Sip. Savor. Smile.
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
              className="h1-text text-[#101020] dark:text-[#FAF8F5] uppercase leading-tight"
            >
              TASTE THE ART OF COFFEE
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="font-jost text-[#101020] dark:text-[#FAF8F5] text-base md:text-[24px] md:leading-[35px]"
            >
              A cozy corner for every mood — from morning rush to late-night
              talk.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.7, ease: "easeOut" }}
              className="flex items-center justify-center md:gap-6 gap-4 pt-4"
            >
              <CustomButton variant="filled" href="/menu">
                Explore Menu
              </CustomButton>
              <CustomButton
                variant="outline"
                href="/reserve"
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

export default HeroArtCoffee;
