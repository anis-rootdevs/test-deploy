"use client";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { Products } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import ProductDeleteModal from "./ProductDeleteModal";
import ProductsStatusChange from "./ProductsStatusChange";

export const columns: ColumnDef<Products>[] = [
  {
    id: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.image || "/images/placeholder.jpg";

      return (
        <div className="relative w-[50px] h-[50px] overflow-hidden rounded">
          <img
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
    enableColumnFilter: true,
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
    header: "Price ($)",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const product: Products = row.original;
      return (
        <ProductsStatusChange
          productId={product._id}
          initialStatus={product.status || false}
        />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center gap-2">
          <Button size="sm" asChild>
            <Link href={routes.privateRoutes.admin.products.edit(product._id)}>
              <SquarePen className="h-4 w-4" />
            </Link>
          </Button>
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
