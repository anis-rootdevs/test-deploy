"use client";

import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { Table } from "@tanstack/react-table";
import { Plus } from "lucide-react";
import Link from "next/link";

interface BannerTableToolbarProps<TData> {
  table: Table<TData>;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Banner" },
];

export default function BannerTableToolbar<TData>({
  table,
}: BannerTableToolbarProps<TData>) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col flex-1 gap-2">
        <h2 className="font-jost font-medium text-lg">Manage Banner</h2>
        <div>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* <BannerFormModal isEditMode={false} /> */}

        <Link href={routes.privateRoutes.admin.banner.create}>
          <Button
            size="sm"
            className="font-jost font-medium rounded-sm h-9 cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add New Banner
          </Button>
        </Link>
      </div>
    </div>
  );
}
