"use client";
import DataTable from "@/components/custom/data-table/DataTable";
import DataTablePagination from "@/components/custom/data-table/DataTablePagination";
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
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import BannerTableToolbar from "./BannerTableToolbar";
import { columns } from "./columns";

type ApiResponse = {
  status: boolean;
  message: string;
  data: Banner[];
};

export default function BannerLists() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: session } = useSession();
  const token = session?.token;

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/banner", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result: ApiResponse = await response.json();
        setBanners(result.data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch banners"
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchBanners();
    }
  }, [token]);

  // Memoize table data to prevent unnecessary re-renders
  const tableData = useMemo(() => banners, [banners]);

  // Create table instance
  const table = useReactTable({
    data: tableData,
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
  }) as any;

  // Handle drag and drop position changes
  const handleDataChange = (newData: Banner[]) => {
    console.log("New order:", newData);
    // Here you can make an API call to update positions
  };

  if (loading) {
    return <div className="p-4">Loading banners...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <BannerTableToolbar table={table} />
      <DataTable
        data={tableData}
        columns={columns as any}
        getRowId={(row) => row._id}
        table={table}
        onDataChange={handleDataChange}
      />
      <DataTablePagination table={table} />
    </div>
  );
}
