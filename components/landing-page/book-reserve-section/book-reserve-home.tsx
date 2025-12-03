import { CustomButton } from "@/components/custom/custom-button";
import OpeningsHours from "@/components/custom/openings-hours";
import { Separator } from "@/components/ui/separator";
import { routes } from "@/config/routes";
import { ReservationShowcase } from "@/lib/types";
import Image from "next/image";

const BookReserveHome = ({
  reservationShowcase,
}: {
  reservationShowcase: ReservationShowcase;
}) => {
  return (
    <section className="relative w-full h-[500px] md:h-[550px] lg:h-[800px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={
            reservationShowcase?.darkImage ||
            "/images/book-reserve/book-reserve.svg"
          }
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
              {reservationShowcase?.cta || "Book a Reservation"}
            </p>
            <div className="w-[75px] mt-2 mb-3">
              <Separator className="bg-primary h-[2px]" />
            </div>

            {/* Main Heading */}
            <h2 className="text-[#FAF8F5] font-jost text-[32px] md:text-[36px] font-semibold uppercase  mb-3 md:mb-4">
              {reservationShowcase?.heading || "RESERVE YOUR COMFORT CORNER"}
            </h2>

            {/* Description */}
            <p className="text-[#E2E2E2] font-jost text-sm md:text-base font-normal mb-6 md:mb-10">
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
              textClass="text-[#FAF8F5] text-sm md:text-base"
              containerClass="flex flex-col items-start font-jost space-y-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookReserveHome;
