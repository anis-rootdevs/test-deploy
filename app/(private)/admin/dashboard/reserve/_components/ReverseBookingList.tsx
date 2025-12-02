"use client";
import { ReverseFilterType, ReverseTable } from "@/lib/types";

import { getReversedList } from "@/actions/reverse/reverseTableActions";
import { DataTableWithPagination } from "@/components/custom/data-table/DataTableWithPagination";

import { useTableState } from "@/store/useTableStore";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import ReserveTableToolbar from "./ReserveTableToolbar";

interface ProductsListProps {
  initialReverseList: ReverseTable[];
  initialSearch?: string;
  initialFilter?: ReverseFilterType;
}

export default function ReverseBookingList() {
  const tableId = "reserve";
  const [data, setData] = useState<ReverseTable[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { page, limit, search, filters, refresh } = useTableState(tableId);

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
      const result = await getReversedList(page, limit, search, {
        ...cleanedFilters,
        ...(filters.type && filters.type !== "all"
          ? { status: filters.type }
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
  }, [page, limit, search, filters, refresh]);

  return (
    <div className="flex flex-col gap-6">
      <ReserveTableToolbar tableId={tableId} />

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
