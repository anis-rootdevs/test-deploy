import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { businessHourSchema } from "@/lib/validation-schema";
import Settings from "@/model/Settings";
import { NextRequest } from "next/server";
import z from "zod";

export const PUT = asyncHandler(
  businessHourSchema,
  async (req: NextRequest, data: z.infer<typeof businessHourSchema>) => {
    const { businessHour } = data;

    // Validate that the array has at least one entry
    if (!businessHour || businessHour.length === 0) {
      return apiResponse(false, 400, "Business hours array cannot be empty!");
    }

    // Validate that all dayOfWeek values are unique
    const dayOfWeeks = businessHour.map((hour) => hour.dayOfWeek);
    const uniqueDays = new Set(dayOfWeeks);

    if (uniqueDays.size !== dayOfWeeks.length) {
      return apiResponse(
        false,
        400,
        "Duplicate days are not allowed in business hours!"
      );
    }

    // Validate closeTime > openTime for non-closed days
    for (const hour of businessHour) {
      if (!hour.isClosed && hour.closeTime <= hour.openTime) {
        return apiResponse(
          false,
          400,
          `Close time must be after open time for day ${hour.dayOfWeek}!`
        );
      }
    }

    // Get existing settings document
    let existingSettings = await Settings.findOne({});

    if (!existingSettings) {
      // If no settings exist, create default business hours for all 7 days
      const defaultBusinessHours = Array.from({ length: 7 }, (_, i) => {
        const providedDay = businessHour.find((h) => h.dayOfWeek === i);
        return (
          providedDay || {
            dayOfWeek: i,
            openTime: 540,
            closeTime: 1320,
            isClosed: false,
          }
        );
      });

      existingSettings = await Settings.create({
        businessHours: defaultBusinessHours,
      });

      return apiResponse(
        true,
        200,
        "Business hour settings have been created successfully!",
        {
          businessHours: existingSettings.businessHours,
        }
      );
    }

    // Update existing business hours
    const updatedBusinessHours = [...existingSettings.businessHours];

    // Update or add the provided days
    for (const hour of businessHour) {
      const existingIndex = updatedBusinessHours.findIndex(
        (h) => h.dayOfWeek === hour.dayOfWeek
      );

      if (existingIndex !== -1) {
        // Update existing day
        updatedBusinessHours[existingIndex] = {
          dayOfWeek: hour.dayOfWeek,
          openTime: hour.openTime,
          closeTime: hour.closeTime,
          isClosed: hour.isClosed,
        };
      } else {
        // Add new day
        updatedBusinessHours.push({
          dayOfWeek: hour.dayOfWeek,
          openTime: hour.openTime,
          closeTime: hour.closeTime,
          isClosed: hour.isClosed,
        });
      }
    }

    // Sort by dayOfWeek for consistency
    updatedBusinessHours.sort((a, b) => a.dayOfWeek - b.dayOfWeek);

    // Update settings
    const updatedSettings = await Settings.findOneAndUpdate(
      {},
      {
        $set: {
          businessHours: updatedBusinessHours,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedSettings) {
      return apiResponse(
        false,
        500,
        "Failed to update business hour settings!"
      );
    }

    return apiResponse(
      true,
      200,
      "Business hour settings have been updated successfully!"
    );
  },
  true
);

export const GET = asyncHandler(async () => {
  const settings = await Settings.findOne({}).select("businessHours");

  if (!settings || !settings.businessHours) {
    return apiResponse(true, 200, "No business hour settings found!");
  }

  // Sort business hours by dayOfWeek for consistent response
  const sortedBusinessHours = [...settings.businessHours].sort(
    (a, b) => a.dayOfWeek - b.dayOfWeek
  );

  return apiResponse(
    true,
    200,
    "Business hour settings has been fetched successfully!",
    {
      businessHours: sortedBusinessHours,
    }
  );
}, true);
