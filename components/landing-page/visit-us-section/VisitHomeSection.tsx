"use client";
import { routes } from "@/config/routes";
import { Products } from "@/lib/types";
import { visitProductDetails } from "@/public/sample-data/landing-page-data";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import VisitUsCard from "./VisitUsCard";

const VisitHomeSection = ({ newProducts }: { newProducts: Products[] }) => {
  const hasMultiple = newProducts.length > 1;
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProduct = newProducts[currentIndex];

  // Auto-rotate every 5 seconds using setTimeout
  useEffect(() => {
    if (!hasMultiple) return;
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % newProducts.length);
    }, 5000);

    // Cleanup timeout on unmount or when currentIndex changes
    return () => clearTimeout(timeout);
  }, [currentIndex, newProducts.length, hasMultiple]);
  return (
    <section className="w-full py-20 px-4 md:px-8 bg-[#E2E2E2] dark:bg-[#222831]">
      <div className="max-w-[1320px] mx-auto ">
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-2xl  font-medium uppercase font-jost mb-3">
            {visitProductDetails?.title}
          </h2>
          <p className="text-[15px] sm:text-base font-normal font-jost max-w-xl">
            {visitProductDetails?.description}
          </p>
        </div>

        {/* Product Display - Image slides from bottom, Card slides from top */}
        <div className="relative grid lg:grid-cols-2">
          {/* Image Container - Slides from bottom */}
          <div className="relative w-full max-w-[759px] lg:max-w-none">
            {hasMultiple ? (
              <AnimatePresence mode="wait">
                <motion.div
                  layout
                  key={`image-${currentProduct._id}`}
                  initial={{ y: 120, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: -110, opacity: 0, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 10,
                    mass: 0.5,
                  }}
                  className="aspect-[759/427] relative xl:left-24 lg:left-16"
                >
                  <Image
                    src={
                      currentProduct.image ||
                      "/images/visit-us/close-up-coffee-table.svg"
                    }
                    alt={currentProduct.name}
                    className="w-full h-full object-cover"
                    fill
                  />
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="aspect-[759/427] relative xl:left-24 lg:left-16">
                <Image
                  src={
                    currentProduct.image ||
                    "/images/visit-us/close-up-coffee-table.svg"
                  }
                  alt={currentProduct.name}
                  className="w-full h-full object-cover"
                  fill
                />
              </div>
            )}
          </div>

          {/* Card Container - Slides from top */}
          <div className="absolute -bottom-[130px] left-8 md:-bottom-20 md:left-24 lg:-top-8 lg:right-8 lg:left-auto lg:bottom-auto xl:-top-16 xl:right-24">
            {hasMultiple ? (
              <AnimatePresence mode="wait">
                <motion.div
                  layout
                  key={`card-${currentProduct._id}`}
                  initial={{ y: -120, opacity: 0, scale: 0.96 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 120, opacity: 0, scale: 0.92 }}
                  transition={{
                    type: "spring",
                    stiffness: 60,
                    damping: 10,
                    mass: 0.8,
                  }}
                >
                  <VisitUsCard product={currentProduct} price={true} />
                </motion.div>
              </AnimatePresence>
            ) : (
              <>
                <VisitUsCard product={currentProduct} price={true} />
              </>
            )}
          </div>
        </div>

        <div className=" flex justify-center lg:justify-end md:mt-[110px] lg:mt-0 mt-[160px]">
          <Link
            href={routes.publicRoutes.locations}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-medium hover:text-primary  group"
          >
            Visit Us
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VisitHomeSection;
