import { CustomButton } from "@/components/custom/custom-button";
import OpeningsHours from "@/components/custom/openings-hours";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import React from "react";

const BookReservationHome2 = () => {
  return (
    <div className="max-w-[1320px] mx-auto py-20 w-full px-4">
      <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
        <div className="flex flex-col justify-center h-full">
          {/* Content Wrapper */}
          <div className="max-w-2xl">
            {/* Subtitle */}
            <p className=" font-jost text-lg md:text-[24px] ">
              Book a Reservation
            </p>
            <div className="w-[75px] mt-2 mb-3">
              <Separator className="bg-primary h-[2px]" />
            </div>

            {/* Main Heading */}
            <h2 className=" font-jost text-[32px] md:text-[36px] font-semibold uppercase  mb-3 md:mb-4">
              RESERVE YOUR COMFORT CORNER
            </h2>

            {/* Description */}
            <p className="font-jost text-sm md:text-base font-normal mb-6 md:mb-10">
              Every table is ready to welcome you with warmth and comfort.
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mb-8 md:mb-24">
              <CustomButton variant="filled" href="/reserve-table">
                Reserve Table
              </CustomButton>
              <CustomButton
                variant="outline"
                href="/locations"
                className="text-primary border-primary"
              >
                Our direction
              </CustomButton>
            </div>
            <OpeningsHours
              data={[
                { days: "Sunday to Thursday", time: "10 AM - 9 PM" },
                { days: "Friday & Saturday", time: "11 AM - 11 PM" },
              ]}
            />

            {/* Opening Hours */}
            {/* <div className="flex flex-col">
              <div className="font-medium  text-base font-jost">
                <span className="">Sunday to Thursday</span> -
                <span className="ml-3 ">10 AM - 9 PM</span>
              </div>
              <div className="w-[268px] my-2">
                <Separator className="bg-primary h-[1px]" />
              </div>
              <div className="font-medium text-base font-jost">
                <span className="d">Friday & Saturday</span> -
                <span className="ml-3">11 AM - 11 PM</span>
              </div>
            </div> */}
          </div>
        </div>
        <div>
          <Image
            src="/images/menu-items/high-angle-view-breakfast-table.svg"
            alt="booked image"
            width={100}
            height={100}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BookReservationHome2;
