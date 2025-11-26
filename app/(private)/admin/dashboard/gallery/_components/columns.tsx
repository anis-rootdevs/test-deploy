"use client";
import DragHandle from "@/components/custom/data-table/DragHandle";
import { Button } from "@/components/ui/button";
import { Galleries } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import GalleryDeleteModal from "./GalleryDeleteModal";
import GalleryFormModal from "./GalleryFormModal";
import GalleryToggleSwitch from "./GalleryToggleSwitch";

export const columns: ColumnDef<Galleries>[] = [
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
            alt={row.original.capturedBy}
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
    accessorKey: "capturedBy",
    header: "Captured By",
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const gallery = row.original;
      return (
        <GalleryToggleSwitch
          galleryId={gallery._id}
          initialStatus={gallery.status || false}
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
      const gallery = row.original;

      return (
        <div className="flex items-center gap-2">
          <GalleryFormModal isEditMode={true} gallery={gallery} />

          <GalleryDeleteModal
            galleryId={gallery._id}
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
