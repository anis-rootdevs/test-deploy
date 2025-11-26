"use client";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Input } from "@/components/ui/input";
import { ReverseFilterType } from "@/lib/types";
import { Table } from "@tanstack/react-table";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useTransition } from "react";
import ReserveFilter from "./ReserveFilter";

interface ReserveTableToolbarProps<TData> {
  table: Table<TData>;
  filter: ReverseFilterType;
  setFilter: (value: ReverseFilterType) => void;
  isLoading: boolean;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Reserve" },
];

export default function ReserveTableToolbar<TData>({
  table,
  filter,
  setFilter,
  isLoading,
}: ReserveTableToolbarProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  // Update URL params when search/filter changes
  useEffect(() => {
    const delay = setTimeout(() => {
      const params = new URLSearchParams();

      if (filter && filter !== "all") {
        params.set("status", filter);
      }
      const queryString = params.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;

      startTransition(() => {
        router.replace(newUrl, { scroll: false });
      });
    }, 500);

    return () => clearTimeout(delay);
  }, [filter, pathname, router]);

  const handleRefresh = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  return (
    <div>
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex flex-col flex-1 gap-2">
          <h2 className="font-jost font-medium text-lg">Manage Reserve</h2>
          <DynamicBreadcrumb items={breadcrumbItems} />
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search products..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="h-10 w-[150px] lg:w-[250px] rounded-[4px]"
              disabled={isLoading || isPending}
            />
            <ReserveFilter
              filter={filter}
              setFilter={setFilter}
              disabled={isLoading || isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
