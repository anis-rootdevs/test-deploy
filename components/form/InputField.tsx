"use client";
import { FormInputProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { BadgeAlert } from "lucide-react";
import { FieldError, FieldValues, useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function InputField<TFieldValues extends FieldValues>({
  id,
  label,
  type = "text",
  placeholder = "",
  name,
  rules = {},
  className = "",
  prefix,
  postfix,
}: FormInputProps<TFieldValues>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const fieldError = errors?.[name] as FieldError | undefined;

  return (
    <div className="w-full">
      {label && (
        <Label
          htmlFor={id || name}
          className="text-sm font-jost font-medium mb-1 block"
        >
          {label}
        </Label>
      )}

      <div className="relative flex items-center">
        {prefix && (
          <div className="absolute left-3 text-gray-500 pointer-events-none">
            {prefix}
          </div>
        )}

        <Input
          id={id || name}
          type={type}
          placeholder={placeholder}
          {...register(name, rules)}
          className={cn(
            `h-11 rounded-[4px] text-[16px] font-semibold tracking-[0.5px] font-mono focus-visible:ring-2 ${
              fieldError
                ? "focus-visible:ring-red-500 "
                : "focus-visible:ring-blue-500"
            } transition-all w-full`,
            prefix ? "pl-9" : "",
            postfix,
            className
          )}
        />

        {postfix && (
          <div className="absolute right-3 text-gray-500 pointer-events-none">
            {postfix}
          </div>
        )}
      </div>

      {fieldError && (
        <div className="flex items-center mt-2 gap-1">
          <BadgeAlert className="text-red-500 h-4 w-4" />
          <p className="text-red-500 text-xs">{fieldError.message}</p>
        </div>
      )}
    </div>
  );
}
