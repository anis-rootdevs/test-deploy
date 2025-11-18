"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Category } from "@/lib/types";
import { Table } from "@tanstack/react-table";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductsFormModal from "./ProductsFormModal";

interface ProductsTableToolbarProps<TData> {
  table: Table<TData>;
  categories: Category[];
}

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
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/admin/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-primary">
                  Products
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
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
