"use client";

import { getProductList } from "@/actions/product/productActions";
import { DynamicBreadcrumb } from "@/components/custom/DynamicBreadcrumb";
import { Input } from "@/components/ui/input";
import { Category, FilterType, Products } from "@/lib/types";
import { Table } from "@tanstack/react-table";
import { useEffect } from "react";
import toast from "react-hot-toast";
import ProductFilter from "./ProductFilter";
import ProductsFormModal from "./ProductsFormModal";

interface ProductsTableToolbarProps<TData> {
  table: Table<TData>;
  categories: Category[];
  search: string;
  setSearch: (value: string) => void;
  filter: FilterType;
  setFilter: (value: FilterType) => void;
  setProducts: (products: Products[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  products?: any;
}

const breadcrumbItems = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: " Products" },
];

export default function ProductTableToolbar<TData>({
  table,
  categories,
  search,
  setSearch,
  filter,
  setFilter,
  setProducts,
  isLoading,
  setIsLoading,
}: ProductsTableToolbarProps<TData>) {
  // Fetch products based on search and filter
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      try {
        const params: any = {};

        if (search) {
          params.search = search;
        }
        if (filter !== "all") {
          params.tag = filter;
        }

        const result = await getProductList(params);

        if (result?.status === true && result.data.docs) {
          setProducts(result.data.docs);
        } else {
          toast.error(result.message || "Failed to fetch products");
        }
      } catch (error) {
        toast.error("Error fetching products");
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce search
    const delay = setTimeout(() => {
      fetchProducts();
    }, 500);

    return () => clearTimeout(delay);
  }, [search, filter, setProducts, setIsLoading]);

  return (
    <div>
      {" "}
      <div className="flex items-center justify-between">
        <div className="flex flex-col flex-1 gap-2">
          <h2 className="font-jost font-medium text-lg">Manage Products</h2>
          <DynamicBreadcrumb items={breadcrumbItems} />
          <div className="flex items-center gap-4">
            <Input
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 w-[150px] lg:w-[250px] rounded-[4px]"
              disabled={isLoading}
            />
            <ProductFilter
              filter={filter}
              setFilter={setFilter}
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ProductsFormModal isEditMode={false} categories={categories} />
        </div>
      </div>
    </div>
  );
}
