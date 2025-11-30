import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Table } from "@tanstack/react-table";
import GalleryFormModal from "./GalleryFormModal";
interface BannerTableToolbarProps<TData> {
  table: Table<TData>;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Gallery" },
];

export default function GalleryToolBar() {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col flex-1 gap-2">
        <h2 className="font-jost font-medium text-lg">Manage Gallery</h2>
        <div>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <GalleryFormModal isEditMode={false} />
      </div>
    </div>
  );
}
