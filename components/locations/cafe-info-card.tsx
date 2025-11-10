"use client";
import { CustomButton } from "../custom/custom-button";
import Link from "next/link";
import { Icons } from "../custom/icons";
import { routes } from "@/config/routes";
import { CafeInfoCardProps } from "@/lib/types";

const CafeInfoCard = ({
  title,
  address,
  phone,
  openingHours,
  buttonText = "Reserve Table",
  onReserveClick,
  className = "",
}: CafeInfoCardProps) => {
  return (
    <div className={`border-0 ${className}`}>
      <div className="p-6 md:p-8">
        {/* Title */}
        <h3 className="text-lg font-semibold font-jost mb-[20px]">{title}</h3>

        {/* Address */}
        <div className="flex items-start gap-3 mb-[18px]">
          <Icons.address className="w-6 h-6 text-primary flex-shrink-0" />
          <p className="text-[15px] md:text-base font-jost">{address}</p>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-3 mb-[18px]">
          <Icons.phoneCall className="w-6 h-6 text-primary flex-shrink-0" />
          <Link
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="text-[15px] md:text-base font-jost"
          >
            {phone}
          </Link>
        </div>

        {/* Opening Hours */}
        <div>
          <div className="flex items-start gap-x-[11px]">
            <div className="gap-3">
              <Icons.clockTime className="w-6 h-6 text-primary flex-shrink-0" />
            </div>
            <div>
              {openingHours.map((schedule, index) => (
                <div key={index} className="flex items-center mb-2.5">
                  <span className="text-[15px] md:text-base font-jost">
                    {schedule.days}
                  </span>
                  <span className="mx-[22px]">-</span>
                  <span className="text-[15px] md:text-base font-jost">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Reserve Button */}
        <CustomButton
          onClick={onReserveClick}
          className="mt-[30px]"
          href={routes.publicRoutes.reserveTable}
        >
          {buttonText}
        </CustomButton>
      </div>
    </div>
  );
};

export default CafeInfoCard;
