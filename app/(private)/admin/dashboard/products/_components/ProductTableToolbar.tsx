"use client";

import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { useTableState } from "@/store/useTableStore";
import { Plus, X } from "lucide-react";
import Link from "next/link";
import ProductFilter from "./ProductFilter";
import SearchBar from "./SearchBar";

interface ProductsTableToolbarProps<TData> {
  tableId: string;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: " Products" },
];

export default function ProductTableToolbar<TData>({
  tableId,
}: ProductsTableToolbarProps<TData>) {
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

  const hasActiveFilters = activeFilters.length > 0;
  return (
    <div>
      {" "}
      <div className="flex flex-col space-y-2">
        <div className="flex items-start flex-wrap justify-between gap-2">
          <div>
            <h2 className="font-jost font-medium text-lg">Manage Products</h2>
            <DynamicBreadcrumb items={breadcrumbItems} />
          </div>

          <div>
            <Link href={routes.privateRoutes.admin.products.create}>
              <Button
                size="sm"
                className="font-jost font-medium rounded-sm h-9 cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                Add New Product
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <SearchBar
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />

          <ProductFilter
            value={(filters.type as string) || "all"}
            onChange={(value, label) => {
              setFilter("type", value);
              setLocalState("type", label);
            }}
          />
          {/* Active Filters with Clear Button */}
          {hasActiveFilters && (
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <span className="text-sm font-medium text-muted-foreground">
                Active filter:
              </span>
              {activeFilters.map((filter) => (
                <Badge
                  key={filter.key}
                  variant="secondary"
                  className="gap-1 pr-1 text-xs capitalize dark:bg-gray-950"
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
    </div>
  );
}
