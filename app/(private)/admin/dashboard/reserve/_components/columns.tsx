"use client";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatReservationDate } from "@/lib/date-format";
import { ReverseTable } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import ReservationStatusChange from "./ReservedStatusChange";
import ReverseListDeleteModal from "./ReverseListDeleteModal";

export const columns: ColumnDef<ReverseTable>[] = [
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
