"use client";
import { useSortable } from "@dnd-kit/sortable";
import { LuGrip } from "react-icons/lu";
import { Button } from "../../ui/button";

export default function DragHandle({ id }: { id: string }) {
  const { attributes, listeners } = useSortable({
    id,
  });
  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <LuGrip className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}
