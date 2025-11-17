"use client";

import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import BannerFormModal from "./BannerFormModal";

interface BannerTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function BannerTableToolbar<TData>({
  table,
}: BannerTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center gap-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("tagline")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("tagline")?.setFilterValue(event.target.value)
          }
          className="h-10 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center gap-2">
        <BannerFormModal isEditMode={false} />
      </div>
    </div>
  );
}
