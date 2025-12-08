"use client";

import DragHandle from "@/components/custom/data-table/DragHandle";
import { Button } from "@/components/ui/button";
import { Category } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import CategoriesFormModal from "./CategoriesFormModal";
import CategoryDeleteModal from "./CategoryDeleteModal";
import CategoryStatusChange from "./CategoryStatusChange";

export const columns: ColumnDef<Category>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original._id} />,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const category: Category = row.original;
      return (
        <CategoryStatusChange
          categoryId={category._id}
          initialStatus={category.status || false}
          onStatusChange={(newStatus) => {
            // Optional: Handle status change (e.g., update cache, show toast)
          }}
        />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center gap-2">
          <CategoriesFormModal isEditMode={true} category={category} />
          <CategoryDeleteModal
            categoryId={category._id}
            trigger={
              <Button
                variant="destructive"
                size="sm"
                className="cursor-pointer"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
