"use client";

import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Input } from "@/components/ui/input";
import { Category } from "@/lib/types";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";
import ProductsFormModal from "./ProductsFormModal";

interface ProductsTableToolbarProps<TData> {
  table: Table<TData>;
  categories: Category[];
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: " Products" },
];

export default function ProductTableToolbar<TData>({
  table,
  categories,
}: ProductsTableToolbarProps<TData>) {
  const [search, setSearch] = useState("");

  // ✅ Debounce logic
  useEffect(() => {
    const delay = setTimeout(() => {
      table.getColumn("name")?.setFilterValue(search);
    }, 500);

    return () => clearTimeout(delay);
  }, [search, table]);

  return (
    <div>
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex flex-col flex-1 gap-2">
          <h2 className="font-jost font-medium text-lg">Manage Products</h2>
          <DynamicBreadcrumb items={breadcrumbItems} />
          <Input
            placeholder="Filter products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-10 w-[150px] lg:w-[250px]"
          />
        </div>
        <div className="flex items-center gap-2">
          <ProductsFormModal isEditMode={false} categories={categories} />
        </div>
      </div>
    </div>
  );
}
