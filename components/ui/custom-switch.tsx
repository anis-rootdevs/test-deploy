"use client";

import * as SwitchPrimitive from "@radix-ui/react-switch";
import * as React from "react";
import { cn } from "@/lib/utils";
import { MoonIcon, SunIcon, SunMediumIcon } from "lucide-react";

interface CustomSwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  thumbClassName?: string;
}

const CustomSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  CustomSwitchProps
>(({ className, checked, onCheckedChange, thumbClassName, ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      checked={checked}
      onCheckedChange={onCheckedChange}
      className={cn(
        "peer relative inline-flex h-[88px] w-[42px] shrink-0  cursor-pointer flex-col items-center justify-between rounded-[42px] border-[1px] p-2.5 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        checked
          ? "bg-gray-900 border-gray-800"
          : "bg-gray-100 border-[#000000]/10",
        className
      )}
      {...props}
    >
      {/* Moon Icon - visible when unchecked (inactive at top) */}
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-center z-0 transition-opacity",
          !checked ? "opacity-0" : "opacity-100"
        )}
      >
        <MoonIcon className="h-6 w-6 text-gray-400" strokeWidth={2} />
      </div>

      {/* Moving Thumb - shows active icon */}
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none absolute left-1/2 -translate-x-1/2 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white shadow-lg ring-0 transition-transform duration-300 ease-in-out data-[state=checked]:translate-y-[44px] data-[state=unchecked]:-translate-y-[5px] z-10",
          thumbClassName
        )}
      >
        {checked ? (
          <SunIcon className="h-6 w-6 text-[#3E3B3F] top-0" strokeWidth={2.5} />
        ) : (
          <MoonIcon
            className="h-6 w-6 text-[#3E3B3F] bottom-0"
            strokeWidth={2.5}
          />
        )}
      </SwitchPrimitive.Thumb>

      {/* Sun Icon - visible when checked (inactive at bottom) */}
      <div
        className={cn(
          "flex h-5 w-5 items-center justify-end z-0 transition-opacity",
          checked ? "opacity-0" : "opacity-100"
        )}
      >
        <SunIcon className="h-6 w-6 text-gray-400" strokeWidth={2} />
      </div>
    </SwitchPrimitive.Root>
  );
});

CustomSwitch.displayName = "CustomSwitch";

export default CustomSwitch;
