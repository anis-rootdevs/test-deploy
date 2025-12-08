import { getDashboardStatistics } from "@/actions/dashboard/dashboardActions";
import { routes } from "@/config/routes";
import DashboardCard from "./_components/DashboardCard";

export default async function DashboardPage() {
  const statistics = await getDashboardStatistics();
  const {
    totalProducts,
    totalActiveProducts,
    totalCategory,
    totalActiveCategory,
    totalOutlets,
    totalActiveOutlets,
    totalPendingReserveTable,
  } = statistics?.data || {};
  return (
    <div className="">
      <div className="my-4 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          total={totalPendingReserveTable}
          label="Pending ReserveTable"
          icon="books"
          link={routes.privateRoutes.admin.reserve}
        />

        <DashboardCard
          total={totalProducts}
          active={totalActiveProducts}
          label="Active Products"
          icon="products"
          link={routes.privateRoutes.admin.products.home}
        />

        <DashboardCard
          total={totalCategory}
          active={totalActiveCategory}
          label="Active Categories"
          icon="categories"
          link={routes.privateRoutes.admin.categories}
        />

        <DashboardCard
          total={totalOutlets}
          active={totalActiveOutlets}
          label="Active Outlets"
          icon="outlets"
          link={routes.privateRoutes.admin.outlets}
        />
      </div>
    </div>
  );
}
