"use client";

import { changeStatus } from "@/actions/banner/bannerActions";
import { Switch } from "@/components/ui/switch";
import { useLoadingStore } from "@/store/useLoadingStore";
import { useState } from "react";
import toast from "react-hot-toast";

interface ToggleSwitchProps {
  bannerId: string;
  initialStatus: boolean;
  onStatusChange?: (newStatus: boolean) => void;
}

export default function ToggleSwitch({
  bannerId,
  initialStatus,
  onStatusChange,
}: ToggleSwitchProps) {
  const [status, setStatus] = useState(initialStatus);

  // Access the store functions
  const setLoading = useLoadingStore((state) => state.setLoading);
  const loadingMap = useLoadingStore((state) => state.loadingMap);

  const handleStatusToggle = async (checked: boolean) => {
    setLoading(bannerId, true); // Set loading true for this banner
    try {
      const response = await changeStatus(bannerId, checked);

      if (!response.status) {
        throw new Error("Failed to update status");
      }

      const newStatus = response.data?.status ?? checked;
      setStatus(newStatus);
      onStatusChange?.(newStatus);

      toast.success(
        response.message || "Banner status has been updated successfully!"
      );
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setLoading(bannerId, false); // Reset loading after API call
    }
  };

  const isLoading = loadingMap[bannerId] ?? false;

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={status}
        onCheckedChange={handleStatusToggle}
        disabled={isLoading}
        className="cursor-pointer"
      />
      <span className="text-sm">{status ? "Active" : "Inactive"}</span>
    </div>
  );
}
