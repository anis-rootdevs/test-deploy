"use client";

import DataTable from "@/components/custom/data-table/DataTable";
import DataTablePagination from "@/components/custom/data-table/DataTablePagination";
import { Button } from "@/components/ui/button";
import { Category, FilterType, Products } from "@/lib/types";
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

import TableSkeleton from "@/components/custom/data-table/TableSkeleton";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ProductDeleteModal from "./ProductDeleteModal";
import ProductsFormModal from "./ProductsFormModal";
import ProductsStatusChange from "./ProductsStatusChange";
import ProductTableToolbar from "./ProductTableToolbar";

interface ProductsListProps {
  initialProducts: Products[];
  categories: Category[];
  initialSearch?: string;
  initialFilter?: FilterType;
}

export default function ProductsList({
  initialProducts,
  categories,
  initialSearch = "",
  initialFilter = "all",
}: ProductsListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState(initialSearch);
  const [filter, setFilter] = useState<FilterType>(initialFilter);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Function to trigger refresh
  const refreshProducts = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const columns: ColumnDef<Products>[] = [
    {
      id: "image",
      header: "Image",
      cell: ({ row }) => {
        const imageUrl = row.original.image || "/images/placeholder.jpg";

        return (
          <div className="relative w-[50px] h-[50px] overflow-hidden rounded">
            <img
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
      enableColumnFilter: true,
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
              refreshProducts();
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
              onSuccess={refreshProducts}
            />
            <ProductDeleteModal
              productId={product._id}
              onSuccess={refreshProducts}
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
    data: initialProducts,
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
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
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
        isLoading={isPending}
      />

      {isPending ? (
        <TableSkeleton
          columns={table.getHeaderGroups()[0].headers.length}
          rows={limit}
          pagination={false}
        />
      ) : (
        <>
          <DataTable
            data={initialProducts}
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
