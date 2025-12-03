"use client";
import { routes } from "@/config/routes";
import { Products } from "@/lib/types";
import { visitProductDetails2 } from "@/public/sample-data/landing-page-data";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import VisitUsCard from "./VisitUsCard";

const VisitHomeSectionTwo = ({ newProducts }: { newProducts: Products[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentProduct = newProducts[currentIndex];

  // Auto-rotate every 5 seconds using setTimeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % newProducts.length);
    }, 5000);

    // Cleanup timeout on unmount or when currentIndex changes
    return () => clearTimeout(timeout);
  }, [currentIndex, newProducts.length]);

  return (
    <section className="w-full py-24 px-4 md:px-8 ">
      <div className="max-w-[1320px] mx-auto ">
        {/* Product Card - Responsive Layout */}
        <div className="relative grid lg:grid-cols-2">
          {/* Image Section */}
          {/* <div className="aspect-[454/303]"> */}
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
              className="aspect-[454/303]"
            >
              <Image
                width={454}
                height={303}
                src={
                  currentProduct.image ||
                  "/images/visit-us/close-up-coffee-table.svg"
                }
                alt={currentProduct.name}
                className="w-full h-full object-cover"
                // fill
                // priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Content Section */}
          <div className="">
            <div className="absolute -top-[32px] md:left-8 lg:-top-8 lg:right-8 lg:left-auto lg:bottom-auto xl:-top-12 xl:right-32">
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
                  <VisitUsCard product={currentProduct} price={false} />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="lg:mt-[190px] mt-[50px] px-4 lg:px-10">
              <h2 className="lg:text-[36px] md:text-[28px] text-[24px]  font-semibold uppercase font-jost mb-3">
                {visitProductDetails2?.title}
              </h2>
              <p className="text-[15px] sm:text-base font-normal font-jost max-w-xl mb-6">
                {visitProductDetails2?.description}
              </p>
              <p className="md:text-2xl text-xl font-bold font-jost mb-8">
                ${currentProduct?.price}
              </p>

              <Link
                href={routes.publicRoutes.menu}
                className="inline-flex items-center gap-2 text-sm sm:text-base font-medium hover:text-primary  group"
              >
                Explore More Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisitHomeSectionTwo;
