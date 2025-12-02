"use client";

import {
  getGalleryLists,
  shortsGalleryTable,
} from "@/actions/gallery/galleryActions";
import { DataTableWithPagination } from "@/components/custom/data-table/DataTableWithPagination";
import { Galleries } from "@/lib/types";
import { useTableState } from "@/store/useTableStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { columns } from "./columns";
import GalleryToolBar from "./GalleryToolBar";

export default function GalleryList() {
  const tableId = "gallery";
  const [data, setData] = useState<Galleries[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { page, limit, refresh, handleRefresh, filters } =
    useTableState(tableId);

  const fetchGallery = async (
    page: number,
    limit: number,
    filters: Record<string, unknown>
  ) => {
    try {
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([key, value]) => !!value && value !== "all" && key !== "type"
        )
      );
      const result = await getGalleryLists(page, limit, {
        ...cleanedFilters,
        ...(filters.type && filters.type !== "all"
          ? { featured: filters.type }
          : {}),
      });

      setData(result?.data?.docs);
      setTotal(result?.data.totalDocs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchGallery(page, limit, filters);
  }, [page, limit, filters]);

  useEffect(() => {
    fetchGallery(page, limit, filters);
  }, [refresh, page, limit, filters]);

  // Handle drag & drop
  const handleDataChange = async (sortedIds: string[]) => {
    try {
      const response = await shortsGalleryTable({ sortedIds });

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
    <div className="flex flex-col gap-6">
      <GalleryToolBar tableId={tableId} />

      <DataTableWithPagination
        data={data}
        columns={columns}
        total={total}
        tableId={tableId}
        isLoading={isLoading}
        onSortEnd={filters.type === "1" ? handleDataChange : undefined}
        pagination={filters.type === "all"}
      />
    </div>
  );
}
