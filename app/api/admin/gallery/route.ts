import { uploadToCloudinary } from "@/config/cloudinary";
import { CLOUDINARY_SECURE_URL_BASE } from "@/config/constant";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse, makePaginate } from "@/lib/utils";
import { gallerySchema } from "@/lib/validation-schema";
import Gallery from "@/model/Gallery";
import { NextRequest } from "next/server";
import z from "zod";

// Create a gallery
export const POST = asyncFormDataHandler(
  gallerySchema,
  async (
    req: NextRequest,
    data: z.infer<typeof gallerySchema>,
    formData: FormData
  ) => {
    const { valid, error } = fileValidator(formData.get("image") as File, {
      required: true,
    });
    if (!valid) return apiResponse(false, 400, error!);

    // Upload to cloudinary
    const { public_id } = await uploadToCloudinary(
      formData.get("image") as File,
      {
        folder: `${process.env.CLOUDINARY_FOLDER}/gallery`,
      }
    );

    const galleryData = { ...data, image: public_id };
    await Gallery.create(galleryData);

    return apiResponse(true, 200, "Gallery has been created successfully!");
  },
  true
);

// Get all galleries
export const GET = asyncHandler(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("search") || undefined;
  const featured = searchParams.get("featured") || undefined;

  const skip: number = (Number(page) - 1) * Number(limit);
  const query: Record<string, any> = search
    ? {
        capturedBy: { $regex: search, $options: "i" },
      }
    : {};

  if (featured) {
    const docs = await Gallery.aggregate([
      {
        $match: {
          featured: true,
        },
      },
      {
        $sort: {
          position: 1,
        },
      },
      {
        $addFields: {
          image: {
            $cond: {
              if: { $ne: ["$image", null] }, // Check if image exists
              then: {
                $concat: [CLOUDINARY_SECURE_URL_BASE, "/", "$image"],
              },
              else: null, // or a default image URL
            },
          },
        },
      },
      {
        $project: {
          updatedAt: 0,
        },
      },
    ]);

    return apiResponse(true, 200, "Galleries have been fetched successfully!", {
      docs,
    });
  }

  const [docs, total] = await Promise.all([
    Gallery.aggregate([
      {
        $match: query,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: Number(limit),
      },
      {
        $addFields: {
          image: {
            $cond: {
              if: { $ne: ["$image", null] }, // Check if image exists
              then: {
                $concat: [CLOUDINARY_SECURE_URL_BASE, "/", "$image"],
              },
              else: null, // or a default image URL
            },
          },
        },
      },
      {
        $project: {
          updatedAt: 0,
        },
      },
    ]),
    Gallery.countDocuments(query),
  ]);

  const data = makePaginate(docs, Number(page), Number(limit), skip, total);

  return apiResponse(
    true,
    200,
    "Galleries have been fetched successfully!",
    data
  );
}, true);
