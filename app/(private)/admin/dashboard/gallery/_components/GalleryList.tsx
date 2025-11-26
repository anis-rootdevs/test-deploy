"use client";

import { shortsGalleryTable } from "@/actions/gallery/galleryActions";
import DataTable from "@/components/custom/data-table/DataTable";
import DataTablePagination from "@/components/custom/data-table/DataTablePagination";
import { Galleries } from "@/lib/types";
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
import { columns } from "./columns";
import GalleryToolBar from "./GalleryToolBar";

export default function GalleryList({
  galleryList,
}: {
  galleryList: Galleries[];
}) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  console.log("galleryList====", galleryList);

  // Create table instance
  const table = useReactTable<Galleries>({
    data: galleryList,
    columns: columns,
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
  const handleDataChange = async (newData: Galleries[]) => {
    const sortedIds = newData.map((banner) => banner._id);

    try {
      const response = await shortsGalleryTable({ sortedIds });

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
    <div className="flex flex-col gap-6">
      <GalleryToolBar table={table} />
      <DataTable
        data={galleryList}
        columns={columns}
        getRowId={(row) => row._id}
        table={table}
        onDataChange={handleDataChange}
      />
      <DataTablePagination table={table} />
    </div>
  );
}
