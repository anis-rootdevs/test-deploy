"use client";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { useTableState } from "@/store/useTableStore";
import ReserveFilter from "./ReserveFilter";
import SearchBar from "./SearchBar";

interface ReserveTableToolbarProps {
  tableId: string;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Reserve" },
];

export default function ReserveTableToolbar({
  tableId,
}: ReserveTableToolbarProps) {
  const {
    search,
    searchInput,
    filters,
    localState,
    setSearch,
    setSearchInput,
    setFilter,
    setLocalState,
  } = useTableState(tableId);

  const handleClearFilters = () => {
    setSearch("");
    setFilter("type", "all");
  };

  const activeFilters = [];

  if (search) {
    activeFilters.push({
      label: `Search: ${search}`,
      key: "search",
      onRemove: () => setSearch(""),
    });
  }
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
  return (
    <div>
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex flex-col flex-1 gap-2">
          <h2 className="font-jost font-medium text-lg">
            Manage Reserve Table
          </h2>
          <DynamicBreadcrumb items={breadcrumbItems} />
          <div className="flex items-center gap-4">
            <SearchBar
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <ReserveFilter
              value={(filters.type as string) || "all"}
              onChange={(value, label) => {
                setFilter("type", value);
                setLocalState("type", label);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
