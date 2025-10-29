import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "filled" | "outline";
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

export const CustomButton: React.FC<ButtonProps> = ({
  children,
  variant = "filled",
  href,
  onClick,
  className = "",
  disabled = false,
  type = "button",
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-jost font-semibold px-3 leading-[35px] md:px-8 py-2 md:py-2.5 text-sm md:text-base transition-all duration-300 group";

  // ✅ define variant styles
  const variants = {
    filled: cn(
      "bg-[#1B2A41] text-[#FAF8F5] hover:bg-primary hover:text-[#101020] hover:border-primary",
      className
    ),
    outline: cn(
      "bg-transparent text-white hover:bg-primary hover:text-[#101020] border hover:border-primary",
      className
    ),
  };

  const disabledStyles = disabled
    ? "opacity-50 cursor-not-allowed"
    : "cursor-pointer";

  // ✅ Add default white border if not already in className
  const defaultBorder =
    variant === "outline" && !className.includes("border-")
      ? "border-white"
      : "";

  // ✅ Combine all classes properly
  const combinedClassName = cn(
    baseStyles,
    variants[variant],
    defaultBorder,
    disabledStyles
  );

  const content = (
    <>
      <span>{children}</span>
      <Icons.arrowMoveRight className="w-0 opacity-0 -ml-2 transition-all duration-300 group-hover:w-4 group-hover:opacity-100 group-hover:ml-0" />
    </>
  );

  if (href && !disabled) {
    return (
      <Link href={href} className={combinedClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClassName}
    >
      {content}
    </button>
  );
};
