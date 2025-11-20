"use client";

import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { routes } from "@/config/routes";
import { Table } from "@tanstack/react-table";
import Link from "next/link";
import BannerFormModal from "./BannerFormModal";

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
        <BannerFormModal isEditMode={false} />
        <Link
          href={routes.privateRoutes.admin.banner.create}
          className="border p-2"
        >
          {" "}
          create
        </Link>
      </div>
    </div>
  );
}
