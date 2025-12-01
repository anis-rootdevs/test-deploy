"use client";

import { Category, Products } from "@/lib/types";

import { getProductList } from "@/actions/product/productActions";
import { DataTableWithPagination } from "@/components/custom/data-table/DataTableWithPagination";
import { useTableState } from "@/store/useTableStore";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import ProductTableToolbar from "./ProductTableToolbar";

interface ProductsListProps {
  categories: Category[];
}

export default function ProductsList({ categories }: ProductsListProps) {
  const tableId = "product";
  const [data, setData] = useState<Products[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { page, limit, refresh } = useTableState(tableId);

  const fetchProducts = async (page: number, limit: number) => {
    try {
      const result = await getProductList(page, limit);
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
    fetchProducts(page, limit);
  }, [page, limit]);

  useEffect(() => {
    fetchProducts(page, limit);
  }, [refresh]);

  return (
    <div className="flex flex-col gap-6">
      <ProductTableToolbar categories={categories} tableId={tableId} />

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
