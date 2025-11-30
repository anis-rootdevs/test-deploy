"use client";

import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { Category } from "@/lib/types";
import { Plus } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

interface ProductsTableToolbarProps<TData> {
  categories: Category[];
  tableId: string;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: " Products" },
];

export default function ProductTableToolbar<TData>({
  categories,
  tableId,
}: ProductsTableToolbarProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  return (
    <div>
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex flex-col flex-1 gap-2">
          <h2 className="font-jost font-medium text-lg">Manage Products</h2>
          <DynamicBreadcrumb items={breadcrumbItems} />
          <div className="flex items-center gap-4">
            {/* <Input
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
            <ProductFilter
              filter={filter}
              setFilter={setFilter}
              disabled={isLoading || isPending}
            /> */}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* <ProductsFormModal
            isEditMode={false}
            categories={categories}
            onSuccess={handleRefresh}
          /> */}

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
    </div>
  );
}
