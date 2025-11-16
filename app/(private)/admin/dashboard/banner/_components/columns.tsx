"use client";

import DragHandle from "@/components/custom/data-table/DragHandle";
import { Banner } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Banner>[] = [
  {
    id: "drag",
    header: () => null,
    cell: ({ row }) => <DragHandle id={row.original._id} />,
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
    header: "ShortDesc",
  },
  {
    accessorKey: "shortDesc",
    header: "ShortDesc",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <div>
        <h1>Hello</h1>
      </div>
    ),
  },
];
