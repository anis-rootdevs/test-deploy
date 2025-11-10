"use client";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { FieldError, FieldValues, useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { FormInputProps } from "@/lib/types";

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
            "h-11 rounded-[4px] text-[16px] font-semibold tracking-[0.5px] font-mono focus-visible:ring-2 focus-visible:ring-blue-500 transition-all w-full",
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
        <p className="text-red-500 text-xs mt-1.5">{fieldError.message}</p>
      )}
    </div>
  );
}
