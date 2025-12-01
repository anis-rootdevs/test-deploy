import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import Showcase from "@/model/Showcase";

// Get story showcase info
export const GET = asyncHandler(async () => {
  const { storyShowcase } = (await Showcase.findOne({})).toObject();

  const data = {
    ...storyShowcase,
    imageOne: `${CLOUDINARY_SECURE_URL_BASE}/${storyShowcase?.imageOne}`,
    imageTwo: `${CLOUDINARY_SECURE_URL_BASE}/${storyShowcase?.imageTwo}`,
    imageThree: `${CLOUDINARY_SECURE_URL_BASE}/${storyShowcase?.imageThree}`,
    values: [
      ...storyShowcase.values.map((value: { icon: string }) => ({
        ...value,
        ...(value.icon && {
          icon: `${CLOUDINARY_SECURE_URL_BASE}/${value.icon}`,
        }),
      })),
    ],
  };

  return apiResponse(
    true,
    200,
    "Story showcase has been fetched successfully!",
    data
  );
});
