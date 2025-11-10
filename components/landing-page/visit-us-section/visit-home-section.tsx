import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import VisitUsCard from "./visit-us-card";
import {
  visitProductData,
  visitProductDetails,
} from "@/public/sample-data/landing-page-data";
import { routes } from "@/config/routes";

const VisitHomeSection = () => {
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

        {/* Product Card - Responsive Layout */}
        <div className="relative grid lg:grid-cols-2">
          {/* Image Section */}
          <div className="aspect-[759/427] relative xl:left-24 lg:left-16">
            <Image
              width={100}
              height={100}
              src={visitProductDetails?.image}
              alt={visitProductDetails.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content Section */}
          {/* Content Section */}
          <div className="absolute -bottom-[130px] left-8 md:-bottom-20 md:left-24 lg:-top-8 lg:right-8 lg:left-auto lg:bottom-auto xl:-top-16 xl:right-24">
            <VisitUsCard product={visitProductData} />
          </div>
        </div>

        {/* Visit Us Link */}
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
