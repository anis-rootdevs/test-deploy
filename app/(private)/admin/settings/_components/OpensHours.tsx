"use client";

import { Switch } from "@/components/ui/switch";

import { useEffect, useState } from "react";

import { IBusinessHours } from "@/lib/types";
import { Controller } from "react-hook-form";
import { MdAccessTime } from "react-icons/md";
import { FlatpickrTimePicker } from "./FlatpickrTimePicker";

interface DaySchedule {
  day: string;
  enabled: boolean;
  value: string;
  id: number;
}

const convertMinutesToTime = (minutes: number): string => {
  if (minutes === 0) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

// Map API dayOfWeek (0=Sunday, 6=Saturday) to our format
const DAY_MAPPING: Record<number, string> = {
  1: "monday",
  2: "tuesday",
  3: "wednesday",
  4: "thursday",
  5: "friday",
  6: "saturday",
  0: "sunday",
};

export const initialValues: DaySchedule[] = [
  { id: 1, day: "Monday", enabled: false, value: "monday" },
  { id: 2, day: "Tuesday", enabled: false, value: "tuesday" },
  { id: 3, day: "Wednesday", enabled: false, value: "wednesday" },
  { id: 4, day: "Thursday", enabled: false, value: "thursday" },
  { id: 5, day: "Friday", enabled: false, value: "friday" },
  { id: 6, day: "Saturday", enabled: false, value: "saturday" },
  { id: 7, day: "Sunday", enabled: false, value: "sunday" },
];

export default function OpensHours({
  control,
  setValue,
  businessHours,
}: {
  control: any;
  setValue: any;
  businessHours: IBusinessHours[] | any;
}) {
  const [schedule, setSchedule] = useState<DaySchedule[]>(initialValues);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize form values from API response
  useEffect(() => {
    // Handle different possible formats of businessHours
    let hoursArray: IBusinessHours[] = [];

    if (Array.isArray(businessHours)) {
      hoursArray = businessHours;
    } else if (
      businessHours?.businessHours &&
      Array.isArray(businessHours.businessHours)
    ) {
      hoursArray = businessHours.businessHours;
    } else {
      return;
    }

    if (hoursArray.length === 0) {
      return;
    }

    const updatedSchedule = initialValues.map((item) => {
      const apiDay = hoursArray.find(
        (bh) => DAY_MAPPING[bh.dayOfWeek] === item.value
      );

      if (apiDay) {
        const isEnabled = !apiDay.isClosed;

        // Set form values if the day is enabled
        if (isEnabled && apiDay.openTime > 0 && apiDay.closeTime > 0) {
          const openTime = convertMinutesToTime(apiDay.openTime);
          const closeTime = convertMinutesToTime(apiDay.closeTime);

          setValue(`businessHour.${item.value}.open`, openTime);
          setValue(`businessHour.${item.value}.close`, closeTime);
        }

        return { ...item, enabled: isEnabled };
      }
      return item;
    });

    setSchedule(updatedSchedule);
    setIsInitialized(true);
  }, [businessHours, setValue]);

  const toggleDay = (id: number) => {
    // Find the item first
    const item = schedule.find((item) => item.id === id);
    if (!item) return;

    const newEnabled = !item.enabled;

    // Clear form values when disabling (marking as day off)
    if (!newEnabled) {
      setValue(`businessHour.${item.value}.open`, "");
      setValue(`businessHour.${item.value}.close`, "");
    }

    // Update schedule state
    setSchedule((prev) =>
      prev.map((scheduleItem) =>
        scheduleItem.id === id
          ? { ...scheduleItem, enabled: newEnabled }
          : scheduleItem
      )
    );
  };

  return (
    <div className="w-full max-w-full mx-auto bg-white dark:bg-gray-800 border-gray-200 rounded-lg">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 font-bold text-base">
          <MdAccessTime className="h-5 w-5 text-primary" />
          Opening hours
        </div>
        <p className="dark:text-gray-400 mt-1 text-sm">
          Configure your cafe Opening hours information
        </p>

        {!isInitialized && (
          <span className="text-xs text-gray-500">Loading...</span>
        )}
      </div>
      <div className="p-4 space-y-3">
        {schedule.map((item) => (
          <div
            key={item.day}
            className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 py-3 border-b border-gray-100 last:border-b-0"
          >
            <div className="flex items-center gap-3">
              <Switch
                checked={item.enabled}
                onCheckedChange={() => toggleDay(item.id)}
                className="data-[state=checked]:bg-blue-600 cursor-pointer"
              />
              <div className="w-24 text-sm font-medium ">{item.day}</div>
            </div>

            <div className="flex items-center gap-4 lg:col-span-2">
              <Controller
                name={`businessHour.${item.value}.open`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FlatpickrTimePicker
                    value={field.value || ""}
                    onChange={field.onChange}
                    disabled={!item.enabled}
                    label="Opening Time"
                  />
                )}
              />

              <Controller
                name={`businessHour.${item.value}.close`}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <FlatpickrTimePicker
                    value={field.value || ""}
                    onChange={field.onChange}
                    disabled={!item.enabled}
                    label="Closing Time"
                  />
                )}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
