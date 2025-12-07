import { Separator } from "@radix-ui/react-separator";
import React from "react";

interface OpeningHoursItem {
  days: string;
  time: string;
}

interface OpeningHoursProps {
  data: OpeningHoursItem[] | string[];
  containerClass?: string;
  textClass?: string;
  separatorColor?: string;
}

const OpeningsHours = ({
  data,
  containerClass = "flex flex-col items-start text-[15px] font-jost",
  textClass = "font-medium text-base font-jost",
  separatorColor = "bg-primary",
}: OpeningHoursProps) => {
  const formattedData =
    data
      ?.map((item) => {
        if (typeof item === "string") {
          const parts = item.split(" - ");
          const days = parts[0];
          const time = parts.slice(1).join(" - ");
          return { days, time };
        }
        return item;
      })
      .filter(
        (item) => item.time && !item.time.toLowerCase().includes("closed")
      ) || [];

  return (
    <div className={containerClass}>
      {formattedData.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={`${textClass} flex items-center gap-2 whitespace-nowrap`}
          >
            <span>{item.days}</span>
            <span>-</span>
            <span>{item.time}</span>
          </div>

          {index !== formattedData.length - 1 && (
            <Separator
              className={`${separatorColor} h-[1px] w-full max-w-[270px] my-2`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OpeningsHours;
