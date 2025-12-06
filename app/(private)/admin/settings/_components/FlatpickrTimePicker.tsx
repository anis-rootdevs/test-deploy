"use client";
// Flatpickr Time Picker Component
import "flatpickr/dist/themes/airbnb.css";
import Flatpickr from "react-flatpickr";

export function FlatpickrTimePicker({
  value,
  onChange,
  disabled,
  label,
}: {
  value: string;
  onChange: (time: string) => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label className="text-xs font-medium ">{label}</label>
      <Flatpickr
        value={value || ""}
        onChange={(dates) => {
          if (dates && dates.length > 0) {
            const hours = String(dates[0].getHours()).padStart(2, "0");
            const minutes = String(dates[0].getMinutes()).padStart(2, "0");
            const formattedTime = `${hours}:${minutes}`;
            onChange(formattedTime);
          }
        }}
        options={{
          enableTime: true,
          noCalendar: true,
          dateFormat: "H:i",
          time_24hr: false,
        }}
        className="flex h-9 w-full rounded-md border px-3 py-1 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 bg-white"
        disabled={disabled}
        placeholder="Select time"
      />
    </div>
  );
}
