"use client";

import {
  getAllShapeLists,
  shortsShapeTable,
} from "@/actions/shapeAction/shapeActions";
import { DataTableWithPagination } from "@/components/custom/data-table/DataTableWithPagination";
import { ChefShape } from "@/lib/types";
import { useTableState } from "@/store/useTableStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { columns } from "./columns";
import ShapeToolbar from "./ShapeToolbar";

export function ShapeList() {
  const tableId = "shape";
  const [data, setData] = useState<ChefShape[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { refresh, handleRefresh } = useTableState(tableId);

  const fetchShapeLists = async () => {
    try {
      const result = await getAllShapeLists();
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
      const response = await shortsShapeTable({ sortedIds });

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
      <ShapeToolbar />
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
