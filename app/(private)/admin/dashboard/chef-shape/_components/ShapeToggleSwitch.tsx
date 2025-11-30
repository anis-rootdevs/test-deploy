"use client";

import { changeShapeStatus } from "@/actions/shapeAction/shapeActions";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import toast from "react-hot-toast";

interface ToggleSwitchProps {
  shapeId: string;
  initialStatus: boolean;
  onStatusChange?: (newStatus: boolean) => void;
}
export default function ShapeToggleSwitch({
  shapeId,
  initialStatus,
  onStatusChange,
}: ToggleSwitchProps) {
  const [status, setStatus] = useState(initialStatus);
  const [loading, setLoading] = useState(false);

  const handleStatusToggle = async (checked: boolean) => {
    if (loading) return;
    try {
      const response = await changeShapeStatus(shapeId, checked);

      if (!response.status) {
        throw new Error("Failed to update status");
      }

      const newStatus = response.data?.status ?? checked;
      setStatus(newStatus);
      onStatusChange?.(newStatus);

      toast.success(response.message || "Shape status  updated successfully!");
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
        className={loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
      />
      <span className="text-sm">
        {loading ? "Updating..." : status ? "Active" : "Inactive"}
      </span>
    </div>
  );
}
