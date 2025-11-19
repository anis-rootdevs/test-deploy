"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import { Outlets } from "@/lib/types";
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
import OutletsTableToolbar from "./OutletsTableToolbar";

export default function OutletsList({ outlets }: { outlets: Outlets[] }) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable<Outlets>({
    data: outlets,
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
  return (
    <div className="flex flex-col gap-6">
      <OutletsTableToolbar table={table} />
      <DataTable
        data={outlets}
        columns={columns}
        getRowId={(row) => row._id}
        table={table}
      />
    </div>
  );
}
