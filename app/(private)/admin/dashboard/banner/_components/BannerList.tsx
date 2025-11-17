"use client";
import { shortsTable } from "@/actions/banner/bannerActions";
import DataTable from "@/components/custom/data-table/DataTable";
import { Banner } from "@/lib/types";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import toast from "react-hot-toast";
import BannerTableToolbar from "./BannerTableToolbar";
import { columns } from "./columns";

export default function BannerLists({ data }: { data: Banner[] }) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  // Create table instance
  const table = useReactTable({
    data: data,
    columns: columns as any,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: { sorting, columnVisibility, rowSelection, columnFilters },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // Handle drag and drop position changes
  const handleDataChange = async (newData: Banner[]) => {
    const sortedIds = newData.map((banner) => banner._id);

    try {
      const response = await shortsTable({ sortedIds });

      if (!response.status) {
        toast.error(response.message || "Failed to update banner order");
        return;
      }

      toast.success(response.message || "Banner order updated successfully!");
    } catch (error) {
      toast.error("Failed to update banner order");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <BannerTableToolbar table={table as any} />
      <DataTable
        data={data}
        columns={columns as any}
        getRowId={(row) => row._id}
        table={table}
        onDataChange={handleDataChange}
      />
    </div>
  );
}
