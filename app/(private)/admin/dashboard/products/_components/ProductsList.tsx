"use client";

import { Products } from "@/lib/types";

import { getProductList } from "@/actions/product/productActions";
import { DataTableWithPagination } from "@/components/custom/data-table/DataTableWithPagination";
import { useTableState } from "@/store/useTableStore";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import ProductTableToolbar from "./ProductTableToolbar";

export default function ProductsList() {
  const tableId = "product";
  const [data, setData] = useState<Products[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { page, limit, search, filters } = useTableState(tableId);

  const fetchProducts = async (
    page: number,
    limit: number,
    search: string,
    filters: Record<string, unknown>
  ) => {
    try {
      const cleanedFilters = Object.fromEntries(
        Object.entries(filters).filter(
          ([key, value]) => !!value && value !== "all" && key !== "type"
        )
      );
      const result = await getProductList(page, limit, search, {
        ...cleanedFilters,
        ...(filters.type && filters.type !== "all"
          ? { tag: filters.type }
          : {}),
      });
      setData(result?.data?.docs);
      setTotal(result?.data.totalDocs);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchProducts(page, limit, search, filters);
  }, [page, limit, search, filters]);

  useEffect(() => {
    fetchProducts(page, limit, search, filters);
  }, [page, limit, search, filters]);

  return (
    <div className="flex flex-col gap-6">
      <ProductTableToolbar tableId={tableId} />

      <DataTableWithPagination
        data={data}
        columns={columns}
        total={total}
        tableId={tableId}
        isLoading={isLoading}
        // onSortEnd={handleDataChange}
        pagination={true}
      />
    </div>
  );
}
