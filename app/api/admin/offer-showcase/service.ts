import { toObjectId } from "@/lib/utils";
import Product from "@/model/Product";
import mongoose from "mongoose";

export const productIdChecker = async (products: string[]) => {
  const objectIds = products.map((id) =>
    typeof id === "string" ? toObjectId(id) : id
  );

  const existingProducts = await Product.find({
    _id: { $in: objectIds },
  })
    .select("_id")
    .lean();

  const existingIds = new Set(
    existingProducts.map((product) =>
      (product._id as mongoose.Types.ObjectId).toString()
    )
  );

  const nonExistentIds = products.filter((id) => {
    const idString =
      typeof id === "string" ? id : (id as mongoose.Types.ObjectId).toString();
    return !existingIds.has(idString);
  });

  if (nonExistentIds.length > 0) {
    return {
      valid: false,
      error: `The following product IDs do not exist: ${nonExistentIds.join(
        ", "
      )}`,
    };
  } else {
    return { valid: true };
  }
};
