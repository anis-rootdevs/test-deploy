"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

import { Banner, HeroProps } from "@/lib/types";
import HeroAroma from "./hero-aroma";
import HeroAromaCare from "./hero-aroma-care";
import HeroArtCoffee from "./hero-art-coffee";
import HeroStories from "./hero-stories";

const HeroSectionHome = ({ banners }: { banners: Banner[] }) => {
  // Sort banners by position
  const sortedBanners = banners?.sort((a, b) => a.position - b.position) || [];

  // Map theme to component
  const getHeroComponent = (banner: HeroProps) => {
    const props = {
      tagline: banner.tagline,
      heading: banner.heading,
      shortDesc: banner.shortDesc,
      image: banner.image,
    };

    switch (banner.theme) {
      case 1:
        return <HeroArtCoffee key={banner._id} {...props} />;
      case 2:
        return <HeroStories key={banner._id} {...props} />;
      case 3:
        return <HeroAroma key={banner._id} {...props} />;
      case 4:
        return <HeroAromaCare key={banner._id} {...props} />;
      default:
        return <HeroArtCoffee key={banner._id} {...props} />;
    }
  };

  // Generate heroes array from banners
  const heroes = sortedBanners.map((banner) => getHeroComponent(banner));

  const [index, setIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (heroes.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroes.length]);

  // Handle empty banners
  if (!banners || banners.length === 0) {
    return (
      <div className="relative w-full h-[500px] md:h-[700px] lg:h-[880px] overflow-hidden bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No banners available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[500px] md:h-[700px] lg:h-[880px] overflow-hidden bg-transparent">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {heroes[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default HeroSectionHome;
