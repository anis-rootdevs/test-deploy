import { CustomButton } from "@/components/custom/custom-button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

const BookReserveHome = () => {
  return (
    <section className="relative w-full h-[500px] md:h-[550px] lg:h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/book-reserve/book-reserve.svg"
          alt="Reservation background"
          fill
          className="object-cover"
          priority
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-[#10102080] md:w-1/2 w-full" />
      </div>

      {/* Content Container */}
      <div className="relative h-full max-w-[1320px] mx-auto px-4 md:px-6">
        <div className="flex flex-col justify-center h-full">
          {/* Content Wrapper */}
          <div className="max-w-2xl">
            {/* Subtitle */}
            <p className="text-[#E2E2E2] font-jost text-lg md:text-[24px] ">
              Book a Reservation
            </p>
            <div className="w-[75px] mt-2 mb-3">
              <Separator className="bg-primary h-[2px]" />
            </div>

            {/* Main Heading */}
            <h2 className="text-[#FAF8F5] font-jost text-[32px] md:text-[36px] font-semibold uppercase  mb-3 md:mb-4">
              RESERVE YOUR COMFORT CORNER
            </h2>

            {/* Description */}
            <p className="text-[#E2E2E2] font-jost text-sm md:text-base font-normal mb-6 md:mb-10">
              Every table is ready to welcome you with warmth and comfort.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mb-8 md:mb-24">
              <CustomButton variant="filled" href="/reserve">
                Reserve Table
              </CustomButton>
              <CustomButton
                variant="outline"
                href="/directions"
                className="text-primary border-primary"
              >
                Our direction
              </CustomButton>
            </div>

            {/* Opening Hours */}
            <div className="flex flex-col">
              <div className="font-medium text-[#FAF8F5] text-base font-jost">
                <span className="">Sunday to Thursday</span> -
                <span className="ml-3 ">10 AM - 9 PM</span>
              </div>
              <div className="w-[268px] my-2">
                <Separator className="bg-primary h-[1px]" />
              </div>
              <div className="font-medium text-[#FAF8F5] text-base font-jost">
                <span className="d">Friday & Saturday</span> -
                <span className="ml-3">11 AM - 11 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookReserveHome;
