"use client";

import { deleteShape } from "@/actions/shapeAction/shapeActions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useTableState } from "@/store/useTableStore";
import { AlertDialogTitle } from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";
import { ReactNode, useState } from "react";
import toast from "react-hot-toast";

interface ShapeDeleteModalProps {
  trigger: ReactNode;
  shapeId: string;
  title?: string;
}

export default function ShapeDeleteModal({
  trigger,
  shapeId,
  title = "Delete Chef Shape?",
}: ShapeDeleteModalProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { handleRefresh } = useTableState("shape");

  const defaultDescription = `This action cannot be undone. This will permanently delete`;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      const loadingToast = toast.loading("Deleting Gallery...");

      const response = await deleteShape(shapeId);

      toast.dismiss(loadingToast);

      // Check if response indicates success
      if (!response?.status === true) {
        toast.error(response?.message || "Failed to delete shape");
        setIsDeleting(false);
        return;
      }

      toast.success(response?.message || "Shape deleted successfully!");
      handleRefresh();
      setIsDeleting(false);
      setOpen(false);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete Shape"
      );
      setIsDeleting(false);
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <div onClick={() => setOpen(true)}>{trigger}</div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{defaultDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
