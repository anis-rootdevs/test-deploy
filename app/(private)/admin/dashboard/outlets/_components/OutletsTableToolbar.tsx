"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import OutletsFormModal from "./OutletsFormModal";

interface BannerTableToolbarProps<TData> {
  table: Table<TData>;
}

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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary">
                  Outlets
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
