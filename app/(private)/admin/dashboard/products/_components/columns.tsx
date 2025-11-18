"use client";

import DragHandle from "@/components/custom/data-table/DragHandle";
import { Button } from "@/components/ui/button";
import { Products } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import ProductDeleteModal from "./ProductDeleteModal";

export const columns: ColumnDef<Products>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original._id} />,
  },
  {
    id: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.image;

      return (
        <div className="relative w-[50px] h-[50px] overflow-hidden rounded">
          <Image
            src={imageUrl}
            alt={row.original.name}
            width={50}
            height={50}
            className="object-cover h-full w-full"
          />
        </div>
      );
    },
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "shortDesc",
    header: "Short Description",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "price",
    header: "Price",
  },

  {
    accessorKey: "status",
    header: "Status",
    // cell: ({ row }) => {
    //   const category: Category = row.original;
    //   return (
    //     <CategoryStatusChange
    //       categoryId={category._id}
    //       initialStatus={category.status || false}
    //       onStatusChange={(newStatus) => {
    //         // Optional: Handle status change (e.g., update cache, show toast)
    //         console.log(
    //           `Banner ${category._id} status changed to ${newStatus}`
    //         );
    //       }}
    //     />
    //   );
    // },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center gap-2">
          {/* <CategoriesFormModal isEditMode={true} category={category} /> */}
          <ProductDeleteModal
            productId={product._id}
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
