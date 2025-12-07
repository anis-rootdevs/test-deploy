"use client";

import { updateBusinessHours } from "@/actions/settings/settingsActions";
import { Button } from "@/components/ui/button";
import { IBusinessHours } from "@/lib/types";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import OpensHours, { initialValues } from "./OpensHours";

const convertTimeToMinutes = (timeString: string): number => {
  if (!timeString) return 0;
  const [hours, minutes] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
};

const REVERSE_DAY_MAPPING: Record<string, number> = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 0,
};

interface FormData {
  businessHour: {
    [key: string]: { open: string; close: string };
  };
}

export default function BusinessHours({
  businessHours,
}: {
  businessHours: IBusinessHours[] | { businessHours: IBusinessHours[] };
}) {
  const methods = useForm<FormData>({
    defaultValues: {
      businessHour: {},
    },
  });

  const {
    handleSubmit,
    setValue,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: any) => {
    try {
      const businessHourArray = initialValues.map((day) => {
        const dayData = data.businessHour[day.value];
        const openTime = dayData?.open ? convertTimeToMinutes(dayData.open) : 0;
        const closeTime = dayData?.close
          ? convertTimeToMinutes(dayData.close)
          : 0;

        // isClosed is true when no times are set OR when times are 0
        const isClosed =
          !dayData?.open ||
          !dayData?.close ||
          openTime === 0 ||
          closeTime === 0;

        return {
          dayOfWeek: REVERSE_DAY_MAPPING[day.value],
          openTime: isClosed ? 0 : openTime,
          closeTime: isClosed ? 0 : closeTime,
          isClosed,
        };
      });

      // Wrap in businessHour key as expected by API
      const finalPayload = {
        businessHour: businessHourArray,
      };

      const response: any = await updateBusinessHours(finalPayload);

      if (!response || response.status !== true) {
        throw new Error(response?.message || "Failed to update business hours");
      }

      toast.success(
        response?.message || "Business hours updated successfully!"
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update business hours"
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <OpensHours
          control={control}
          setValue={setValue}
          businessHours={businessHours}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Business Hours"}
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
