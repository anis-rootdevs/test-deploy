"use client";
import { CustomButton } from "@/components/custom/custom-button";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

const HeroAromaCare = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] lg:h-[880px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-section/coffee-beans.svg"
          alt="aroma coffee"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        {/* <div className="absolute inset-0 bg-black/30" /> */}
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-[1320px] mx-auto px-4 md:grid md:grid-cols-2  md:px-1 z-10">
        <div className="grid-cols-1"></div>
        <div className="grid-cols-1 flex flex-col justify-center h-full pt-12 md:pt-0 text-center md:text-right md:items-end">
          {/* Animated Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 120, y: 120 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="text-left"
          >
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="text-primary font-jost font-normal text-lg md:text-[24px] mb-1 md:mb-2 leading-[35px]"
            >
              Sip. Savor. Smile.
            </motion.p>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              className="h1-text  text-[#101020] dark:text-[#FAF8F5] uppercase leading-tight mb-8 mt-4"
            >
              WHERE COMFORT MEETS AROMA
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, x: 60, y: 40 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              className="font-jost text-[#101020] dark:text-[#FAF8F5] text-base md:text-[24px] md:leading-[35px] font-normal mb-6 md:mb-[50px]"
            >
              A cozy corner for every mood — from morning rush to late-night
              talk.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
              className="flex items-center md:gap-6 gap-4"
            >
              <CustomButton variant="filled" href="/menu">
                Explore Menu
              </CustomButton>
              <CustomButton
                variant="outline"
                href="/reserve-table"
                className="border-primary text-primary"
              >
                Reserve Table
              </CustomButton>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroAromaCare;
