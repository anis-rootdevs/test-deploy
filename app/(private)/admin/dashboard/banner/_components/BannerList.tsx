"use client";
import { revalidateBanners } from "@/actions/revalidateTag";
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
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import BannerTableToolbar from "./BannerTableToolbar";
import { columns } from "./columns";

export default function BannerLists({ data }: { data: Banner[] }) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const { data: session } = useSession();
  const token = session?.token;
  console.log("data", data);

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
    // Extract only the IDs in the new order
    const sortedIds = newData.map((banner) => banner._id);

    setBanners(newData);

    try {
      const response = await fetch("/api/admin/banner/sort", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          sortedIds: sortedIds,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        toast.error(result.message || "Failed to update banner order");
        return;
      }

      toast.success(result.message || "Banner order updated successfully!");
      // ✅ Revalidate banners cache after successful update
      await revalidateBanners();
    } catch (error) {
      console.error("Error updating banner order:", error);
      toast.error("Failed to update banner order");
    }
  };

  // if (loading) {
  //   return <div className="p-4">Loading banners...</div>;
  // }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

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
