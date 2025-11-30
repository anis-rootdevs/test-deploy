import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Table } from "@tanstack/react-table";
import ShapeFormModal from "./ShapeFormModal";
interface ShapeTableToolbarProps<TData> {
  table: Table<TData>;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Shape" },
];

export default function ShapeToolbar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col flex-1 gap-2">
        <h2 className="font-jost font-medium text-lg">Manage Shape</h2>
        <div>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ShapeFormModal isEditMode={false} />
      </div>
    </div>
  );
}
