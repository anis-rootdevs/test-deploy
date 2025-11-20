"use client";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import OutletsFormModal from "./OutletsFormModal";

interface BannerTableToolbarProps<TData> {
  table: Table<TData>;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Outlets" },
];

export default function OutletsTableToolbar<TData>({
  table,
}: BannerTableToolbarProps<TData>) {
  const [search, setSearch] = useState("");

  // ✅ Debounce logic
  useEffect(() => {
    const delay = setTimeout(() => {
      table.getColumn("name")?.setFilterValue(search);
    }, 500);

    return () => clearTimeout(delay);
  }, [search, table]);
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col flex-1 gap-2">
        <h2 className="font-jost font-medium text-lg">Manage Outlets</h2>
        <div className="mb-1">
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
        <Input
          placeholder="Filter products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 w-[150px] lg:w-[250px]"
        />
      </div>
      <div className="flex items-center gap-2">
        <OutletsFormModal isEditMode={false} />
      </div>
    </div>
  );
}
