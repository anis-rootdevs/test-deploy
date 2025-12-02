import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useTableState } from "@/store/useTableStore";
import { X } from "lucide-react";
import GalleryFilter from "./GalleryFilter";
import GalleryFormModal from "./GalleryFormModal";

interface GalleryTableToolbarProps {
  tableId: string;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Gallery" },
];

export default function GalleryToolBar({ tableId }: GalleryTableToolbarProps) {
  const { filters, localState, setFilter, setLocalState } =
    useTableState(tableId);

  const handleClearFilters = () => {
    setFilter("type", "all");
  };

  const activeFilters = [];

  if (filters.type && filters.type !== "all") {
    activeFilters.push({
      label: `Type: ${localState.type}`,
      key: "status",
      onRemove: () => {
        setFilter("type", "all");
        setLocalState("type", "");
      },
    });
  }

  const hasActiveFilters = activeFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col flex-1 gap-2">
        <h2 className="font-jost font-medium text-lg">Manage Gallery</h2>
        <div>
          <DynamicBreadcrumb items={breadcrumbItems} />
        </div>
        <div className="flex items-center gap-4 flex-wrap mt-2">
          <GalleryFilter
            value={(filters.type as string) || "all"}
            onChange={(value, label) => {
              setFilter("type", value);
              setLocalState("type", label);
            }}
          />
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <span className="text-sm font-medium text-muted-foreground">
                Active filter:
              </span>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter.key}
                  variant="secondary"
                  className="gap-1 pr-1 text-xs capitalize"
                >
                  {filter.label}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-4 hover:bg-transparent hover:text-background/70"
                    onClick={filter.onRemove}
                  >
                    <X className="size-3" />
                    <span className="sr-only">Remove filter</span>
                  </Button>
                </Badge>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={handleClearFilters}
                className="h-6 gap-1 text-xs"
              >
                Clear all
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <GalleryFormModal isEditMode={false} />
      </div>
    </div>
  );
}
