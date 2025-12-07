import { getDashboardStatistics } from "@/actions/dashboard/dashboardActions";
import DashboardCard from "./_components/DashboardCard";

export default async function DashboardPage() {
  const statistics = await getDashboardStatistics();
  console.log(statistics);
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
        />
        <DashboardCard
          total={totalProducts}
          active={totalActiveProducts}
          label="Products"
        />
        <DashboardCard
          total={totalCategory}
          active={totalActiveCategory}
          label="Categories"
        />
        <DashboardCard
          total={totalOutlets}
          active={totalActiveOutlets}
          label="Outlets"
        />
      </div>
    </div>
  );
}
