import { Separator } from "@radix-ui/react-separator";
import React from "react";

const CustomSeparator = ({ title = "Offers", textClassname = "" }: any) => {
  return (
    <div className="flex items-center justify-center gap-5 w-full my-4">
      <Separator className={`flex-1 h-[1px] bg-primary opacity-70`} />
      <p
        className={`text-[24px] font-medium font-jost dark:text-primary ${textClassname}`}
      >
        {title}
      </p>
      <Separator className={`flex-1 h-[1px] bg-primary opacity-70`} />
    </div>
  );
};

export default CustomSeparator;
