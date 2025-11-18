"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import DataTablePagination from "@/components/custom/data-table/DataTablePagination";
import { Button } from "@/components/ui/button";
import { Category, Products } from "@/lib/types";
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ProductDeleteModal from "./ProductDeleteModal";
import ProductsFormModal from "./ProductsFormModal";
import ProductsStatusChange from "./ProductsStatusChange";
import ProductTableToolbar from "./ProductTableToolbar";

export default function ProductsList({
  products,
  categories,
}: {
  products: Products[];
  categories: Category[];
}) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Products>[] = [
    {
      id: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.original.image || "/images/placeholder.jpg";

        return (
          <div className="relative w-[50px] h-[50px] overflow-hidden rounded">
            <Image
              src={imageUrl}
              alt={row.original.name}
              width={50}
              height={50}
              className="object-cover h-full w-full"
            />
          </div>
        );
      },
    },

    {
      accessorKey: "name",
      header: "Name",
    },
    {
      accessorKey: "shortDesc",
      header: "Short Description",
    },
    {
      accessorKey: "category",
      header: "Category",
    },
    {
      accessorKey: "price",
      header: "Price ($)",
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const product: Products = row.original;
        return (
          <ProductsStatusChange
            productId={product._id}
            initialStatus={product.status || false}
            onStatusChange={(newStatus) => {
              // Optional: Handle status change (e.g., update cache, show toast)
              console.log(
                `Banner ${product._id} status changed to ${newStatus}`
              );
            }}
          />
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <div className="flex items-center gap-2">
            <ProductsFormModal
              isEditMode={true}
              product={product}
              categories={categories}
            />
            <ProductDeleteModal
              productId={product._id}
              trigger={
                <Button
                  variant="destructive"
                  size="sm"
                  className="cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        );
      },
    },
  ];

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

  return (
    <div className="flex flex-col gap-6">
      <ProductTableToolbar table={table} categories={categories} />
      <DataTable
        data={products}
        columns={columns}
        getRowId={(row) => row._id}
        table={table}
      />

      <DataTablePagination table={table} />
    </div>
  );
}
