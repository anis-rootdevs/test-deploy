"use client";
import DataTable from "@/components/custom/data-table/DataTable";
import DataTablePagination from "@/components/custom/data-table/DataTablePagination";
import TableSkeleton from "@/components/custom/data-table/TableSkeleton";
import { Button } from "@/components/ui/button";
import { ReverseFilterType, ReverseTable } from "@/lib/types";
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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { formatReservationDate } from "@/lib/date-format";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import ReservationStatusChange from "./ReservedStatusChange";
import ReserveTableToolbar from "./ReserveTableToolbar";
import ReverseListDeleteModal from "./ReverseListDeleteModal";
interface ProductsListProps {
  initialReverseList: ReverseTable[];
  initialSearch?: string;
  initialFilter?: ReverseFilterType;
}

export default function ReverseBookingList({
  initialReverseList,
  initialFilter = "all",
}: ProductsListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState<ReverseFilterType>(initialFilter);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // Function to trigger refresh
  const refreshReserveTable = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const columns: ColumnDef<ReverseTable>[] = [
    {
      accessorKey: "name",
      header: "Name",
      enableColumnFilter: true,
    },
    {
      accessorKey: "outlet",
      header: "Outlet",
      cell: ({ row }) => {
        const outlet = row.original?.outlet;
        const outletName =
          typeof outlet === "object" && outlet !== null
            ? outlet.name
            : outlet || "N/A";
        return <span>{outletName}</span>;
      },
    },

    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "numOfPeople",
      header: "People",
    },
    {
      accessorKey: "reservedAt",
      header: "Reserved Date",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-1">
            <span className="">
              {formatReservationDate(row.original.reservedAt, "MMM dd, yyyy")}
            </span>
            <span className="">
              ({formatReservationDate(row.original.reservedAt, "hh:mm a")})
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => {
        return formatReservationDate(row.original.createdAt, "MMM dd, yyyy");
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const reserved = row.original;
        return (
          <ReservationStatusChange
            reservedId={reserved._id || ""}
            initialStatus={
              (reserved.status as unknown as
                | "pending"
                | "confirmed"
                | "cancelled") || "pending"
            }
            onStatusChange={() => {
              refreshReserveTable();
            }}
          />
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const reserve = row.original;
        const isCancelled = reserve.status === "cancelled";

        return (
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <ReverseListDeleteModal
                      reserveId={reserve._id || ""}
                      onSuccess={refreshReserveTable}
                      trigger={
                        <Button
                          variant="destructive"
                          size="sm"
                          className="cursor-pointer"
                          disabled={!isCancelled}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </TooltipTrigger>
                {!isCancelled && (
                  <TooltipContent>
                    <p className="text-xs">Cancel reservation first</p>
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          </div>
        );
      },
    },
  ];
  let limit = 10;

  // Create table instance
  const table = useReactTable<ReverseTable>({
    data: initialReverseList,
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
      <ReserveTableToolbar
        table={table}
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
            data={initialReverseList}
            columns={columns}
            getRowId={(row) => row._id || ""}
            table={table}
          />
          <DataTablePagination table={table} />
        </>
      )}
    </div>
  );
}
