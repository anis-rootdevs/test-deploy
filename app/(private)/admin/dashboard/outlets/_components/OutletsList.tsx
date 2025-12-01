"use client";

import {
  getOutletsList,
  shortsOutletsTable,
} from "@/actions/outlets/outletsActions";
import { DataTableWithPagination } from "@/components/custom/data-table/DataTableWithPagination";
import { Outlets } from "@/lib/types";
import { useTableState } from "@/store/useTableStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { columns } from "./columns";
import OutletsTableToolbar from "./OutletsTableToolbar";

export default function OutletsList() {
  const tableId = "outlets";
  const [data, setData] = useState<Outlets[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  const { page, limit, refresh, handleRefresh, search } =
    useTableState(tableId);

  const fetchOutlets = async (page: number, limit: number, search: string) => {
    try {
      const result = await getOutletsList(page, limit, search);
      console.log(result, "result outleft");
      setData(result?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchOutlets(page, limit, search);
  }, [page, limit, search]);

  useEffect(() => {
    fetchOutlets(page, limit, search);
  }, [page, limit, search]);

  // Handle drag & drop
  const handleDataChange = async (sortedIds: string[]) => {
    try {
      const response = await shortsOutletsTable({ sortedIds });

      if (!response.status) {
        toast.error(response.message || "Failed to update outlets order");
        return;
      }

      toast.success("Outlets order updated successfully!");
      handleRefresh();
    } catch (error) {
      toast.error("Failed to update outlets order");
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <OutletsTableToolbar tableId={tableId} />

      <DataTableWithPagination
        data={data}
        columns={columns}
        // total={total}
        tableId={tableId}
        isLoading={isLoading}
        onSortEnd={handleDataChange}
        pagination={false}
      />
    </div>
  );
}
