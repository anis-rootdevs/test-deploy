"use client";

import { updateBusinessHours } from "@/actions/settings/settingsActions";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import OpeningHours from "./OpeningHours";

interface BusinessHour {
  dayOfWeek: number;
  openTime: number;
  closeTime: number;
  isClosed: boolean;
}

interface FormData {
  operationHours: {
    [key: string]: { open: string; close: string };
  };
  businessHoursFormatted: BusinessHour[];
}

export function convertTimeToMinutes(time: any) {
  // If already a number (like 540), return it
  if (typeof time === "number" && !Number.isNaN(time)) {
    return time;
  }

  // If empty or invalid → return 0
  if (!time || typeof time !== "string" || !time.includes(":")) {
    return 0;
  }

  const [h, m] = time.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return 0;

  return h * 60 + m;
}

export default function BusinessHours({ businessHours }: any) {
  const methods = useForm<FormData>({
    defaultValues: {
      operationHours: {
        monday: { open: "", close: "" },
        tuesday: { open: "", close: "" },
        wednesday: { open: "", close: "" },
        thursday: { open: "", close: "" },
        friday: { open: "", close: "" },
        saturday: { open: "", close: "" },
        sunday: { open: "", close: "" },
      },
      businessHoursFormatted: [],
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      const finalPayload = data.businessHoursFormatted.map((row) => {
        const open = convertTimeToMinutes(row.openTime);
        const close = convertTimeToMinutes(row.closeTime);

        const isClosed = row.isClosed || open === 0 || close === 0;

        return {
          dayOfWeek: row.dayOfWeek,
          openTime: isClosed ? 0 : open,
          closeTime: isClosed ? 0 : close,
          isClosed,
        };
      });

      console.log("FINAL PAYLOAD SENT TO API:", finalPayload);

      const response: any = await updateBusinessHours(finalPayload);

      if (!response || response.status !== true) {
        throw new Error("Failed to update business hours");
      }

      toast.success("Business hours updated successfully!");
    } catch (error) {
      console.error("Error updating business hours:", error);
      toast.error("Failed to update business hours");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <OpeningHours businessHours={businessHours || []} />

        <div className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Business Hours"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
