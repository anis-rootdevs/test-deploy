"use client";
import { Button } from "@/components/ui/button";
import { Chef } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import ChefDeleteModal from "./ChefDeleteModal";
import ChefFormModal from "./ChefFormModal";
import ChefToggleSwitch from "./ChefToggleSwitch";

export const columns: ColumnDef<Chef>[] = [
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
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "tagline",
    header: "Tagline",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    cell: ({ row }) => {
      const gender = row.original.gender || "";

      return <span className="capitalize">{`${gender}`}</span>;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => {
      const dial = row.original.dialCode || "";
      const phone = row.original.phone || "";
      return `${dial} ${phone}`.trim();
    },
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const chef = row.original;
      return (
        <ChefToggleSwitch
          shapeId={chef._id}
          initialStatus={chef.status || false}
          onStatusChange={(newStatus) => {}}
        />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const chef = row.original;

      return (
        <div className="flex items-center gap-2">
          <ChefFormModal isEditMode={true} chef={chef} />

          <ChefDeleteModal
            chefId={chef._id}
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
