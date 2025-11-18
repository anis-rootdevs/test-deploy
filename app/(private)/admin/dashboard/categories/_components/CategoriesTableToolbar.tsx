"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Table } from "@tanstack/react-table";
import Link from "next/link";
import CategoriesFormModal from "./CategoriesFormModal";

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
                    Categories
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <CategoriesFormModal isEditMode={false} />
        </div>
      </div>
    </div>
  );
}
