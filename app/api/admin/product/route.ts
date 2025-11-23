import { uploadToCloudinary } from "@/config/cloudinary";
import { asyncFormDataHandler } from "@/lib/async-formdata-handler";
import { asyncHandler } from "@/lib/async-handler";
import { fileValidator } from "@/lib/file-validator";
import { apiResponse, makePaginate } from "@/lib/utils";
import { productSchema } from "@/lib/validation-schema";
import Product from "@/model/Product";
import { NextRequest } from "next/server";
import z from "zod";

// Create a product
export const POST = asyncFormDataHandler(
  productSchema,
  async (
    req: NextRequest,
    data: z.infer<typeof productSchema>,
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
        folder: `${process.env.CLOUDINARY_FOLDER}/product`,
      }
    );

    const productData = { ...data, image: public_id };
    await Product.create(productData);

    return apiResponse(true, 200, "Product has been created successfully!");
  },
  true
);

// Get all products
export const GET = asyncHandler(async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const page = searchParams.get("page") || 1;
  const limit = searchParams.get("limit") || 10;
  const search = searchParams.get("search") || undefined;
  const tag = searchParams.get("tag") || undefined;

  const skip: number = (Number(page) - 1) * Number(limit);
  const query: Record<string, any> = search
    ? {
        name: { $regex: search, $options: "i" },
        shortDesc: { $regex: search, $options: "i" },
      }
    : {};

  if (tag === "featured") query.featured = true;
  if (tag === "mostLoved") query.mostLoved = true;

  const [docs, total] = await Promise.all([
    Product.aggregate([
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
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: {
          path: "$categoryInfo",
          preserveNullAndEmptyArrays: true, // Keep products without category
        },
      },
      {
        $addFields: {
          image: {
            $cond: {
              if: { $ne: ["$image", null] }, // Check if image exists
              then: {
                $concat: [
                  process.env.CLOUDINARY_SECURE_URL_BASE || "",
                  "/",
                  "$image",
                ],
              },
              else: null, // or a default image URL
            },
          },
          category: "$categoryInfo.name",
        },
      },
      {
        $project: {
          categoryInfo: 0,
          updatedAt: 0,
        },
      },
    ]),
    Product.countDocuments(query),
  ]);

  const data = makePaginate(docs, Number(page), Number(limit), skip, total);

  return apiResponse(
    true,
    200,
    "Products has been fetched successfully!",
    data
  );
}, true);
