"use client";
import { changeProductStatus } from "@/actions/product/productActions";
import { Switch } from "@/components/ui/switch";
import { useTableState } from "@/store/useTableStore";
import { useState } from "react";
import toast from "react-hot-toast";

interface ToggleSwitchProps {
  productId: string;
  initialStatus: boolean;
  onStatusChange?: (newStatus: boolean) => void;
}

export default function ProductsStatusChange({
  initialStatus,
  productId,
  onStatusChange,
}: ToggleSwitchProps) {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(initialStatus);
  const tableId = "product";
  const { handleRefresh } = useTableState(tableId);

  const handleStatusToggle = async (checked: boolean) => {
    setLoading(true);
    try {
      const response = await changeProductStatus(productId, checked);

      if (!response.status) {
        throw new Error("Failed to update status");
      }

      const newStatus = response.data?.status ?? checked;
      setStatus(newStatus);
      onStatusChange?.(newStatus);

      toast.success(response.message || "Product status updated successfully!");
      handleRefresh();
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
