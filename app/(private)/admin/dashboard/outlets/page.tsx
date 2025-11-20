import { getOutletsList } from "@/actions/outlets/outletsActions";
import TableSkeleton from "@/components/custom/data-table/TableSkeleton";
import { Suspense } from "react";
import OutletsList from "./_components/OutletsList";

export default async function OutletsHome() {
  const outlets = await getOutletsList();
  return (
    <Suspense
      fallback={
        <>
          <TableSkeleton />
        </>
      }
    >
      <OutletsList outlets={outlets?.data || []} />
    </Suspense>
  );
}
