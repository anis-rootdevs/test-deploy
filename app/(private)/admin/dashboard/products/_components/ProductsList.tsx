"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import DataTablePagination from "@/components/custom/data-table/DataTablePagination";
import { Button } from "@/components/ui/button";
import { Category, FilterType, Products } from "@/lib/types";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import TableSkeleton from "@/components/custom/data-table/TableSkeleton";
import { useState } from "react";
import ProductDeleteModal from "./ProductDeleteModal";
import ProductsFormModal from "./ProductsFormModal";
import ProductsStatusChange from "./ProductsStatusChange";
import ProductTableToolbar from "./ProductTableToolbar";

export default function ProductsList({
  initialProducts,
  categories,
}: {
  initialProducts: Products[];
  categories: Category[];
}) {
  const [products, setProducts] = useState<Products[]>(initialProducts);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterType>("all");
  const [isLoading, setIsLoading] = useState(false);

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
  let limit = 10;

  // Create table instance
  const table = useReactTable<Products>({
    data: products,
    columns: columns,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // Force table to update when data changes
    manualPagination: false,
  });

  return (
    <div className="flex flex-col gap-6">
      <ProductTableToolbar
        table={table}
        categories={categories}
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
        setProducts={setProducts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        products={products}
      />

      {isLoading ? (
        <TableSkeleton
          columns={table.getHeaderGroups()[0].headers.length}
          rows={limit}
          pagination={false}
        />
      ) : (
        <>
          <DataTable
            data={products}
            columns={columns}
            getRowId={(row) => row._id}
            table={table}
          />
          <DataTablePagination table={table} />
        </>
      )}
    </div>
  );
}
