"use client";

import { getGalleryLists } from "@/actions/gallery/galleryActions";
import { DataTableWithPagination } from "@/components/custom/data-table/DataTableWithPagination";
import { Galleries } from "@/lib/types";
import { useTableState } from "@/store/useTableStore";
import { useEffect, useState } from "react";
import { columns } from "../../gallery/_components/columns";

export function ShapeList() {
  const tableId = "gallery";
  const [data, setData] = useState<Galleries[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { page, limit, refresh } = useTableState(tableId);

  const fetchGallery = async (page: number, limit: number) => {
    try {
      const result = await getGalleryLists(page, limit);
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
    fetchGallery(page, limit);
  }, [page, limit]);

  useEffect(() => {
    fetchGallery(page, limit);
  }, [refresh]);

  return (
    <div className="space-y-8">
      {/* <NewsFilters tableId={tableId} /> */}
      <DataTableWithPagination
        data={data}
        columns={columns}
        total={total}
        tableId={tableId}
        isLoading={isLoading}
        // onSortEnd={}
        pagination={true}
      />
    </div>
  );
}
