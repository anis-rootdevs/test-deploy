import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Table } from "@tanstack/react-table";
import ChefFormModal from "./ChefFormModal";
interface ShapeTableToolbarProps<TData> {
  table: Table<TData>;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Chef" },
];

export default function ChefToolbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col flex-1 gap-2">
        <h2 className="font-jost font-medium text-lg">Manage Chef</h2>
        <div>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ChefFormModal isEditMode={false} />
      </div>
    </div>
  );
}
