import React from "react";
import { Separator } from "@radix-ui/react-separator";

interface OpeningHoursItem {
  days: string;
  time: string;
}

interface OpeningHoursProps {
  data: OpeningHoursItem[];
  containerClass?: string;
  textClass?: string;
  separatorColor?: string;
}

const OpeningsHours = ({
  data = [
    { days: "Sunday to Thursday", time: "10 AM - 9 PM" },
    { days: "Friday & Saturday", time: "11 AM - 11 PM" },
  ],
  containerClass = "flex flex-col items-start text-[15px] font-jost",
  textClass = "font-medium text-base font-jost",
  separatorColor = "bg-primary",
}: OpeningHoursProps) => {
  return (
    <div className={containerClass}>
      {data.map((item, index) => (
        <React.Fragment key={index}>
          <div className={`${textClass}`}>
            <span>{item.days}</span>
            <span className="mx-2">-</span>
            <span>{item.time}</span>
          </div>
          {index !== data.length - 1 && (
            <Separator className={`${separatorColor} h-[1px] w-[270px] my-2`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default OpeningsHours;
