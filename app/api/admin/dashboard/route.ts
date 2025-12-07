import { asyncHandler } from "@/lib/async-handler";
import { apiResponse } from "@/lib/utils";
import Category from "@/model/Category";
import Outlet from "@/model/Outlet";
import Product from "@/model/Product";
import ReserveTable from "@/model/ReserveTable";

export const GET = asyncHandler(async () => {
  const [
    totalProducts,
    totalActiveProducts,
    totalCategory,
    totalActiveCategory,
    totalOutlets,
    totalActiveOutlets,
    totalPendingReserveTable,
  ] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ status: true }),
    Category.countDocuments(),
    Category.countDocuments({ status: true }),
    Outlet.countDocuments(),
    Outlet.countDocuments({ status: true }),
    ReserveTable.countDocuments({ status: "pending" }),
  ]);

  return apiResponse(
    true,
    200,
    "Statistics data has been fetched successfully!",
    {
      totalProducts,
      totalActiveProducts,
      totalCategory,
      totalActiveCategory,
      totalOutlets,
      totalActiveOutlets,
      totalPendingReserveTable,
    }
  );
});
