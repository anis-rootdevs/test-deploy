"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { routes } from "@/config/routes";

export interface MenuItem {
  id: number;
  badge: string;
  title: string;
  description: string;
  price: string;
  images: string;
}

interface MenuSliderProps {
  items: MenuItem[];
  autoSlideInterval?: number;
  onExploreClick?: () => void;
}

const PopularItemsHome = ({
  items,
  autoSlideInterval = 3000,
  onExploreClick,
}: MenuSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [items.length, autoSlideInterval]);

  const currentItem = items[currentIndex];
  return (
    <section className="relative w-full pt-12 md:pt-20 overflow-hidden">
      <div className="mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[700px]">
          {/* Left Side - Text Content */}
          <div className="lg:ml-[100px] xl:ml-[250px] md:ml-[200px] flex flex-col justify-between min-h-[500px] lg:min-h-[680px] lg:order-1 order-2 ">
            {/* Top Section: Badge + Animated Content (Centered) */}
            <div className="flex-grow flex flex-col justify-center">
              {/* Badge - Fixed (Not Animated) */}
              <div className="mb-6">
                <p className="text-lg font-normal md:text-2xl font-jost mb-2">
                  {currentItem.badge}
                </p>
                <div className="w-[75px] h-[2px] bg-primary" />
              </div>

              {/* Animated Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-${currentIndex}`}
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-4"
                >
                  {/* Title */}
                  <h2 className="text-2xl md:text-[28px] lg:text-[36px] font-semibold font-jost uppercase">
                    {currentItem.title}
                  </h2>

                  {/* Description */}
                  <p className="text-base md:text-lg font-medium font-jost">
                    {currentItem.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg md:text-2xl font-jost font-medium">
                      Price
                    </span>
                    <span className="text-lg md:text-2xl font-jost font-medium">
                      {currentItem.price}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Pagination & Button - Bottom Aligned */}
            <div className="flex flex-col items-start gap-2 pt-8 pb-6">
              <span className="text-lg font-jost font-medium">
                {currentIndex + 1}/{items.length}
              </span>
              <Link href={routes.publicRoutes.menu}>
                <button
                  onClick={onExploreClick}
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-jost text-base group cursor-pointer"
                >
                  Explore More Menu
                  <MoveRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Side - Images */}
          <div className="bg-[#FAF8F5] dark:bg-[#181C20] flex items-center justify-center min-h-[500px] lg:min-h-[680px] lg:order-2 order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={`images-${currentIndex}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-[600px] aspect-square"
              >
                {/* Main Image */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentItem.images}
                    alt={currentItem.title}
                    fill
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularItemsHome;
