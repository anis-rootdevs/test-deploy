"use client";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Table } from "@tanstack/react-table";
import CategoriesFormModal from "./CategoriesFormModal";

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Categories" },
];
interface CategoriesTableToolbarProps<TData> {
  table: Table<TData>;
}

export default function CategoriesTableToolbar<TData>({
  table,
}: CategoriesTableToolbarProps<TData>) {
  return (
    <div>
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex flex-col flex-1 gap-2">
          <h2 className="font-jost font-medium text-lg">
            Manage Food Categories
          </h2>
          <div>
            <DynamicBreadcrumb items={breadcrumbItems} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CategoriesFormModal isEditMode={false} />
        </div>
      </div>
    </div>
  );
}
