import {
  visitProductData2,
  visitProductDetails2,
} from "@/public/sample-data/landing-page-data";
import Image from "next/image";
import React from "react";
import VisitUsCard from "./visit-us-card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const VisitHomeSection2 = () => {
  return (
    <section className="w-full py-24 px-4 md:px-8 ">
      <div className="max-w-[1320px] mx-auto ">
        {/* Product Card - Responsive Layout */}
        <div className="relative grid lg:grid-cols-2">
          {/* Image Section */}
          <div className="aspect-[454/303]">
            <Image
              width={100}
              height={100}
              src={visitProductDetails2.image}
              alt={visitProductDetails2.title}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Content Section */}
          <div className="">
            <div className="absolute -top-[32px] md:left-8 lg:-top-8 lg:right-8 lg:left-auto lg:bottom-auto xl:-top-12 xl:right-32">
              <VisitUsCard product={visitProductData2} />
            </div>
            <div className="lg:mt-[190px] mt-[50px] px-4 lg:px-10">
              <h2 className="lg:text-[36px] md:text-[28px] text-[24px]  font-semibold uppercase font-jost mb-3">
                {visitProductDetails2?.title}
              </h2>
              <p className="text-[15px] sm:text-base font-normal font-jost max-w-xl mb-6">
                {visitProductDetails2?.description}
              </p>
              <p className="md:text-2xl text-xl font-bold font-jost mb-8">
                {visitProductDetails2?.price}
              </p>

              <Link
                href={`#`}
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

export default VisitHomeSection2;
