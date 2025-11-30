"use client";
import { routes } from "@/config/routes";
import { CafeInfoCardProps } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { CustomButton } from "../custom/custom-button";
import { Icons } from "../custom/icons";

const CafeInfoCard = ({
  title,
  address,
  phone,
  buttonText = "Reserve Table",
  onReserveClick,
  className = "",
  googleMapLink = "",
}: CafeInfoCardProps) => {
  return (
    <div className={`border-0 ${className}`}>
      <div className="p-6 md:p-8">
        {/* Title */}
        <h3 className="text-lg font-semibold font-jost mb-[20px]">{title}</h3>

        {/* Address */}
        <div className="flex items-start gap-3 mb-[18px]">
          <Icons.address className="w-6 h-6 text-primary flex-shrink-0" />
          <div className="flex items-center gap-x-2 flex-wrap">
            <p className="text-[15px] md:text-base font-jost">{address}</p>
            {googleMapLink && (
              <Link
                href={googleMapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-primary"
              >
                ( Open Map <ExternalLink className="w-4 h-4 text-primary" />)
              </Link>
            )}
          </div>
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
