import { CustomButton } from "@/components/custom/custom-button";
import OpeningsHours from "@/components/custom/openings-hours";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/config/routes";
import { ReservationShowcase } from "@/lib/types";
import Image from "next/image";

const BookReservationHome2 = ({
  reservationShowcase,
}: {
  reservationShowcase: ReservationShowcase;
}) => {
  return (
    <div className="max-w-[1320px] mx-auto py-20 w-full px-4">
      <div className="grid md:grid-cols-2 gap-6 grid-cols-1">
        <div className="flex flex-col justify-center h-full">
          {/* Content Wrapper */}
          <div className="max-w-2xl">
            {/* Subtitle */}
            <p className=" font-jost text-lg md:text-[24px] ">
              {reservationShowcase?.cta || "Book a Reservation"}
            </p>
            <div className="w-[75px] mt-2 mb-3">
              <Separator className="bg-primary h-[2px]" />
            </div>

            {/* Main Heading */}
            <h2 className=" font-jost text-[32px] md:text-[36px] font-semibold uppercase  mb-3 md:mb-4">
              {reservationShowcase?.heading || "RESERVE YOUR COMFORT CORNER"}
            </h2>

            {/* Description */}
            <p className="font-jost text-sm md:text-base font-normal mb-6 md:mb-10">
              {reservationShowcase?.tagline ||
                "  Every table is ready to welcome you with warmth and comfort."}
            </p>

            {/* CTA Buttons */}
            <div className="flex items-center gap-4 mb-8 md:mb-24">
              <CustomButton
                variant="filled"
                href={routes.publicRoutes.reserveTable}
              >
                Reserve Table
              </CustomButton>
              <CustomButton
                variant="outline"
                href={routes.publicRoutes.locations}
                className="text-primary border-primary"
              >
                Our direction
              </CustomButton>
            </div>
            <OpeningsHours
              data={reservationShowcase?.businessHour || []}
              textClass="text-[#2A2A2F] text-sm md:text-base"
              containerClass="flex flex-col items-start font-jost space-y-2"
            />
          </div>
        </div>
        <div>
          <Image
            src={
              reservationShowcase?.lightImage ||
              "/images/menu-items/high-angle-view-breakfast-table.svg"
            }
            alt="booked image"
            width={700}
            height={700}
            className="h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default BookReservationHome2;
