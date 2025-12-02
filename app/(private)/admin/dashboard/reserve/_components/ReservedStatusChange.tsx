"use client";
import { changeReservationStatus } from "@/actions/reverse/reverseTableActions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTableState } from "@/store/useTableStore";
import { useState } from "react";
import toast from "react-hot-toast";

interface ReservationStatusChangeProps {
  reservedId: string;
  initialStatus: "pending" | "confirmed" | "cancelled";
  onStatusChange?: (newStatus: string) => void;
}

export default function ReservationStatusChange({
  reservedId,
  initialStatus,
  onStatusChange,
}: ReservationStatusChangeProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const tableId = "reserve";
  const { handleRefresh } = useTableState(tableId);

  const statusConfig = {
    pending: {
      label: "Pending",
      className: "text-yellow-700 bg-yellow-50 border-yellow-200",
    },
    confirmed: {
      label: "Confirmed",
      className: "text-green-700 bg-green-50 border-green-200",
    },
    cancelled: {
      label: "Cancelled",
      className: "text-red-700 bg-red-50 border-red-200",
    },
  };

  const handleStatusChange = async (
    newStatus: "pending" | "confirmed" | "cancelled"
  ) => {
    if (newStatus === status) return;

    setLoading(true);
    try {
      const response = await changeReservationStatus(reservedId, newStatus);

      if (!response.status) {
        throw new Error(response.message || "Failed to update status");
      }

      const updatedStatus = response.data?.status ?? newStatus;
      setStatus(updatedStatus);
      onStatusChange?.(updatedStatus);

      toast.success(
        response.message || "Reservation status updated successfully!"
      );
      handleRefresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update status"
      );
      console.error("Status update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      value={status}
      onValueChange={handleStatusChange}
      disabled={loading}
    >
      <SelectTrigger
        className={`w-[130px] font-medium ${statusConfig[status].className} ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <SelectValue placeholder="Select status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending" className="cursor-pointer">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
            Pending
          </span>
        </SelectItem>
        <SelectItem value="confirmed" className="cursor-pointer">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Confirmed
          </span>
        </SelectItem>
        <SelectItem value="cancelled" className="cursor-pointer">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500"></span>
            Cancelled
          </span>
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
