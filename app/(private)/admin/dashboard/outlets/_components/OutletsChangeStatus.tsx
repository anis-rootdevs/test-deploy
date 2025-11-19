"use client";
import { changeOutletsStatus } from "@/actions/outlets/outletsActions";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import toast from "react-hot-toast";

interface ToggleSwitchProps {
  outletId: string;
  initialStatus: boolean;
  onStatusChange?: (newStatus: boolean) => void;
}

export default function OutletsChangeStatus({
  initialStatus,
  outletId,
  onStatusChange,
}: ToggleSwitchProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus);

  const handleStatusToggle = async (checked: boolean) => {
    setLoading(true);
    try {
      const response = await changeOutletsStatus(outletId, checked);

      if (!response.status) {
        throw new Error("Failed to update status");
      }

      const newStatus = response.data?.status ?? checked;
      setStatus(newStatus);
      onStatusChange?.(newStatus);

      toast.success(
        response.message || "Category status has been updated successfully!"
      );
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={status}
        onCheckedChange={handleStatusToggle}
        disabled={loading}
        className="cursor-pointer"
      />
      <span className="text-sm">{status ? "Active" : "Inactive"}</span>
    </div>
  );
}
