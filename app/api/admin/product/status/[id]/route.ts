import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import { statusSchema } from "@/lib/validation-schema";
import Product from "@/model/Product";

// Product status update
export const PUT = asyncHandler(
  statusSchema,
  async (req, data, params) => {
    const { id } = params;

    const product = await Product.findById(id);
    if (!product) return apiResponse(false, 404, "Product not found!");

    await Product.findByIdAndUpdate(id, data);

    return apiResponse(
      true,
      200,
      "Product status has been updated successfully!"
    );
  },
  true
);
