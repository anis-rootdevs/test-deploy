"use client";

import {
  getAllChefLists,
  shortsChefTable,
} from "@/actions/shapeAction/shapeActions";
import { DataTableWithPagination } from "@/components/custom/data-table/DataTableWithPagination";
import { Chef } from "@/lib/types";
import { useTableState } from "@/store/useTableStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ChefToolbar from "./ChefToolbar";
import { columns } from "./columns";

export function ChefList() {
  const tableId = "chef";
  const [data, setData] = useState<Chef[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { refresh, handleRefresh } = useTableState(tableId);

  const fetchShapeLists = async () => {
    try {
      const result = await getAllChefLists();
      setData(result?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchShapeLists();
  }, []);

  useEffect(() => {
    fetchShapeLists();
  }, [refresh]);

  // Handle drag & drop
  const handleDataChange = async (sortedIds: string[]) => {
    try {
      const response = await shortsChefTable({ sortedIds });

      if (!response.status) {
        toast.error(response.message || "Failed to update gallery order");
        return;
      }

      toast.success("Gallery order updated successfully!");
      handleRefresh();
    } catch (error) {
      toast.error("Failed to update gallery order");
    }
  };

  return (
    <div className="space-y-8">
      {/* <NewsFilters tableId={tableId} /> */}
      <ChefToolbar />
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
