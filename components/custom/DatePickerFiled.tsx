"use client";

import { Label } from "@/components/ui/label";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Calendar } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  Control,
  Controller,
  FieldError,
  FieldValues,
  Path,
} from "react-hook-form";
import { Input } from "../ui/input";

interface DatePickerFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  rules?: object;
  disabled?: boolean;
  error?: FieldError;
  containerClassName?: string;

  // Flatpickr options
  enableTime?: boolean;
  noCalendar?: boolean;
  dateFormat?: string;
  minDate?: string | Date;
  maxDate?: string | Date;
  mode?: "single" | "multiple" | "range";
  defaultDate?: string | Date;
  time_24hr?: boolean;
  minuteIncrement?: number;
  defaultHour?: number;
  defaultMinute?: number;
}

export default function DatePickerField<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select date",
  required = false,
  rules,
  disabled = false,
  error,
  containerClassName = "",

  enableTime = false,
  noCalendar = false,
  dateFormat = "Y-m-d",
  minDate,
  maxDate,
  mode = "single",
  defaultDate,
  time_24hr = false,
  minuteIncrement = 1,
  defaultHour = 12,
  defaultMinute = 0,
}: DatePickerFieldProps<T>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const flatpickrInstanceRef = useRef<flatpickr.Instance | null>(null);

  // Cleanup when unmounted
  useEffect(() => {
    return () => flatpickrInstanceRef.current?.destroy();
  }, []);

  return (
    <div className={containerClassName}>
      {label && (
        <Label
          className={`font-jost text-base font-medium mb-1.5 ${
            error ? "text-[#830E0E]" : ""
          }`}
        >
          {label}
        </Label>
      )}

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field }) => {
          // Initialize Flatpickr
          useEffect(() => {
            if (!inputRef.current || flatpickrInstanceRef.current) return;

            flatpickrInstanceRef.current = flatpickr(inputRef.current, {
              enableTime,
              noCalendar,
              dateFormat,
              minDate,
              maxDate,
              mode,
              defaultDate,
              time_24hr,
              minuteIncrement,
              defaultHour,
              defaultMinute,

              onChange: (_, dateStr) => field.onChange(dateStr),
              onClose: () => field.onBlur(),
            });
          }, []);

          // Sync external field value with Flatpickr
          useEffect(() => {
            if (flatpickrInstanceRef.current && field.value) {
              flatpickrInstanceRef.current.setDate(field.value, false);
            }
          }, [field.value]);

          return (
            <div className="relative">
              <Input
                ref={inputRef}
                type="text"
                placeholder={placeholder}
                disabled={disabled}
                className={`
                  w-full h-[42px] px-4 pr-10 text-sm rounded-md border transition-all
                  placeholder:text-gray-400
                  disabled:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed datepicker-input

                  ${
                    error
                      ? "border-[#830E0E]"
                      : "border-gray-300 hover:border-gray-400 focus:ring-blue-500 focus:border-blue-500"
                  }
                `}
              />

              {/* Calendar Icon */}
              <Calendar
                className={`
                  absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none
                  ${error ? "text-[#830E0E]" : "text-gray-900"}
                `}
              />
            </div>
          );
        }}
      />

      {/* Error Message */}
      {error && (
        <p className="text-[#830E0E] text-sm font-medium mt-2 font-jost animate-in fade-in-50">
          {error.message}
        </p>
      )}
    </div>
  );
}
