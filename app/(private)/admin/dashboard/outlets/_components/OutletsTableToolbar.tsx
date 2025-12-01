"use client";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import OutletsFormModal from "./OutletsFormModal";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Outlets" },
];

export default function OutletsTableToolbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col flex-1 gap-2">
        <h2 className="font-jost font-medium text-lg">Manage Outlets</h2>
        <div className="mb-1">
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <OutletsFormModal isEditMode={false} />
      </div>
    </div>
  );
}
