"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import DataTablePagination from "@/components/custom/data-table/DataTablePagination";
import { Products } from "@/lib/types";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { useState } from "react";
import { columns } from "./columns";
import ProductTableToolbar from "./ProductTableToolbar";

export default function ProductsList({ products }: { products: Products[] }) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  // Create table instance
  const table = useReactTable<Products>({
    data: products,
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
  });

  // Handle drag and drop position changes
  //   const handleDataChange = async (newData: Category[]) => {
  //     const sortedIds = newData.map((category) => category._id);

  //     try {
  //       const response = await shortsCategoryTable({ sortedIds });

  //       if (!response.status) {
  //         toast.error(response.message || "Failed to update category order");
  //         return;
  //       }

  //       toast.success(response.message || "Category order updated successfully!");
  //     } catch (error) {
  //       toast.error("Failed to update category order");
  //     }
  //   };
  return (
    <div className="flex flex-col gap-6">
      <ProductTableToolbar table={table} />
      <DataTable
        data={products}
        columns={columns}
        getRowId={(row) => row._id}
        table={table}
        // onDataChange={handleDataChange}
      />

      <DataTablePagination table={table} />
    </div>
  );
}
