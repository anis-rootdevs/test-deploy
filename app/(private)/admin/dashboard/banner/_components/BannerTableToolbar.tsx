"use client";

import { Table } from "@tanstack/react-table";
import BannerFormModal from "./BannerFormModal";

interface BannerTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function BannerTableToolbar<TData>({
  table,
}: BannerTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-end">
      <BannerFormModal isEditMode={false} />
    </div>
  );
}
