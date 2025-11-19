"use client";

import { Button } from "@/components/ui/button";
import { Outlets } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import OutletDeleteModal from "./OutletDeleteModal";
import OutletsChangeStatus from "./OutletsChangeStatus";
import OutletsFormModal from "./OutletsFormModal";

export const columns: ColumnDef<Outlets>[] = [
  {
    id: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.image || "/images/placeholder.jpg";

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
    accessorKey: "location",
    header: "Locations",
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
      const outlets: Outlets = row.original;
      return (
        <OutletsChangeStatus
          outletId={outlets._id}
          initialStatus={outlets.status || false}
        />
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const outlet = row.original;

      return (
        <div className="flex items-center gap-2">
          <OutletsFormModal isEditMode={true} outlet={outlet} />
          <OutletDeleteModal
            outletId={outlet._id}
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
