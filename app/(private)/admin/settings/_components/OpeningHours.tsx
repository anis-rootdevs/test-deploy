"use client";

import DatePickerField from "@/components/custom/DatePickerFiled";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface DaySchedule {
  day: string;
  enabled: boolean;
  value: string;
  dayOfWeek: number;
}

interface BusinessHour {
  dayOfWeek: number;
  openTime: number;
  closeTime: number;
  isClosed: boolean;
}

const daysOfWeek = [
  { dayOfWeek: 0, day: "Sunday", value: "sunday" },
  { dayOfWeek: 1, day: "Monday", value: "monday" },
  { dayOfWeek: 2, day: "Tuesday", value: "tuesday" },
  { dayOfWeek: 3, day: "Wednesday", value: "wednesday" },
  { dayOfWeek: 4, day: "Thursday", value: "thursday" },
  { dayOfWeek: 5, day: "Friday", value: "friday" },
  { dayOfWeek: 6, day: "Saturday", value: "saturday" },
];

const minutesToTime = (minutes: number): string => {
  // Always convert minutes to HH:mm
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

interface OpeningHoursProps {
  businessHours?: BusinessHour[];
}

export default function OpeningHours({ businessHours }: OpeningHoursProps) {
  const { control, setValue, watch } = useFormContext();
  console.log("businessHours", businessHours);

  const [schedule, setSchedule] = useState<DaySchedule[]>(
    daysOfWeek.map((day) => ({
      ...day,
      enabled: false,
    }))
  );
  console.log("schedule", schedule);

  // Load API data
  useEffect(() => {
    if (!Array.isArray(businessHours)) return; // <-- safety check

    const updatedSchedule = daysOfWeek.map((day) => {
      const bh = businessHours.find((b) => b.dayOfWeek === day.dayOfWeek);

      if (!bh) return { ...day, enabled: false };

      const enabled = bh.isClosed === false;

      setValue(
        `operationHours.${day.value}.open`,
        enabled ? minutesToTime(bh.openTime) : ""
      );
      setValue(
        `operationHours.${day.value}.close`,
        enabled ? minutesToTime(bh.closeTime) : ""
      );

      return { ...day, enabled };
    });

    setSchedule(updatedSchedule);
  }, [businessHours, setValue]);

  const toggleDay = (dayOfWeek: number) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.dayOfWeek === dayOfWeek) {
          const enabled = !item.enabled;

          if (enabled) {
            const open = watch(`operationHours.${item.value}.open`);
            const close = watch(`operationHours.${item.value}.close`);

            if (!open) setValue(`operationHours.${item.value}.open`, "09:00");
            if (!close) setValue(`operationHours.${item.value}.close`, "17:00");
          } else {
            setValue(`operationHours.${item.value}.open`, "");
            setValue(`operationHours.${item.value}.close`, "");
          }

          return { ...item, enabled };
        }
        return item;
      })
    );
  };

  // Create final formatted output for submission
  const getFormattedBusinessHours = (): BusinessHour[] => {
    return schedule.map((day) => {
      const open = watch(`operationHours.${day.value}.open`);
      const close = watch(`operationHours.${day.value}.close`);

      return {
        dayOfWeek: day.dayOfWeek,
        openTime: day.enabled && open ? timeToMinutes(open) : 0,
        closeTime: day.enabled && close ? timeToMinutes(close) : 0,
        isClosed: !day.enabled,
      };
    });
  };

  // Sync formatted data to parent form automatically
  useEffect(() => {
    const formatted = getFormattedBusinessHours();
    setValue("businessHoursFormatted", formatted);
  }, [schedule, watch, setValue]);

  return (
    <div className="w-full max-w-full mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
          Opening hours
        </h2>
      </div>

      <div className="p-4 space-y-4">
        {schedule.map((item) => (
          <div
            key={item.dayOfWeek}
            className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 py-2 border-b dark:border-gray-700 pb-4"
          >
            <div className="flex items-center gap-3">
              <Switch
                checked={item.enabled}
                onCheckedChange={() => toggleDay(item.dayOfWeek)}
                className="data-[state=checked]:bg-secondary"
              />
              <div className="w-20 text-sm font-medium text-gray-900 dark:text-white">
                {item.day}
              </div>
            </div>

            <div className="flex items-center gap-4 flex-1">
              <DatePickerField
                name={`operationHours.${item.value}.open`}
                control={control}
                label="Opening Time"
                disabled={!item.enabled}
                enableTime
                noCalendar
                dateFormat="H:i"
                time_24hr
                placeholder="00:00"
              />
              <DatePickerField
                name={`operationHours.${item.value}.close`}
                control={control}
                label="Closing Time"
                disabled={!item.enabled}
                enableTime
                noCalendar
                dateFormat="H:i"
                time_24hr
                placeholder="00:00"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
