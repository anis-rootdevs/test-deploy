"use client";

import DragHandle from "@/components/custom/data-table/DragHandle";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { Banner } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import BannerDeleteModal from "./BannerDeleteModal";
import ToggleSwitch from "./ToggleSwitch";

export const columns: ColumnDef<Banner>[] = [
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
          <img
            src={imageUrl}
            alt={row.original.heading}
            width={50}
            height={50}
            className="object-cover h-full w-full"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "tagline",
    header: "Tagline",
  },
  {
    accessorKey: "heading",
    header: "Heading",
  },
  {
    accessorKey: "shortDesc",
    header: "Short Description",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const banner = row.original;
      return (
        <ToggleSwitch
          bannerId={banner._id}
          initialStatus={banner.status || false}
          onStatusChange={(newStatus) => {
            // Optional: Handle status change (e.g., update cache, show toast)
            console.log(`Banner ${banner._id} status changed to ${newStatus}`);
          }}
        />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const banner = row.original;

      return (
        <div className="flex items-center gap-2">
          {/* <BannerFormModal isEditMode={true} banner={banner} /> */}
          <Button size="sm" asChild>
            <Link href={routes.privateRoutes.admin.banner.edit(banner._id)}>
              <SquarePen className="h-4 w-4" />
            </Link>
          </Button>
          <BannerDeleteModal
            bannerId={banner._id}
            itemName={banner.heading}
            trigger={
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      );
    },
  },
];
