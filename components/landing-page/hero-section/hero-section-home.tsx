"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import HeroArtCoffee from "./hero-art-coffee";
import HeroAroma from "./hero-aroma";
import HeroStories from "./hero-stories";
import HeroAromaCare from "./hero-aroma-care";

const HeroSectionHome = () => {
  const heroes = [
    <HeroArtCoffee key="coffee" />,
    <HeroAroma key="aroma" />,
    <HeroStories key="stories" />,
    <HeroAromaCare key="care" />,
  ];

  const [index, setIndex] = useState(0);

  // Auto-slide every 2 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroes.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroes.length]);

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
